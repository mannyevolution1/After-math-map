import { Check, RotateCcw } from 'lucide-react';
import type { CompletedStep } from '../types/followThrough';
import type { Translations } from '../i18n/translations';

interface DoneScreenProps {
  finishLine: string;
  completedSteps: CompletedStep[];
  onStartNew: () => void;
  t: Translations;
}

export function DoneScreen({
  finishLine,
  completedSteps,
  onStartNew,
  t,
}: DoneScreenProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold tracking-wide text-[#EF4444]">
          {t.done.kicker}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-zinc-50 leading-[1.12] [text-wrap:balance]">
          {t.done.title}
        </h1>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#141418] p-6 sm:p-8 space-y-2.5">
        <p className="text-xs font-medium text-zinc-400">
          {t.done.outcomeLabel}
        </p>
        <p className="font-display text-xl sm:text-2xl font-semibold text-zinc-50 leading-snug">
          {finishLine}
        </p>
      </div>

      {completedSteps.length > 0 && (
        <section aria-labelledby="done-steps-heading" className="space-y-4">
          <h2
            id="done-steps-heading"
            className="font-display text-sm font-semibold text-zinc-300 border-b border-zinc-800/80 pb-3"
          >
            {t.done.stepsTitle}
          </h2>
          <ul className="divide-y divide-zinc-800/70">
            {completedSteps.map((step) => (
              <li
                key={step.id}
                className="py-3.5 flex items-start gap-3 text-sm sm:text-base"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#C81E1E]/20 border border-[#C81E1E]/50 text-[#EF4444]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div className="min-w-0 space-y-0.5">
                  <p className="text-zinc-100 leading-snug">{step.action}</p>
                  <p className="text-xs text-zinc-500">{step.cue}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="pt-2 space-y-3">
        <button
          type="button"
          onClick={onStartNew}
          className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-6 py-3.5 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>{t.done.startNewBtn}</span>
        </button>

        <p className="text-xs leading-relaxed text-zinc-500">
          {t.done.deviceNote}
        </p>
      </div>
    </div>
  );
}
