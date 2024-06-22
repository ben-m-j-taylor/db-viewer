import { useState, FormEvent } from 'react';
import styled from 'styled-components';

import AddConnectionDataModel from '../types/AddConnectionDataModel';
import { useColourHex } from './app/theming/utils';

const Form = styled.form`
  width: 50%;
  height: 100%;
  padding: 2rem;
`;

const Input = styled.input`
  border: 1px solid ${(props) => useColourHex(props, 'border')};
  background-color: ${(props) => useColourHex(props, 'inputBackground')};
  transition: border-color 0.25s;

  &:focus {
    border-color: ${(props) => useColourHex(props, 'focusBorder')};
  }
`;

type ConnectionSettingsFormProps = {
  onAddConnection: (data: AddConnectionDataModel) => void;
};

export default function ConnectionSettingsForm({
  onAddConnection,
}: ConnectionSettingsFormProps) {
  const [host, setHost] = useState<string>('localhost');
  const [port, setPort] = useState<number>(1433);
  const [username, setUsername] = useState<string>('SA');
  const [password, setPassword] = useState<string>('StrongPassword123');

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
    <Form onSubmit={handleOnSubmit}>
      <Input
        type="text"
        name="host"
        id="host"
        placeholder="Host"
        value={host}
        onChange={(e) => setHost(e.target.value)}
      />
      <Input
        type="text"
        name="port"
        id="port"
        placeholder="Port"
        value={port}
        onChange={(e) => setPort(parseInt(e.target.value))}
      />
      <Input
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Connect</button>
    </Form>
  );
}
