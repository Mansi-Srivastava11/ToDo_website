import './Dashboard.css';

function Dashboard({ todos }) {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.isCompleted).length;
  const pending = total - completed;
  const highPriority = todos.filter((todo) => (todo.priority || 'Medium') === 'High').length;
  const dueSoon = todos.filter((todo) => {
    if (!todo.dueDate) return false;
    const due = new Date(todo.dueDate);
    const diff = due.getTime() - Date.now();
    return diff > 0 && diff <= 1000 * 60 * 60 * 24 * 7;
  }).length;

  const stats = [
    { label: 'Total Tasks', value: total },
    { label: 'Completed', value: completed },
    { label: 'Pending', value: pending },
    { label: 'High Priority', value: highPriority },
    { label: 'Due Soon', value: dueSoon },
  ];

  return (
    <section className="dashboard-panel">
      <div className="stat-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </div>
        ))}
      </div>

      <div className="dashboard-summary">
        <div className="summary-panel">
          <h3>Overview</h3>
          <p>
            {completed} tasks completed and {pending} still in progress. Keep momentum on your
            next priorities.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
