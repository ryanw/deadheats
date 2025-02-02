import { useNavigate } from 'react-router-dom';
import styles from './Modal.module.css';
import Panel from './Panel';

export default Modal;

export interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export function Modal(props: ModalProps) {
  let classes = styles.modal;
  if (props.className) {
    classes += ' ' + props.className;
  }

  function close() {
    props.onClose?.();
  }

  function onClickBackground(e: React.MouseEvent) {
    // Ignore clicks on the dialog
    if (e.currentTarget !== e.target) {
      return;
    }

    close();
  }

  return (
    <div className={styles.bg} onClick={onClickBackground}>
      <Panel className={classes}>
        {props.children}
        <button type="button" onClick={close}>Close</button>
      </Panel>
    </div>
  );
}
