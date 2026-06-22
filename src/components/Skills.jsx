import { motion } from 'framer-motion';
import {
  SiJavascript, SiReact, SiNodedotjs, SiMongodb,
  SiHtml5, SiCss, SiFigma,
  SiCanva, SiGit
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import './Skills.css';

const skillCategories = [
  {
    title: 'Programming & Markup',
    skills: [
      { name: 'Java', icon: <FaJava />, color: '#f89820', level: 85 },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e', level: 85 },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26', level: 90 },
      { name: 'CSS3', icon: <SiCss />, color: '#1572b6', level: 85 },
      { name: 'SQL', icon: <FaDatabase />, color: '#06b6d4', level: 75 },
    ],
  },
  {
    title: 'Frameworks & Databases',
    skills: [
      { name: 'React', icon: <SiReact />, color: '#61dafb', level: 85 },
      { name: 'Next.js', icon: <VscCode />, color: '#000000', level: 80 },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 80 },
      { name: 'Express.js', icon: <VscCode />, color: '#68a063', level: 75 },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248', level: 80 },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#f05032', level: 85 },
      { name: 'GitHub', icon: <VscCode />, color: '#ffffff', level: 85 },
      { name: 'Figma', icon: <SiFigma />, color: '#a259ff', level: 70 },
      { name: 'Canva', icon: <SiCanva />, color: '#00c4cc', level: 75 },
      { name: 'MS Office', icon: <VscCode />, color: '#d83b01', level: 80 },
    ],
  },
  {
    title: 'Core Concepts',
    skills: [
      { name: 'Data Structures', icon: <VscCode />, color: '#f59e0b', level: 80 },
      { name: 'OOP', icon: <VscCode />, color: '#a855f7', level: 85 },
      { name: 'DBMS', icon: <FaDatabase />, color: '#6366f1', level: 80 },
      { name: 'OS', icon: <VscCode />, color: '#ec4899', level: 75 },
    ],
  },
];

const marqueeSkills = [
  { name: 'Java', icon: <FaJava />, color: '#f89820' },
  { name: 'React', icon: <SiReact />, color: '#61dafb' },
  { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47a248' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#f7df1e' },
  { name: 'Git', icon: <SiGit />, color: '#f05032' },
  { name: 'Figma', icon: <SiFigma />, color: '#a259ff' },
  { name: 'VS Code', icon: <VscCode />, color: '#007acc' },
  { name: 'HTML5', icon: <SiHtml5 />, color: '#e34f26' },
  { name: 'CSS3', icon: <SiCss />, color: '#1572b6' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export default function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Skills</p>
          <h2 className="section-title">My Tech Arsenal</h2>
          <p className="section-subtitle">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="skills__marquee-wrapper">
          <div className="skills__marquee">
            {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
              <div key={i} className="skills__marquee-item">
                <span style={{ color: skill.color }}>{skill.icon}</span>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="skills__grid">
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.title}
              className="skills__category card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="skills__category-title">{cat.title}</h3>
              <motion.div
                className="skills__items"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skills__item"
                    variants={itemVariants}
                    whileHover={{ scale: 1.06, y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span
                      className="skills__icon"
                      style={{ color: skill.color, '--skill-color': skill.color }}
                    >
                      {skill.icon}
                    </span>
                    <div className="skills__item-info">
                      <span className="skills__name">{skill.name}</span>
                      <div className="skills__progress">
                        <motion.div
                          className="skills__progress-fill"
                          style={{ background: skill.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
