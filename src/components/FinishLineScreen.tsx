import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { EntrySource, Language } from '../types/followThrough';
import type { Translations } from '../i18n/translations';
import { suggestFinishLines } from '../utils/guidance';

interface FinishLineScreenProps {
  language: Language;
  entrySource: EntrySource | null;
  rawInput: string;
  initialFinishLine: string;
  onBack: () => void;
  onConfirm: (finishLine: string) => void;
  t: Translations;
}

export function FinishLineScreen({
  language,
  entrySource,
  rawInput,
  initialFinishLine,
  onBack,
  onConfirm,
  t,
}: FinishLineScreenProps) {
  const suggestions = useMemo(
    () => suggestFinishLines(rawInput, language),
    [rawInput, language]
  );

  const [finishLine, setFinishLine] = useState(initialFinishLine || rawInput);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = finishLine.trim();
    if (!trimmed) {
      setError(t.finishLine.validationEmpty);
      return;
    }
    onConfirm(trimmed);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium text-zinc-400">{t.finishLine.stepLabel}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 leading-[1.15] [text-wrap:balance]">
          {t.finishLine.question}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          {t.finishLine.helper}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 space-y-2">
        <p className="text-xs font-medium text-zinc-400">
          {entrySource === 'roadmap'
            ? t.finishLine.enteredFromRoadmap
            : t.finishLine.enteredOwn}
        </p>
        <p className="text-base font-medium text-zinc-100">{rawInput}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2.5">
          <label
            htmlFor="finish-line-input"
            className="block text-sm font-medium text-zinc-200"
          >
            {t.finishLine.inputLabel}
          </label>
          <textarea
            id="finish-line-input"
            rows={3}
            value={finishLine}
            onChange={(e) => {
              setFinishLine(e.target.value);
              if (error) setError('');
            }}
            placeholder={t.finishLine.inputPlaceholder}
            className="w-full rounded-xl border border-zinc-700 bg-[#121215] px-4 py-3.5 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
          />
          {error && (
            <p className="text-sm font-medium text-red-400" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="space-y-2.5">
          <p className="text-xs font-medium text-zinc-400">
            {t.finishLine.suggestionsLabel}
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setFinishLine(item);
                  setError('');
                }}
                className={`min-h-[48px] text-left rounded-xl border px-4 py-3 text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                  finishLine.trim() === item
                    ? 'border-[#C81E1E] bg-[#161012] text-zinc-50'
                    : 'border-zinc-800 bg-[#121215] text-zinc-300 hover:border-zinc-600 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-[#0D0D10] px-4 py-3.5 text-sm text-zinc-400 space-y-1">
          <p className="text-xs font-medium text-zinc-500">{t.finishLine.exampleLabel}</p>
          <p>
            <span className="text-zinc-400">“{t.finishLine.exampleBefore}”</span>
            <span className="mx-2 text-zinc-600" aria-hidden="true">
              →
            </span>
            <span className="text-zinc-200 font-medium">
              “{t.finishLine.exampleAfter}”
            </span>
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{t.back}</span>
          </button>

          <button
            type="submit"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-6 py-3 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
          >
            <span>{t.finishLine.confirmBtn}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
