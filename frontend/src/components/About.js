import React from 'react';
import { motion } from 'framer-motion';
import { HiCode, HiChip, HiCloud, HiLightningBolt } from 'react-icons/hi';

const About = () => {
  const highlights = [
    {
      icon: HiCode,
      title: 'Full-Stack Development',
      description: 'MERN stack expertise with modern JavaScript frameworks',
    },
    {
      icon: HiChip,
      title: 'IoT Solutions',
      description: 'Arduino, NodeMCU, and sensor integration projects',
    },
    {
      icon: HiCloud,
      title: 'Cloud Integration',
      description: 'Firebase, AWS, and real-time data management',
    },
    {
      icon: HiLightningBolt,
      title: 'Innovation Focus',
      description: 'Combining IoT with modern web technologies',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-secondary mb-4">About Me</h2>
            <p className="text-primary max-w-2xl mx-auto">
              Passionate about bridging the gap between physical and digital worlds
              through innovative IoT solutions and modern web technologies.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="heading-tertiary mb-4">
                  PG IoT Specialist & MERN Developer
                </h3>
                <p className="text-primary mb-4">
                  I'm a recent postgraduate with a Master's degree in Computer Applications (MCA) 
                  specializing in CoPLO (Cloud-oriented Programming for Learning Organizations). 
                  My passion lies in creating innovative IoT solutions that seamlessly integrate 
                  with cloud platforms and modern web applications.
                </p>
                <p className="text-primary mb-4">
                  My expertise spans across embedded systems, microcontroller programming, 
                  and full-stack web development. I love working with Arduino, NodeMCU, 
                  and various sensors to create smart solutions that solve real-world problems.
                </p>
                <p className="text-primary">
                  When I'm not coding, you'll find me exploring the latest IoT trends, 
                  experimenting with new sensors, or contributing to open-source projects 
                  that make technology more accessible to everyone.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">IoT Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">8+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Web Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">5+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">2+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Learning</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Highlights Grid */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid gap-6">
                {highlights.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="card p-6 flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                          <IconComponent className="text-white" size={24} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quote */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 p-6 rounded-xl border-l-4 border-primary-500"
              >
                <blockquote className="text-gray-700 dark:text-gray-300 italic">
                  "The future belongs to those who can seamlessly blend the physical 
                  and digital worlds through innovative IoT solutions."
                </blockquote>
                <cite className="text-primary-600 text-sm font-medium mt-2 block">
                  - My Development Philosophy
                </cite>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
