import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiExternalLink, HiCode, HiPlay, HiChip, HiGlobe } from 'react-icons/hi';
import { FaGithub, FaArrowRight } from 'react-icons/fa';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Toy Store - MERN Full Stack Application',
      category: 'web',
      description: 'Developed an e-commerce toy store with user authentication, product management, and Stripe payment integration.',
      longDescription: 'A comprehensive e-commerce platform built with the MERN stack that provides a complete online shopping experience for toys. Features include user authentication, product catalog management, shopping cart, payment processing with Stripe, and an admin dashboard for inventory management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API', 'JWT'],
      image: '/projects/toy-store.jpg',
      github: 'https://github.com/Naveen-Selvakumar/toy-store',
      demo: 'https://toy-store-demo.com',
      features: [
        'User authentication and authorization',
        'Product filtering and sorting',
        'Category-based browsing',
        'Stripe payment integration',
        'Shopping cart functionality',
        'Admin dashboard for product management'
      ]
    },
    {
      id: 2,
      title: 'Podcast Website - MERN Application',
      category: 'web',
      description: 'Built a podcast platform with user authentication, media uploads, and streaming support.',
      longDescription: 'A full-featured podcast platform that allows content creators to upload, manage, and distribute their podcasts while providing listeners with a seamless streaming experience. The platform includes user profiles, episode management, and interactive features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Multer', 'CloudStorage'],
      image: '/projects/podcast-website.jpg',
      github: 'https://github.com/Naveen-Selvakumar/podcast-website',
      demo: 'https://podcast-platform-demo.com',
      features: [
        'User authentication system',
        'Podcast upload and management',
        'Audio streaming capabilities',
        'Episode categorization',
        'User profiles and preferences',
        'Responsive design for all devices'
      ]
    },
    {
      id: 3,
      title: 'Database Management Projects',
      category: 'database',
      description: 'Various SQL-based projects demonstrating database design, optimization, and management skills.',
      longDescription: 'A collection of database projects showcasing advanced SQL skills, database design principles, and optimization techniques. These projects demonstrate proficiency in creating efficient database schemas, writing complex queries, and implementing data management solutions.',
      technologies: ['MySQL', 'SQL Server', 'Database Design', 'Query Optimization', 'Stored Procedures'],
      image: '/projects/database-projects.jpg',
      github: 'https://github.com/Naveen-Selvakumar/database-projects',
      demo: 'https://database-demo.com',
      features: [
        'Complex SQL query writing',
        'Database schema design',
        'Data normalization and optimization',
        'Stored procedures and functions',
        'Data analysis and reporting',
        'Performance optimization'
      ]
    },
    {
      id: 4,
      title: 'Java Programming Applications',
      category: 'java',
      description: 'Collection of Java applications demonstrating object-oriented programming and software development skills.',
      longDescription: 'A comprehensive portfolio of Java applications that showcase proficiency in object-oriented programming, data structures, algorithms, and software design patterns. These projects demonstrate strong foundation in Java development.',
      technologies: ['Java', 'Java Swing', 'JDBC', 'Object-Oriented Programming', 'Design Patterns'],
      image: '/projects/java-applications.jpg',
      github: 'https://github.com/Naveen-Selvakumar/java-projects',
      demo: 'https://java-projects-demo.com',
      features: [
        'Object-oriented design implementation',
        'GUI applications with Java Swing',
        'Database connectivity with JDBC',
        'Implementation of design patterns',
        'Data structure algorithms',
        'Exception handling and validation'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: HiGlobe },
    { id: 'web', name: 'Web Apps', icon: HiCode },
    { id: 'database', name: 'Database', icon: HiPlay },
    { id: 'java', name: 'Java Apps', icon: HiChip },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Featured Projects</h2>
            <p className="text-primary max-w-2xl mx-auto">
              A showcase of my IoT and web development projects that demonstrate 
              practical applications of modern technologies and innovative solutions.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div variants={itemVariants} className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      filter === category.id
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span>{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 items-center justify-center text-white text-2xl font-bold">
                      {project.title.split(' ').map(word => word[0]).join('')}
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <HiPlay className="text-white text-3xl" />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.category === 'iot' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.category === 'iot' ? 'IoT Project' : 'Web App'}
                      </span>
                    </div>

                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-3">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub size={20} />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <HiExternalLink size={20} />
                        </motion.a>
                      </div>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center text-primary-600 text-sm font-medium"
                      >
                        View Details
                        <FaArrowRight className="ml-1" size={12} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal content will be implemented here */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedProject.longDescription}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="text-gray-600 dark:text-gray-400">{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex space-x-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline flex items-center space-x-2"
                    >
                      <FaGithub />
                      <span>View Code</span>
                    </a>
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center space-x-2"
                    >
                      <HiExternalLink />
                      <span>Live Demo</span>
                    </a>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
