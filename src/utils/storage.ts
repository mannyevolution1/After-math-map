import type { FollowThroughState } from '../types/followThrough';

const STORAGE_KEY = 'follow_through_state_v1';

export const DEFAULT_STATE: FollowThroughState = {
  language: 'en',
  screen: 'entry',
  entrySource: null,
  rawInput: '',
  finishLine: '',
  currentAction: '',
  currentCue: '',
  completedSteps: [],
  finishedAt: null,
};

export function loadState(): FollowThroughState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<FollowThroughState>;
    const validScreens = new Set([
      'entry',
      'finish-line',
      'first-move',
      'action',
      'change-step',
      'stuck',
      'complete',
      'done',
    ]);

    const screen = parsed.screen && validScreens.has(parsed.screen) ? parsed.screen : 'entry';
    const language = parsed.language === 'es' ? 'es' : 'en';

    // If the user closed mid-edit on a sub-flow (stuck / change-step / complete) while an active step exists,
    // return cleanly to the main 'action' screen as specified.
    const safeScreen =
      (screen === 'stuck' || screen === 'change-step' || screen === 'complete') &&
      parsed.currentAction &&
      parsed.finishLine
        ? 'action'
        : screen;

    return {
      language,
      screen: safeScreen,
      entrySource:
        parsed.entrySource === 'roadmap' || parsed.entrySource === 'own'
          ? parsed.entrySource
          : null,
      rawInput: typeof parsed.rawInput === 'string' ? parsed.rawInput : '',
      finishLine: typeof parsed.finishLine === 'string' ? parsed.finishLine : '',
      currentAction: typeof parsed.currentAction === 'string' ? parsed.currentAction : '',
      currentCue: typeof parsed.currentCue === 'string' ? parsed.currentCue : '',
      completedSteps: Array.isArray(parsed.completedSteps) ? parsed.completedSteps : [],
      finishedAt: typeof parsed.finishedAt === 'string' ? parsed.finishedAt : null,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveState(state: FollowThroughState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function clearState(keepLanguage: FollowThroughState['language']): FollowThroughState {
  const fresh: FollowThroughState = {
    ...DEFAULT_STATE,
    language: keepLanguage,
  };
  saveState(fresh);
  return fresh;
}
