import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your chosen custom theme
        brand: {
          50: "#F5F5F0", // light background
          100: "#E6D8C3", // soft tan (secondary bg)
          200: "#C2A68C", // warm brown (accent)
          300: "#5D866C", // green tone (primary)
        },

        // Main UI tokens
        primary: {
          DEFAULT: "#5D866C",      // main brand green
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E6D8C3",      // soft tan
          foreground: "#3A3A3A",
        },
        accent: {
          DEFAULT: "#C2A68C",      // warm brown
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F5F5F0",      // very soft background
          foreground: "#6B6B6B",
        },
        background: "#F5F5F0",
        foreground: "#3A3A3A",

        border: "#E6D8C3",
        input: "#E6D8C3",
        ring: "#5D866C", // main brand color
      },
    },
  },
  plugins: [],
};

export default config;
