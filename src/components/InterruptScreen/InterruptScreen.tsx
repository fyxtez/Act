import Screen from '../Screen/Screen';
import styles from './InterruptScreen.module.css';

interface InterruptScreenProps {
  active: boolean;
  onContinue: () => void;
}

export default function InterruptScreen({ active, onContinue }: InterruptScreenProps) {
  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.top}>// intervention active</div>
      <div className={styles.line1}>
        STOP. THIS IS AN URGE,
        <br />
        NOT A COMMAND.
      </div>
      <div className={styles.divider} />
      <div className={styles.line2}>
        GO MAKE EGGS NOW
      </div>
      <div className={styles.line3}>EAT YOUR FOOD. NOT JUNK.</div>
      <button className={styles.nextButton} onClick={onContinue} type="button">
        ACT
      </button>
    </Screen>
  );
}
