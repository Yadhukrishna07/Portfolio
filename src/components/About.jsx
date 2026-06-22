import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCode, FiBookOpen, FiAward, FiUsers } from 'react-icons/fi';
import './About.css';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target);
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: <FiCode />, value: '5', suffix: '+', label: 'Technologies', color: '#a855f7' },
  { icon: <FiBookOpen />, value: '2', suffix: '', label: 'Publications', color: '#06b6d4' },
  { icon: <FiAward />, value: '3', suffix: '+', label: 'Certifications', color: '#10b981' },
  { icon: <FiUsers />, value: '2', suffix: '', label: 'Internships', color: '#f59e0b' },
];

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">About Me</p>
          <h2 className="section-title">Building the Future, One Line at a Time</h2>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              I'm an <strong>Information Technology student</strong> at RMK Engineering College, Chennai,
              with practical experience in web development using <em>HTML, CSS, and React</em>.
              Proficient in <strong>Java programming</strong> with strong problem-solving abilities and
              a solid understanding of software development fundamentals.
            </p>
            <p>
              Passionate about learning and contributing to impactful projects. I've built everything
              from <strong>end-to-end encrypted productivity apps</strong> (FocusFlow) to
              <strong>real-time chat platforms</strong> — and I've had research published at
              national conferences and in international journals.
            </p>
            <p>
              Beyond code, I'm the <strong>Vice Chair of IEEE Consumer Technology Society</strong>
              and an active hackathon participant, including a <strong>Hackathon Winner</strong>
              at SSN Engineering College. I believe in continuous learning and pushing
              the boundaries of what's possible with technology.
            </p>

            <div className="about__highlights">
              <div className="about__highlight-item">
                <span className="about__highlight-dot" />
                Currently pursuing B.Tech in Information Technology
              </div>
              <div className="about__highlight-item">
                <span className="about__highlight-dot" />
                Based in Chennai, India 🇮🇳
              </div>
              <div className="about__highlight-item">
                <span className="about__highlight-dot" />
                Open to full-time opportunities & internships
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about__stats"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="about__stat"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="about__stat-glow" style={{ background: stat.color }} />
                <span className="about__stat-icon" style={{ color: stat.color }}>
                  {stat.icon}
                </span>
                <span className="about__stat-value">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="about__stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
