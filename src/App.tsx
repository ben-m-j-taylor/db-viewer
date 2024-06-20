// import { useCallback, useState } from 'react';
// import { invoke } from '@tauri-apps/api/tauri';
import styled from 'styled-components';

// import MonacoEditor from './MonacoEditor';
// import ConnectionSettingsForm from './ConnectionSettingsForm';
// import ToolBar from './ToolBar';
// import ResultsView from './ResultsView';
// import QueryResults from './types/QueryResult';
import Connections from './components/Connections';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

// const ConnectionSettings = styled.div`
//   width: 100%;
//   height: 30vh;
//   border: grey 1px solid;
// `;

// const EditorResultsSplitView = styled.div`
//   width: 100%;
//   height: 70vh;
//   display: flex;
//   flex-direction: row;
// `;

// const EditorView = styled.div`
//   width: 50%;
//   height: 100%;
//   border: grey 1px solid;
// `;

function App() {
  // const [connected, setConnected] = useState(false);
  // const [queryContent, setQueryContent] = useState('');
  // const [queryResults, setQueryResults] = useState<QueryResults>();

  // async function handleOnRunQuery(): Promise<void> {
  //   console.log('~> App -> handleOnRunQuery -> queryContent:', queryContent);

  //   const result = await invoke<QueryResults>('run_query', {
  //     query_string: queryContent,
  //   });

  //   console.log('~> App -> handleOnRunQuery -> result:', result);

  //   setQueryResults(result);
  // }

  // const handleOnChange = useCallback((value: string): void => {
  //   setQueryContent(value);
  // }, []);

  return (
    <Container>
      <Connections />

      {/* <ConnectionSettings>
        <ConnectionSettingsForm
          connected={connected}
          onAddConnection={handleOnAddConnection}
        />
      </ConnectionSettings>

      <EditorResultsSplitView>
        <EditorView>
          <ToolBar onRunQuery={handleOnRunQuery} />
          <MonacoEditor onChange={handleOnChange} />
        </EditorView>
        <ResultsView queryResults={queryResults} />
      </EditorResultsSplitView> */}
    </Container>
  );
}

export default App;
