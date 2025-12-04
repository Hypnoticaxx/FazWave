import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useThemeStore = create(
  persist(
    (set) => ({
      activeTheme: 'pastel-rainbow',
      secretUnlocked: false,
      
      setTheme: (theme) => set({ activeTheme: theme }),
      
      unlockSecret: (code) => {
        if (code.toLowerCase() === 'afton') {
          set({ secretUnlocked: true, activeTheme: 'blue-valentine' });
          return true;
        }
        return false;
      },

      themes: {
        'pastel-rainbow': {
          name: 'Pastel Rainbow',
          colors: {
            primary: '#f8b4d9',
            secondary: '#a78bfa',
            accent: '#67e8f9',
            background: 'linear-gradient(135deg, #fce7f3 0%, #ddd6fe 50%, #cffafe 100%)',
          },
          animations: {
            stars: true,
            confetti: true,
          },
        },
        'blue-valentine': {
          name: 'Blue Valentine',
          secret: true,
          colors: {
            primary: '#3b82f6',
            secondary: '#ec4899',
            accent: '#8b5cf6',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #831843 100%)',
          },
          animations: {
            petals: true,
            neonWaves: true,
            ribbonTrails: true,
            particleSparkle: true,
            bloom: true,
            chromaticAberration: true,
            liquidLens: true,
            lyricPulse: true,
          },
        },
        'lucifer': {
          name: 'Lucifer',
          colors: {
            primary: '#fbbf24',
            secondary: '#dc2626',
            accent: '#f97316',
            background: 'linear-gradient(135deg, #1a0a0a 0%, #450a0a 50%, #431407 100%)',
          },
          animations: {
            floatingApples: true,
            glowGradient: 'dark-red-gold',
            mist: true,
          },
        },
        'vox': {
          name: 'Vox',
          colors: {
            primary: '#06b6d4',
            secondary: '#3b82f6',
            accent: '#8b5cf6',
            background: 'linear-gradient(135deg, #0c0a1d 0%, #1e1b4b 50%, #0e7490 100%)',
          },
          animations: {
            hypnoticSwirl: true,
            ripple: true,
            neonGlow: true,
          },
        },
        'fnaf': {
          name: 'FNaF',
          colors: {
            primary: '#7c3aed',
            secondary: '#4c1d95',
            accent: '#fbbf24',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 50%, #2d1f4e 100%)',
          },
          animations: {
            glitch: true,
            staticNoise: true,
            crtScanlines: true,
            vhsEdges: true,
            flickerLights: true,
            alarmLights: true,
            eyeGlow: true,
            cameraSwitch: true,
            shadowMovement: true,
            chromaticShift: true,
            dimSecurityOffice: true,
            animatronicSilhouettes: true,
          },
        },
        'alastor': {
          name: 'Alastor',
          colors: {
            primary: '#dc2626',
            secondary: '#7f1d1d',
            accent: '#fbbf24',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #450a0a 50%, #1a0a0a 100%)',
          },
          animations: {
            radioSigils: true,
            static: true,
            colors: 'dark-red-black',
          },
        },
        'charlie': {
          name: 'Charlie',
          colors: {
            primary: '#fbbf24',
            secondary: '#f97316',
            accent: '#ec4899',
            background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #92400e 100%)',
          },
          animations: {
            warmColors: true,
            sparkles: true,
          },
        },
        'angel-dust': {
          name: 'Angel Dust',
          colors: {
            primary: '#ec4899',
            secondary: '#f472b6',
            accent: '#fdf4ff',
            background: 'linear-gradient(135deg, #500724 0%, #831843 50%, #701a75 100%)',
          },
          animations: {
            glamorousSparkles: true,
            feathers: true,
          },
        },
        'vaggie': {
          name: 'Vaggie',
          colors: {
            primary: '#a1a1aa',
            secondary: '#71717a',
            accent: '#ec4899',
            background: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
          },
          animations: {
            particleEffects: true,
            xMarks: true,
          },
        },
        'husk': {
          name: 'Husk',
          colors: {
            primary: '#f97316',
            secondary: '#dc2626',
            accent: '#fbbf24',
            background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)',
          },
          animations: {
            fallingCards: true,
            casinoMotifs: true,
            whiskey: true,
          },
        },
        'sonic-blue': {
          name: 'Sonic Blue',
          colors: {
            primary: '#3b82f6',
            secondary: '#1d4ed8',
            accent: '#fbbf24',
            background: 'linear-gradient(135deg, #0c1929 0%, #1e3a5f 50%, #172554 100%)',
          },
          animations: {
            speedTrails: true,
            electricGlow: true,
            rings: true,
          },
        },
        'tails-yellow': {
          name: 'Tails Yellow',
          colors: {
            primary: '#fbbf24',
            secondary: '#f59e0b',
            accent: '#ffffff',
            background: 'linear-gradient(135deg, #451a03 0%, #78350f 50%, #92400e 100%)',
          },
          animations: {
            streaks: 'golden',
            propeller: true,
          },
        },
        'knuckles-red': {
          name: 'Knuckles Red',
          colors: {
            primary: '#dc2626',
            secondary: '#b91c1c',
            accent: '#22c55e',
            background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)',
          },
          animations: {
            streaks: 'crimson',
            emeralds: true,
          },
        },
        'shadow-black': {
          name: 'Shadow Black',
          colors: {
            primary: '#dc2626',
            secondary: '#0a0a0a',
            accent: '#fbbf24',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #171717 50%, #1f1f1f 100%)',
          },
          animations: {
            pulses: 'crimson',
            chaosControl: true,
          },
        },
        'ichigo': {
          name: 'Ichigo',
          colors: {
            primary: '#f97316',
            secondary: '#0a0a0a',
            accent: '#3b82f6',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1c1917 50%, #431407 100%)',
          },
          animations: {
            energyParticles: true,
            bankai: true,
          },
        },
        'rukia': {
          name: 'Rukia',
          colors: {
            primary: '#a5b4fc',
            secondary: '#6366f1',
            accent: '#ffffff',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
          },
          animations: {
            iceParticles: true,
            snowflakes: true,
          },
        },
        'hollow': {
          name: 'Hollow',
          colors: {
            primary: '#ffffff',
            secondary: '#0a0a0a',
            accent: '#dc2626',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 50%, #171717 100%)',
          },
          animations: {
            maskOverlay: true,
            reiatsu: true,
          },
        },
        'espada': {
          name: 'Espada',
          colors: {
            primary: '#a855f7',
            secondary: '#6b21a8',
            accent: '#ffffff',
            background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #581c87 100%)',
          },
          animations: {
            energyParticles: true,
            cero: true,
          },
        },
      },
    }),
    {
      name: 'fazwave-theme',
    }
  )
);
