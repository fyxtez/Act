import Screen from '../Screen/Screen';
import styles from './IdleScreen.module.css';

interface IdleScreenProps {
  active: boolean;
  streak: number;
  onTrigger: () => void;
}

export default function IdleScreen({ active, streak, onTrigger }: IdleScreenProps) {
  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.label}>// breakloop v3</div>
      <div className={styles.title}>
        FEEL<span>ING</span>
        <br />
        THE
        <br />
        URGE?
      </div>
      <button className={styles.ctaButton} onClick={onTrigger} type="button">
        ACT
      </button>
      <div className={styles.buttonSubtext}>PRESS WHEN THE URGE HITS</div>
      <div className={styles.streakRow}>
        <span className={styles.streakCount}>{streak}</span>
        <span>urges resisted this week</span>
      </div>
    </Screen>
  );
}
