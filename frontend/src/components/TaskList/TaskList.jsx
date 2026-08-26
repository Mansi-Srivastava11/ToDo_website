import TaskCard from '../TaskCard/TaskCard.jsx';
import './TaskList.css';

function TaskList({ todos, selectedTaskId, onSelect, onToggle, onEdit, onDelete }) {
  if (!todos.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">✓</div>
        <h3>No tasks yet</h3>
        <p>You haven’t created any tasks.</p>
        <p>Create your first task to get started.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {todos.map((todo) => (
        <TaskCard
          key={todo._id}
          todo={todo}
          selected={selectedTaskId === todo._id}
          onSelect={() => onSelect(todo)}
          onToggle={() => onToggle(todo._id)}
          onEdit={() => onEdit(todo)}
          onDelete={() => onDelete(todo._id)}
        />
      ))}
    </div>
  );
}

export default TaskList;
