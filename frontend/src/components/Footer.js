import React from 'react';
import { motion } from 'framer-motion';
import { Link, animateScroll as scroll } from 'react-scroll';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa';
import { HiMail, HiPhone } from 'react-icons/hi';
import { 
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss, 
  SiFramer, SiJava, SiMysql 
} from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  const socialLinks = [
    { 
      icon: FaGithub, 
      href: 'https://github.com/Naveen-Selvakumar', 
      label: 'GitHub',
      color: 'hover:text-gray-900'
    },
    { 
      icon: FaLinkedin, 
      href: 'https://linkedin.com/in/naveen-selvakumar', 
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    { 
      icon: FaTwitter, 
      href: 'https://twitter.com/naveen_selvakumar', 
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
  ];

  const techStack = [
    { icon: SiReact, name: 'React', color: 'text-cyan-500' },
    { icon: SiNodedotjs, name: 'Node.js', color: 'text-green-500' },
    { icon: SiExpress, name: 'Express', color: 'text-gray-600' },
    { icon: SiMongodb, name: 'MongoDB', color: 'text-green-600' },
    { icon: SiTailwindcss, name: 'Tailwind', color: 'text-cyan-400' },
    { icon: SiFramer, name: 'Framer Motion', color: 'text-pink-500' },
    { icon: SiJava, name: 'Java', color: 'text-red-500' },
    { icon: SiMysql, name: 'MySQL', color: 'text-blue-500' },
  ];

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">NS</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Naveen Selvakumar</h3>
                  <p className="text-gray-400 text-sm">MERN Developer & Java Specialist</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                With a strong foundation in web development, Java, and SQL, I enjoy building scalable applications that combine clean design with efficient backend systems.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <HiMail className="text-primary-400" size={18} />
                  <a href="mailto:nveen3484@gmail.com" className="hover:text-primary-400 transition-colors">
                    nveen3484@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <HiPhone className="text-primary-400" size={18} />
                  <a href="tel:+917603819036" className="hover:text-primary-400 transition-colors">
                    +91 76038 19036
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      spy={true}
                      smooth={true}
                      offset={-80}
                      duration={500}
                      className="text-gray-300 hover:text-primary-400 transition-colors cursor-pointer inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Built With</h4>
              <div className="grid grid-cols-4 gap-3">
                {techStack.map((tech, index) => {
                  const IconComponent = tech.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.2, y: -2 }}
                      className="flex flex-col items-center group"
                      title={tech.name}
                    >
                      <IconComponent 
                        className={`${tech.color} group-hover:scale-110 transition-transform`} 
                        size={24} 
                      />
                      <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-6">
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Performance</h5>
                <div className="space-y-2 text-xs text-gray-400">
                  <div>⚡ Lightning Fast</div>
                  <div>📱 Fully Responsive</div>
                  <div>🔍 SEO Optimized</div>
                  <div>♿ Accessible</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Social Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800"
        >
          <div className="container-custom py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Social Links */}
              <div className="flex items-center space-x-6">
                <span className="text-gray-300 text-sm">Follow me:</span>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-gray-400 ${social.color} transition-colors`}
                        aria-label={social.label}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Back to Top */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTop}
                className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <span className="text-sm">Back to top</span>
                <FaArrowUp size={14} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 bg-gray-900/50">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <span>&copy; {currentYear} Your Name. Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  <FaHeart className="text-red-500" size={14} />
                </motion.div>
                <span>and lots of ☕</span>
              </div>
              
              <div className="flex items-center space-x-4 text-xs">
                <span>All rights reserved</span>
                <span>•</span>
                <a 
                  href="/privacy" 
                  className="hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </a>
                <span>•</span>
                <a 
                  href="/terms" 
                  className="hover:text-primary-400 transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
