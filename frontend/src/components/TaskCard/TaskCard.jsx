import './TaskCard.css';

function TaskCard({ todo, selected, onSelect, onToggle, onEdit, onDelete }) {
  const priorityClass = `priority-${(todo.priority || 'Medium').toLowerCase()}`;

  const handleToggleClick = (event) => {
    event.stopPropagation();
    onToggle();
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    onEdit();
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <article
      className={`task-card ${todo.isCompleted ? 'completed' : ''} ${selected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="task-card-header">
        <button className="checkbox-btn" onClick={handleToggleClick} aria-label="Toggle completion">
          {todo.isCompleted ? '✓' : ''}
        </button>

        <span className={`priority-badge ${priorityClass}`}>
          {todo.priority || 'Medium'}
        </span>
      </div>

      <div className="task-content">
        <h3>{todo.title}</h3>
        <p>{todo.description || 'No description provided.'}</p>
      </div>

      <div className="task-meta">
        <span className="meta-label">
          {todo.dueDate ? `Due ${new Date(todo.dueDate).toLocaleDateString()}` : 'No due date'}
        </span>
        <span className={`status-pill ${todo.isCompleted ? 'done' : 'pending'}`}>
          {todo.isCompleted ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className="task-actions">
        <button className="text-btn" onClick={handleEditClick}>
          Edit
        </button>
        <button className="text-btn danger" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
