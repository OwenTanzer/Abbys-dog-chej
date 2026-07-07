import { Link } from 'react-router-dom';
import { useTrainerHistoryStats } from '../data/store';

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function formatLastWorked(dateIso: string | null): string {
  if (!dateIso) return 'Never worked';
  return `Last worked ${new Date(dateIso).toLocaleDateString()}`;
}

export function TrainerHistory() {
  const stats = useTrainerHistoryStats();

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Link to="/" className="text-sm text-sky-500 hover:underline">
        ← Back to Home
      </Link>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Trainer History
        </h1>
        <p className="text-sm text-gray-500">
          Your own activity across every dog you've handled. This doesn't include other
          instructors' accounts.
        </p>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">Dogs</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Total dogs handled" value={stats.totalDogs} />
          <StatTile label="Active dogs" value={stats.activeDogs} />
          <StatTile label="Graduated" value={stats.graduatedDogs} />
          <StatTile label="Released" value={stats.releasedDogs} />
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">Activity</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Training logs" value={stats.totalLogs} />
          <StatTile label="Logs this week" value={stats.logsThisWeek} />
          <StatTile label="Logs this month" value={stats.logsThisMonth} />
          <StatTile label="Milestones completed" value={stats.milestonesCompleted} />
          <StatTile label="Skills worked on (total)" value={stats.skillsWorkedOnTotal} />
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Success rate
        </h2>
        <p className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-sm text-gray-500">
          Success rate: pending outcome model — this depends on pass-back and configurable
          milestone outcome work that hasn't landed yet.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Most-worked skills
        </h2>
        {stats.mostWorkedSkills.length === 0 && (
          <p className="text-sm text-gray-400">No skills logged as worked on yet.</p>
        )}
        <ul className="space-y-1">
          {stats.mostWorkedSkills.map((s) => (
            <li
              key={s.checklistItemId}
              className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm"
            >
              <span className="text-gray-800 dark:text-gray-200">
                {s.title} <span className="text-xs text-gray-400">· {s.phase}</span>
              </span>
              <span className="text-xs text-gray-500">{s.count}×</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Recently worked dogs
        </h2>
        {stats.recentlyWorkedDogs.length === 0 && (
          <p className="text-sm text-gray-400">No training logs yet.</p>
        )}
        <ul className="space-y-1">
          {stats.recentlyWorkedDogs.map(({ dog, lastWorkedDate }) => (
            <li key={dog.id}>
              <Link
                to={`/dog/${dog.id}`}
                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm hover:border-sky-400"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">{dog.name}</span>
                <span className="text-xs text-gray-500">{formatLastWorked(lastWorkedDate)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Dogs not worked recently
        </h2>
        {stats.dogsNotWorkedRecently.length === 0 && (
          <p className="text-sm text-gray-400">
            Every active dog has a training log from the last two weeks.
          </p>
        )}
        <ul className="space-y-1">
          {stats.dogsNotWorkedRecently.map(({ dog, lastWorkedDate }) => (
            <li key={dog.id}>
              <Link
                to={`/dog/${dog.id}`}
                className="flex items-center justify-between rounded-lg border border-amber-200 dark:border-amber-900 p-2 text-sm hover:border-amber-400"
              >
                <span className="font-medium text-gray-900 dark:text-gray-100">{dog.name}</span>
                <span className="text-xs text-amber-600 dark:text-amber-400">
                  {formatLastWorked(lastWorkedDate)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
