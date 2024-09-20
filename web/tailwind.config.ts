import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        wave: 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scale(1) skew(0deg, 0deg) rotate(0deg)', opacity: '0.5' },
          '25%': { transform: 'scale(1.1) skew(1deg, 1deg) rotate(90deg)', opacity: '0.7' },
          '50%': { transform: 'scale(1.3) skew(0deg, 0deg) rotate(180deg)', opacity: '0.2' },
          '75%': { transform: 'scale(1.1) skew(-1deg, -1deg) rotate(270deg)', opacity: '0.7' },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        '.scrollbar-none': {
          /* スクロールバーを隠す */
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
        },
      });
    },
  ],
};
export default config;
