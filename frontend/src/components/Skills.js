import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiJavascript, SiReact, SiNodedotjs, SiMongodb, SiExpress, SiHtml5, SiCss3, 
  SiPython, SiC, SiArduino, SiFirebase, SiAmazonaws, SiGit, SiGithub,
  SiTailwindcss, SiBootstrap, SiPostman, SiVisualstudiocode
} from 'react-icons/si';
import { FaServer, FaWifi, FaMicrochip } from 'react-icons/fa';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('programming');

  const skillCategories = {
    programming: {
      title: 'Programming Languages',
      icon: SiJavascript,
      skills: [
        { name: 'JavaScript', icon: SiJavascript, level: 90, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Python', icon: SiPython, level: 85, color: 'from-blue-400 to-blue-600' },
        { name: 'C/C++', icon: SiC, level: 80, color: 'from-blue-500 to-blue-700' },
        { name: 'Embedded C', icon: FaMicrochip, level: 75, color: 'from-green-400 to-green-600' },
        { name: 'HTML5', icon: SiHtml5, level: 95, color: 'from-orange-400 to-orange-600' },
        { name: 'CSS3', icon: SiCss3, level: 90, color: 'from-blue-400 to-blue-600' },
      ]
    },
    webdev: {
      title: 'Web Development',
      icon: SiReact,
      skills: [
        { name: 'React', icon: SiReact, level: 90, color: 'from-cyan-400 to-cyan-600' },
        { name: 'Node.js', icon: SiNodedotjs, level: 85, color: 'from-green-400 to-green-600' },
        { name: 'Express.js', icon: SiExpress, level: 85, color: 'from-gray-400 to-gray-600' },
        { name: 'MongoDB', icon: SiMongodb, level: 80, color: 'from-green-500 to-green-700' },
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90, color: 'from-cyan-400 to-cyan-600' },
        { name: 'Bootstrap', icon: SiBootstrap, level: 85, color: 'from-purple-400 to-purple-600' },
      ]
    },
    iot: {
      title: 'IoT & Cloud Tools',
      icon: SiArduino,
      skills: [
        { name: 'Arduino', icon: SiArduino, level: 90, color: 'from-teal-400 to-teal-600' },
        { name: 'NodeMCU', icon: FaWifi, level: 85, color: 'from-blue-400 to-blue-600' },
        { name: 'Firebase', icon: SiFirebase, level: 80, color: 'from-yellow-400 to-orange-500' },
        { name: 'AWS IoT', icon: SiAmazonaws, level: 70, color: 'from-orange-400 to-orange-600' },
        { name: 'ThingSpeak', icon: FaServer, level: 75, color: 'from-purple-400 to-purple-600' },
        { name: 'Blynk', icon: FaMicrochip, level: 80, color: 'from-green-400 to-green-600' },
      ]
    },
    tools: {
      title: 'Tools & Others',
      icon: SiGit,
      skills: [
        { name: 'Git', icon: SiGit, level: 85, color: 'from-orange-400 to-red-500' },
        { name: 'GitHub', icon: SiGithub, level: 90, color: 'from-gray-700 to-gray-900' },
        { name: 'VS Code', icon: SiVisualstudiocode, level: 95, color: 'from-blue-400 to-blue-600' },
        { name: 'Postman', icon: SiPostman, level: 80, color: 'from-orange-400 to-orange-600' },
      ]
    }
  };

  const tabs = Object.keys(skillCategories);

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

  const skillVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (level) => ({
      width: `${level}%`,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut"
      },
    }),
  };

  return (
    <section id="skills" className="section-padding gradient-bg">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Skills & Technologies</h2>
            <p className="text-primary max-w-2xl mx-auto">
              A comprehensive overview of my technical skills spanning across 
              programming languages, web development, IoT tools, and cloud platforms.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => {
                const category = skillCategories[tab];
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={tab}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="hidden sm:inline">{category.title}</span>
                    <span className="sm:hidden">{tab}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Skills Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {skillCategories[activeTab].skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center`}>
                          <IconComponent className="text-white" size={20} />
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        variants={skillVariants}
                        initial="hidden"
                        animate="visible"
                        custom={skill.level}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <span className="text-gray-700 font-medium">
                🚀 Continuously learning and exploring new technologies
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
