import React from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiCalendar, HiLocationMarker, HiStar, HiCode, HiLightningBolt } from 'react-icons/hi';

const Education = () => {
  const educationData = [
    {
      id: 1,
      degree: 'Master of Computer Applications (MCA)',
      specialization: 'CoPLO - Cloud-oriented Programming for Learning Organizations',
      institution: 'Your University Name',
      location: 'City, State',
      duration: '2022 - 2024',
      grade: 'CGPA: 8.5/10',
      description: 'Specialized in Cloud-oriented Programming with focus on IoT integration, distributed systems, and modern web technologies. Completed advanced coursework in machine learning, cloud computing, and software architecture.',
      highlights: [
        'IoT Systems Design and Implementation',
        'Cloud Computing and Distributed Systems',
        'Advanced Web Development (MERN Stack)',
        'Machine Learning and Data Analytics',
        'Software Engineering and Architecture',
        'Mobile Application Development'
      ],
      projects: [
        'Smart Campus Management System using IoT',
        'Cloud-based Learning Management Platform',
        'Real-time Data Analytics Dashboard'
      ],
      icon: HiAcademicCap,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      degree: 'Bachelor of Computer Applications (BCA)',
      specialization: 'Computer Science and Applications',
      institution: 'Your College Name',
      location: 'City, State',
      duration: '2019 - 2022',
      grade: 'Percentage: 82%',
      description: 'Comprehensive undergraduate program covering fundamental computer science concepts, programming languages, and software development. Strong foundation in mathematics, algorithms, and database management.',
      highlights: [
        'Programming Fundamentals (C, C++, Java)',
        'Database Management Systems',
        'Web Development (HTML, CSS, JavaScript)',
        'Software Engineering Principles',
        'Computer Networks and Security',
        'Operating Systems and System Programming'
      ],
      projects: [
        'Library Management System (Java)',
        'E-commerce Website (PHP/MySQL)',
        'Student Information System'
      ],
      icon: HiCode,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      degree: 'Higher Secondary Certificate (12th)',
      specialization: 'Science Stream (PCM with Computer Science)',
      institution: 'Your School Name',
      location: 'City, State',
      duration: '2017 - 2019',
      grade: 'Percentage: 88%',
      description: 'Strong foundation in Physics, Chemistry, Mathematics, and Computer Science. Developed logical thinking and problem-solving skills that form the basis of programming and technical expertise.',
      highlights: [
        'Mathematics and Applied Mathematics',
        'Physics and Electronics',
        'Computer Science Fundamentals',
        'Programming Basics (C++)',
        'Digital Electronics',
        'Communication Skills'
      ],
      projects: [
        'Basic Calculator using C++',
        'Simple Database Project',
        'Physics Laboratory Experiments'
      ],
      icon: HiLightningBolt,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      },
    },
  };

  return (
    <section id="education" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-secondary mb-4">Education Journey</h2>
            <p className="text-primary max-w-2xl mx-auto">
              My academic journey that provided the foundation for my expertise in 
              IoT development, cloud computing, and modern web technologies.
            </p>
          </motion.div>

          {/* Education Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 origin-top hidden md:block"
            />

            <div className="space-y-12">
              {educationData.map((edu, index) => {
                const IconComponent = edu.icon;
                
                return (
                  <motion.div
                    key={edu.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-8 top-6 w-4 h-4 bg-white border-4 border-primary-500 rounded-full transform -translate-x-1/2 hidden md:block z-10" />

                    {/* Education Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="card ml-0 md:ml-20 overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center shadow-lg`}>
                              <IconComponent className="text-white" size={28} />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                                {edu.degree}
                              </h3>
                              <p className="text-primary-600 font-medium text-lg">
                                {edu.specialization}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-green-600">
                            <HiStar size={20} />
                            <span className="font-semibold">{edu.grade}</span>
                          </div>
                        </div>

                        {/* Institution Details */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <HiAcademicCap className="mr-2" size={18} />
                            <span>{edu.institution}</span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <HiLocationMarker className="mr-2" size={18} />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <HiCalendar className="mr-2" size={18} />
                            <span>{edu.duration}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                          {edu.description}
                        </p>

                        {/* Key Highlights */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Key Coursework & Skills:
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {edu.highlights.map((highlight, highlightIndex) => (
                              <motion.div
                                key={highlightIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: highlightIndex * 0.1 }}
                                className="flex items-center text-gray-600 dark:text-gray-400"
                              >
                                <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                                <span className="text-sm">{highlight}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Notable Projects:
                          </h4>
                          <div className="space-y-2">
                            {edu.projects.map((project, projectIndex) => (
                              <motion.div
                                key={projectIndex}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: projectIndex * 0.1 }}
                                className="flex items-center text-gray-600 dark:text-gray-400"
                              >
                                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-3" />
                                <span className="text-sm">{project}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div className={`h-1 bg-gradient-to-r ${edu.color}`} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education Summary */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
              <div className="text-3xl font-bold text-primary-600 mb-2">6+</div>
              <div className="text-gray-600 dark:text-gray-400">Years of Study</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-secondary-50 to-accent-50 dark:from-secondary-900/20 dark:to-accent-900/20 rounded-xl">
              <div className="text-3xl font-bold text-secondary-600 mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Major Projects</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl">
              <div className="text-3xl font-bold text-accent-600 mb-2">20+</div>
              <div className="text-gray-600 dark:text-gray-400">Technical Skills</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
