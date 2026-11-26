export type Language = 'en' | 'es';

export type Screen =
  | 'entry'
  | 'finish-line'
  | 'first-move'
  | 'action'
  | 'change-step'
  | 'stuck'
  | 'complete'
  | 'done';

export type EntrySource = 'roadmap' | 'own';

export type StuckBlocker =
  | 'dont-know-start'
  | 'too-big'
  | 'time-taken'
  | 'missing-something'
  | 'something-else';

export interface CompletedStep {
  id: string;
  action: string;
  cue: string;
  completedAt: string;
}

export interface FollowThroughState {
  language: Language;
  screen: Screen;
  entrySource: EntrySource | null;
  rawInput: string;
  finishLine: string;
  currentAction: string;
  currentCue: string;
  completedSteps: CompletedStep[];
  finishedAt: string | null;
}
