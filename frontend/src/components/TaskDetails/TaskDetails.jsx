import './TaskDetails.css';

function TaskDetails({ task, onEdit, onDelete, onToggle }) {
  if (!task) {
    return (
      <aside className="task-details empty-details">
        <div className="details-empty-state">
          <div className="details-empty-icon">◌</div>
          <h3>Select a task</h3>
          <p>Pick a task from the list to view its details and actions.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="task-details">
      <div className="details-header">
        <div>
          <p className="eyebrow">Task details</p>
          <h3>{task.title}</h3>
        </div>

        <span className={`status-pill ${task.isCompleted ? 'done' : 'pending'}`}>
          {task.isCompleted ? 'Completed' : 'Pending'}
        </span>
      </div>

      <div className="details-section">
        <p className="detail-label">Description</p>
        <p className="detail-value">{task.description || 'No description provided.'}</p>
      </div>

      <div className="details-grid">
        <div className="details-section compact">
          <p className="detail-label">Priority</p>
          <span className={`priority-badge ${(task.priority || 'Medium').toLowerCase()}`}>
            {task.priority || 'Medium'}
          </span>
        </div>

        <div className="details-section compact">
          <p className="detail-label">Due date</p>
          <p className="detail-value small">
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
          </p>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-section compact">
          <p className="detail-label">Created</p>
          <p className="detail-value small">
            {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'Unknown'}
          </p>
        </div>

        <div className="details-section compact">
          <p className="detail-label">Updated</p>
          <p className="detail-value small">
            {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'Unknown'}
          </p>
        </div>
      </div>

      <div className="details-actions">
        <button type="button" className="secondary-btn" onClick={() => onToggle(task._id)}>
          {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button type="button" className="secondary-btn" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="danger-btn" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </aside>
  );
}

export default TaskDetails;
