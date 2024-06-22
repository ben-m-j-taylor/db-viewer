import type Theme from './Theme';

export function useColourHex(
  props: { theme: Theme },
  colourName: keyof Theme['uiColors']
): string {
  return props.theme.colors[props.theme.uiColors[colourName]].hex;
}
