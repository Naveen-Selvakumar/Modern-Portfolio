const express = require('express');
const { body, validationResult } = require('express-validator');
const Certification = require('../models/Certification');

const router = express.Router();

// GET /api/certifications - Get all certifications
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.find({ isActive: true })
      .sort({ displayOrder: 1, date: -1 })
      .select('-__v');

    res.json({
      success: true,
      data: certifications,
      count: certifications.length
    });

  } catch (error) {
    console.error('Get certifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve certifications',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/certifications/:id - Get single certification
router.get('/:id', async (req, res) => {
  try {
    const certification = await Certification.findOne({
      _id: req.params.id,
      isActive: true
    }).select('-__v');

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.json({
      success: true,
      data: certification
    });

  } catch (error) {
    console.error('Get certification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve certification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Validation rules for certification
const certificationValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('issuer')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Issuer must be between 2 and 100 characters'),
  
  body('date')
    .isISO8601()
    .withMessage('Please provide a valid date'),
  
  body('credentialId')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Credential ID must be between 5 and 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  body('certificateUrl')
    .isURL()
    .withMessage('Please provide a valid certificate URL'),
  
  body('skills')
    .isArray({ min: 1 })
    .withMessage('At least one skill is required'),
  
  body('skills.*')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Each skill must be between 2 and 50 characters')
];

// POST /api/certifications - Create new certification (admin only)
router.post('/', certificationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const certification = new Certification(req.body);
    await certification.save();

    res.status(201).json({
      success: true,
      message: 'Certification created successfully',
      data: certification
    });

  } catch (error) {
    console.error('Create certification error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Credential ID already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create certification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/certifications/:id - Update certification (admin only)
router.put('/:id', certificationValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.json({
      success: true,
      message: 'Certification updated successfully',
      data: certification
    });

  } catch (error) {
    console.error('Update certification error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Credential ID already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update certification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE /api/certifications/:id - Delete certification (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!certification) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    res.json({
      success: true,
      message: 'Certification deleted successfully'
    });

  } catch (error) {
    console.error('Delete certification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete certification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/certifications/stats/summary - Get certification statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await Certification.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalCertifications: { $sum: 1 },
          verifiedCertifications: {
            $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] }
          },
          uniqueIssuers: { $addToSet: '$issuer' },
          allSkills: { $push: '$skills' }
        }
      },
      {
        $project: {
          totalCertifications: 1,
          verifiedCertifications: 1,
          uniqueIssuersCount: { $size: '$uniqueIssuers' },
          uniqueSkillsCount: {
            $size: {
              $setUnion: {
                $reduce: {
                  input: '$allSkills',
                  initialValue: [],
                  in: { $setUnion: ['$$value', '$$this'] }
                }
              }
            }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalCertifications: 0,
      verifiedCertifications: 0,
      uniqueIssuersCount: 0,
      uniqueSkillsCount: 0
    };

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Get certification stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve certification statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
