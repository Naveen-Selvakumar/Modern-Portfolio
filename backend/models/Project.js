const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['iot', 'web', 'mobile', 'ml', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  longDescription: {
    type: String,
    required: [true, 'Long description is required'],
    trim: true,
    maxlength: [1000, 'Long description cannot exceed 1000 characters']
  },
  technologies: [{
    type: String,
    required: true,
    trim: true,
    maxlength: [30, 'Technology name cannot exceed 30 characters']
  }],
  features: [{
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Feature description cannot exceed 100 characters']
  }],
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  github: {
    type: String,
    required: [true, 'GitHub URL is required'],
    trim: true,
    match: [/^https?:\/\/(www\.)?github\.com\/.+/, 'Please enter a valid GitHub URL']
  },
  demo: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid demo URL']
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  featured: {
    type: Boolean,
    default: false
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [20, 'Tag cannot exceed 20 characters']
  }]
}, {
  timestamps: true
});

// Add indexes
projectSchema.index({ category: 1 });
projectSchema.index({ featured: -1 });
projectSchema.index({ displayOrder: 1 });
projectSchema.index({ isActive: 1 });
projectSchema.index({ startDate: -1 });
projectSchema.index({ tags: 1 });

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (!this.endDate) return null;
  const diffTime = Math.abs(this.endDate - this.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

module.exports = mongoose.model('Project', projectSchema);
