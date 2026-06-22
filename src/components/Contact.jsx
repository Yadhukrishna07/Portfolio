import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import './Contact.css';

const contactInfo = [
  { icon: <FiMail />, label: 'Email', value: 'yadhukrishna1417@gmail.com', href: 'mailto:yadhukrishna1417@gmail.com' },
  { icon: <FiPhone />, label: 'Phone', value: '+91 7338929314', href: 'tel:+917338929314' },
  { icon: <FiMapPin />, label: 'Location', value: 'Chennai, India', href: null },
];

const socials = [
  { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Yadhukrishna07' },
  { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/yadhu-krishna-u-s-26374728a' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:yadhukrishna1417@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">
            I'm always open to new opportunities and interesting conversations. Let's build something great together.
          </p>
        </motion.div>

        <div className="contact__grid">
          {/* Contact Info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact__info-items">
              {contactInfo.map((item) => (
                <div key={item.label} className="contact__info-item">
                  <span className="contact__info-icon">{item.icon}</span>
                  <div>
                    <span className="contact__info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="contact__info-value">{item.value}</a>
                    ) : (
                      <span className="contact__info-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="contact__form card"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact__field">
              <label htmlFor="contact-name" className="contact__label">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="contact__input"
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email" className="contact__label">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="contact__input"
                required
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-message" className="contact__label">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="contact__input contact__textarea"
                rows="5"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary contact__submit">
              <FiSend /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
