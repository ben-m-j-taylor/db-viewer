import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 24px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Action = styled.div``;

export default function DefaultView() {
  return (
    <Container>
      <ActionList>
        <Action>Create new connection</Action>
      </ActionList>
    </Container>
  );
}
