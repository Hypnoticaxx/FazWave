import React, { useEffect, useRef } from 'react';
import { useThemeStore } from '../../stores/themeStore';
import { usePlayerStore } from '../../stores/playerStore';

export default function ThemeBackground() {
  const { activeTheme, themes } = useThemeStore();
  const { beatIntensity, isPlaying } = usePlayerStore();
  const theme = themes[activeTheme];
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!theme?.animations) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId;
    let particles = [];

    const initParticles = () => {
      particles = [];
      const count = 50;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          hue: Math.random() * 60 + (activeTheme === 'pastel-rainbow' ? 280 : 0),
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY * (1 + beatIntensity * 0.5);
        p.x += p.speedX;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + beatIntensity * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTheme, beatIntensity, theme?.animations]);

  if (!theme) return null;

  const getBackgroundStyle = () => {
    if (theme.colors?.background) {
      return { background: theme.colors.background };
    }
    return {};
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={getBackgroundStyle()}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {theme.animations?.stars && (
        <div className="stars-layer absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {theme.animations?.confetti && isPlaying && (
        <div className="confetti-layer absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#f8b4d9', '#a78bfa', '#67e8f9', '#fbbf24', '#34d399'][i % 5],
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {theme.animations?.glitch && (
        <div className="glitch-layer absolute inset-0 mix-blend-overlay opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-glitch" />
        </div>
      )}

      {theme.animations?.staticNoise && (
        <div className="static-layer absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      )}

      {theme.animations?.crtScanlines && (
        <div className="scanlines-layer absolute inset-0 opacity-10" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }} />
      )}

      {theme.animations?.flickerLights && (
        <div className="flicker-layer absolute inset-0 animate-flicker bg-gradient-radial from-transparent to-black/20" />
      )}

      {theme.animations?.petals && (
        <div className="petals-layer absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-fall opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 5 + 5}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      {theme.animations?.floatingApples && (
        <div className="apples-layer absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-3xl animate-float opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              🍎
            </div>
          ))}
        </div>
      )}

      {theme.animations?.iceParticles && (
        <div className="ice-layer absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-lg animate-fall opacity-50"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 8 + 4}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}

      {theme.animations?.fallingCards && (
        <div className="cards-layer absolute inset-0">
          {['♠️', '♥️', '♣️', '♦️'].map((suit, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-fall opacity-40"
              style={{
                left: `${20 + i * 20}%`,
                animationDuration: `${Math.random() * 6 + 4}s`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {suit}
            </div>
          ))}
        </div>
      )}

      {theme.animations?.speedTrails && isPlaying && (
        <div className="speed-layer absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
              style={{
                left: '-100%',
                top: `${10 + i * 8}%`,
                width: '200%',
                animation: `speedTrail ${0.5 + i * 0.1}s linear infinite`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes speedTrail {
          from { transform: translateX(-50%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
