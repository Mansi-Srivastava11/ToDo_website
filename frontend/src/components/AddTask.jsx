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
      setDueDate(editingTask.dueDate ? editingTask.dueDate.slice(0, 10) : '');
      return;
    }

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
  }, [editingTask]);

  const canSubmit = useMemo(() => title.trim().length > 0, [title]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSubmit) return;

    const payload = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
    };

    const saved = await onSave(payload);

    if (saved && !editingTask) {
      resetForm();
    }
  };

  return (
    <section className="add-task-card">
      <div className="add-task-header">
        {editingTask && (
          <button type="button" className="cancel-link" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <div className="form-title-row">
          <p className="eyebrow">Note form</p>
          <h2>{editingTask ? 'Update note' : 'Create a New Note'}</h2>
        </div>

        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter note title"
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Add a clear description for this note"
            rows="5"
          />
        </label>

        <div className="form-row">
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
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="primary-btn" disabled={!canSubmit || saving}>
          {editingTask ? (saving ? 'Updating…' : 'Update Note') : saving ? 'Saving…' : 'Add Note'}
        </button>
      </form>
    </section>
  );
}

export default AddTask;
