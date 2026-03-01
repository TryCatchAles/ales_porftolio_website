import computerImg from './assets/Random-images/computer-bg-removed-2.png';

function RetroComputer() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', userSelect: 'none', overflow: 'visible' }}>
      <svg
        width="340"
        height="340"
        viewBox="0 0 340 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        style={{ width: 'clamp(200px, 30vw, 340px)', height: 'auto', overflow: 'visible' }}
      >
        {/* Orbital / atomic white lines */}
        <ellipse
          cx="170" cy="155" rx="300" ry="45"
          stroke="white" strokeWidth="1.6" fill="none" opacity="0.85"
          transform="rotate(-12 170 155)"
        />
        <ellipse
          cx="170" cy="155" rx="300" ry="45"
          stroke="white" strokeWidth="1.6" fill="none" opacity="0.85"
          transform="rotate(12 170 155)"
        />

        {/* Computer image — mix-blend-mode:multiply makes the white background
            blend into the page background (dark or light) so it disappears */}
        <image
          href={computerImg}
          x="50" y="30"
          width="250" height="250"
          style={{ mixBlendMode: 'normal' }}
        />
      </svg>
    </div>
  );
}

export default RetroComputer;
