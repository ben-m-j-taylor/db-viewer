import styled from 'styled-components'

const StyledToolBar = styled.div`
  width: 100%;
  padding: 16px;
`;

type ToolBarProps = {
  onRunQuery: () => void;
};

export default function ToolBar({ onRunQuery }: ToolBarProps): JSX.Element {
  return (
    <StyledToolBar>
      <button onClick={onRunQuery}>Run query</button>
    </StyledToolBar>
  );
}
