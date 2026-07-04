import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TemplateListEditor } from '../components/TemplateListEditor';
import {
  createChecklistItem,
  createMilestoneTemplate,
  deleteChecklistItem,
  deleteMilestoneTemplate,
  renameChecklistItem,
  renameMilestoneTemplate,
  reorderChecklistItem,
  reorderMilestoneTemplate,
  useChecklistItems,
  useMilestoneTemplates,
} from '../data/store';
import { PHASES, type Phase } from '../types';

export function ManageTemplates() {
  const [phase, setPhase] = useState<Phase>('Phase 1');
  const skills = useChecklistItems(phase);
  const milestones = useMilestoneTemplates(phase);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Link to="/" className="text-sm text-sky-500 hover:underline">
        ← Back to Home
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Manage Skills &amp; Milestones
        </h1>
        <p className="text-sm text-gray-500">
          These are shared by every dog. Adding, renaming, or removing one here updates
          it everywhere immediately, and progress bars recalculate to match.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PHASES.map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            className={
              p === phase
                ? 'rounded-md bg-sky-500 px-3 py-1.5 text-sm font-medium text-white'
                : 'rounded-md border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800'
            }
          >
            {p}
          </button>
        ))}
      </div>

      <TemplateListEditor
        label={`${phase} Skills`}
        addPlaceholder="New skill"
        items={skills}
        onAdd={(title) => createChecklistItem(phase, title)}
        onRename={renameChecklistItem}
        onDelete={deleteChecklistItem}
        onMove={reorderChecklistItem}
      />

      <TemplateListEditor
        label={`${phase} Milestones`}
        addPlaceholder="New milestone"
        items={milestones}
        onAdd={(title) => createMilestoneTemplate(phase, title)}
        onRename={renameMilestoneTemplate}
        onDelete={deleteMilestoneTemplate}
        onMove={reorderMilestoneTemplate}
      />
    </div>
  );
}
