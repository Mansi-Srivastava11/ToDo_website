import { useEffect, useMemo, useState } from 'react';
import './AddTask.css';

const PRIORITY_OPTIONS = [
{ value: 'Low', label: 'Low' },
{ value: 'Medium', label: 'Medium' },
{ value: 'High', label: 'High' },
];

function AddTask({ editingTask, onSave, onCancel, saving }) {
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [priority, setPriority] = useState('Medium');
const [dueDate, setDueDate] = useState('');

useEffect(() => {
if (editingTask) {
setTitle(editingTask.title || '');
setDescription(editingTask.description || '');
setPriority(editingTask.priority || 'Medium');
setDueDate(
editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : ''
);
} else {
setTitle('');
setDescription('');
setPriority('Medium');
setDueDate('');
}
}, [editingTask]);

const canSubmit = useMemo(
() => title.trim().length > 0,
[title]
);

const handleSubmit = (event) => {
  event.preventDefault();
  if (!canSubmit) return;

  onSave({
    title: title.trim(),
    description: description.trim(),
    priority,
    dueDate,
  });
};

return (
  <section className="add-task-card">
    <div className="add-task-header">
      <div>
        <p className="eyebrow">Task form</p>
        <h2>{editingTask ? 'Update task' : 'Add a task'}</h2>
      </div>

      {editingTask && (
        <button type="button" className="cancel-link" onClick={onCancel}>
          Cancel
        </button>
      )}
    </div>

    <form className="add-task-form" onSubmit={handleSubmit}>
      <label>
        Title
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter task title" />
      </label>

      <label>
        Description
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Optional notes" rows="4" />
      </label>

      <label>
        Priority
        <select value={priority} onChange={(event) => setPriority(event.target.value)}>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Due Date
        <input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
      </label>

      <button type="submit" className="primary-btn" disabled={!canSubmit || saving}>
        {editingTask ? (saving ? 'Updating…' : 'Update Task') : saving ? 'Saving…' : 'Add Task'}
      </button>
    </form>
  </section>
);
}

export default AddTask;
