import Screen from '../Screen/Screen';
import styles from './CheckinScreen.module.css';

interface CheckinScreenProps {
  active: boolean;
  onAnswer: (answer: 'yes' | 'no') => void;
}

export default function CheckinScreen({ active, onAnswer }: CheckinScreenProps) {
  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.sub}>// check-in</div>
      <div className={styles.question}>
        DID YOU
        <br />
        START?
      </div>
      <div className={styles.buttons}>
        <button className={styles.yesButton} onClick={() => onAnswer('yes')} type="button">
          YES
        </button>
        <button className={styles.noButton} onClick={() => onAnswer('no')} type="button">
          NO
        </button>
      </div>
    </Screen>
  );
}
