import { useCallback, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import AddConnectionDataModel from "./types/AddConnectionDataModel";

import MonacoEditor from "./MonacoEditor";
import ConnectionSettingsForm from "./ConnectionSettingsForm";

import "./App.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [queryContent, setQueryContent] = useState("");

  async function handleOnAddConnection(
    data: AddConnectionDataModel
  ): Promise<void> {
    const result: boolean = await invoke("add_connection", {
      data,
    });

    setConnected(result);
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
          <MonacoEditor onChange={handleOnChange} />
        </div>
        <div className="results-view grey-border">{queryContent}</div>
      </div>
    </div>
  );
}

export default App;
