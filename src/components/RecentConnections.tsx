import styled from 'styled-components';

const mockData = [
  {
    name: 'Test DB 1',
    lastConnection: '02/06/2023',
    databaseType: 'MSSQL',
    readonly: false,
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    name: 'Test DB 2',
    lastConnection: '02/06/2023',
    databaseType: 'MSSQL',
    readonly: false,
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    name: 'Test DB 3',
    lastConnection: '02/06/2023',
    databaseType: 'MSSQL',
    readonly: false,
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    name: 'Test DB 4',
    lastConnection: '02/06/2023',
    databaseType: 'MSSQL',
    readonly: false,
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    name: 'Test DB 5',
    lastConnection: '02/06/2023',
    databaseType: 'MSSQL',
    readonly: false,
    tags: ['tag1', 'tag2', 'tag3'],
  },
  {
    name: 'Test DB 6',
    lastConnection: '02/06/2023',
    databaseType: 'MSSQL',
    readonly: false,
    tags: ['tag1', 'tag2', 'tag3'],
  },
];

const Container = styled.div`
  width: 50%;
  height: 100%;
  padding: 2rem;
`;

const Heading = styled.h2`
  height: 10%;
`;

const CardList = styled.div`
  height: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-x: scroll;
  border: 1px dotted blue;
`;

const Card = styled.div`
  width: 100%;
  height: 60px;
  padding: 1rem;
  border: 1px solid grey;
`;

export default function RecentConnections() {
  return (
    <Container>
      <Heading>Recent Connections</Heading>

      <CardList>
        {mockData.map((data) => (
          <Card>{data.name}</Card>
        ))}
      </CardList>
    </Container>
  );
}
