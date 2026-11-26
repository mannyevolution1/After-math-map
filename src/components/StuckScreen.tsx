import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight } from 'lucide-react';
import type { Language, StuckBlocker } from '../types/followThrough';
import type { Translations } from '../i18n/translations';
import {
  getBlockerOrder,
  getMissingActionProposal,
  getShortenedVersionForTime,
  getStartBlockerPrompt,
  getTooBigSuggestions,
} from '../utils/guidance';

interface StuckScreenProps {
  language: Language;
  finishLine: string;
  currentAction: string;
  currentCue: string;
  onSaveRevised: (newAction: string, newCue: string) => void;
  onDecline: () => void;
  t: Translations;
}

type StuckStage = 'choose-blocker' | 'follow-up' | 'review';

export function StuckScreen({
  language,
  finishLine,
  currentAction,
  currentCue,
  onSaveRevised,
  onDecline,
  t,
}: StuckScreenProps) {
  const [stage, setStage] = useState<StuckStage>('choose-blocker');
  const [blocker, setBlocker] = useState<StuckBlocker | null>(null);

  // Follow-up states for each blocker
  const [startAnswer, setStartAnswer] = useState('');
  const [selectedStartMove, setSelectedStartMove] = useState('');

  const [smallStepChoice, setSmallStepChoice] = useState('');

  const [newOpening, setNewOpening] = useState('');
  const [shortenWithTime, setShortenWithTime] = useState(false);

  const [missingKind, setMissingKind] = useState<'info' | 'material' | 'support'>('info');
  const [missingItem, setMissingItem] = useState('');

  const [ownBlockerText, setOwnBlockerText] = useState('');
  const [ownAdjustmentText, setOwnAdjustmentText] = useState('');

  const [followUpError, setFollowUpError] = useState('');

  // Editable review state
  const [revisedAction, setRevisedAction] = useState(currentAction);
  const [revisedCue, setRevisedCue] = useState(currentCue);
  const [reviewError, setReviewError] = useState('');

  const startPrompt = useMemo(
    () => getStartBlockerPrompt(finishLine, currentAction, language),
    [finishLine, currentAction, language]
  );

  const tooBigSuggestions = useMemo(
    () => getTooBigSuggestions(finishLine, currentAction, language),
    [finishLine, currentAction, language]
  );

  const blockerList = getBlockerOrder();

  const handleSelectBlocker = (chosen: StuckBlocker) => {
    setBlocker(chosen);
    setFollowUpError('');
    setStage('follow-up');
  };

  const handleGoToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFollowUpError('');

    if (blocker === 'dont-know-start') {
      const candidate =
        selectedStartMove.trim() ||
        (startAnswer.trim()
          ? startPrompt.options[0].actionFromInput(startAnswer)
          : '');
      if (!candidate) {
        setFollowUpError(t.stuck.validationRequired);
        return;
      }
      setRevisedAction(candidate);
      setRevisedCue(currentCue);
      setStage('review');
      return;
    }

    if (blocker === 'too-big') {
      const candidate = smallStepChoice.trim();
      if (!candidate) {
        setFollowUpError(t.stuck.validationRequired);
        return;
      }
      setRevisedAction(candidate);
      setRevisedCue(currentCue);
      setStage('review');
      return;
    }

    if (blocker === 'time-taken') {
      const opening = newOpening.trim();
      if (!opening) {
        setFollowUpError(t.stuck.validationRequired);
        return;
      }
      const nextAction = shortenWithTime
        ? getShortenedVersionForTime(currentAction, language)
        : currentAction;
      setRevisedAction(nextAction);
      setRevisedCue(opening);
      setStage('review');
      return;
    }

    if (blocker === 'missing-something') {
      const item = missingItem.trim();
      if (!item) {
        setFollowUpError(t.stuck.validationRequired);
        return;
      }
      const proposal = getMissingActionProposal(item, missingKind, language);
      setRevisedAction(proposal);
      setRevisedCue(t.stuck.missingCueDefault);
      setStage('review');
      return;
    }

    if (blocker === 'something-else') {
      const adj = ownAdjustmentText.trim();
      if (!adj) {
        setFollowUpError(t.stuck.validationRequired);
        return;
      }
      setRevisedAction(adj);
      setRevisedCue(currentCue);
      setStage('review');
    }
  };

  const handleConfirmSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisedAction.trim() || !revisedCue.trim()) {
      setReviewError(t.stuck.validationRequired);
      return;
    }
    onSaveRevised(revisedAction.trim(), revisedCue.trim());
  };

  const missingKinds: { id: 'info' | 'material' | 'support'; label: string }[] =
    language === 'es'
      ? [
          { id: 'info', label: 'Información o respuesta' },
          { id: 'material', label: 'Herramienta o archivo' },
          { id: 'support', label: 'Apoyo de alguien' },
        ]
      : [
          { id: 'info', label: 'Information or answer' },
          { id: 'material', label: 'Tool, file, or material' },
          { id: 'support', label: 'Help from someone' },
        ];

  return (
    <div className="space-y-8">
      {/* Original Finish Line always kept visible */}
      <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-zinc-400">
            {t.stuck.finishLineLabel}
          </p>
          <p className="text-base font-semibold text-zinc-100">{finishLine}</p>
        </div>
        <div className="border-t border-zinc-800/80 pt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-sm">
          <span className="text-zinc-400">
            <span className="text-zinc-500">{t.stuck.currentActionLabel}: </span>
            <span className="text-zinc-200">{currentAction}</span>
          </span>
          <span className="text-xs text-zinc-500 shrink-0">{currentCue}</span>
        </div>
      </div>

      {stage === 'choose-blocker' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 leading-[1.15] [text-wrap:balance]">
              {t.stuck.question}
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed">
              {t.stuck.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {blockerList.map((id) => {
              const info = t.stuck.blockers[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectBlocker(id)}
                  className="group min-h-[68px] w-full text-left rounded-2xl border border-zinc-800 bg-[#121215] hover:border-[#C81E1E] hover:bg-[#161012] p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
                >
                  <div className="space-y-1">
                    <p className="font-display text-base sm:text-lg font-semibold text-zinc-50">
                      {info.title}
                    </p>
                    <p className="text-sm text-zinc-400 leading-snug">
                      {info.detail}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-5 w-5 shrink-0 text-zinc-500 group-hover:text-zinc-200 transition-colors"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onDecline}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{t.back}</span>
            </button>
          </div>
        </div>
      )}

      {stage === 'follow-up' && blocker && (
        <form onSubmit={handleGoToReview} className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-zinc-400">
              {t.stuck.followUpStepLabel}
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 leading-[1.18]">
              {t.stuck.blockers[blocker].title}
            </h1>
          </div>

          {blocker === 'dont-know-start' && (
            <div className="space-y-5 rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
              <div className="space-y-2">
                <label
                  htmlFor="stuck-start-answer"
                  className="block text-base font-medium text-zinc-100 leading-snug"
                >
                  {startPrompt.question}
                </label>
                <textarea
                  id="stuck-start-answer"
                  rows={2}
                  value={startAnswer}
                  onChange={(e) => {
                    setStartAnswer(e.target.value);
                    if (followUpError) setFollowUpError('');
                  }}
                  placeholder={startPrompt.placeholder}
                  className="w-full rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
                />
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-medium text-zinc-400">
                  {language === 'es'
                    ? 'Elige cómo convertir esto en tu primer paso:'
                    : 'Choose how to turn this into your next move:'}
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                  {startPrompt.options.map((opt) => {
                    const built = opt.actionFromInput(startAnswer);
                    const isSelected = selectedStartMove === built;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => {
                          setSelectedStartMove(built);
                          if (followUpError) setFollowUpError('');
                        }}
                        className={`min-h-[52px] text-left rounded-xl border p-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                          isSelected
                            ? 'border-[#C81E1E] bg-[#161012]'
                            : 'border-zinc-800 bg-[#09090B] hover:border-zinc-600'
                        }`}
                      >
                        <p className="text-sm font-semibold text-zinc-100">
                          {opt.label}
                        </p>
                        <p className="mt-1 text-xs sm:text-sm text-zinc-400">
                          {built}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {blocker === 'too-big' && (
            <div className="space-y-5 rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
              <p className="text-base font-medium text-zinc-100">
                {language === 'es'
                  ? 'Elige una versión de 5–10 minutos o escribe una propia:'
                  : 'Pick a 5–10 minute version, or write your own:'}
              </p>

              <div className="grid grid-cols-1 gap-2.5">
                {tooBigSuggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSmallStepChoice(item);
                      if (followUpError) setFollowUpError('');
                    }}
                    className={`min-h-[48px] text-left rounded-xl border px-4 py-3 text-sm leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                      smallStepChoice.trim() === item
                        ? 'border-[#C81E1E] bg-[#161012] text-zinc-50'
                        : 'border-zinc-800 bg-[#09090B] text-zinc-300 hover:border-zinc-600 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="stuck-small-custom"
                  className="block text-xs font-medium text-zinc-400"
                >
                  {language === 'es'
                    ? 'O ajústalo con tus palabras:'
                    : 'Or edit in your own words:'}
                </label>
                <textarea
                  id="stuck-small-custom"
                  rows={2}
                  value={smallStepChoice}
                  onChange={(e) => {
                    setSmallStepChoice(e.target.value);
                    if (followUpError) setFollowUpError('');
                  }}
                  placeholder={
                    language === 'es'
                      ? 'ej. Abrir el archivo y hacer solo los primeros 5 minutos'
                      : 'e.g., Open the file and work for just 5 minutes on the first part'
                  }
                  className="w-full rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
                />
              </div>
            </div>
          )}

          {blocker === 'time-taken' && (
            <div className="space-y-5 rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
              <div className="space-y-3">
                <label
                  htmlFor="stuck-time-opening"
                  className="block text-base font-medium text-zinc-100"
                >
                  {t.stuck.timeOpeningLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {t.stuck.timeOpenings.map((opening) => (
                    <button
                      key={opening}
                      type="button"
                      onClick={() => {
                        setNewOpening(opening);
                        if (followUpError) setFollowUpError('');
                      }}
                      className={`min-h-[44px] rounded-lg border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                        newOpening.trim() === opening
                          ? 'border-[#C81E1E] bg-[#161012] text-white'
                          : 'border-zinc-800 bg-[#09090B] text-zinc-300 hover:border-zinc-600 hover:text-white'
                      }`}
                    >
                      {opening}
                    </button>
                  ))}
                </div>
                <input
                  id="stuck-time-opening"
                  type="text"
                  value={newOpening}
                  onChange={(e) => {
                    setNewOpening(e.target.value);
                    if (followUpError) setFollowUpError('');
                  }}
                  placeholder={
                    language === 'es'
                      ? 'O escribe otro momento realista'
                      : 'Or type another realistic window'
                  }
                  className="w-full min-h-[48px] rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-[#09090B] p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shortenWithTime}
                  onChange={(e) => setShortenWithTime(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#C81E1E]"
                />
                <span className="text-sm text-zinc-200 leading-snug">
                  {t.stuck.shortenToggleLabel}
                  {shortenWithTime && (
                    <span className="block mt-1 text-xs text-zinc-400">
                      {t.stuck.shortenedHintLabel}{' '}
                      {getShortenedVersionForTime(currentAction, language)}
                    </span>
                  )}
                </span>
              </label>
            </div>
          )}

          {blocker === 'missing-something' && (
            <div className="space-y-5 rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-zinc-200">
                  {language === 'es' ? '¿Qué tipo de cosa falta?' : 'What kind of thing is missing?'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {missingKinds.map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setMissingKind(k.id)}
                      className={`min-h-[44px] rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] ${
                        missingKind === k.id
                          ? 'border-[#C81E1E] bg-[#161012] text-white'
                          : 'border-zinc-800 bg-[#09090B] text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="stuck-missing-item"
                  className="block text-base font-medium text-zinc-100"
                >
                  {language === 'es'
                    ? 'Nómbralo exactamente para que conseguirlo sea tu próximo paso:'
                    : 'Name it specifically so getting it becomes your next action:'}
                </label>
                <input
                  id="stuck-missing-item"
                  type="text"
                  value={missingItem}
                  onChange={(e) => {
                    setMissingItem(e.target.value);
                    if (followUpError) setFollowUpError('');
                  }}
                  placeholder={
                    language === 'es'
                      ? 'ej. El correo actualizado de Ana, o el cable del micrófono'
                      : 'e.g., Alex’s updated numbers, or the microphone cable'
                  }
                  className="w-full min-h-[48px] rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
                />
              </div>
            </div>
          )}

          {blocker === 'something-else' && (
            <div className="space-y-5 rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6">
              <div className="space-y-2">
                <label
                  htmlFor="stuck-own-blocker"
                  className="block text-sm font-medium text-zinc-200"
                >
                  {t.stuck.ownBlockerLabel}
                </label>
                <textarea
                  id="stuck-own-blocker"
                  rows={2}
                  value={ownBlockerText}
                  onChange={(e) => setOwnBlockerText(e.target.value)}
                  placeholder={t.stuck.ownBlockerPlaceholder}
                  className="w-full rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="stuck-own-adjustment"
                  className="block text-sm font-medium text-zinc-200"
                >
                  {t.stuck.ownAdjustmentLabel}
                </label>
                <textarea
                  id="stuck-own-adjustment"
                  rows={2}
                  value={ownAdjustmentText}
                  onChange={(e) => {
                    setOwnAdjustmentText(e.target.value);
                    if (followUpError) setFollowUpError('');
                  }}
                  placeholder={t.stuck.ownAdjustmentPlaceholder}
                  className="w-full rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 placeholder:text-zinc-500 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
                />
              </div>
            </div>
          )}

          {followUpError && (
            <p className="text-sm font-medium text-red-400" role="alert">
              {followUpError}
            </p>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setStage('choose-blocker');
                setFollowUpError('');
              }}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent px-5 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E] whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{t.stuck.changeBlockerBtn}</span>
            </button>

            <button
              type="submit"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-6 py-3 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap shrink-0"
            >
              <span>{t.stuck.generateProposalBtn}</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}

      {stage === 'review' && (
        <form onSubmit={handleConfirmSave} className="space-y-6">
          <div className="space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 leading-[1.18]">
              {t.stuck.reviewTitle}
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed">
              {t.stuck.reviewSubtitle}
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-[#0D0D10] p-4 space-y-1">
            <p className="text-xs font-medium text-zinc-500">
              {t.stuck.beforeLabel}
            </p>
            <p className="text-sm text-zinc-400">
              {currentAction} · {currentCue}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-5 sm:p-6 space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="review-revised-action"
                className="block text-sm font-medium text-zinc-200"
              >
                {t.stuck.proposedActionLabel}
              </label>
              <textarea
                id="review-revised-action"
                rows={3}
                value={revisedAction}
                onChange={(e) => {
                  setRevisedAction(e.target.value);
                  if (reviewError) setReviewError('');
                }}
                className="w-full rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="review-revised-cue"
                className="block text-sm font-medium text-zinc-200"
              >
                {t.stuck.proposedCueLabel}
              </label>
              <input
                id="review-revised-cue"
                type="text"
                value={revisedCue}
                onChange={(e) => {
                  setRevisedCue(e.target.value);
                  if (reviewError) setReviewError('');
                }}
                className="w-full min-h-[48px] rounded-xl border border-zinc-700 bg-[#09090B] px-4 py-3 text-base text-zinc-50 focus:border-[#C81E1E] focus:outline-none focus:ring-1 focus:ring-[#C81E1E]"
              />
            </div>

            {reviewError && (
              <p className="text-sm font-medium text-red-400" role="alert">
                {reviewError}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full min-h-[52px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#C81E1E] hover:bg-[#B91C1C] px-6 py-3.5 text-base font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Check className="h-5 w-5" aria-hidden="true" />
              <span>{t.stuck.saveRevisedBtn}</span>
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStage('follow-up')}
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-transparent px-4 py-3 text-sm font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>{t.back}</span>
              </button>

              <button
                type="button"
                onClick={onDecline}
                className="flex-1 min-h-[48px] inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-transparent px-4 py-3 text-sm font-medium text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C81E1E]"
              >
                {t.stuck.declineBtn}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
