export type ScreenId =
  | 'idle'
  | 'interrupt'
  | 'action'
  | 'countdown'
  | 'checkin'
  | 'escalation'
  | 'outcome'
  | 'result';

export type OutcomeResult = 'win' | 'lose';
export type CheckinAnswer = 'yes' | 'no';

export interface LogEntry {
  time: string;
  action: string | null;
  nos: number;
  result: OutcomeResult;
}

export interface EscalationStep {
  level: string;
  message: string;
  variant?: 'level2' | 'level3';
}
