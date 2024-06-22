import { forwardRef, type LegacyRef, type PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useColourHex } from '../app/theming/utils';

const Dialog = styled.dialog`
  padding: 0;
  overflow: hidden;
  border: 2px solid ${(props) => useColourHex(props, 'border')};
  background-color: ${(props) => useColourHex(props, 'background')};
`;

const Modal = forwardRef(function Modal(
  { children }: PropsWithChildren,
  ref: LegacyRef<HTMLDialogElement>
) {
  return <Dialog ref={ref}>{children}</Dialog>;
});

export default Modal;
