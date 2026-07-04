import type { MilestoneTemplate } from '../types';

let sortOrder = 0;
const milestone = (
  phase: MilestoneTemplate['phase'],
  title: string,
): MilestoneTemplate => ({
  id: crypto.randomUUID(),
  phase,
  title,
  sortOrder: sortOrder++,
  createdDate: new Date().toISOString(),
  updatedDate: new Date().toISOString(),
});

export function buildDefaultMilestones(): MilestoneTemplate[] {
  sortOrder = 0;
  return [
    milestone('Phase 1', 'First successful public outing'),
    milestone('Phase 1', 'Completed Phase 1 evaluation'),

    milestone('Phase 2', 'First calm interaction with another dog'),

    milestone('Phase 3', 'Passed leash-walking benchmark'),

    milestone('Phase 4', 'Ready for graduation review'),
  ];
}
