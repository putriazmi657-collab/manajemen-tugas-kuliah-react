
interface TaskStatsProps {
  total: number;
  completed: number;
  pending: number;
}

export default function TaskStats({
  total,
  completed,
  pending,
}: TaskStatsProps) {
  return (
    <section className="stats-grid">
      <div className="stat-card">
        <span className="stat-icon">📚</span>
        <p>Total Tugas</p>
        <h2>{total}</h2>
      </div>

      <div className="stat-card">
        <span className="stat-icon">⏳</span>
        <p>Belum Selesai</p>
        <h2>{pending}</h2>
      </div>

      <div className="stat-card">
        <span className="stat-icon">✓</span>
        <p>Selesai</p>
        <h2>{completed}</h2>
      </div>
    </section>
  );
}
