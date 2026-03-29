import Screen from '../Screen/Screen';
import styles from './CountdownScreen.module.css';

interface CountdownScreenProps {
  active: boolean;
  timerText: string;
  progress: number;
  actionLabel: string;
  warning: boolean;
}

export default function CountdownScreen({
  active,
  timerText,
  progress,
  actionLabel,
  warning,
}: CountdownScreenProps) {
  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.label}>// hold the line</div>
      <div className={`${styles.timer} ${warning ? styles.warning : ''}`}>{timerText}</div>
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className={styles.actionTaken}>
        your action: <span>{actionLabel}</span>
      </div>
      <div className={styles.reminders}>
        <div className={styles.reminderItem}>
          <div className={styles.dot} />
          YOU DO NOT EAT JUNK
        </div>
        <div className={styles.reminderItem}>
          <div className={styles.dot} />
          EAT FROM YOUR STACK ONLY
        </div>
        <div className={styles.reminderItem}>
          <div className={styles.dot} />
          WAIT BEFORE ACTING
        </div>
      </div>
    </Screen>
  );
}
