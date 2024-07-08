import type Theme from '../Theme';

const theme: Theme = {
  id: 'catppuccin-macchiato',
  name: 'Macchiato',
  dark: true,
  colors: {
    rosewater: {
      name: 'Rosewater',
      hex: '#f4dbd6',
      accent: true,
    },
    flamingo: {
      name: 'Flamingo',
      hex: '#f0c6c6',
      accent: true,
    },
    pink: {
      name: 'Pink',
      hex: '#f5bde6',
      accent: true,
    },
    mauve: {
      name: 'Mauve',
      hex: '#c6a0f6',
      accent: true,
    },
    red: {
      name: 'Red',
      hex: '#ed8796',
      accent: true,
    },
    maroon: {
      name: 'Maroon',
      hex: '#ee99a0',
      accent: true,
    },
    peach: {
      name: 'Peach',
      hex: '#f5a97f',
      accent: true,
    },
    yellow: {
      name: 'Yellow',
      hex: '#eed49f',
      accent: true,
    },
    green: {
      name: 'Green',
      hex: '#a6da95',
      accent: true,
    },
    teal: {
      name: 'Teal',
      hex: '#8bd5ca',
      accent: true,
    },
    sky: {
      name: 'Sky',
      hex: '#91d7e3',
      accent: true,
    },
    sapphire: {
      name: 'Sapphire',
      hex: '#7dc4e4',
      accent: true,
    },
    blue: {
      name: 'Blue',
      hex: '#8aadf4',
      accent: true,
    },
    lavender: {
      name: 'Lavender',
      hex: '#b7bdf8',
      accent: true,
    },
    text: {
      name: 'Text',
      hex: '#cad3f5',
      accent: false,
    },
    subtext1: {
      name: 'Subtext 1',
      hex: '#b8c0e0',
      accent: false,
    },
    subtext0: {
      name: 'Subtext 0',
      hex: '#a5adcb',
      accent: false,
    },
    overlay2: {
      name: 'Overlay 2',
      hex: '#939ab7',
      accent: false,
    },
    overlay1: {
      name: 'Overlay 1',
      hex: '#8087a2',
      accent: false,
    },
    overlay0: {
      name: 'Overlay 0',
      hex: '#6e738d',
      accent: false,
    },
    surface2: {
      name: 'Surface 2',
      hex: '#5b6078',
      accent: false,
    },
    surface1: {
      name: 'Surface 1',
      hex: '#494d64',
      accent: false,
    },
    surface0: {
      name: 'Surface 0',
      hex: '#363a4f',
      accent: false,
    },
    base: {
      name: 'Base',
      hex: '#24273a',
      accent: false,
    },
    mantle: {
      name: 'Mantle',
      hex: '#1e2030',
      accent: false,
    },
    crust: {
      name: 'Crust',
      hex: '#181926',
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
