import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Language } from '../types/followThrough';
import type { Translations } from '../i18n/translations';
import { suggestFirstMoves } from '../utils/guidance';

interface FirstMoveScreenProps {
  language: Language;
  finishLine: string;
  initialAction: string;
  initialCue: string;
  onBack: () => void;
  onSave: (action: string, cue: string) => void;
  t: Translations;
}

export function FirstMoveScreen({
  language,
  finishLine,
  initialAction,
  initialCue,
  onBack,
  onSave,
  t,
}: FirstMoveScreenProps) {
  const suggestions = useMemo(
    () => suggestFirstMoves(finishLine, language),
    [finishLine, language]
  );

  const [action, setAction] = useState(initialAction);
  const [cue, setCue] = useState(initialCue);
  const [error, setError] = useState<'action' | 'cue' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!action.trim()) {
      setError('action');
      return;
    }
    if (!cue.trim()) {
      setError('cue');
      return;
    }
    onSave(action.trim(), cue.trim());
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium text-zinc-400">{t.firstMove.stepLabel}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 leading-[1.15] [text-wrap:balance]">
          {t.firstMove.question}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          {t.firstMove.helper}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 space-y-1.5">
        <p className="text-xs font-medium text-zinc-400">
          {t.firstMove.finishLineAnchor}
        </p>
        <p className="text-base font-semibold text-zinc-100">{finishLine}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        <div className="space-y-3">
          <label
            htmlFor="first-action-input"
            className="block text-sm font-medium text-zinc-200"
          >
            {t.firstMove.actionLabel}
          </label>
          <textarea
            id="first-action-input"
            rows={2}
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              if (error === 'action') setError(null);
            }}
            placeholder={t.firstMove.actionPlaceholder}
            className="w-full rounded-xl border border-zinc-700 bg-[#121215] px-4 py-3.5 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
          />
          {error === 'action' && (
            <p className="text-sm font-medium text-red-400" role="alert">
              {t.firstMove.validationAction}
            </p>
          )}

          <div className="space-y-2 pt-1">
            <p className="text-xs font-medium text-zinc-400">
              {t.firstMove.suggestionsLabel}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {suggestions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setAction(item);
                    if (error === 'action') setError(null);
                  }}
                  className={`min-h-[48px] text-left rounded-xl border px-4 py-3 text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                    action.trim() === item
                      ? 'border-[#C81E1E] bg-[#161012] text-zinc-50'
                      : 'border-zinc-800 bg-[#121215] text-zinc-300 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="first-cue-input"
            className="block text-sm font-medium text-zinc-200"
          >
            {t.firstMove.cueLabel}
          </label>
          <input
            id="first-cue-input"
            type="text"
            value={cue}
            onChange={(e) => {
              setCue(e.target.value);
              if (error === 'cue') setError(null);
            }}
            placeholder={t.firstMove.cuePlaceholder}
            className="w-full min-h-[48px] rounded-xl border border-zinc-700 bg-[#121215] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
          />
          {error === 'cue' && (
            <p className="text-sm font-medium text-red-400" role="alert">
              {t.firstMove.validationCue}
            </p>
          )}

          <div className="space-y-2 pt-1">
            <p className="text-xs font-medium text-zinc-400">
              {t.firstMove.cuePresetsLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.firstMove.cuePresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setCue(preset);
                    if (error === 'cue') setError(null);
                  }}
                  className={`min-h-[44px] rounded-lg border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                    cue.trim() === preset
                      ? 'border-[#C81E1E] bg-[#161012] text-white'
                      : 'border-zinc-800 bg-[#121215] text-zinc-300 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800/80 bg-[#0D0D10] px-4 py-3 text-sm text-zinc-400">
          <span className="text-xs font-medium text-zinc-500 mr-2">
            {t.firstMove.exampleLabel}
          </span>
          <span className="text-zinc-200">“{t.firstMove.exampleText}”</span>
        </div>

        {(action.trim() || cue.trim()) && (
          <div className="rounded-xl border border-zinc-800 bg-[#0D0D10] p-4 space-y-1">
            <p className="text-xs font-medium text-zinc-500">
              {t.firstMove.previewLabel}
            </p>
            <p className="text-sm sm:text-base text-zinc-100 leading-relaxed">
              {cue.trim() ? (
                <span className="font-semibold text-zinc-50">{cue.trim()}</span>
              ) : (
                <span className="text-zinc-500">…</span>
              )}
              <span className="mx-2 text-zinc-600" aria-hidden="true">
                ·
              </span>
              {action.trim() ? (
                <span>{action.trim()}</span>
              ) : (
                <span className="text-zinc-500">…</span>
              )}
            </p>
          </div>
        )}

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
            <span>{t.firstMove.saveBtn}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  );
}
