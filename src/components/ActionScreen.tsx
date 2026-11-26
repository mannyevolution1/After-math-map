import { Check, Flag, HelpCircle, Pencil } from 'lucide-react';
import type { CompletedStep } from '../types/followThrough';
import type { Translations } from '../i18n/translations';

interface ActionScreenProps {
  finishLine: string;
  currentAction: string;
  currentCue: string;
  completedSteps: CompletedStep[];
  onDidIt: () => void;
  onStuck: () => void;
  onChangeStep: () => void;
  t: Translations;
}

export function ActionScreen({
  finishLine,
  currentAction,
  currentCue,
  completedSteps,
  onDidIt,
  onStuck,
  onChangeStep,
  t,
}: ActionScreenProps) {
  const completedCount = completedSteps.length;
  const currentStepNumber = completedCount + 1;

  const completedCountLabel =
    completedCount === 1
      ? t.action.completedCountSingle
      : t.action.completedCountPlural.replace('{count}', String(completedCount));

  const progressSummary =
    completedCount === 0
      ? t.action.progressZero
      : completedCount === 1
        ? t.action.progressSingle
        : t.action.progressPlural.replace('{count}', String(completedCount));

  const activeStepSummary = t.action.activeStepLabel.replace(
    '{number}',
    String(currentStepNumber)
  );

  // Keep the visual node chain readable on narrow screens if many steps accumulate
  const maxVisibleCompleted = 6;
  const hiddenCompletedCount = Math.max(0, completedCount - maxVisibleCompleted);
  const visibleCompletedSteps =
    hiddenCompletedCount > 0
      ? completedSteps.slice(hiddenCompletedCount)
      : completedSteps;

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-800/90 bg-[#121215] p-5 sm:p-6 space-y-5">
        <div className="space-y-2">
          <p className="text-xs font-medium text-zinc-400">
            {t.action.finishLineLabel}
          </p>
          <p className="text-base sm:text-lg font-medium text-zinc-100 leading-snug">
            {finishLine}
          </p>
        </div>

        <div
          aria-label={t.action.progressLabel}
          className="border-t border-zinc-800/80 pt-4 space-y-3"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-xs font-medium text-zinc-400">
              {t.action.progressLabel}
            </span>
            <span className="text-xs font-medium text-zinc-200 tabular-nums">
              {progressSummary}
              <span className="mx-1.5 text-zinc-600" aria-hidden="true">
                ·
              </span>
              <span className="text-zinc-400">{activeStepSummary}</span>
            </span>
          </div>

          <div
            className="flex items-center gap-1.5"
            role="img"
            aria-label={`${progressSummary}, ${activeStepSummary}`}
          >
            {hiddenCompletedCount > 0 && (
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-md bg-[#C81E1E] px-1.5 text-xs font-semibold text-white tabular-nums">
                  +{hiddenCompletedCount}
                </span>
                <div className="h-0.5 w-3 bg-[#C81E1E]" aria-hidden="true" />
              </div>
            )}

            {visibleCompletedSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-center gap-1.5 flex-1 min-w-[28px] max-w-[72px]"
                title={step.action}
              >
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#C81E1E] text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="h-0.5 flex-1 bg-[#C81E1E]" aria-hidden="true" />
              </div>
            ))}

            <div className="flex items-center gap-1.5 flex-1 min-w-[28px]">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#EF4444] bg-[#221013] text-xs font-bold text-zinc-50 tabular-nums">
                {currentStepNumber}
              </span>
              <div
                className="h-px flex-1 border-t border-dashed border-zinc-700"
                aria-hidden="true"
              />
            </div>

            <div className="flex items-center gap-1.5 shrink-0 text-zinc-400">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-[#09090B]">
                <Flag className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
              </span>
              <span className="hidden sm:inline text-xs font-medium text-zinc-400 whitespace-nowrap">
                {t.action.finishDestinationLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section
        aria-labelledby="current-action-heading"
        className="rounded-2xl border border-zinc-800 bg-[#141418] p-6 sm:p-8 space-y-7"
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wide text-[#EF4444]">
            {t.action.currentActionLabel}
          </p>
          <h1
            id="current-action-heading"
            className="font-display text-2xl sm:text-3xl lg:text-[2.125rem] font-bold tracking-tight text-zinc-50 leading-[1.18] [text-wrap:balance]"
          >
            {currentAction}
          </h1>
        </div>

        <div className="border-t border-zinc-800/80 pt-5 space-y-1.5">
          <p className="text-xs font-medium text-zinc-400">{t.action.whenLabel}</p>
          <p className="text-base sm:text-lg font-medium text-zinc-200">
            {currentCue}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            type="button"
            onClick={onDidIt}
            className="min-h-[52px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-5 py-3.5 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
          >
            <Check className="h-5 w-5" aria-hidden="true" />
            <span>{t.action.didItBtn}</span>
          </button>

          <button
            type="button"
            onClick={onStuck}
            className="min-h-[52px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-[#1B1B20] hover:bg-zinc-800 hover:border-zinc-500 px-5 py-3.5 text-base font-semibold text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] whitespace-nowrap shrink-0"
          >
            <HelpCircle className="h-5 w-5 text-zinc-300" aria-hidden="true" />
            <span>{t.action.stuckBtn}</span>
          </button>

          <button
            type="button"
            onClick={onChangeStep}
            className="min-h-[52px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent hover:bg-zinc-900 hover:border-zinc-700 px-5 py-3.5 text-sm sm:text-base font-medium text-zinc-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] whitespace-nowrap shrink-0"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
            <span>{t.action.changeStepBtn}</span>
          </button>
        </div>
      </section>

      {completedSteps.length > 0 && (
        <section
          aria-labelledby="completed-record-heading"
          className="space-y-4 pt-2"
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-zinc-800/80 pb-3">
            <h2
              id="completed-record-heading"
              className="font-display text-sm font-semibold text-zinc-200"
            >
              {t.action.completedRecordTitle}
            </h2>
            <span className="text-xs text-zinc-400 tabular-nums">
              {completedCountLabel}
            </span>
          </div>

          <ul className="divide-y divide-zinc-800/70">
            {completedSteps.map((step, index) => (
              <li
                key={step.id}
                className="py-3.5 flex items-start gap-3 text-sm"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 tabular-nums">
                  {index + 1}
                </span>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-zinc-200 leading-snug">{step.action}</p>
                  <p className="text-xs text-zinc-500">{step.cue}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-xs leading-relaxed text-zinc-500">
        {t.action.deviceSavedStatus}
      </p>
    </div>
  );
}
