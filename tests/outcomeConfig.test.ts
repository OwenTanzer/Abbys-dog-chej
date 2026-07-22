import assert from 'node:assert/strict';
import test from 'node:test';
import {
  backfillAllowedOutcomes,
  canonicalAllowedOutcomes,
  isMilestoneOutcomeAllowed,
} from '../src/lib/outcomeConfig.ts';
import { FINAL_OUTCOMES, type MilestoneTemplate } from '../src/types.ts';

function milestone(overrides: Partial<MilestoneTemplate> = {}): MilestoneTemplate {
  return {
    id: 'milestone-1',
    phase: 'Phase 4',
    title: 'Final evaluation',
    sortOrder: 0,
    isFinalOutcomeMilestone: true,
    allowedOutcomes: [...FINAL_OUTCOMES],
    repeatable: true,
    createdDate: '2026-01-01T00:00:00.000Z',
    updatedDate: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

test('legacy milestones default to every outcome', () => {
  assert.deepEqual(backfillAllowedOutcomes(), FINAL_OUTCOMES);
  assert.deepEqual(backfillAllowedOutcomes([]), FINAL_OUTCOMES);
});

test('configured outcomes are deduplicated and kept in canonical order', () => {
  assert.deepEqual(
    canonicalAllowedOutcomes(['Fail', 'Placement Ready', 'Fail']),
    ['Placement Ready', 'Fail'],
  );
});

test('future outcomes require both an enabled prompt and an allowed choice', () => {
  const configured = milestone({ allowedOutcomes: ['Additional Objectives', 'Fail'] });
  assert.equal(isMilestoneOutcomeAllowed(configured, 'Placement Ready'), false);
  assert.equal(isMilestoneOutcomeAllowed(configured, 'Fail'), true);
  assert.equal(
    isMilestoneOutcomeAllowed(
      { ...configured, isFinalOutcomeMilestone: false },
      'Fail',
    ),
    false,
  );
});

test('changing the allowed list does not mutate recorded attempts', () => {
  const attempts = [
    { outcome: 'Fail', notes: 'First evaluation' },
    { outcome: 'Placement Ready', notes: 'Passed retake' },
  ] as const;
  const snapshot = structuredClone(attempts);

  canonicalAllowedOutcomes(['Additional Objectives']);

  assert.deepEqual(attempts, snapshot);
});
