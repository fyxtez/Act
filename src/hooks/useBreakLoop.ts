import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { playBeep } from '../utils/audio';
import type { EscalationStep, LogEntry, OutcomeResult, ScreenId } from '../types';

const TOTAL_SECONDS = 60;
const CHECKIN_SECONDS = [420, 240, 60];
const STORAGE_KEYS = {
  streak: 'bl_streak',
  log: 'bl_log',
} as const;

const ESCALATIONS: EscalationStep[] = [
  { level: '// warning 1', message: 'MOVE.\nGO TO KITCHEN NOW.' },
  { level: '// warning 2', message: 'YOU ARE ABOUT TO\nBREAK YOUR SYSTEM.', variant: 'level2' },
  { level: '// warning 3', message: 'YOU CHOSE THIS.\nOWN IT.', variant: 'level3' },
];

function readStoredNumber(key: string): number {
  const value = Number.parseInt(window.localStorage.getItem(key) || '0', 10);
  return Number.isNaN(value) ? 0 : value;
}

function readStoredLog(): LogEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.log) || '[]';
    const parsed = JSON.parse(raw) as LogEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function formatTimer(secondsLeft: number): string {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useBreakLoop() {
  const [screen, setScreen] = useState<ScreenId>('idle');
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [nextCheckinIndex, setNextCheckinIndex] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [finalResult, setFinalResult] = useState<OutcomeResult>('win');

  const countdownRef = useRef<number | null>(null);

  useEffect(() => {
    setStreak(readStoredNumber(STORAGE_KEYS.streak));
    setLogEntries(readStoredLog());
  }, []);

  const clearCountdown = useCallback(() => {
    if (countdownRef.current !== null) {
      window.clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  const openOutcome = useCallback(() => {
    clearCountdown();
    setScreen('outcome');
  }, [clearCountdown]);

  const runCountdown = useCallback(() => {
    clearCountdown();

    countdownRef.current = window.setInterval(() => {
      setSecondsLeft((previousSeconds) => {
        const nextSeconds = previousSeconds - 1;

        if (nextSeconds <= 0) {
          window.setTimeout(openOutcome, 600);
          return 0;
        }

        if (nextCheckinIndex < CHECKIN_SECONDS.length && nextSeconds === CHECKIN_SECONDS[nextCheckinIndex]) {
          clearCountdown();
          playBeep(660, 3);
          setNextCheckinIndex((currentIndex) => currentIndex + 1);
          setScreen('checkin');
        }

        return nextSeconds;
      });
    }, 1000);
  }, [clearCountdown, nextCheckinIndex, openOutcome]);

  useEffect(() => () => clearCountdown(), [clearCountdown]);

  const triggerIntervention = useCallback(() => {
    playBeep();
    setScreen('interrupt');
  }, []);

  const goToAction = useCallback(() => {
    setScreen('action');
  }, []);

  const startCountdown = useCallback(() => {
    setSelectedAction('eggs');
    setSecondsLeft(TOTAL_SECONDS);
    setNoCount(0);
    setNextCheckinIndex(0);
    setScreen('countdown');
  }, []);

  useEffect(() => {
    if (screen === 'countdown') {
      runCountdown();
    }
  }, [runCountdown, screen]);

  const showEscalation = useCallback(() => {
    playBeep(440, 2);
    setScreen('escalation');
    setNoCount((current) => current + 1);
  }, []);

  const answerCheckin = useCallback(
    (answer: 'yes' | 'no') => {
      if (answer === 'yes') {
        setScreen('countdown');
        return;
      }

      showEscalation();
    },
    [showEscalation],
  );

  const escalationStart = useCallback(() => {
    setScreen('countdown');
  }, []);

  const escalationIgnore = useCallback(() => {
    setScreen('countdown');
  }, []);

  const logOutcome = useCallback(
    (result: OutcomeResult) => {
      const entry: LogEntry = {
        time: new Date().toISOString(),
        action: selectedAction,
        nos: noCount,
        result,
      };

      const nextLog = [entry, ...logEntries].slice(0, 50);
      setLogEntries(nextLog);
      window.localStorage.setItem(STORAGE_KEYS.log, JSON.stringify(nextLog));

      if (result === 'win') {
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        window.localStorage.setItem(STORAGE_KEYS.streak, String(nextStreak));
      }

      setFinalResult(result);
      clearCountdown();
      setScreen('result');
    },
    [clearCountdown, logEntries, noCount, selectedAction, streak],
  );

  const reset = useCallback(() => {
    clearCountdown();
    setScreen('idle');
    setSecondsLeft(TOTAL_SECONDS);
    setNextCheckinIndex(0);
    setNoCount(0);
    setSelectedAction(null);
  }, [clearCountdown]);

  const escalationIndex = Math.min(Math.max(noCount - 1, 0), ESCALATIONS.length - 1);
  const escalation = ESCALATIONS[escalationIndex];

  const timerText = useMemo(() => formatTimer(secondsLeft), [secondsLeft]);
  const logText = useMemo(() => {
    const now = new Date();
    const noText = noCount > 0 ? ` · ${noCount} no${noCount > 1 ? 's' : ''}` : '';
    return `logged at ${now.toLocaleTimeString()} · ${logEntries.length} total entries${noText}`;
  }, [logEntries.length, noCount]);

  const resultSummary =
    finalResult === 'win'
      ? 'YOU HELD THE LINE.\nEVERY WIN WEAKENS THE URGE.'
      : "THE LOOP WON THIS TIME.\nIT WON'T WIN FOREVER.";

  return {
    screen,
    streak,
    timerText,
    progress: secondsLeft / TOTAL_SECONDS,
    warning: secondsLeft <= 60,
    actionLabel: selectedAction ? 'MAKE EGGS NOW' : '—',
    escalation,
    finalResult,
    resultSummary,
    logText,
    triggerIntervention,
    goToAction,
    startCountdown,
    answerCheckin,
    escalationStart,
    escalationIgnore,
    logOutcome,
    reset,
  };
}
