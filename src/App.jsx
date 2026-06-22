import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Extras from './components/Extras';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleField from './components/ParticleField';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  return (
    <div className="app">
      <ParticleField />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Extras />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
