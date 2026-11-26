import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import type { CompletedStep } from '../types/followThrough';
import type { Translations } from '../i18n/translations';

interface CompleteScreenProps {
  finishLine: string;
  justCompletedAction: string;
  justCompletedCue: string;
  priorCompletedSteps: CompletedStep[];
  onFinishGoal: () => void;
  onContinueNextStep: (nextAction: string, nextCue: string) => void;
  onCancel: () => void;
  t: Translations;
}

export function CompleteScreen({
  finishLine,
  justCompletedAction,
  justCompletedCue,
  priorCompletedSteps,
  onFinishGoal,
  onContinueNextStep,
  onCancel,
  t,
}: CompleteScreenProps) {
  const [hasMoreToDo, setHasMoreToDo] = useState(false);
  const [nextAction, setNextAction] = useState('');
  const [nextCue, setNextCue] = useState('');
  const [error, setError] = useState<'action' | 'cue' | null>(null);

  const handleSubmitNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nextAction.trim()) {
      setError('action');
      return;
    }
    if (!nextCue.trim()) {
      setError('cue');
      return;
    }
    onContinueNextStep(nextAction.trim(), nextCue.trim());
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-400">
          <Check className="h-4 w-4 text-[#EF4444]" aria-hidden="true" />
          <span>{t.complete.justFinishedLabel}</span>
        </div>
        <p className="text-base font-medium text-zinc-100">
          {justCompletedAction}
        </p>
        <p className="text-xs text-zinc-500">{justCompletedCue}</p>
      </div>

      {!hasMoreToDo ? (
        <div className="space-y-7">
          <div className="space-y-3">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 leading-[1.15] [text-wrap:balance]">
              {t.complete.question}
            </h1>
            <div className="rounded-xl border border-zinc-800/80 bg-[#0D0D10] p-4 space-y-1">
              <p className="text-xs font-medium text-zinc-500">
                {t.complete.finishLineLabel}
              </p>
              <p className="text-base font-medium text-zinc-200">{finishLine}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onFinishGoal}
              className="text-left rounded-2xl bg-[#C81E1E] hover:bg-[#B91C1C] p-5 sm:p-6 space-y-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[108px] flex flex-col justify-center"
            >
              <span className="font-display text-lg font-bold text-white">
                {t.complete.yesBtn}
              </span>
              <span className="text-sm text-red-100/90 leading-snug">
                {t.complete.yesDesc}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setHasMoreToDo(true)}
              className="text-left rounded-2xl border border-zinc-700 bg-[#141418] hover:border-zinc-500 hover:bg-[#19191E] p-5 sm:p-6 space-y-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] min-h-[108px] flex flex-col justify-center"
            >
              <span className="font-display text-lg font-semibold text-zinc-50">
                {t.complete.noBtn}
              </span>
              <span className="text-sm text-zinc-400 leading-snug">
                {t.complete.noDesc}
              </span>
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={onCancel}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{t.back}</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmitNext} className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
              {t.complete.nextMoveTitle}
            </h1>
            <p className="text-sm text-zinc-400">
              {t.complete.finishLineLabel}:{' '}
              <span className="text-zinc-200 font-medium">{finishLine}</span>
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
            <div className="space-y-2">
              <label
                htmlFor="next-action-input"
                className="block text-sm font-medium text-zinc-200"
              >
                {t.complete.nextActionLabel}
              </label>
              <textarea
                id="next-action-input"
                rows={3}
                value={nextAction}
                onChange={(e) => {
                  setNextAction(e.target.value);
                  if (error === 'action') setError(null);
                }}
                placeholder={t.complete.nextActionPlaceholder}
                autoFocus
                className="w-full rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
              />
              {error === 'action' && (
                <p className="text-sm font-medium text-red-400" role="alert">
                  {t.complete.validationNextAction}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="next-cue-input"
                className="block text-sm font-medium text-zinc-200"
              >
                {t.complete.nextCueLabel}
              </label>
              <input
                id="next-cue-input"
                type="text"
                value={nextCue}
                onChange={(e) => {
                  setNextCue(e.target.value);
                  if (error === 'cue') setError(null);
                }}
                placeholder={t.complete.nextCuePlaceholder}
                className="w-full min-h-[48px] rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
              />
              {error === 'cue' && (
                <p className="text-sm font-medium text-red-400" role="alert">
                  {t.complete.validationNextCue}
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-1">
                {t.firstMove.cuePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setNextCue(preset);
                      if (error === 'cue') setError(null);
                    }}
                    className={`min-h-[40px] rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                      nextCue.trim() === preset
                        ? 'border-[#C81E1E] bg-[#161012] text-white'
                        : 'border-zinc-800 bg-[#09090B] text-zinc-300 hover:border-zinc-600'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {priorCompletedSteps.length > 0 && (
            <div className="space-y-2 pt-1">
              <p className="text-xs font-medium text-zinc-500">
                {t.complete.completedSoFarLabel}
              </p>
              <ul className="space-y-1.5 text-sm text-zinc-400">
                {priorCompletedSteps.map((s) => (
                  <li key={s.id}>
                    {s.action} · <span className="text-zinc-500">{s.cue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              type="button"
              onClick={() => setHasMoreToDo(false)}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{t.back}</span>
            </button>

            <button
              type="submit"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-6 py-3 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{t.complete.saveNextBtn}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
