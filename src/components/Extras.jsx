import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiStar } from 'react-icons/fi';
import './Extras.css';

const leadership = [
  {
    title: 'Vice Chair',
    venue: 'IEEE Consumer Technology Society Student Chapter',
  },
  {
    title: 'Class Committee Member',
    venue: 'Information Technology Department',
  },
  {
    title: 'Class Representative',
    venue: 'Information Technology Department',
  },
];

const certifications = [
  'Oracle AI Vector Search Certification',
  'NPTEL Course: Introduction to Internet of Things (Elite)',
  'Infosys Artificial Intelligence Foundations',
];

const achievements = [
  'Winner, Envision Hackathon at SSN Engineering College',
  'Winner, Technical Events at Invente, SSN College of Engineering',
  'Participant, 24-Hour Hackathon at SVCE',
];

export default function Extras() {
  return (
    <section id="extras" className="extras section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">More About Me</p>
          <h2 className="section-title">Leadership, Certs & Achievements</h2>
        </motion.div>

        <div className="extras__grid">
          {/* Leadership */}
          <motion.div
            className="extras__block card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="extras__block-title">
              <FiBookOpen /> Leadership & Activities
            </h3>
            <ul className="extras__list">
              {leadership.map((item) => (
                <li key={item.title} className="extras__list-item">
                  <strong>{item.title}</strong>
                  <span className="extras__venue">{item.venue}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Certifications */}
          <motion.div
            className="extras__block card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="extras__block-title">
              <FiAward /> Certifications
            </h3>
            <ul className="extras__list">
              {certifications.map((cert) => (
                <li key={cert} className="extras__list-item extras__list-item--simple">
                  {cert}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Achievements */}
          <motion.div
            className="extras__block card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="extras__block-title">
              <FiStar /> Achievements
            </h3>
            <ul className="extras__list">
              {achievements.map((ach) => (
                <li key={ach} className="extras__list-item extras__list-item--simple">
                  {ach}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
