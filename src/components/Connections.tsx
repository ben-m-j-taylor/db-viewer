import { useRef, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri';

import AddConnectionDataModel from '../types/AddConnectionDataModel';

import DefaultView from './DefaultView';
import Tabs, { type TabData } from './core_ui/Tabs';
import MSSQLTabContent from './MSSQLTabContent';
import AddConnectionModal from './AddConnectionModal';

export default function Connections() {
  const addConnectionModalRef = useRef<HTMLDialogElement>(null);

  const [tabs, setTabs] = useState<TabData[]>([]);

  function handleOnAddTabClicked() {
    addConnectionModalRef.current?.showModal();
  }

  async function handleOnAddConnection(
    data: AddConnectionDataModel
  ): Promise<void> {
    const result = await invoke<boolean>('add_connection', {
      data,
    });

    console.log('~> Connections -> handleOnAddConnection -> result:', result);

    setTabs([
      ...tabs,
      {
        title: data.host,
        content: <MSSQLTabContent />,
      },
    ]);

    addConnectionModalRef.current?.close();
  }

  return (
    <>
      <Tabs
        tabs={tabs}
        defaultComponent={<DefaultView />}
        onAddTabClicked={handleOnAddTabClicked}
      />
      <AddConnectionModal
        ref={addConnectionModalRef}
        onAddConnection={handleOnAddConnection}
      />
    </>
  );
}
