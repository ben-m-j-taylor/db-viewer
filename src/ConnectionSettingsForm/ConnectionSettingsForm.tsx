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
  const [host, setHost] = useState<string>("localhost");
  const [port, setPort] = useState<number>(1433);
  const [username, setUsername] = useState<string>("SA");
  const [password, setPassword] = useState<string>("StrongPassword123");

  function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onAddConnection({
      host,
      port,
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
        name="host"
        id="host"
        placeholder="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
      />
      <input
        type="text"
        name="port"
        id="port"
        placeholder="Port"
        value={port}
        onChange={(e) => setPort(parseInt(e.target.value))}
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
