export type Phase = 'Phase 1' | 'Phase 2' | 'Phase 3' | 'Phase 4';

export const PHASES: Phase[] = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'];

export type GraduationStatus =
  | 'Not Started'
  | 'In Progress'
  | 'Near Graduation'
  | 'Graduated';

export interface Folder {
  id: string;
  name: string;
  parentFolderId: string | null;
  sortOrder: number;
  createdDate: string;
  updatedDate: string;
}

export interface Dog {
  id: string;
  name: string;
  profilePhoto: string | null;
  folderId: string;
  sortOrder: number;
  currentPhase: Phase;
  graduationProgress: number;
  graduationStatus: GraduationStatus;
  released: boolean;
  releasedDate: string | null;
  // Distinct from a live graduationStatus of 'Graduated' reached by simply
  // completing everything that currently exists — this is the explicit,
  // deliberate "Mark Graduated" action (#31), and it freezes graduationProgress/
  // graduationStatus so later edits to the shared skill/milestone templates
  // never retroactively change what a graduated dog displays.
  graduated: boolean;
  graduatedDate: string | null;
  createdDate: string;
  updatedDate: string;
}

export interface TrainingReport {
  id: string;
  dogId: string;
  phase: Phase;
  redFlag: boolean;
  locationId: string | null;
  notes: string;
  picture: string | null;
  skillIds: string[];
  createdDate: string;
  updatedDate: string;
}

export interface Location {
  id: string;
  name: string;
  createdDate: string;
  lastUsedDate: string;
}

export interface PhaseChecklistItem {
  id: string;
  phase: Phase;
  title: string;
  description: string;
  requiredForGraduation: boolean;
  sortOrder: number;
  createdDate: string;
  updatedDate: string;
}

export interface DogChecklistCompletion {
  id: string;
  dogId: string;
  checklistItemId: string;
  completed: boolean;
  inProgress: boolean;
  dateCompleted: string | null;
  notes: string | null;
  flagged: boolean;
}

export interface MilestoneTemplate {
  id: string;
  phase: Phase;
  title: string;
  sortOrder: number;
  createdDate: string;
  updatedDate: string;
}

export interface DogMilestoneCompletion {
  id: string;
  dogId: string;
  milestoneTemplateId: string;
  completed: boolean;
  dateCompleted: string | null;
  notes: string | null;
  photo: string | null;
}
