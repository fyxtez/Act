import Screen from '../Screen/Screen';
import styles from './ResultScreen.module.css';

interface ResultScreenProps {
  active: boolean;
  result: 'win' | 'lose';
  summary: string;
  logText: string;
  onReset: () => void;
}

export default function ResultScreen({
  active,
  result,
  summary,
  logText,
  onReset,
}: ResultScreenProps) {
  const isWin = result === 'win';

  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.icon}>{isWin ? '✓' : '✗'}</div>
      <div className={`${styles.main} ${isWin ? styles.win : styles.lose}`}>
        {isWin ? 'LOOP BROKEN' : 'NEXT TIME'}
      </div>
      <div className={styles.subtext}>
        {summary.split('\n').map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
      <div className={styles.log}>{logText}</div>
      <button className={styles.resetButton} onClick={onReset} type="button">
        BACK TO START
      </button>
    </Screen>
  );
}
