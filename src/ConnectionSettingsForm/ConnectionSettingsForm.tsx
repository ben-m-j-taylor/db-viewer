import { useState, FormEvent } from "react";

import AddConnectionDataModel from "../types/AddConnectionDataModel";

import "./ConnectionSettingsForm.css";

type ConnectionSettingsFormProps = {
  connected: boolean;
  onAddConnection: (data: AddConnectionDataModel) => void;
};

export default function ConnectionSettingsForm({
  connected,
  onAddConnection,
}: ConnectionSettingsFormProps) {
  const [connectionString, setConnectionString] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onAddConnection({
      connectionString,
      username,
      password,
    });
  }

  return (
    <form
      className={`connection-settings-form${connected ? " connected" : ""}`}
      onSubmit={handleOnSubmit}
    >
      <input
        type="text"
        name="connectionString"
        id="connectionString"
        placeholder="Connection string"
        value={connectionString}
        onChange={(e) => setConnectionString(e.target.value)}
      />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Connect</button>
    </form>
  );
}
