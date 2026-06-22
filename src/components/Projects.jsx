import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiReact, SiMongodb, SiNodedotjs } from 'react-icons/si';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: 'FocusFlow',
    description:
      'Built using Next.js, Convex, Gemini API and Web Crypto API for end-to-end encrypted, client-side data storage. Integrated Gemini API for intelligent content personalization based on user activity.',
    tags: ['Next.js', 'Convex', 'Gemini API', 'Web Crypto API'],
    icons: [<SiReact key="r" />, <SiMongodb key="m" />, <SiNodedotjs key="n" />],
    year: '2025',
    gradient: 'linear-gradient(135deg, #06d6a0, #00b4d8)',
    image: '/project-career.png',
    github: 'https://github.com/Yadhukrishna07',
  },
  {
    id: 2,
    title: 'Real-Time Chat Application',
    description:
      'Developed a full-stack real-time chat application with live messaging and JWT-based authentication. Built REST APIs for user management and chat history, backed by MongoDB for persistent storage.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO'],
    icons: [<SiReact key="r" />, <SiMongodb key="m" />, <SiNodedotjs key="n" />],
    year: '2024',
    gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    image: '/project-student.png',
    github: 'https://github.com/Yadhukrishna07',
  },
  {
    id: 3,
    title: 'Student Management System',
    description:
      'Developed a full-stack Student Management System to manage student records, course enrollments, and enrollment dates, with real-time display of added data on the UI.',
    tags: ['HTML', 'CSS', 'Node.js', 'MongoDB'],
    icons: [<SiMongodb key="m" />, <SiNodedotjs key="n" />, <SiReact key="r" />],
    year: '2024',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    image: '/project-career.png',
    github: 'https://github.com/Yadhukrishna07',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">Featured Work</h2>
          <p className="section-subtitle">
            A selection of projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              className="projects__card card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <div
                className="projects__card-header"
                style={{ background: project.gradient }}
              >
                <div className="projects__card-image-wrap">
                  <img src={project.image} alt={project.title} className="projects__card-image" />
                </div>
                <div className="projects__header-content">
                  <span className="projects__year">{project.year}</span>
                  <div className="projects__header-icons">
                    {project.icons.map((icon, i) => (
                      <span key={i} className="projects__header-icon">
                        {icon}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="projects__card-body">
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__desc">{project.description}</p>

                <div className="projects__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="projects__links">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="projects__link" aria-label="View source">
                    <FiGithub /> Code
                  </a>
                  <a href="#" className="projects__link" aria-label="View live">
                    <FiExternalLink /> Live
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
