import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo">
            <span className="footer__logo-accent">Y</span>K
          </a>
          <p className="footer__tagline">
            Building the future, one line at a time.
          </p>
        </div>

        <div className="footer__links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer__socials">
          <a href="https://github.com/Yadhukrishna07" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/yadhu-krishna-u-s" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="mailto:yadhukrishna1417@gmail.com" aria-label="Email">
            <FiMail />
          </a>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} Yadhu Krishna U S. Made with{' '}
            <FiHeart className="footer__heart" /> in Chennai.
          </p>
        </div>
      </div>
    </footer>
  );
}
