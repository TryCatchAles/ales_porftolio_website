import Navbar from './Navbar';
import LegoLand from './LegoLand';
import Spaceships from './Spaceships';
import './Navbar.css';
import './App.css';
import './writing-style.css';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes } from 'styled-components';
import Sun from './assets/Random-images/Sun.png';
import Moon from './assets/Random-images/Moon.png';
import Arduino from './assets/Random-images/Arduino-board.png';
import LinkedInLogo from './assets/Random-images/linkedin_image.jpg';
import { useState } from 'react';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AnimatedLetter = styled.span`
  display: inline-block;
  opacity: 0;
  animation: ${props => props.inView ? slideIn : 'none'} 1.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;
`;

function App() {
  const [theme, setTheme] = useState('night');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: false, // Re-trigger the animation every time
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  const { ref: projectsRef, inView: projectsInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div className={`App ${theme}`}>
      <Navbar/>
      <section id="home">
        <img src={Sun} alt="Sun" className="sun" onClick={() => toggleTheme('day')} />
        <img src={Moon} alt="Moon" className="moon" onClick={() => toggleTheme('night')} />
        <h1>
          <span className='bigger-name'>Hello,</span> <span className='bigger-name'>I'm</span> <span className="highlight-name">Ales</span>.
        </h1>
        <LegoLand />
        <Spaceships />
      </section>
      <section id="about" ref={aboutRef}>
        <h2>
          {'About'.split('').map((letter, index) => (
            <AnimatedLetter key={index} inView={aboutInView} delay={index * 0.2}>
              {letter}
            </AnimatedLetter>
          ))}
        </h2>
        <div className="about-content">
          <p>
            Computer Engineering student with experience in software development and web technologies. 
            <br />
            <br />
            Passionate about creating innovative solutions and continuously learning new technologies.
          </p>
        </div>
      </section>
      <section id="projects" ref={projectsRef}>
        <h2>
          {'Projects'.split('').map((letter, index) => (
            <AnimatedLetter key={index} inView={projectsInView} delay={index * 0.2}>
              {letter}
            </AnimatedLetter>
          ))}
        </h2>
        <div className='projects'>
          <p>
            To be determined.
          </p>
        </div>
        {/* Content for Projects section */}
      </section>
      <section id="contact" ref={contactRef}>
        <h2>
          {'Contact'.split('').map((letter, index) => (
            <AnimatedLetter key={index} inView={contactInView} delay={index * 0.2}>
              {letter}
            </AnimatedLetter>
          ))}
        </h2>
        <div className="contact-content">
          <a 
            href="https://www.linkedin.com/in/ales-laiche" 
            target="_blank" 
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            <img src={LinkedInLogo} alt="LinkedIn Profile" className="linkedin-image" />
          </a>
        </div>
        <img src={Arduino} alt="Arduino Board" className="arduino-board" />
        {/* Content for Contact section */}
      </section>
    </div>
  );
}

export default App;
