export type Color = {
  name: string;
  hex: string;
  accent: boolean;
};

export type UIColors = {
  background: string;
  foreground: string;
  disabledForeground: string;
  border: string;
  focusBorder: string;
  inputBackground: string;
};

type Theme = {
  id: string;
  name: string;
  dark: boolean;
  colors: Record<string, Color>;
  uiColors: UIColors;
};

export default Theme;
