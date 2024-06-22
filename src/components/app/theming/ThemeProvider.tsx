import { useEffect, useState, type PropsWithChildren } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import type Theme from './Theme';

import defaultTheme from './themes/catppuccin-latte';

export default function ThemeProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  function prefersColourSchemeDarkMediaQuery(): MediaQueryList {
    return window.matchMedia('(prefers-color-scheme: dark)');
  }

  async function updateTheme(useDarkColorScheme: boolean): Promise<void> {
    const themeName = useDarkColorScheme
      ? 'catppuccin-mocha'
      : 'catppuccin-latte';

    const importedTheme = (await import(`./themes/${themeName}.ts`)).default;

    setTheme(importedTheme);
  }

  useEffect(() => {
    async function setInitialTheme(): Promise<void> {
      const isPreferredColorSchemeDark =
        prefersColourSchemeDarkMediaQuery().matches;

      await updateTheme(isPreferredColorSchemeDark);
    }

    setInitialTheme();

    return () => {
      setInitialTheme();
    };
  }, []);

  useEffect(() => {
    async function listener(e: MediaQueryListEvent): Promise<void> {
      const isPreferredColorSchemeDark = e.matches;

      await updateTheme(isPreferredColorSchemeDark);
    }

    prefersColourSchemeDarkMediaQuery().addEventListener('change', listener);

    return () => {
      prefersColourSchemeDarkMediaQuery().removeEventListener(
        'change',
        listener
      );
    };
  }, []);

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
