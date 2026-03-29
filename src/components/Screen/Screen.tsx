import type { PropsWithChildren } from 'react';
import styles from './Screen.module.css';

interface ScreenProps extends PropsWithChildren {
  active: boolean;
  screenClassName?: string;
}

export default function Screen({ active, screenClassName, children }: ScreenProps) {
  const className = [styles.screen, active ? styles.active : '', screenClassName ?? '']
    .filter(Boolean)
    .join(' ');

  return <section className={className}>{children}</section>;
}
