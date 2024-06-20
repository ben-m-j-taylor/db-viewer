import { forwardRef, type LegacyRef } from 'react';
import styled from 'styled-components';

import AddConnectionDataModel from '../types/AddConnectionDataModel';

import Modal from './core_ui/Modal';
import ConnectionSettingsForm from './ConnectionSettingsForm';
import RecentConnections from './RecentConnections';

const ModalContent = styled.div`
  width: 80vw;
  height: 80vh;
  min-width: 300px;
  min-height: 200px;
  max-width: 900px;
  max-height: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VerticalDivider = styled.div`
  width: 2px;
  height: 90%;
  border: 1px solid grey;
`;

type AddConnectionModalProps = {
  onAddConnection: (data: AddConnectionDataModel) => void;
};

const AddConnectionModal = forwardRef(function AddConnectionModal(
  { onAddConnection }: AddConnectionModalProps,
  ref: LegacyRef<HTMLDialogElement>
) {
  return (
    <Modal ref={ref}>
      <ModalContent>
        <RecentConnections />
        <VerticalDivider />
        <ConnectionSettingsForm onAddConnection={onAddConnection} />
      </ModalContent>
    </Modal>
  );
});

export default AddConnectionModal;
