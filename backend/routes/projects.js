const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');

const router = express.Router();

// GET /api/projects - Get all projects with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      featured,
      status,
      page = 1,
      limit = 10,
      sort = 'displayOrder'
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    if (status) {
      query.status = status;
    }

    // Build sort object
    const sortOptions = {};
    switch (sort) {
      case 'newest':
        sortOptions.startDate = -1;
        break;
      case 'oldest':
        sortOptions.startDate = 1;
        break;
      case 'featured':
        sortOptions.featured = -1;
        sortOptions.displayOrder = 1;
        break;
      default:
        sortOptions.displayOrder = 1;
        sortOptions.startDate = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: projects,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + projects.length < total,
        hasPrev: parseInt(page) > 1
      }
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/projects/featured - Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.find({
      isActive: true,
      featured: true
    })
      .sort({ displayOrder: 1, startDate: -1 })
      .limit(6)
      .select('-__v');

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });

  } catch (error) {
    console.error('Get featured projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve featured projects',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/projects/categories - Get project categories with counts
router.get('/categories', async (req, res) => {
  try {
    const categories = await Project.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          featuredCount: {
            $sum: { $cond: [{ $eq: ['$featured', true] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          category: '$_id',
          count: 1,
          featuredCount: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]);

    const totalProjects = await Project.countDocuments({ isActive: true });

    res.json({
      success: true,
      data: {
        categories,
        total: totalProjects
      }
    });

  } catch (error) {
    console.error('Get project categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      isActive: true
    }).select('-__v');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Validation rules for project
const projectValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  
  body('category')
    .isIn(['iot', 'web', 'mobile', 'ml', 'other'])
    .withMessage('Category must be one of: iot, web, mobile, ml, other'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage('Description must be between 10 and 300 characters'),
  
  body('longDescription')
    .trim()
    .isLength({ min: 50, max: 1000 })
    .withMessage('Long description must be between 50 and 1000 characters'),
  
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  
  body('technologies.*')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each technology must be between 1 and 30 characters'),
  
  body('features')
    .isArray({ min: 1 })
    .withMessage('At least one feature is required'),
  
  body('features.*')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Each feature must be between 5 and 100 characters'),
  
  body('github')
    .isURL()
    .matches(/github\.com/)
    .withMessage('Please provide a valid GitHub URL'),
  
  body('demo')
    .optional()
    .isURL()
    .withMessage('Please provide a valid demo URL'),
  
  body('startDate')
    .isISO8601()
    .withMessage('Please provide a valid start date'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid end date')
];

// POST /api/projects - Create new project (admin only)
router.post('/', projectValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Validate end date is after start date
    if (req.body.endDate && new Date(req.body.endDate) < new Date(req.body.startDate)) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', projectValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Validate end date is after start date
    if (req.body.endDate && new Date(req.body.endDate) < new Date(req.body.startDate)) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/projects/stats/summary - Get project statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Project.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalProjects: { $sum: 1 },
          featuredProjects: {
            $sum: { $cond: [{ $eq: ['$featured', true] }, 1, 0] }
          },
          completedProjects: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          inProgressProjects: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          allTechnologies: { $push: '$technologies' },
          categoryBreakdown: {
            $push: {
              category: '$category',
              count: 1
            }
          }
        }
      },
      {
        $project: {
          totalProjects: 1,
          featuredProjects: 1,
          completedProjects: 1,
          inProgressProjects: 1,
          uniqueTechnologiesCount: {
            $size: {
              $setUnion: {
                $reduce: {
                  input: '$allTechnologies',
                  initialValue: [],
                  in: { $setUnion: ['$$value', '$$this'] }
                }
              }
            }
          }
        }
      }
    ]);

    const categoryStats = await Project.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = stats[0] || {
      totalProjects: 0,
      featuredProjects: 0,
      completedProjects: 0,
      inProgressProjects: 0,
      uniqueTechnologiesCount: 0
    };

    result.categoryBreakdown = categoryStats.reduce((acc, cat) => {
      acc[cat._id] = cat.count;
      return acc;
    }, {});

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get project stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
