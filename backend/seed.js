const mongoose = require('mongoose');
const Certification = require('./models/Certification');
const Project = require('./models/Project');
require('dotenv').config();

// Sample certifications data
const certificationsData = [
  {
    title: 'Cisco NetAcad – Introduction to IoT',
    issuer: 'Cisco Networking Academy',
    date: new Date('2024-03-15'),
    credentialId: 'CISCO-IOT-2024-001',
    description: 'Comprehensive course covering IoT fundamentals, networking protocols, and security considerations for connected devices.',
    skills: ['IoT Fundamentals', 'Network Protocols', 'Device Security', 'Data Analytics'],
    certificateUrl: 'https://cisco.com/verify/certificate-id',
    icon: 'cisco',
    verified: true,
    displayOrder: 1
  },
  {
    title: 'IoT Applications and Implementation',
    issuer: 'Coursera',
    date: new Date('2024-02-20'),
    credentialId: 'COURSERA-IOT-APP-2024',
    description: 'Advanced course focusing on real-world IoT applications, implementation strategies, and industry best practices.',
    skills: ['IoT Architecture', 'Cloud Integration', 'Data Processing', 'Project Management'],
    certificateUrl: 'https://coursera.org/verify/certificate-id',
    icon: 'coursera',
    verified: true,
    displayOrder: 2
  },
  {
    title: 'AWS Educate – IoT Pathway',
    issuer: 'Amazon Web Services',
    date: new Date('2024-01-10'),
    credentialId: 'AWS-EDU-IOT-2024-001',
    description: 'Specialized pathway covering AWS IoT services, device management, and serverless architectures for IoT solutions.',
    skills: ['AWS IoT Core', 'Lambda Functions', 'DynamoDB', 'IoT Device Management'],
    certificateUrl: 'https://aws.amazon.com/verify/certificate-id',
    icon: 'aws',
    verified: true,
    displayOrder: 3
  },
  {
    title: 'Google Cloud IoT Fundamentals',
    issuer: 'Google Cloud',
    date: new Date('2023-12-05'),
    credentialId: 'GCP-IOT-FUND-2023',
    description: 'Foundation course on Google Cloud IoT platform, device connectivity, and data pipeline creation.',
    skills: ['Google Cloud IoT', 'Pub/Sub', 'BigQuery', 'Cloud Functions'],
    certificateUrl: 'https://cloud.google.com/verify/certificate-id',
    icon: 'google',
    verified: true,
    displayOrder: 4
  },
  {
    title: 'Microsoft Azure IoT Developer',
    issuer: 'Microsoft',
    date: new Date('2023-11-18'),
    credentialId: 'AZ-220-2023-001',
    description: 'Professional certification for developing IoT solutions using Microsoft Azure platform and services.',
    skills: ['Azure IoT Hub', 'IoT Edge', 'Stream Analytics', 'Time Series Insights'],
    certificateUrl: 'https://microsoft.com/verify/certificate-id',
    icon: 'microsoft',
    verified: true,
    displayOrder: 5
  }
];

// Sample projects data
const projectsData = [
  {
    title: 'IoT Home Automation System',
    category: 'iot',
    description: 'Smart home automation using NodeMCU and Firebase for real-time control of lights, fans, and security systems.',
    longDescription: 'A comprehensive home automation system that allows users to control various home appliances remotely through a web interface and mobile app. Features include real-time sensor monitoring, automated scheduling, voice control integration, and energy consumption tracking.',
    technologies: ['NodeMCU', 'Firebase', 'React', 'Arduino IDE', 'Blynk'],
    features: [
      'Remote control of appliances',
      'Real-time sensor monitoring',
      'Energy consumption tracking',
      'Voice control integration',
      'Automated scheduling'
    ],
    image: '/projects/home-automation.jpg',
    github: 'https://github.com/yourusername/iot-home-automation',
    demo: 'https://your-demo-link.com',
    status: 'completed',
    featured: true,
    displayOrder: 1,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-20'),
    tags: ['IoT', 'Home Automation', 'Firebase', 'Real-time']
  },
  {
    title: 'Real-Time Sensor Dashboard',
    category: 'web',
    description: 'MERN stack application for monitoring multiple IoT sensors with real-time data visualization and alerts.',
    longDescription: 'A full-stack web application built with the MERN stack that provides a comprehensive dashboard for monitoring various IoT sensors. The system includes real-time data visualization, alert mechanisms, historical data analysis, and user management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'Chart.js'],
    features: [
      'Real-time data visualization',
      'Alert system for threshold breaches',
      'Historical data analysis',
      'Multi-user support',
      'Export data functionality'
    ],
    image: '/projects/sensor-dashboard.jpg',
    github: 'https://github.com/yourusername/sensor-dashboard',
    demo: 'https://your-demo-link.com',
    status: 'completed',
    featured: true,
    displayOrder: 2,
    startDate: new Date('2023-11-01'),
    endDate: new Date('2024-01-10'),
    tags: ['MERN', 'Dashboard', 'Real-time', 'Sensors']
  },
  {
    title: 'Smart Health Monitoring',
    category: 'iot',
    description: 'IoT-based health monitoring system using Arduino sensors to track vital signs and send alerts.',
    longDescription: 'An innovative health monitoring system that uses various sensors to track vital signs like heart rate, body temperature, and blood oxygen levels. The system sends real-time data to a cloud platform and triggers alerts for emergency situations.',
    technologies: ['Arduino', 'ESP32', 'ThingSpeak', 'React Native', 'Firebase'],
    features: [
      'Multi-parameter monitoring',
      'Emergency alert system',
      'Mobile app integration',
      'Cloud data storage',
      'Historical health trends'
    ],
    image: '/projects/health-monitor.jpg',
    github: 'https://github.com/yourusername/health-monitor',
    demo: 'https://your-demo-link.com',
    status: 'completed',
    featured: true,
    displayOrder: 3,
    startDate: new Date('2023-08-15'),
    endDate: new Date('2023-10-30'),
    tags: ['IoT', 'Health', 'Arduino', 'Mobile']
  },
  {
    title: 'Weather Station Network',
    category: 'iot',
    description: 'Distributed weather monitoring network with multiple sensor nodes and centralized data collection.',
    longDescription: 'A sophisticated weather monitoring network consisting of multiple sensor nodes deployed across different locations. Each node collects environmental data and transmits it to a central server for analysis and visualization.',
    technologies: ['ESP8266', 'LoRa', 'Python', 'Django', 'PostgreSQL', 'D3.js'],
    features: [
      'Multi-location monitoring',
      'Long-range communication',
      'Weather prediction algorithms',
      'Interactive data visualization',
      'API for third-party integration'
    ],
    image: '/projects/weather-station.jpg',
    github: 'https://github.com/yourusername/weather-network',
    demo: 'https://your-demo-link.com',
    status: 'completed',
    featured: false,
    displayOrder: 4,
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-08-10'),
    tags: ['IoT', 'Weather', 'Network', 'Python']
  },
  {
    title: 'E-Learning Platform',
    category: 'web',
    description: 'Modern e-learning platform with course management, video streaming, and progress tracking.',
    longDescription: 'A comprehensive e-learning platform designed for modern online education. Features include course creation tools, video streaming capabilities, interactive quizzes, progress tracking, and certification management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3', 'Socket.io', 'JWT'],
    features: [
      'Course management system',
      'Video streaming and playback',
      'Interactive assessments',
      'Progress tracking',
      'Certificate generation'
    ],
    image: '/projects/elearning.jpg',
    github: 'https://github.com/yourusername/elearning-platform',
    demo: 'https://your-demo-link.com',
    status: 'completed',
    featured: false,
    displayOrder: 5,
    startDate: new Date('2023-03-15'),
    endDate: new Date('2023-05-30'),
    tags: ['MERN', 'Education', 'Video', 'Learning']
  },
  {
    title: 'Smart Agriculture System',
    category: 'iot',
    description: 'IoT solution for precision agriculture with soil monitoring, automated irrigation, and crop analytics.',
    longDescription: 'An intelligent agriculture system that leverages IoT sensors to monitor soil conditions, weather parameters, and crop health. The system provides automated irrigation control and data-driven insights for optimal crop management.',
    technologies: ['Arduino', 'LoRaWAN', 'React', 'Flask', 'MySQL', 'TensorFlow'],
    features: [
      'Soil parameter monitoring',
      'Automated irrigation control',
      'Crop health analytics',
      'Weather integration',
      'ML-based recommendations'
    ],
    image: '/projects/smart-agriculture.jpg',
    github: 'https://github.com/yourusername/smart-agriculture',
    demo: 'https://your-demo-link.com',
    status: 'in-progress',
    featured: true,
    displayOrder: 6,
    startDate: new Date('2024-02-01'),
    endDate: null,
    tags: ['IoT', 'Agriculture', 'ML', 'Automation']
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Certification.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    // Insert certifications
    const certifications = await Certification.insertMany(certificationsData);
    console.log(`Inserted ${certifications.length} certifications`);

    // Insert projects
    const projects = await Project.insertMany(projectsData);
    console.log(`Inserted ${projects.length} projects`);

    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
if (require.main === module) {
  seedDatabase();
}

module.exports = { certificationsData, projectsData, seedDatabase };
