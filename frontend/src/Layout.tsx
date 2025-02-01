import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export default Layout;

export interface LayoutProps {
  className?: string;
}

export function Layout(props: LayoutProps) {
  let classes = styles.layout;
  if (props.className) {
    classes += ' ' + props.className;
  }
  return (
    <div className={classes}>
      <Outlet />
    </div>
  );
}
