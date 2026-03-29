import IdleScreen from './components/IdleScreen/IdleScreen';
import InterruptScreen from './components/InterruptScreen/InterruptScreen';
import ActionScreen from './components/ActionScreen/ActionScreen';
import CountdownScreen from './components/CountdownScreen/CountdownScreen';
import CheckinScreen from './components/CheckinScreen/CheckinScreen';
import EscalationScreen from './components/EscalationScreen/EscalationScreen';
import OutcomeScreen from './components/OutcomeScreen/OutcomeScreen';
import ResultScreen from './components/ResultScreen/ResultScreen';
import { useBreakLoop } from './hooks/useBreakLoop';
import styles from './App.module.css';

export default function App() {
  const state = useBreakLoop();

  return (
    <main className={styles.appShell}>
      <div className={styles.scanlineOverlay} aria-hidden="true" />

      <IdleScreen
        active={state.screen === 'idle'}
        streak={state.streak}
        onTrigger={state.triggerIntervention}
      />

      <InterruptScreen
        active={state.screen === 'interrupt'}
        onContinue={state.goToAction}
      />

      <ActionScreen
        active={state.screen === 'action'}
        onStart={state.startCountdown}
      />

      <CountdownScreen
        active={state.screen === 'countdown'}
        timerText={state.timerText}
        progress={state.progress}
        actionLabel={state.actionLabel}
        warning={state.warning}
      />

      <CheckinScreen
        active={state.screen === 'checkin'}
        onAnswer={state.answerCheckin}
      />

      <EscalationScreen
        active={state.screen === 'escalation'}
        level={state.escalation.level}
        message={state.escalation.message}
        variant={state.escalation.variant}
        onStart={state.escalationStart}
        onIgnore={state.escalationIgnore}
      />

      <OutcomeScreen
        active={state.screen === 'outcome'}
        onSelect={state.logOutcome}
      />

      <ResultScreen
        active={state.screen === 'result'}
        result={state.finalResult}
        summary={state.resultSummary}
        logText={state.logText}
        onReset={state.reset}
      />
    </main>
  );
}
