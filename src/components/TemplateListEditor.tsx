import { useState } from 'react';

export interface TemplateListItem {
  id: string;
  title: string;
}

export function TemplateListEditor({
  label,
  addPlaceholder,
  items,
  onAdd,
  onRename,
  onDelete,
  onMove,
}: {
  label: string;
  addPlaceholder: string;
  items: TemplateListItem[];
  onAdd: (title: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: 'up' | 'down') => void;
}) {
  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setNewTitle('');
  }

  function startEditing(item: TemplateListItem) {
    setEditingId(item.id);
    setEditingTitle(item.title);
  }

  function commitEdit() {
    const trimmed = editingTitle.trim();
    if (editingId && trimmed) onRename(editingId, trimmed);
    setEditingId(null);
  }

  return (
    <section className="space-y-2">
      <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">{label}</h2>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 p-2"
          >
            <div className="flex flex-col">
              <button
                title="Move up"
                disabled={index === 0}
                onClick={() => onMove(item.id, 'up')}
                className="px-1 text-xs text-gray-500 hover:text-sky-500 disabled:opacity-20"
              >
                ▲
              </button>
              <button
                title="Move down"
                disabled={index === items.length - 1}
                onClick={() => onMove(item.id, 'down')}
                className="px-1 text-xs text-gray-500 hover:text-sky-500 disabled:opacity-20"
              >
                ▼
              </button>
            </div>
            {editingId === item.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  commitEdit();
                }}
                className="flex-1"
              >
                <input
                  autoFocus
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={commitEdit}
                  className="w-full rounded-md border border-sky-400 bg-transparent px-2 py-1 text-sm"
                />
              </form>
            ) : (
              <span className="flex-1 text-sm text-gray-800 dark:text-gray-200">
                {item.title}
              </span>
            )}
            <button
              title="Rename"
              onClick={() => startEditing(item)}
              className="rounded p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ✏️
            </button>
            <button
              title="Delete"
              onClick={() => {
                if (confirm(`Delete "${item.title}"? This removes it for every dog.`)) {
                  onDelete(item.id);
                }
              }}
              className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              🗑️
            </button>
          </li>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-gray-400">Nothing here yet for this phase.</p>
        )}
      </ul>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={addPlaceholder}
          className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-1.5 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-sky-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-600"
        >
          Add
        </button>
      </form>
    </section>
  );
}
