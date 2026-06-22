import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiDownload } from 'react-icons/fi';
import './Hero.css';

const roles = ['Backend Developer', 'Web Developer', 'Hackathon Enthusiast'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="hero section">
      {/* Background effects */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
        <div className="hero__noise" />
      </div>

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="hero__badge-dot" />
            Available for opportunities
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <span className="hero__greeting">Hi, I'm</span>
            <span className="hero__name" data-text="Yadhu Krishna">
              Yadhu Krishna
            </span>
          </motion.h1>

          <motion.div
            className="hero__typewriter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <span className="hero__typewriter-prefix">&gt; </span>
            <span className="hero__typewriter-text">{displayText}</span>
            <span className="hero__typewriter-cursor">|</span>
          </motion.div>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            IT Student & Developer crafting{' '}
            <span className="hero__highlight">responsive</span>,{' '}
            <span className="hero__highlight">user-focused</span> web applications
            with Java & modern web technologies.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <a href="#projects" className="btn btn-primary">
              View My Work
              <FiArrowDown />
            </a>
            <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" aria-label="Download Resume">
              <FiDownload /> Download Resume
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            className="hero__socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a href="https://github.com/Yadhukrishna07" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://linkedin.com/in/yadhu-krishna-u-s-26374728a" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="mailto:yadhukrishna1417@gmail.com" className="hero__social-link" aria-label="Email">
              <FiMail />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="hero__photo-wrapper">
            <div className="hero__photo-glow" />
            <div className="hero__photo-ring" />
            <div className="hero__photo-ring hero__photo-ring--2" />
            <img
              src="/profile.png"
              alt="Yadhu Krishna U S"
              className="hero__photo"
            />
          </div>

          {/* Floating tech badges */}
          <motion.div
            className="hero__float-tag hero__float-tag--1"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ⚛️ React
          </motion.div>
          <motion.div
            className="hero__float-tag hero__float-tag--2"
            animate={{ y: [0, 12, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            🟢 Node.js
          </motion.div>
          <motion.div
            className="hero__float-tag hero__float-tag--3"
            animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            ☕ Java
          </motion.div>
          <motion.div
            className="hero__float-tag hero__float-tag--4"
            animate={{ y: [0, 16, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            🍃 MongoDB
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <FiArrowDown />
      </motion.div>
    </section>
  );
}
