const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  issuer: {
    type: String,
    required: [true, 'Issuer is required'],
    trim: true,
    maxlength: [100, 'Issuer cannot exceed 100 characters']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  credentialId: {
    type: String,
    required: [true, 'Credential ID is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  skills: [{
    type: String,
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  }],
  certificateUrl: {
    type: String,
    required: [true, 'Certificate URL is required'],
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid URL']
  },
  icon: {
    type: String,
    enum: ['cisco', 'aws', 'google', 'microsoft', 'coursera', 'udemy', 'other'],
    default: 'other'
  },
  verified: {
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
  }
}, {
  timestamps: true
});

// Add indexes
certificationSchema.index({ date: -1 });
certificationSchema.index({ issuer: 1 });
certificationSchema.index({ displayOrder: 1 });
certificationSchema.index({ isActive: 1 });

module.exports = mongoose.model('Certification', certificationSchema);
