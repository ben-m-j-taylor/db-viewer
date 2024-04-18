import { useCallback, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import AddConnectionDataModel from './types/AddConnectionDataModel';

import MonacoEditor from './MonacoEditor';
import ConnectionSettingsForm from './ConnectionSettingsForm';
import ToolBar from './ToolBar';
import ResultsView from './ResultsView';
import QueryResults from './types/QueryResult';

import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [queryContent, setQueryContent] = useState('');
  const [queryResults, setQueryResults] = useState<QueryResults>();

  async function handleOnAddConnection(
    data: AddConnectionDataModel
  ): Promise<void> {
    const result = await invoke<boolean>('add_connection', {
      data,
    });

    console.log('~> App -> handleOnAddConnection -> result:', result);

    setConnected(result);
  }

  async function handleOnRunQuery(): Promise<void> {
    console.log('~> App -> handleOnRunQuery -> queryContent:', queryContent);

    const result = await invoke<QueryResults>('run_query', {
      query_string: queryContent,
    });

    console.log('~> App -> handleOnRunQuery -> result:', result);

    setQueryResults(result);
  }

  const handleOnChange = useCallback((value: string): void => {
    setQueryContent(value);
  }, []);

  return (
    <div className="container">
      <div className="connection-settings grey-border">
        <ConnectionSettingsForm
          connected={connected}
          onAddConnection={handleOnAddConnection}
        />
      </div>

      <div className="editor-results-split-view">
        <div className="editor-view grey-border">
          <ToolBar onRunQuery={handleOnRunQuery} />
          <MonacoEditor onChange={handleOnChange} />
        </div>
        <ResultsView queryResults={queryResults} />
      </div>
    </div>
  );
}

export default App;
