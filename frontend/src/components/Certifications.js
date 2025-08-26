import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiExternalLink, HiCalendar, HiCheckCircle } from 'react-icons/hi';
import { SiCisco, SiAmazonaws, SiGoogle, SiMicrosoft, SiCoursera } from 'react-icons/si';
import axios from 'axios';

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Static certifications data (fallback if API is not available)
  const staticCertifications = [
    {
      _id: '1',
      title: 'Cisco NetAcad – Introduction to IoT',
      issuer: 'Cisco Networking Academy',
      date: '2024-03-15',
      credentialId: 'CISCO-IOT-2024-001',
      description: 'Comprehensive course covering IoT fundamentals, networking protocols, and security considerations for connected devices.',
      skills: ['IoT Fundamentals', 'Network Protocols', 'Device Security', 'Data Analytics'],
      certificateUrl: 'https://cisco.com/verify/certificate-id',
      icon: 'cisco',
      verified: true,
    },
    {
      _id: '2',
      title: 'IoT Applications and Implementation',
      issuer: 'Coursera',
      date: '2024-02-20',
      credentialId: 'COURSERA-IOT-APP-2024',
      description: 'Advanced course focusing on real-world IoT applications, implementation strategies, and industry best practices.',
      skills: ['IoT Architecture', 'Cloud Integration', 'Data Processing', 'Project Management'],
      certificateUrl: 'https://coursera.org/verify/certificate-id',
      icon: 'coursera',
      verified: true,
    },
    {
      _id: '3',
      title: 'AWS Educate – IoT Pathway',
      issuer: 'Amazon Web Services',
      date: '2024-01-10',
      credentialId: 'AWS-EDU-IOT-2024-001',
      description: 'Specialized pathway covering AWS IoT services, device management, and serverless architectures for IoT solutions.',
      skills: ['AWS IoT Core', 'Lambda Functions', 'DynamoDB', 'IoT Device Management'],
      certificateUrl: 'https://aws.amazon.com/verify/certificate-id',
      icon: 'aws',
      verified: true,
    },
    {
      _id: '4',
      title: 'Google Cloud IoT Fundamentals',
      issuer: 'Google Cloud',
      date: '2023-12-05',
      credentialId: 'GCP-IOT-FUND-2023',
      description: 'Foundation course on Google Cloud IoT platform, device connectivity, and data pipeline creation.',
      skills: ['Google Cloud IoT', 'Pub/Sub', 'BigQuery', 'Cloud Functions'],
      certificateUrl: 'https://cloud.google.com/verify/certificate-id',
      icon: 'google',
      verified: true,
    },
    {
      _id: '5',
      title: 'Microsoft Azure IoT Developer',
      issuer: 'Microsoft',
      date: '2023-11-18',
      credentialId: 'AZ-220-2023-001',
      description: 'Professional certification for developing IoT solutions using Microsoft Azure platform and services.',
      skills: ['Azure IoT Hub', 'IoT Edge', 'Stream Analytics', 'Time Series Insights'],
      certificateUrl: 'https://microsoft.com/verify/certificate-id',
      icon: 'microsoft',
      verified: true,
    },
  ];

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/certifications`);
        setCertifications(response.data);
      } catch (error) {
        console.log('Using static data for certifications');
        setCertifications(staticCertifications);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const getIcon = (iconName) => {
    const icons = {
      cisco: SiCisco,
      aws: SiAmazonaws,
      google: SiGoogle,
      microsoft: SiMicrosoft,
      coursera: SiCoursera,
    };
    return icons[iconName] || HiAcademicCap;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      },
    },
  };

  if (loading) {
    return (
      <section id="certifications" className="section-padding gradient-bg">
        <div className="container-custom">
          <div className="flex justify-center items-center py-20">
            <div className="spinner w-8 h-8 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="section-padding gradient-bg">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-secondary mb-4">Certifications & Achievements</h2>
            <p className="text-primary max-w-2xl mx-auto">
              Professional certifications and achievements that validate my expertise 
              in IoT technologies, cloud platforms, and modern development practices.
            </p>
          </motion.div>

          {/* Certifications Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              variants={timelineVariants}
              className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-500 origin-top"
              style={{ height: '100%' }}
            />

            <div className="space-y-12">
              {certifications.map((cert, index) => {
                const IconComponent = getIcon(cert.icon);
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={cert._id}
                    variants={itemVariants}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:flex-row`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-4 md:translate-y-0">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-8 h-8 bg-white border-4 border-primary-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <IconComponent className="text-primary-600" size={16} />
                      </motion.div>
                    </div>

                    {/* Certification Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`card p-6 max-w-lg w-full ml-12 md:ml-0 ${
                        isEven ? 'md:mr-8' : 'md:ml-8'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                            <IconComponent className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                              {cert.title}
                            </h3>
                            <p className="text-primary-600 font-medium">{cert.issuer}</p>
                          </div>
                        </div>
                        {cert.verified && (
                          <div className="flex items-center text-green-600">
                            <HiCheckCircle size={20} />
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {cert.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          Skills Gained:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Certificate Details */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <HiCalendar className="mr-1" size={16} />
                          {formatDate(cert.date)}
                        </div>
                        
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                        >
                          <span>Verify</span>
                          <HiExternalLink className="ml-1" size={16} />
                        </motion.a>
                      </div>

                      {/* Credential ID */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Credential ID: {cert.credentialId}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {certifications.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Total Certifications
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {certifications.filter(cert => cert.verified).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Verified Credentials
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {[...new Set(certifications.flatMap(cert => cert.skills))].length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Skills Covered
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">
                {new Date().getFullYear() - new Date(Math.min(...certifications.map(cert => new Date(cert.date)))).getFullYear() + 1}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                Years of Learning
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
