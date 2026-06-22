import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import './Experience.css';

const experiences = [
  {
    role: 'Full Stack Intern',
    company: 'National Small Industries Corporation (NSIC), Chennai',
    period: 'Jun 2025',
    description:
      'Worked on frontend and backend modules, gaining practical exposure to full-stack development with modern web technologies.',
    tags: ['Full Stack', 'Web Development', 'Backend Integration'],
  },
  {
    role: 'Web Developer Intern',
    company: 'Prodigy Infotech',
    period: 'Jun 2024 – Jul 2024',
    description:
      'Developed responsive web pages and enhanced UI components, improving user experience and frontend development practices.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Frontend Development'],
  },
];

const education = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'RMK Engineering College, Chennai',
    period: '2023 – Present',
    detail: 'CGPA: 7.58',
  },
  {
    degree: 'HSC (Higher Secondary Certificate)',
    institution: "St. Mary's Matriculation Higher Secondary School, Chennai",
    period: '2022 – 2023',
    detail: 'Percentage: 75.17%',
  },
  {
    degree: 'SSLC (Secondary School Leaving Certificate)',
    institution: "St. Mary's Matriculation Higher Secondary School, Chennai",
    period: '2020 – 2021',
    detail: 'Percentage: 100%',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="experience section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Experience & Education</p>
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">
            The path I&apos;ve taken and the knowledge I&apos;ve gained along the way.
          </p>
        </motion.div>

        <div className="experience__grid">
          {/* Experience Column */}
          <div className="experience__col">
            <h3 className="experience__col-title">
              <FiBriefcase /> Work Experience
            </h3>
            <div className="experience__timeline">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.role}
                  className="experience__item card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <div className="experience__item-header">
                    <h4 className="experience__role">{exp.role}</h4>
                    <span className="experience__period">
                      <FiCalendar /> {exp.period}
                    </span>
                  </div>
                  <p className="experience__company">
                    <FiMapPin /> {exp.company}
                  </p>
                  <p className="experience__desc">{exp.description}</p>
                  <div className="experience__tags">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="experience__col">
            <h3 className="experience__col-title">
              <FiBriefcase /> Education
            </h3>
            <div className="experience__timeline">
              {education.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  className="experience__item card"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                >
                  <div className="experience__item-header">
                    <h4 className="experience__role">{edu.degree}</h4>
                    <span className="experience__period">
                      <FiCalendar /> {edu.period}
                    </span>
                  </div>
                  <p className="experience__company">
                    <FiMapPin /> {edu.institution}
                  </p>
                  <p className="experience__detail">{edu.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}