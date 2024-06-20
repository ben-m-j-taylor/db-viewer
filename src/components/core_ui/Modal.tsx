import { forwardRef, type LegacyRef, type PropsWithChildren } from 'react';
import styled from 'styled-components';

const Dialog = styled.dialog`
  padding: 0;
  overflow: hidden;
`;

const Modal = forwardRef(function Modal(
  { children }: PropsWithChildren,
  ref: LegacyRef<HTMLDialogElement>
) {
  return <Dialog ref={ref}>{children}</Dialog>;
});

export default Modal;
