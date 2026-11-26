import { useState } from 'react';
import type { Language } from '../types/followThrough';
import type { Translations } from '../i18n/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  showStartOver: boolean;
  onStartOver: () => void;
  t: Translations;
}

export function Header({
  language,
  onLanguageChange,
  showStartOver,
  onStartOver,
  t,
}: HeaderProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-zinc-800/90 bg-[#09090B]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-zinc-50 whitespace-nowrap shrink-0">
              {t.brand}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {showStartOver && (
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="min-h-[44px] px-2.5 text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] rounded-lg"
              >
                {t.startOver}
              </button>
            )}

            <div
              role="group"
              aria-label="Language"
              className="inline-flex items-center rounded-lg border border-zinc-800 bg-[#121215] p-0.5 shrink-0"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                aria-pressed={language === 'en'}
                className={`min-h-[36px] min-w-[40px] px-2.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                  language === 'en'
                    ? 'bg-[#C81E1E] text-white'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('es')}
                aria-pressed={language === 'es'}
                className={`min-h-[36px] min-w-[40px] px-2.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                  language === 'es'
                    ? 'bg-[#C81E1E] text-white'
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </header>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="start-over-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#121215] p-6 shadow-2xl">
            <h2
              id="start-over-title"
              className="font-display text-lg font-semibold text-zinc-50"
            >
              {t.startOverConfirmTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {t.startOverConfirmBody}
            </p>
            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="min-h-[48px] px-5 rounded-xl border border-zinc-700 bg-transparent text-sm font-medium text-zinc-200 hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmOpen(false);
                  onStartOver();
                }}
                className="min-h-[48px] px-5 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {t.startOverConfirmAction}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
