import 'styled-components';
import type Theme from '../components/app/theming/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
