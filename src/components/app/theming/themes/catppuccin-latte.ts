import type Theme from '../Theme';

const theme: Theme = {
  id: 'catppuccin-latte',
  name: 'Catppuccin Latte',
  dark: false,
  colors: {
    rosewater: {
      name: 'Rosewater',
      hex: '#dc8a78',
      accent: true,
    },
    flamingo: {
      name: 'Flamingo',
      hex: '#dd7878',
      accent: true,
    },
    pink: {
      name: 'Pink',
      hex: '#ea76cb',
      accent: true,
    },
    mauve: {
      name: 'Mauve',
      hex: '#8839ef',
      accent: true,
    },
    red: {
      name: 'Red',
      hex: '#d20f39',
      accent: true,
    },
    maroon: {
      name: 'Maroon',
      hex: '#e64553',
      accent: true,
    },
    peach: {
      name: 'Peach',
      hex: '#fe640b',
      accent: true,
    },
    yellow: {
      name: 'Yellow',
      hex: '#df8e1d',
      accent: true,
    },
    green: {
      name: 'Green',
      hex: '#40a02b',
      accent: true,
    },
    teal: {
      name: 'Teal',
      hex: '#179299',
      accent: true,
    },
    sky: {
      name: 'Sky',
      hex: '#04a5e5',
      accent: true,
    },
    sapphire: {
      name: 'Sapphire',
      hex: '#209fb5',
      accent: true,
    },
    blue: {
      name: 'Blue',
      hex: '#1e66f5',
      accent: true,
    },
    lavender: {
      name: 'Lavender',
      hex: '#7287fd',
      accent: true,
    },
    text: {
      name: 'Text',
      hex: '#4c4f69',
      accent: false,
    },
    subtext1: {
      name: 'Subtext 1',
      hex: '#5c5f77',
      accent: false,
    },
    subtext0: {
      name: 'Subtext 0',
      hex: '#6c6f85',
      accent: false,
    },
    overlay2: {
      name: 'Overlay 2',
      hex: '#7c7f93',
      accent: false,
    },
    overlay1: {
      name: 'Overlay 1',
      hex: '#8c8fa1',
      accent: false,
    },
    overlay0: {
      name: 'Overlay 0',
      hex: '#9ca0b0',
      accent: false,
    },
    surface2: {
      name: 'Surface 2',
      hex: '#acb0be',
      accent: false,
    },
    surface1: {
      name: 'Surface 1',
      hex: '#bcc0cc',
      accent: false,
    },
    surface0: {
      name: 'Surface 0',
      hex: '#ccd0da',
      accent: false,
    },
    base: {
      name: 'Base',
      hex: '#eff1f5',
      accent: false,
    },
    mantle: {
      name: 'Mantle',
      hex: '#e6e9ef',
      accent: false,
    },
    crust: {
      name: 'Crust',
      hex: '#dce0e8',
      accent: false,
    },
  },
  uiColors: {
    background: 'base',
    foreground: 'text',
    disabledForeground: 'subtext0',
    border: 'surface2',
    focusBorder: 'mauve',
    inputBackground: 'surface0',
    background2: 'crust',
  },
};

export default theme;
