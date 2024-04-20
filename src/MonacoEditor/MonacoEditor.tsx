import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as monaco from 'monaco-editor';
import { type IDisposable, type editor } from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';

const MonacoEditorContainer = styled.div`
  width: 100%;
  height: 100%;
`;

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }

    return new editorWorker();
  },
};

const MONACO_EDITOR_CONTAINER_ID = 'monaco-editor-container';

let created = false;

type MonacoEditorProps = {
  onChange: (value: string) => void;
};

export default function MonacoEditor({
  onChange,
}: MonacoEditorProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const changeEventListenerRef = useRef<IDisposable>();
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    if (containerRef.current === null || created) {
      return;
    }

    created = true;

    editorRef.current = monaco.editor.create(containerRef.current, {
      value: 'SELECT * FROM Users;',
      language: 'sql',
      theme: 'vs-dark',
      minimap: {
        enabled: false,
      },
    });

    setIsEditorReady(true);
  }, []);

  // onDidChangeModelContent
  useEffect(() => {
    if (isEditorReady && onChange) {
      changeEventListenerRef.current?.dispose();
      changeEventListenerRef.current =
        editorRef.current?.onDidChangeModelContent((event) => {
          const value = editorRef.current!.getValue();

          console.log('~> onDidChangeModelContent -> value:', value);
          console.log('~> onDidChangeModelContent -> event:', event);

          onChange(value);
        });
    }
  }, [isEditorReady, onChange]);

  return (
    <MonacoEditorContainer id={MONACO_EDITOR_CONTAINER_ID} ref={containerRef} />
  );
}
