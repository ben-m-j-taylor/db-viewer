import { useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
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

type MonacoEditorProps = {
  uniqueId: string;
  onChange: (value: string) => void;
};

export default function MonacoEditor({
  uniqueId,
  onChange,
}: MonacoEditorProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const changeEventListenerRef = useRef<IDisposable>();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if (containerRef.current === null || editorRef.current) {
      return;
    }

    editorRef.current = monaco.editor.create(containerRef.current, {
      value: '',
      language: 'sql',
      theme: themeContext?.dark ? 'vs-dark' : 'vs-light',
      minimap: {
        enabled: false,
      },
      automaticLayout: true,
    });

    setIsEditorReady(true);
  }, [themeContext?.dark]);

  useEffect(() => {
    if (isEditorReady && onChange) {
      changeEventListenerRef.current?.dispose();
      changeEventListenerRef.current =
        editorRef.current?.onDidChangeModelContent(() => {
          const value = editorRef.current!.getValue();

          onChange(value);
        });
    }
  }, [isEditorReady, onChange]);

  return (
    <MonacoEditorContainer
      id={`monaco-editor-container-${uniqueId}`}
      ref={containerRef}
    />
  );
}
