import { useState } from 'react';
import { ArrowRight, Compass, PenLine } from 'lucide-react';
import type { EntrySource } from '../types/followThrough';
import type { Translations } from '../i18n/translations';

interface EntryScreenProps {
  initialSource: EntrySource | null;
  initialText: string;
  onContinue: (source: EntrySource, text: string) => void;
  t: Translations;
}

export function EntryScreen({
  initialSource,
  initialText,
  onContinue,
  t,
}: EntryScreenProps) {
  const [selectedSource, setSelectedSource] = useState<EntrySource | null>(initialSource);
  const [text, setText] = useState(initialText);
  const [error, setError] = useState('');

  const handleSelectSource = (source: EntrySource) => {
    setSelectedSource(source);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSource) return;
    const trimmed = text.trim();
    if (!trimmed) {
      setError(t.entry.validationEmpty);
      return;
    }
    onContinue(selectedSource, trimmed);
  };

  const examples =
    selectedSource === 'roadmap' ? t.entry.roadmapExamples : t.entry.ownExamples;

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-wide text-zinc-400">
          {t.systemLabel}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-zinc-50 leading-[1.12] [text-wrap:balance]">
          {t.entry.question}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          {t.entry.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => handleSelectSource('roadmap')}
          aria-pressed={selectedSource === 'roadmap'}
          className={`group text-left rounded-2xl border p-5 sm:p-6 transition-all min-h-[120px] flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
            selectedSource === 'roadmap'
              ? 'border-[#C81E1E] bg-[#161012]'
              : 'border-zinc-800 bg-[#121215] hover:border-zinc-700 hover:bg-[#16161A]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-zinc-50">
              {t.entry.roadmapTitle}
            </h2>
            <Compass
              className={`h-5 w-5 shrink-0 mt-0.5 transition-colors ${
                selectedSource === 'roadmap' ? 'text-[#E11D48]' : 'text-zinc-500'
              }`}
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {t.entry.roadmapDesc}
          </p>
        </button>

        <button
          type="button"
          onClick={() => handleSelectSource('own')}
          aria-pressed={selectedSource === 'own'}
          className={`group text-left rounded-2xl border p-5 sm:p-6 transition-all min-h-[120px] flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
            selectedSource === 'own'
              ? 'border-[#C81E1E] bg-[#161012]'
              : 'border-zinc-800 bg-[#121215] hover:border-zinc-700 hover:bg-[#16161A]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-zinc-50">
              {t.entry.ownTitle}
            </h2>
            <PenLine
              className={`h-5 w-5 shrink-0 mt-0.5 transition-colors ${
                selectedSource === 'own' ? 'text-[#E11D48]' : 'text-zinc-500'
              }`}
              aria-hidden="true"
            />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            {t.entry.ownDesc}
          </p>
        </button>
      </div>

      {selectedSource && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6 space-y-5"
        >
          <div className="space-y-2">
            <label
              htmlFor="entry-goal-input"
              className="block text-sm font-medium text-zinc-200"
            >
              {selectedSource === 'roadmap' ? t.entry.roadmapPrompt : t.entry.ownPrompt}
            </label>
            <textarea
              id="entry-goal-input"
              rows={3}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError('');
              }}
              placeholder={
                selectedSource === 'roadmap'
                  ? t.entry.roadmapPlaceholder
                  : t.entry.ownPlaceholder
              }
              autoFocus
              className="w-full rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3.5 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
            />
            {error && (
              <p className="text-sm font-medium text-red-400" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-medium text-zinc-400">{t.entry.examplesLabel}</p>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setText(ex);
                    setError('');
                  }}
                  className="min-h-[40px] rounded-lg border border-zinc-800 bg-[#09090B] px-3.5 py-2 text-left text-xs sm:text-sm text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-6 py-3 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
            >
              <span>{t.entry.continueBtn}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}

      <p className="text-xs leading-relaxed text-zinc-500 pt-2">{t.storageNote}</p>
    </div>
  );
}
