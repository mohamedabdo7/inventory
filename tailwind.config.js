// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to top, #1671E2, #08E4D2)",
        "gradient-secondary": "linear-gradient(to right,#222329,#1B1B20",
        "gradient-primary-r": "linear-gradient(to left, #1671E2, #08E4D2)",
        "gradient-cards-fill": "linear-gradient(to top, #171717, #171717)",
        "gradient-cards-hover": "linear-gradient(to top, #27272E,#202027)",
        "gradient-cards-fill-b": "linear-gradient(to bottom, #171717, #171717)",
        "gradient-error": "linear-gradient(to top, #B4302A, #FF6D67)",
        "gradient-error-r": "linear-gradient(to left, #B4302A, #FF6D67)",
      },
      colors: {
        cards: {
          DEFAULT: "#171717BA",
          fill: "#171717",
        },
        white: {
          DEFAULT: "#FFF",
          floating: "#F7F5F5",
          deep: "#EDEDED",
        },
        grey: {
          DEFAULT: "#7D7D7D",
          stroke: "#B5B5B5",
          text: "#A0A0A0",
          dark: "#1f1f1f",
          smooked: "#15161773",
          final: "#41414159",
          light: "#F1F1F1",
        },
        green: {
          light: "#08E4D2",
        },
        violet: {
          lavender: "#B984FD",
        },
        success: {
          DEFAULT: "#A3D8A1",
        },
        yellow: { smooked: "#DBD88E" },
        blue: {
          base: "#4081D0",
          bb: "#63ABFD",
        },
        warning: {
          DEFAULT: "#F5B183",
        },
        danger: {
          DEFAULT: "#D06666",
        },
        floating: "#18181980",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
