import styles from './Panel.module.css';
import classNames from 'classnames';

export interface PanelProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Panel(props: PanelProps) {
  return (
    <div className={classNames(styles.panel, props.className)}>
      {props.children}
    </div>
  );
}
