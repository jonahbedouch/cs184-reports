import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import { createThemes } from "tw-colors";

const config: Config = {
  darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    './src/helpers/**/*.{js,ts,jsx,tsx,mdx}',
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      'xs': 'var(--step--2)',
      'sm': 'var(--step--1)',
      'base': 'var(--step-0)',
      'lg': 'var(--step-1)',
      'xl': 'var(--step-2)',
      '2xl': 'var(--step-3)',
      '3xl': 'var(--step-4)',
      '4xl': 'var(--step-5)',
      '5xl': ['var(--step-6)', '1'],
      '6xl': ['var(--step-7)', '1'],
      '7xl': ['var(--step-8)', '1'],
      '8xl': ['var(--step-9)', '1'],
      '9xl': ['var(--step-10)', '1'],
    },
    extend: {
      backgroundImage: {
        'tile': 'url("/light-tile.png")',
        'tile-dark': 'url("/dark-tile.png")'
      },
      backgroundSize: {
        '125px': '125px'
      },
      fontFamily: {
        'sans': "var(--font-rubik)",
        'lato': "var(--font-lato)"
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-s)',
        'md': 'var(--space-m)',
        'lg': 'var(--space-l)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '3xs-2xs': 'var(--space-3xs-2xs)',
        '2xs-xs': 'var(--space-2xs-xs)',
        'xs-sm': 'var(--space-xs-s)',
        'sm-md': 'var(--space-s-m)',
        'md-lg': 'var(--space-m-l)',
        'lg-xl': 'var(--space-l-xl)',
        'xl-2xl': 'var(--space-xl-2xl)',
        '2xl-3xl': 'var(--space-2xl-3xl)',
        '3xs-xl': 'var(--space-3xs-xl)'
      },
      boxShadow: {
        'low': 'var(--shadow-elevation-low)',
        'medium': 'var(--shadow-elevation-medium)',
        'high': 'var(--shadow-elevation-high)',
        'd-low': 'var(--dark-shadow-elevation-low)',
        'd-medium': 'var(--dark-shadow-elevation-medium)',
        'd-high': 'var(--dark-shadow-elevation-high)',
      },
    },
  },
  plugins: [
    createThemes({
      'base': {
        'primary': colors.blue,
        'secondary': { 0: colors.white, 1000: colors.black, ...colors.zinc },
        'text': {
          light: colors.black,
          dark: colors.white
        },
        'shadow-color': {
          DEFAULT: 'hsl(0deg 0% 58%)',
          dark: 'hsl(240deg 17% 0%)'
        },
        'codeblock-bg': {
          light: colors.zinc[100],
          dark: colors.zinc[900]
        }
      },
      'america': {
        'primary': colors.red,
        'secondary': { 0: colors.white, 1000: '#090f22', ...colors.blue },
        'text': {
          light: colors.black,
          dark: colors.white
        },
        'shadow-color': {
          DEFAULT: 'hsl(214deg 30% 60%)',
          dark: 'hsl(227deg 83% 9%)'
        },
        'codeblock-bg': {
          light: '#f5f7fc',
          dark: '#0e1734'
        },
      },
      'labour': {
        'primary': colors.yellow,
        'secondary': { 0: '#fef8f8', 1000: '#220505', ...colors.red },
        'text': {
          light: colors.black,
          dark: colors.white
        },
        'shadow-color': {
          DEFAULT: 'hsl(0deg 24% 61%)',
          dark: 'hsl(0deg 100% 6%)'
        },
        'codeblock-bg': {
          light: '#FEF2F2',
          dark: '#110202'
        }
      }
    }, {
      defaultTheme: 'base'
    })
  ],
};
export default config;
