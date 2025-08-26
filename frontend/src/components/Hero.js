import React from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiMail, HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Hero = () => {
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

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  const handleDownloadResume = () => {
    // Create a link to download resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // Place your resume in public folder
    link.download = 'Your_Name_Resume.pdf';
    link.click();
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-bg"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-200"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-400"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
              <img
                src="/profile-image.jpg" // Add your profile image to public folder
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="hidden w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 items-center justify-center text-white text-4xl font-bold"
              >
                NS
              </div>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="heading-primary mb-6"
          >
            <span className="gradient-text">Naveen Selvakumar</span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
          >
            MCA Student | MERN Full Stack Developer | Java & SQL Specialist
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-primary max-w-2xl mx-auto mb-8"
          >
            With a strong foundation in web development, Java, and SQL, I enjoy building scalable applications that combine clean design with efficient backend systems. My goal is to continuously improve my problem-solving skills while contributing to real-world projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="btn-primary flex items-center space-x-2"
            >
              <HiDownload />
              <span>Download Resume</span>
            </motion.button>

            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center space-x-2 cursor-pointer"
              >
                <HiMail />
                <span>Contact Me</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-12"
          >
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <IconComponent size={24} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <Link
              to="about"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="cursor-pointer text-gray-600 hover:text-primary-600 transition-colors"
              >
                <HiArrowDown size={24} />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
