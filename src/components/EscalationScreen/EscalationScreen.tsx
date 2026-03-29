import Screen from '../Screen/Screen';
import styles from './EscalationScreen.module.css';

interface EscalationScreenProps {
  active: boolean;
  level: string;
  message: string;
  variant?: 'level2' | 'level3';
  onStart: () => void;
  onIgnore: () => void;
}

export default function EscalationScreen({
  active,
  level,
  message,
  variant,
  onStart,
  onIgnore,
}: EscalationScreenProps) {
  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.level}>{level}</div>
      <div className={`${styles.message} ${variant ? styles[variant] : ''}`}>
        {message.split('\n').map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.startButton} onClick={onStart} type="button">
          START NOW
        </button>
        <button className={styles.ignoreButton} onClick={onIgnore} type="button">
          I'm ignoring this
        </button>
      </div>
    </Screen>
  );
}
