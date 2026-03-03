import { useEffect, useRef } from 'react';

function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const stars = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Shooting stars
    const shootingStars = [];
    const tints = [
      { r: 160, g: 200, b: 255 }, // soft blue
      { r: 200, g: 160, b: 255 }, // soft purple
      { r: 180, g: 255, b: 220 }, // soft mint
    ];

    const spawnShootingStar = () => {
      const angle = Math.PI * 0.04 + Math.random() * (Math.PI * 0.08); // ~7–22° slight downward tilt
      const tint = tints[Math.floor(Math.random() * tints.length)];
      return {
        x: -20,
        y: Math.random() * canvas.height * 0.55,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 6 + 7,
        opacity: 1,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
        sparkle: 0,
        tint,
      };
    };

    let spawnCountdown = Math.floor(Math.random() * 400 + 150);

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        star.opacity = ((Math.sin(star.twinklePhase) + 1) / 2) * 0.8 + 0.2;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        if (star.radius > 1) {
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0, star.x, star.y, star.radius * 3
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Randomly spawn a new shooting star (max 2 at once)
      if (spawnCountdown > 0) {
        spawnCountdown--;
      } else {
        if (shootingStars.length < 2) {
          shootingStars.push(spawnShootingStar());
        }
        spawnCountdown = Math.floor(Math.random() * 500 + 200);
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];

        s.x += s.speed * s.dx;
        s.y += s.speed * s.dy;
        s.sparkle += 0.3;

        // Fade in for first 20% of travel, fade out at end
        const traveled = s.x / canvas.width;
        s.opacity = traveled < 0.2
          ? traveled / 0.2
          : Math.max(0, 1 - (traveled - 0.2) / 0.8);

        // Draw tail
        const tailX = s.x - s.length * s.dx;
        const tailY = s.y - s.length * s.dy;

        const { r, g, b } = s.tint;
        const tailGrad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        tailGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        tailGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${s.opacity * 0.35})`);
        tailGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head glow
        const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 5);
        headGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${s.opacity})`);
        headGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();

        // Sparkle: 4-point star cross at the head
        const spk = (Math.sin(s.sparkle) * 0.5 + 0.5) * s.opacity;
        const spkLen = 7 + Math.sin(s.sparkle * 1.3) * 3;
        ctx.save();
        ctx.globalAlpha = spk;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 1)`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(s.x - spkLen, s.y);
        ctx.lineTo(s.x + spkLen, s.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(s.x, s.y - spkLen * 0.6);
        ctx.lineTo(s.x, s.y + spkLen * 0.6);
        ctx.stroke();
        ctx.restore();

        // Remove when off-screen
        if (s.x > canvas.width + s.length) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
      stars.forEach((star) => {
        star.x = Math.random() * canvas.width;
        star.y = Math.random() * canvas.height;
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -10 }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, #0a0e27, #16213e, #0f3460)',
      }} />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: '25%',
        width: '24rem',
        height: '24rem',
        background: 'rgba(168, 85, 247, 0.1)',
        borderRadius: '50%',
        filter: 'blur(120px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: '25%',
        width: '24rem',
        height: '24rem',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(120px)',
      }} />
    </div>
  );
}

export default StarryBackground;
