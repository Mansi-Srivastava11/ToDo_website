import './TaskCard.css';

function TaskCard({ todo, onToggle, onEdit, onDelete }) {
  return (
    <article className={`task-card ${todo.isCompleted ? 'completed' : ''}`}>
      <div className="task-main">
        <button className="checkbox-btn" onClick={onToggle}>
          {todo.isCompleted ? '✔' : ''}
        </button>

        <div className="task-content">
          <h3>{todo.title}</h3>

          {todo.description ? <p>{todo.description}</p> : <p className="muted">No description.</p>}
        </div>

        <div className="task-actions">
          <button className="text-btn" onClick={onEdit}>
            Edit
          </button>
          <button className="text-btn danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="task-meta">
        <span>{todo.dueDate ? `Due ${new Date(todo.dueDate).toLocaleDateString()}` : 'No due date'}</span>
      </div>
    </article>
  );
}

export default TaskCard;
