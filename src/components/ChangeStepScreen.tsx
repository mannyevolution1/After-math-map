import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import type { Translations } from '../i18n/translations';

interface ChangeStepScreenProps {
  finishLine: string;
  currentAction: string;
  currentCue: string;
  onSave: (action: string, cue: string) => void;
  onCancel: () => void;
  t: Translations;
}

export function ChangeStepScreen({
  finishLine,
  currentAction,
  currentCue,
  onSave,
  onCancel,
  t,
}: ChangeStepScreenProps) {
  const [action, setAction] = useState(currentAction);
  const [cue, setCue] = useState(currentCue);
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
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 leading-[1.15] [text-wrap:balance]">
          {t.changeStep.title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
          {t.changeStep.subtitle}
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 space-y-1.5">
        <p className="text-xs font-medium text-zinc-400">
          {t.changeStep.finishLineLabel}
        </p>
        <p className="text-base font-semibold text-zinc-100">{finishLine}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="edit-action-input"
            className="block text-sm font-medium text-zinc-200"
          >
            {t.changeStep.actionLabel}
          </label>
          <textarea
            id="edit-action-input"
            rows={3}
            value={action}
            onChange={(e) => {
              setAction(e.target.value);
              if (error === 'action') setError(null);
            }}
            className="w-full rounded-xl border border-zinc-700 bg-[#121215] px-4 py-3.5 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
          />
          {error === 'action' && (
            <p className="text-sm font-medium text-red-400" role="alert">
              {t.firstMove.validationAction}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="edit-cue-input"
            className="block text-sm font-medium text-zinc-200"
          >
            {t.changeStep.cueLabel}
          </label>
          <input
            id="edit-cue-input"
            type="text"
            value={cue}
            onChange={(e) => {
              setCue(e.target.value);
              if (error === 'cue') setError(null);
            }}
            className="w-full min-h-[48px] rounded-xl border border-zinc-700 bg-[#121215] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
          />
          {error === 'cue' && (
            <p className="text-sm font-medium text-red-400" role="alert">
              {t.firstMove.validationCue}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{t.changeStep.cancelBtn}</span>
          </button>

          <button
            type="submit"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-6 py-3 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            <span>{t.changeStep.saveBtn}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
