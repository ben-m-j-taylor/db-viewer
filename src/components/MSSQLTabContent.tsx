import { useCallback, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import styled from 'styled-components';

import QueryResults from '../types/QueryResult';

import MonacoEditor from './MonacoEditor';
import ToolBar from './ToolBar';
import ResultsView from './ResultsView';

const EditorResultsSplitView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const EditorView = styled.div`
  width: 50%;
  height: calc(100% - 75px);
  border: grey 1px solid;
`;

type MSSQLTabContentProps = {
  connectionId: string;
};

export default function MSSQLTabContent({
  connectionId,
}: MSSQLTabContentProps) {
  const [queryContent, setQueryContent] = useState('');
  const [queryResults, setQueryResults] = useState<QueryResults>();

  async function handleOnRunQuery(): Promise<void> {
    const result = await invoke<QueryResults>('run_query', {
      data: {
        connection_id: connectionId,
        query_string: queryContent,
      },
    });

    setQueryResults(result);
  }

  const handleOnChange = useCallback((value: string): void => {
    setQueryContent(value);
  }, []);

  return (
    <EditorResultsSplitView>
      <EditorView>
        <ToolBar onRunQuery={handleOnRunQuery} />
        <MonacoEditor uniqueId={connectionId} onChange={handleOnChange} />
      </EditorView>
      <ResultsView queryResults={queryResults} />
    </EditorResultsSplitView>
  );
}
