import styled, { useTheme } from 'styled-components';

import { Color } from './app/theming/Theme';

const Grid = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const GridItem = styled.div<{ hex: string }>`
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.hex};
`;

export default function ColorGrid() {
  const theme = useTheme();

  const colors: Color[] = [];

  Object.keys(theme.colors).map((key) => {
    const color = theme.colors[key];

    colors.push(color);
  });

  return (
    <Grid>
      {colors.map((color) => {
        console.log('Color:', color);
        return <GridItem hex={color.hex}>{color.name}</GridItem>;
      })}
    </Grid>
  );
}
