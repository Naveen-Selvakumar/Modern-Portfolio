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
      title: 'Java Development',
      description: 'Strong foundation in Java programming and SQL databases',
    },
    {
      icon: HiCloud,
      title: 'E-commerce Solutions',
      description: 'Building scalable applications with payment integration',
    },
    {
      icon: HiLightningBolt,
      title: 'Problem Solving',
      description: 'Continuous improvement and real-world project focus',
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
              With a strong foundation in web development, Java, and SQL, I enjoy building scalable applications that combine clean design with efficient backend systems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="heading-tertiary mb-4">
                  MCA Student & MERN Full Stack Developer
                </h3>
                <p className="text-primary mb-4">
                  I'm currently pursuing my Master's in Computer Applications (MCA) at Kongu Engineering College 
                  with a current CGPA of 8.18. My passion lies in creating innovative web applications 
                  that seamlessly integrate frontend and backend technologies.
                </p>
                <p className="text-primary mb-4">
                  My expertise spans across Java programming, SQL database management, 
                  and full-stack web development using the MERN stack. I love working on 
                  e-commerce platforms, building features like payment integration and user management.
                </p>
                <p className="text-primary">
                  My goal is to continuously improve my problem-solving skills while contributing 
                  to real-world projects that make a meaningful impact. I'm always eager to learn 
                  new technologies and take on challenging development tasks.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">2+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">MERN Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">8.18</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Current CGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">3+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">2026</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">MCA Graduation</div>
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
