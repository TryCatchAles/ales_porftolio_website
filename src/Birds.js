import React from 'react';
import birdSprite            from './assets/Random-images/bird-sprite.png';
import birdSpriteGlide       from './assets/Random-images/bird-sprite-glide.png';
import yellowBirdSprite      from './assets/Random-images/yellow-bird-sprite.png';
import yellowBirdSpriteGlide from './assets/Random-images/yellow-bird-sprite-glide.png';
import redBirdSprite         from './assets/Random-images/red-bird-sprite.png';
import redBirdSpriteGlide    from './assets/Random-images/red-bird-sprite-glide.png';

// Sprite sheets: 4 frames × 120px wide, 100px tall  →  480×100 total
const SW = 120;
const SH = 100;
const SHEET = SW * 4;

const SPRITES = {
  blue:   { fly: birdSprite,       glide: birdSpriteGlide       },
  yellow: { fly: yellowBirdSprite, glide: yellowBirdSpriteGlide },
  red:    { fly: redBirdSprite,    glide: redBirdSpriteGlide    },
};

export const ABOUT_BIRDS = [
  { id: 0, top: '15%', dir: 'ltr', duration: 20, delay: 0,  scale: 0.52, bobDur: 3.5, flapDur: '0.42s', sheet: 'fly',   color: 'blue'   },
  { id: 1, top: '50%', dir: 'rtl', duration: 24, delay: 7,  scale: 0.44, bobDur: 4.8, flapDur: '0.48s', sheet: 'glide', color: 'yellow' },
  { id: 2, top: '78%', dir: 'ltr', duration: 28, delay: 14, scale: 0.40, bobDur: 5.0, flapDur: '0.44s', sheet: 'fly',   color: 'red'    },
];

export const PROJECT_BIRDS = [
  { id: 0, top: '8%',  dir: 'rtl', duration: 22, delay: 3,  scale: 0.46, bobDur: 4.0, flapDur: '0.42s', sheet: 'fly',   color: 'yellow' },
  { id: 1, top: '35%', dir: 'ltr', duration: 26, delay: 10, scale: 0.40, bobDur: 5.0, flapDur: '0.50s', sheet: 'glide', color: 'blue'   },
  { id: 2, top: '62%', dir: 'rtl', duration: 20, delay: 16, scale: 0.38, bobDur: 3.8, flapDur: '0.46s', sheet: 'fly',   color: 'red'    },
  { id: 3, top: '85%', dir: 'ltr', duration: 30, delay: 6,  scale: 0.42, bobDur: 4.5, flapDur: '0.52s', sheet: 'fly',   color: 'blue'   },
];

function Birds({ show, birds }) {
  if (!show) return null;

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: -1 }}>
      {birds.map(bird => {
        const offset = Math.round(SW * bird.scale) + 10;
        const img = SPRITES[bird.color ?? 'blue'][bird.sheet ?? 'fly'];
        return (
          <div
            key={bird.id}
            style={{
              position: 'absolute',
              top: bird.top,
              left: bird.dir === 'ltr' ? `-${offset}px` : `calc(100% + ${offset}px)`,
              animation: `${bird.dir === 'ltr' ? 'birdFlyLTR' : 'birdFlyRTL'} ${bird.duration}s linear ${bird.delay}s infinite`,
              willChange: 'transform',
            }}
          >
            <div style={{ animation: `birdBob ${bird.bobDur}s ease-in-out infinite` }}>
              <div style={{ display: 'inline-block', transform: bird.dir === 'rtl' ? 'scaleX(-1)' : undefined }}>
                <div style={{ display: 'inline-block', transform: `scale(${bird.scale})`, transformOrigin: 'top left' }}>
                  <div style={{
                    width: SW,
                    height: SH,
                    backgroundImage: `url(${img})`,
                    backgroundSize: `${SHEET}px ${SH}px`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0 0',
                    animation: `birdFrame ${bird.flapDur} steps(4) infinite`,
                    imageRendering: 'pixelated',
                  }} />
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes birdFlyLTR {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(100vw + 280px)); }
        }
        @keyframes birdFlyRTL {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100vw - 280px)); }
        }
        @keyframes birdBob {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-16px); }
          100% { transform: translateY(0px); }
        }
        @keyframes birdFrame {
          from { background-position-x: 0px; }
          to   { background-position-x: -${SHEET}px; }
        }
      `}</style>
    </div>
  );
}

export default Birds;
