import { useEffect, useState } from 'react';

function SunnyBackground() {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    const generatedClouds = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 60 + 10}%`,
      direction: i % 2 === 0 ? 'ltr' : 'rtl',
      size: Math.random() * 0.5 + 0.7,
      duration: Math.random() * 30 + 40,
      delay: i * 4, // stagger entry positively — no negative delays, so clouds never pop in mid-screen
    }));
    setClouds(generatedClouds);
  }, []);

  const cloudPiece = (w, h, opacity, ml) => ({
    width: w,
    height: h,
    background: `rgba(255, 255, 255, ${opacity})`,
    borderRadius: '9999px',
    marginLeft: ml,
    flexShrink: 0,
  });

  const cloudShape = (size = 1) => (
    <div style={{ transform: `scale(${size})`, transformOrigin: 'bottom left' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={cloudPiece('4rem', '3rem',  0.9,  0)} />
        <div style={cloudPiece('5rem', '4rem',  0.9,  '-2rem')} />
        <div style={cloudPiece('6rem', '5rem',  0.95, '-2.5rem')} />
        <div style={cloudPiece('5rem', '3.5rem',0.9,  '-3rem')} />
        <div style={cloudPiece('4rem', '2.5rem',0.9,  '-2rem')} />
      </div>
    </div>
  );

  const smallCloudShape = (size = 1) => (
    <div style={{ transform: `scale(${size})`, transformOrigin: 'bottom left' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <div style={cloudPiece('3rem', '2.5rem', 0.85, 0)} />
        <div style={cloudPiece('4rem', '3rem',   0.9,  '-1.5rem')} />
        <div style={cloudPiece('3rem', '2.25rem',0.85, '-1.5rem')} />
      </div>
    </div>
  );

  return (
    /* Outer wrapper spans the full page height so the sky covers all sections */
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -10 }}>

      {/* Sky gradient — stretches to fill the entire page */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, #87CEEB, #98D8E8, #B4E4F3)',
      }} />

      {/* Cloud layer — clipped to the first viewport so clouds stay in the hero section */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100vh', overflow: 'hidden' }}>

        {clouds.map((cloud) => (
          <div
            key={cloud.id}
            className="sunny-cloud"
            style={{
              position: 'absolute',
              top: cloud.top,
              left: cloud.direction === 'ltr' ? '-400px' : 'calc(100vw + 400px)',
              animation: `${cloud.direction === 'ltr' ? 'sunnyFloatLTR' : 'sunnyFloatRTL'} ${cloud.duration}s linear ${cloud.delay}s infinite`,
            }}
          >
            {cloudShape(cloud.size)}
          </div>
        ))}

        {/* Small decorative cloud — left to right */}
        <div className="sunny-cloud" style={{
          position: 'absolute',
          top: '22%',
          left: '-250px',
          animation: 'sunnyFloatLTR 35s linear 2s infinite',
        }}>
          {smallCloudShape(0.6)}
        </div>

        {/* Small decorative cloud — right to left */}
        <div className="sunny-cloud" style={{
          position: 'absolute',
          top: '68%',
          left: 'calc(100vw + 250px)',
          animation: 'sunnyFloatRTL 50s linear 15s infinite',
        }}>
          {smallCloudShape(0.5)}
        </div>

      </div>

      {/* Trees and mountains — minimalist polygon style */}
      <svg
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 'clamp(260px, 40vw, 520px)', display: 'block' }}
      >
        {/* Ground fill */}
        <rect x="0" y="460" width="1440" height="40" fill="#4CAF50" />

        {/* Back mountains — distant, small, faded */}
        {[
          { x: 200,  s: 85,  w: 1.0,  color: '#90A4AE' },
          { x: 700,  s: 150, w: 0.55, color: '#78909C' },
          { x: 1050, s: 120, w: 0.75, color: '#90A4AE' },
          { x: 1250, s: 80,  w: 1.05, color: '#90A4AE' },
          { x: 1380, s: 135, w: 0.6,  color: '#78909C' },
        ].map(({ x, s, w, color }, i) => {
          const y = 500 - s * 0.45;
          return (
            <g key={`mt-back-${i}`} opacity="0.5">
              <polygon
                points={`${x},${y - s*0.55} ${x - s*w},${y + s*0.45} ${x + s*w},${y + s*0.45}`}
                fill={color}
              />
              <polygon
                points={`${x},${y - s*0.55} ${x - s*w*0.5},${y - s*0.05} ${x + s*0.1},${y - s*0.05}`}
                fill="white"
                opacity="0.4"
              />
            </g>
          );
        })}

        {/* Middle mountains — medium */}
        {[
          { x: 350,  s: 240, w: 0.5,  o: 1,   color: '#607D8B' },
          { x: 900,  s: 170, w: 0.75, o: 1,   color: '#546E7A' },
          { x: 1400, s: 215, w: 0.55, o: 1,   color: '#607D8B' },
        ].map(({ x, s, w, o, color }, i) => {
          const y = 500 - s * 0.5;
          return (
            <g key={`mt-mid-${i}`} opacity={o}>
              <polygon
                points={`${x},${y - s*0.5} ${x - s*w},${y + s*0.5} ${x + s*w},${y + s*0.5}`}
                fill={color}
              />
              <polygon
                points={`${x},${y - s*0.5} ${x - s*w*0.5},${y} ${x + s*0.1},${y}`}
                fill="white"
                opacity="0.6"
              />
            </g>
          );
        })}

        {/* Front mountains — large, close, darker */}
        {[
          { x: 100,  s: 270, w: 0.55, color: '#455A64' },
          { x: 520,  s: 320, w: 0.5,  color: '#37474F' },
          { x: 720,  s: 230, w: 0.7,  color: '#455A64' },
          { x: 1200, s: 360, w: 0.45, color: '#455A64' },
        ].map(({ x, s, w, color }, i) => {
          const y = 500 - s * 0.35;
          return (
            <g key={`mt-front-${i}`}>
              <polygon
                points={`${x},${y - s*0.45} ${x - s*w},${y + s*0.45} ${x + s*w},${y + s*0.45}`}
                fill={color}
              />
              <polygon
                points={`${x},${y - s*0.45} ${x - s*w*0.44},${y - s*0.05} ${x + s*0.08},${y - s*0.05}`}
                fill="white"
                opacity="0.5"
              />
            </g>
          );
        })}

        {/* Layer A — tiny back trees, very dense (every 48px, opacity 0.4) */}
        {[
          { x: 24,   s: 22, color: '#3E6B35' }, { x: 72,   s: 32, color: '#4A7C40' },
          { x: 120,  s: 25, color: '#3E6B35' }, { x: 168,  s: 38, color: '#4A7C40' },
          { x: 216,  s: 20, color: '#3E6B35' }, { x: 264,  s: 28, color: '#4A7C40' },
          { x: 312,  s: 35, color: '#3E6B35' }, { x: 360,  s: 24, color: '#4A7C40' },
          { x: 408,  s: 30, color: '#3E6B35' }, { x: 456,  s: 18, color: '#4A7C40' },
          { x: 504,  s: 36, color: '#3E6B35' }, { x: 552,  s: 26, color: '#4A7C40' },
          { x: 600,  s: 22, color: '#3E6B35' }, { x: 648,  s: 34, color: '#4A7C40' },
          { x: 696,  s: 28, color: '#3E6B35' }, { x: 744,  s: 30, color: '#4A7C40' },
          { x: 792,  s: 18, color: '#3E6B35' }, { x: 840,  s: 38, color: '#4A7C40' },
          { x: 888,  s: 25, color: '#3E6B35' }, { x: 936,  s: 32, color: '#4A7C40' },
          { x: 984,  s: 20, color: '#3E6B35' }, { x: 1032, s: 28, color: '#4A7C40' },
          { x: 1080, s: 36, color: '#3E6B35' }, { x: 1128, s: 24, color: '#4A7C40' },
          { x: 1176, s: 22, color: '#3E6B35' }, { x: 1224, s: 35, color: '#4A7C40' },
          { x: 1272, s: 28, color: '#3E6B35' }, { x: 1320, s: 30, color: '#4A7C40' },
          { x: 1368, s: 25, color: '#3E6B35' }, { x: 1416, s: 32, color: '#4A7C40' },
        ].map(({ x, s, color }, i) => {
          const y = 499 - s * 0.65;
          return (
            <g key={`a-${i}`} opacity="0.4">
              <rect x={x - s*0.07} y={y} width={s*0.14} height={s*0.3} fill="#6D4C41" />
              <polygon points={`${x},${y - s*0.35} ${x - s*0.28},${y + s*0.05} ${x + s*0.28},${y + s*0.05}`} fill={color} />
              <polygon points={`${x},${y - s*0.18} ${x - s*0.2},${y + s*0.1} ${x + s*0.2},${y + s*0.1}`} fill={color} opacity="0.7" />
            </g>
          );
        })}

        {/* Layer B — small trees, overlapping with A (every 55px offset +27, opacity 0.65) */}
        {[
          { x: 48,   s: 55, color: '#4A7C40' }, { x: 103,  s: 72, color: '#5A8A4A' },
          { x: 158,  s: 48, color: '#4CAF50' }, { x: 213,  s: 78, color: '#4A7C40' },
          { x: 268,  s: 58, color: '#5A8A4A' }, { x: 323,  s: 65, color: '#4CAF50' },
          { x: 378,  s: 50, color: '#4A7C40' }, { x: 433,  s: 75, color: '#5A8A4A' },
          { x: 488,  s: 60, color: '#4CAF50' }, { x: 543,  s: 52, color: '#4A7C40' },
          { x: 598,  s: 70, color: '#5A8A4A' }, { x: 653,  s: 62, color: '#4CAF50' },
          { x: 708,  s: 55, color: '#4A7C40' }, { x: 763,  s: 72, color: '#5A8A4A' },
          { x: 818,  s: 48, color: '#4CAF50' }, { x: 873,  s: 78, color: '#4A7C40' },
          { x: 928,  s: 58, color: '#5A8A4A' }, { x: 983,  s: 65, color: '#4CAF50' },
          { x: 1038, s: 50, color: '#4A7C40' }, { x: 1093, s: 75, color: '#5A8A4A' },
          { x: 1148, s: 60, color: '#4CAF50' }, { x: 1203, s: 52, color: '#4A7C40' },
          { x: 1258, s: 70, color: '#5A8A4A' }, { x: 1313, s: 62, color: '#4CAF50' },
          { x: 1368, s: 55, color: '#4A7C40' }, { x: 1423, s: 68, color: '#5A8A4A' },
        ].map(({ x, s, color }, i) => {
          const y = 499 - s * 0.55;
          return (
            <g key={`b-${i}`} opacity="0.65">
              <rect x={x - s*0.08} y={y} width={s*0.16} height={s*0.35} fill="#6D4C41" />
              <polygon points={`${x},${y - s*0.3} ${x - s*0.32},${y + s*0.08} ${x + s*0.32},${y + s*0.08}`} fill={color} />
              <polygon points={`${x},${y - s*0.15} ${x - s*0.22},${y + s*0.13} ${x + s*0.22},${y + s*0.13}`} fill={color} opacity="0.75" />
            </g>
          );
        })}

        {/* Layer C — medium trees sharing x-positions with A (every 72px, opacity 0.87) */}
        {[
          { x: 30,   s: 90,  color: '#2E7D32' }, { x: 102,  s: 120, color: '#388E3C' },
          { x: 174,  s: 100, color: '#8BC34A' }, { x: 246,  s: 115, color: '#2E7D32' },
          { x: 318,  s: 85,  color: '#388E3C' }, { x: 390,  s: 125, color: '#8BC34A' },
          { x: 462,  s: 95,  color: '#2E7D32' }, { x: 534,  s: 110, color: '#388E3C' },
          { x: 606,  s: 88,  color: '#8BC34A' }, { x: 678,  s: 118, color: '#2E7D32' },
          { x: 750,  s: 92,  color: '#388E3C' }, { x: 822,  s: 108, color: '#8BC34A' },
          { x: 894,  s: 85,  color: '#2E7D32' }, { x: 966,  s: 125, color: '#388E3C' },
          { x: 1038, s: 95,  color: '#8BC34A' }, { x: 1110, s: 112, color: '#2E7D32' },
          { x: 1182, s: 90,  color: '#388E3C' }, { x: 1254, s: 118, color: '#8BC34A' },
          { x: 1326, s: 88,  color: '#2E7D32' }, { x: 1398, s: 105, color: '#388E3C' },
        ].map(({ x, s, color }, i) => {
          const y = 499 - s * 0.42;
          return (
            <g key={`c-${i}`} opacity="0.87">
              <rect x={x - s*0.08} y={y} width={s*0.16} height={s*0.38} fill="#5D4037" />
              <polygon points={`${x},${y - s*0.3} ${x - s*0.35},${y + s*0.1} ${x + s*0.35},${y + s*0.1}`} fill={color} />
              <polygon points={`${x},${y - s*0.15} ${x - s*0.25},${y + s*0.15} ${x + s*0.25},${y + s*0.15}`} fill={color} opacity="0.75" />
            </g>
          );
        })}

        {/* Layer D — large foreground trees sharing x-positions with B (every 110px) */}
        {[
          { x: 55,   s: 140, color: '#1B5E20' }, { x: 165,  s: 175, color: '#2E7D32' },
          { x: 275,  s: 150, color: '#388E3C' }, { x: 385,  s: 185, color: '#1B5E20' },
          { x: 495,  s: 130, color: '#2E7D32' }, { x: 605,  s: 170, color: '#1B5E20' },
          { x: 715,  s: 160, color: '#388E3C' }, { x: 825,  s: 145, color: '#2E7D32' },
          { x: 935,  s: 180, color: '#1B5E20' }, { x: 1045, s: 135, color: '#388E3C' },
          { x: 1155, s: 165, color: '#2E7D32' }, { x: 1265, s: 155, color: '#1B5E20' },
          { x: 1375, s: 188, color: '#388E3C' },
        ].map(({ x, s, color }, i) => {
          const y = 499 - s * 0.28;
          return (
            <g key={`d-${i}`}>
              <rect x={x - s*0.08} y={y} width={s*0.16} height={s*0.42} fill="#4E342E" />
              <polygon points={`${x},${y - s*0.35} ${x - s*0.38},${y + s*0.1} ${x + s*0.38},${y + s*0.1}`} fill={color} />
              <polygon points={`${x},${y - s*0.48} ${x - s*0.22},${y - s*0.12} ${x + s*0.22},${y - s*0.12}`} fill={color} opacity="0.88" />
              <polygon points={`${x},${y - s*0.18} ${x - s*0.28},${y + s*0.15} ${x + s*0.28},${y + s*0.15}`} fill={color} opacity="0.75" />
            </g>
          );
        })}
      </svg>

      <style>{`
        @keyframes sunnyFloatLTR {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(100vw + 800px)); }
        }
        @keyframes sunnyFloatRTL {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100vw - 800px)); }
        }
      `}</style>
    </div>
  );
}

export default SunnyBackground;
