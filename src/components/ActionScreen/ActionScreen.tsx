import Screen from '../Screen/Screen';
import styles from './ActionScreen.module.css';

interface ActionScreenProps {
  active: boolean;
  onStart: () => void;
}

export default function ActionScreen({ active, onStart }: ActionScreenProps) {
  return (
    <Screen active={active} screenClassName={styles.screen}>
      <div className={styles.label}>// one action. no alternatives.</div>
      <div className={styles.title}>
        MAKE
        <br />
        EGGS
        <br />
        NOW
      </div>
      <div className={styles.subtitle}>GO TO THE KITCHEN</div>
      <button className={styles.button} onClick={onStart} type="button">
        I'M GOING NOW
      </button>
    </Screen>
  );
}
