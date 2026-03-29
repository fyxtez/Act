import Screen from '../Screen/Screen';
import styles from './OutcomeScreen.module.css';

interface OutcomeScreenProps {
  active: boolean;
  onSelect: (result: 'win' | 'lose') => void;
}

export default function OutcomeScreen({ active, onSelect }: OutcomeScreenProps) {
  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.title}>
        TIME'S UP.
        <br />
        WHAT HAPPENED?
      </div>
      <div className={styles.sub}>// log your outcome</div>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.winButton}`} onClick={() => onSelect('win')} type="button">
          I ATE FROM MY STACK
        </button>
        <button className={`${styles.button} ${styles.loseButton}`} onClick={() => onSelect('lose')} type="button">
          I BOUGHT JUNK
        </button>
      </div>
    </Screen>
  );
}
