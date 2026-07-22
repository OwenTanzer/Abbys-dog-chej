import { FINAL_OUTCOMES, type FinalOutcome, type MilestoneTemplate } from '../types.ts';

export function canonicalAllowedOutcomes(
  outcomes: readonly FinalOutcome[],
): FinalOutcome[] {
  return FINAL_OUTCOMES.filter((outcome) => outcomes.includes(outcome));
}

export function backfillAllowedOutcomes(
  outcomes?: readonly FinalOutcome[],
): FinalOutcome[] {
  const canonical = canonicalAllowedOutcomes(outcomes ?? []);
  return canonical.length > 0 ? canonical : [...FINAL_OUTCOMES];
}

export function isMilestoneOutcomeAllowed(
  template: Pick<MilestoneTemplate, 'isFinalOutcomeMilestone' | 'allowedOutcomes'>,
  outcome: FinalOutcome,
): boolean {
  return template.isFinalOutcomeMilestone && template.allowedOutcomes.includes(outcome);
}
