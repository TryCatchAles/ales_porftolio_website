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

        {/* Monitor top face (3-D top) */}
        <polygon
          points="110,82 230,82 246,66 126,66"
          fill="#d4cfe8" stroke="#a59ec0" strokeWidth="1.2" strokeLinejoin="round"
        />
        {/* Monitor right side face (3-D side) */}
        <polygon
          points="230,82 246,66 246,168 230,182"
          fill="#b0a8cc" stroke="#a59ec0" strokeWidth="1.2" strokeLinejoin="round"
        />
        {/* Monitor front face */}
        <rect x="110" y="82" width="120" height="100" rx="6" fill="#ccc8e2" stroke="#a59ec0" strokeWidth="1.2" />

        {/* Screen bezel inset */}
        <rect x="120" y="90" width="96" height="72" rx="4" fill="#b8b4d4" stroke="#a59ec0" strokeWidth="1" />
        {/* Screen glass */}
        <rect x="124" y="93" width="88" height="66" rx="3" fill="#e8f4ff" stroke="#c0c8e0" strokeWidth="0.8" />
        {/* Screen shine */}
        <rect x="126" y="95" width="36" height="22" rx="2" fill="white" opacity="0.5" />

        {/* Front panel buttons */}
        <rect x="125" y="170" width="8" height="5" rx="1.5" fill="#a59ec0" />
        <rect x="136" y="170" width="8" height="5" rx="1.5" fill="#a59ec0" />
        <rect x="147" y="170" width="8" height="5" rx="1.5" fill="#a59ec0" />
        {/* Disk slot */}
        <rect x="165" y="171" width="30" height="3" rx="1" fill="#b0a8cc" />
        {/* Power light */}
        <circle cx="202" cy="173" r="2.2" fill="#88dd88" />

        {/* Monitor base neck */}
        <rect x="148" y="182" width="24" height="12" rx="2" fill="#bfbad6" stroke="#a59ec0" strokeWidth="1" />
        {/* Base 3-D top */}
        <polygon points="130,194 210,194 218,187 138,187" fill="#d0cbe6" stroke="#a59ec0" strokeWidth="1" strokeLinejoin="round" />
        {/* Base right face */}
        <polygon points="210,194 218,187 218,208 210,215" fill="#b0a8cc" stroke="#a59ec0" strokeWidth="1" strokeLinejoin="round" />
        {/* Base front */}
        <rect x="130" y="194" width="80" height="21" rx="4" fill="#c8c2de" stroke="#a59ec0" strokeWidth="1" />
        {/* Base front details */}
        <rect x="140" y="200" width="28" height="3" rx="1" fill="#b0a8cc" />
        <rect x="175" y="200" width="14" height="3" rx="1" fill="#b0a8cc" />
        <circle cx="198" cy="208" r="2" fill="#a59ec0" />
      </svg>
    </div>
  );
}

export default RetroComputer;
