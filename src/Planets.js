import React from 'react';
import planetBlue   from './assets/Random-images/planet-blue.png';
import planetOrange from './assets/Random-images/planet-orange.png';
import planetPurple     from './assets/Random-images/planet-purple.png';
import planetPink       from './assets/Random-images/planet-pink.png';
import planetSaturnIce  from './assets/Random-images/planet-saturn-ice.png';

const PLANETS = [
  // Home — below the title, clear central strip
  { id: 'saturn-ice', src: planetSaturnIce, top: '46vh',  left: '8%',      right: undefined, size: 245, dur: 11, delay: 0.7, glow: 'rgba(100,200,255,0.55)' },
  { id: 'orange',     src: planetOrange,    top: '44vh',  left: '82%',     right: undefined, size: 122, dur: 9,  delay: 1.5, glow: 'rgba(255,140,30,0.55)'  },
  // Home — between ring planet and orange, above both
  { id: 'purple',     src: planetPurple,    top: '72vh',  left: '55%',     right: undefined, size: 128, dur: 6,  delay: 1.0, glow: 'rgba(160,60,255,0.55)'  },
  // Contact — middle-left
  { id: 'blue',       src: planetBlue,      top: '302vh', left: '22%',     right: undefined, size: 92,  dur: 7,  delay: 0,   glow: 'rgba(60,100,255,0.55)'  },
  // Contact — middle-right, below main content area
  { id: 'pink',       src: planetPink,      top: '378vh', left: '58%',     right: undefined, size: 100, dur: 10, delay: 1.8, glow: 'rgba(255,80,130,0.55)'  },
];

function Planets({ show }) {
  if (!show) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 2 }}>
      {PLANETS.map(p => (
        <img
          key={p.id}
          src={p.src}
          alt={p.id}
          style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            right: p.right,
            width: p.size,
            height: 'auto',
            imageRendering: 'pixelated',
            animation: `planetFloat-${p.id} ${p.dur}s ease-in-out ${p.delay}s infinite`,
            filter: `drop-shadow(0 0 10px ${p.glow})`,
          }}
        />
      ))}

      <style>{`
        ${PLANETS.map(p => {
          const sx = p.flip ? ' scaleX(-1)' : '';
          return `
          @keyframes planetFloat-${p.id} {
            0%   { transform: translateY(0px) rotate(0deg)${sx}; }
            50%  { transform: translateY(-14px) rotate(1.5deg)${sx}; }
            100% { transform: translateY(0px) rotate(0deg)${sx}; }
          }`;
        }).join('')}
      `}</style>
    </div>
  );
}

export default Planets;
