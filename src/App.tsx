import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import type {
  CompletedStep,
  EntrySource,
  FollowThroughState,
  Language,
} from './types/followThrough';
import { TRANSLATIONS } from './i18n/translations';
import { clearState, loadState, saveState } from './utils/storage';
import { Header } from './components/Header';
import { EntryScreen } from './components/EntryScreen';
import { FinishLineScreen } from './components/FinishLineScreen';
import { FirstMoveScreen } from './components/FirstMoveScreen';
import { ActionScreen } from './components/ActionScreen';
import { ChangeStepScreen } from './components/ChangeStepScreen';
import { StuckScreen } from './components/StuckScreen';
import { CompleteScreen } from './components/CompleteScreen';
import { DoneScreen } from './components/DoneScreen';

function createStepId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `step_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [state, setState] = useState<FollowThroughState>(() => loadState());

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    document.documentElement.lang = state.language;
  }, [state.language]);

  const t = TRANSLATIONS[state.language];

  const handleLanguageChange = (language: Language) => {
    setState((prev) => ({ ...prev, language }));
  };

  const handleStartOver = () => {
    setState((prev) => clearState(prev.language));
  };

  const handleEntryContinue = (source: EntrySource, rawInput: string) => {
    setState((prev) => ({
      ...prev,
      entrySource: source,
      rawInput,
      finishLine: prev.rawInput === rawInput ? prev.finishLine : '',
      screen: 'finish-line',
    }));
  };

  const handleFinishLineConfirm = (finishLine: string) => {
    setState((prev) => ({
      ...prev,
      finishLine,
      screen: 'first-move',
    }));
  };

  const handleFirstMoveSave = (action: string, cue: string) => {
    setState((prev) => ({
      ...prev,
      currentAction: action,
      currentCue: cue,
      screen: 'action',
    }));
  };

  const handleChangeStepSave = (action: string, cue: string) => {
    setState((prev) => ({
      ...prev,
      currentAction: action,
      currentCue: cue,
      screen: 'action',
    }));
  };

  const handleStuckSave = (newAction: string, newCue: string) => {
    setState((prev) => ({
      ...prev,
      currentAction: newAction,
      currentCue: newCue,
      screen: 'action',
    }));
  };

  const handleFinishGoal = () => {
    setState((prev) => {
      const doneStep: CompletedStep = {
        id: createStepId(),
        action: prev.currentAction,
        cue: prev.currentCue,
        completedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        completedSteps: [...prev.completedSteps, doneStep],
        finishedAt: new Date().toISOString(),
        screen: 'done',
      };
    });
  };

  const handleContinueNextStep = (nextAction: string, nextCue: string) => {
    setState((prev) => {
      const doneStep: CompletedStep = {
        id: createStepId(),
        action: prev.currentAction,
        cue: prev.currentCue,
        completedAt: new Date().toISOString(),
      };
      return {
        ...prev,
        completedSteps: [...prev.completedSteps, doneStep],
        currentAction: nextAction,
        currentCue: nextCue,
        screen: 'action',
      };
    });
  };

  const showStartOver = state.screen !== 'entry' || Boolean(state.rawInput);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#09090B] text-zinc-50 flex flex-col">
        <Header
          language={state.language}
          onLanguageChange={handleLanguageChange}
          showStartOver={showStartOver}
          onStartOver={handleStartOver}
          t={t}
        />

        <main className="flex-1 w-full mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.screen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            >
              {state.screen === 'entry' && (
                <EntryScreen
                  initialSource={state.entrySource}
                  initialText={state.rawInput}
                  onContinue={handleEntryContinue}
                  t={t}
                />
              )}

              {state.screen === 'finish-line' && (
                <FinishLineScreen
                  language={state.language}
                  entrySource={state.entrySource}
                  rawInput={state.rawInput}
                  initialFinishLine={state.finishLine}
                  onBack={() => setState((prev) => ({ ...prev, screen: 'entry' }))}
                  onConfirm={handleFinishLineConfirm}
                  t={t}
                />
              )}

              {state.screen === 'first-move' && (
                <FirstMoveScreen
                  language={state.language}
                  finishLine={state.finishLine}
                  initialAction={state.currentAction}
                  initialCue={state.currentCue}
                  onBack={() =>
                    setState((prev) => ({ ...prev, screen: 'finish-line' }))
                  }
                  onSave={handleFirstMoveSave}
                  t={t}
                />
              )}

              {state.screen === 'action' && (
                <ActionScreen
                  finishLine={state.finishLine}
                  currentAction={state.currentAction}
                  currentCue={state.currentCue}
                  completedSteps={state.completedSteps}
                  onDidIt={() =>
                    setState((prev) => ({ ...prev, screen: 'complete' }))
                  }
                  onStuck={() => setState((prev) => ({ ...prev, screen: 'stuck' }))}
                  onChangeStep={() =>
                    setState((prev) => ({ ...prev, screen: 'change-step' }))
                  }
                  t={t}
                />
              )}

              {state.screen === 'change-step' && (
                <ChangeStepScreen
                  finishLine={state.finishLine}
                  currentAction={state.currentAction}
                  currentCue={state.currentCue}
                  onSave={handleChangeStepSave}
                  onCancel={() =>
                    setState((prev) => ({ ...prev, screen: 'action' }))
                  }
                  t={t}
                />
              )}

              {state.screen === 'stuck' && (
                <StuckScreen
                  language={state.language}
                  finishLine={state.finishLine}
                  currentAction={state.currentAction}
                  currentCue={state.currentCue}
                  onSaveRevised={handleStuckSave}
                  onDecline={() =>
                    setState((prev) => ({ ...prev, screen: 'action' }))
                  }
                  t={t}
                />
              )}

              {state.screen === 'complete' && (
                <CompleteScreen
                  finishLine={state.finishLine}
                  justCompletedAction={state.currentAction}
                  justCompletedCue={state.currentCue}
                  priorCompletedSteps={state.completedSteps}
                  onFinishGoal={handleFinishGoal}
                  onContinueNextStep={handleContinueNextStep}
                  onCancel={() =>
                    setState((prev) => ({ ...prev, screen: 'action' }))
                  }
                  t={t}
                />
              )}

              {state.screen === 'done' && (
                <DoneScreen
                  finishLine={state.finishLine}
                  completedSteps={state.completedSteps}
                  onStartNew={handleStartOver}
                  t={t}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}
