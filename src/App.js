import Navbar from './Navbar';
import LegoLand from './LegoLand';
import Spaceships from './Spaceships';
import StarryBackground from './StarryBackground';
import SunnyBackground from './SunnyBackground';
import RetroComputer from './RetroComputer';
import Birds, { ABOUT_BIRDS, PROJECT_BIRDS } from './Birds';
import Planets from './Planets';
import './Navbar.css';
import './App.css';
import './writing-style.css';
import { useInView } from 'react-intersection-observer';
import styled, { keyframes } from 'styled-components';
import Sun from './assets/Random-images/Sun.png';
import Moon from './assets/Random-images/Moon.png';
import Arduino from './assets/Random-images/Arduino-board.png';
import LinkedInLogo from './assets/Random-images/linkedin_image.jpg';
import GmailIcon from './assets/Random-images/gmail-icon.png';
import JwtToken from './assets/Random-images/jwt-token.png';
import LaserPointer from './assets/Random-images/laser-pointer.png';
import { useState, useRef, useEffect } from 'react';

// Each character of the title as its own entry so we can track per-letter intersections
const TITLE_LETTERS = [
  { char: 'H', cls: 'bigger-name' },
  { char: 'e', cls: 'bigger-name' },
  { char: 'l', cls: 'bigger-name' },
  { char: 'l', cls: 'bigger-name' },
  { char: 'o', cls: 'bigger-name' },
  { char: ',', cls: 'bigger-name' },
  { char: '\u00A0', cls: '' },
  { char: 'I', cls: 'bigger-name' },
  { char: "'", cls: 'bigger-name' },
  { char: 'm', cls: 'bigger-name' },
  { char: '\u00A0', cls: '' },
  { char: 'A', cls: 'highlight-name', special: true },
  { char: 'l', cls: 'highlight-name', special: true },
  { char: 'e', cls: 'highlight-name', special: true },
  { char: 's', cls: 'highlight-name', special: true },
  { char: '.', cls: '' },
];

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const v of a) if (!b.has(v)) return false;
  return true;
}

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
  const [theme, setTheme] = useState('day');
  const [cloudHighlightedLetters, setCloudHighlightedLetters] = useState(new Set());
  const [showCopied, setShowCopied] = useState('');
  const [ripple, setRipple] = useState(null); // { x, y, toTheme }
  const [fading, setFading] = useState(false);
  const letterRefs = useRef([]);
  const animFrameRef = useRef(null);

  // When fading becomes true (content invisible), kick off the fade-in after a tick
  useEffect(() => {
    if (!fading) return;
    const t = setTimeout(() => setFading(false), 30);
    return () => clearTimeout(t);
  }, [fading]);

  const toggleTheme = (newTheme, e) => {
    if (newTheme === theme || ripple) return;
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    setRipple({ x, y, toTheme: newTheme });
  };

  // Per-frame check: which title letters overlap with a cloud in screen space
  useEffect(() => {
    if (theme !== 'day') {
      setCloudHighlightedLetters(new Set());
      return;
    }

    const check = () => {
      const clouds = document.querySelectorAll('.sunny-cloud');
      const next = new Set();

      letterRefs.current.forEach((el, idx) => {
        if (!el) return;
        const lr = el.getBoundingClientRect();
        for (const cloud of clouds) {
          const cr = cloud.getBoundingClientRect();
          if (lr.right > cr.left && lr.left < cr.right && lr.bottom > cr.top && lr.top < cr.bottom) {
            next.add(idx);
            break;
          }
        }
      });

      // Avoid re-renders when nothing changed
      setCloudHighlightedLetters(prev => setsEqual(prev, next) ? prev : next);
      animFrameRef.current = requestAnimationFrame(check);
    };

    animFrameRef.current = requestAnimationFrame(check);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [theme]);

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
      {theme === 'night' && <StarryBackground />}
      {theme === 'day' && <SunnyBackground />}
      {ripple && (
        <div
          onAnimationEnd={() => { setTheme(ripple.toTheme); setRipple(null); setFading(true); }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9998,
            pointerEvents: 'none',
            background: ripple.toTheme === 'night'
              ? 'linear-gradient(to bottom, #0a0e27, #16213e, #0f3460)'
              : 'linear-gradient(to bottom, #87CEEB, #98D8E8, #B4E4F3)',
            '--rx': `${ripple.x}px`,
            '--ry': `${ripple.y}px`,
            animation: 'rippleReveal 0.85s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        />
      )}
      <Planets show={theme === 'night'} />
      <div style={{
        opacity: fading ? 0 : 1,
        transition: fading ? 'none' : 'opacity 0.7s ease',
      }}>
      <Navbar/>
      {showCopied && (
        <div style={{
          position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)', color: 'white', padding: '12px 24px',
          borderRadius: '8px', zIndex: 9999, fontSize: '14px', fontFamily: 'monospace',
        }}>
          {showCopied}
        </div>
      )}
      <section id="home">
        <img src={Sun} alt="Sun" className="sun" onClick={(e) => toggleTheme('day', e)} />
        <img src={Moon} alt="Moon" className="moon" onClick={(e) => toggleTheme('night', e)} />
        <h1>
          {TITLE_LETTERS.map((letter, idx) => (
            <span
              key={idx}
              ref={el => { letterRefs.current[idx] = el; }}
              className={letter.cls}
              style={cloudHighlightedLetters.has(idx) ? (
                letter.special
                  ? { color: '#fff', textShadow: '0 0 8px #fff, 0 0 20px #8c00ff, 0 0 40px #8c00ff' }
                  : { color: '#FFD700', textShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700' }
              ) : undefined}
            >
              {letter.char}
            </span>
          ))}
        </h1>
        <LegoLand />
        <Spaceships />
      </section>
      <section id="about" ref={aboutRef}>
        <Birds show={theme === 'day'} birds={ABOUT_BIRDS} />
        <h2>
          {'About'.split('').map((letter, index) => (
            <AnimatedLetter key={index} inView={aboutInView} delay={index * 0.2}>
              {letter}
            </AnimatedLetter>
          ))}
        </h2>
        <div className="about-content">
          <p>
            Computer Engineering student at Mcgill University, with experience in software development and web technologies. 
            <br />
            <br />
            Passionate about creating innovative solutions and continuously learning new technologies.
          </p>
        </div>
      </section>
      <section id="projects" ref={projectsRef}>
        <Birds show={theme === 'day'} birds={PROJECT_BIRDS} />
        <h2>
          {'Projects'.split('').map((letter, index) => (
            <AnimatedLetter key={index} inView={projectsInView} delay={index * 0.2}>
              {letter}
            </AnimatedLetter>
          ))}
        </h2>
        <div className='projects-grid'>
          <div className='project-card' style={{ position: 'relative' }}>
            <h3>Workout Tracker</h3>
            <p className='project-tech'>Java, Spring Boot, Docker, PostgreSQL, HTML/CSS</p>
            <p className='project-desc'>
              A full-stack web application for tracking workouts and exercise routines. Features JWT-secured REST API endpoints, persistent workout history with Spring Data JPA and PostgreSQL, and a responsive UI for visualizing workout logs.
            </p>
            <a href="https://github.com/TryCatchAles/Workout_Tracker" target="_blank" rel="noopener noreferrer" className='project-link'>View on GitHub</a>
            <img src={JwtToken} alt="JWT Token" className="project-badge" />
          </div>
          <div className='project-card' style={{ position: 'relative' }}>
            <h3>LaserTab Wireless</h3>
            <p className='project-tech'>C++, Python, Flask, ESP32, PyAutoGUI</p>
            <p className='project-desc'>
              Built at McHacks 13 — a privacy-oriented laser tripwire system using two ESP32 boards. When someone breaks the laser beam, it triggers an automatic Alt+Tab to hide your screen. Features a Flask web interface for arming/disarming the system in real time.
            </p>
            <a href="https://github.com/TryCatchAles/LaserTab-wireless" target="_blank" rel="noopener noreferrer" className='project-link'>View on GitHub</a>
            <img src={LaserPointer} alt="Laser Pointer" className="project-badge-plain" />
          </div>
          <div className='project-card coming-soon'>
            <h3>Coming Soon</h3>
          </div>
        </div>
      </section>
      <section id="contact" ref={contactRef}>
        <h2>
          {'Contact'.split('').map((letter, index) => (
            <AnimatedLetter key={index} inView={contactInView} delay={index * 0.2}>
              {letter}
            </AnimatedLetter>
          ))}
        </h2>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', overflow: 'visible' }}>
          <RetroComputer />
          <a
            href="https://www.linkedin.com/in/ales-laiche"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
            style={{ position: 'absolute', top: '15%', left: 'calc(50% - 330px)', zIndex: 1001 }}
          >
            <img src={LinkedInLogo} alt="LinkedIn Profile" className="linkedin-image" />
          </a>
          <span
            className="linkedin-link"
            style={{ position: 'absolute', bottom: '20%', left: 'calc(50% - 330px)', zIndex: 1001, cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText('ales.laiche@gmail.com');
              setShowCopied('Email copied to clipboard!');
              setTimeout(() => setShowCopied(''), 2000);
            }}
          >
            <img src={GmailIcon} alt="Email" className="linkedin-image" style={{ padding: '5px', background: 'white', objectFit: 'contain', aspectRatio: '1 / 1' }} />
          </span>
          <span
            className="linkedin-link"
            style={{ position: 'absolute', bottom: '25%', right: 'calc(50% - 348px)', zIndex: 1001, cursor: 'pointer' }}
            onClick={() => {
              navigator.clipboard.writeText('+1 438 926 5984');
              setShowCopied('Phone number copied to clipboard!');
              setTimeout(() => setShowCopied(''), 2000);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="github-image" style={{ background: '#E53935' }}>
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="white" />
            </svg>
          </span>
          <a
            href="https://github.com/TryCatchAles"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
            style={{ position: 'absolute', top: '10%', right: 'calc(50% - 348px)', zIndex: 1001 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96" className="github-image">
              <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="white" />
            </svg>
          </a>
        </div>
        <img src={Arduino} alt="Arduino Board" className="arduino-board" />
        {/* Content for Contact section */}
      </section>
      </div>
    </div>
  );
}

export default App;
