import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
import { fetchTodos, createTodo, updateTodo, toggleTodo, deleteTodo } from './api/todoService.js';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);

  const showStatus = (text) => {
    setStatus(text);
    setTimeout(() => setStatus(''), 2500);
  };

  const loadTodos = async () => {
    setLoading(true);
    try {
      const response = await fetchTodos({ search });
      setTodos(response.data || []);
    } catch (err) {
      showStatus(err.message || 'Unable to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, [search]);

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (!search.trim()) return true;
        const term = search.toLowerCase();
        return (
          todo.title.toLowerCase().includes(term) ||
          (todo.description || '').toLowerCase().includes(term)
        );
      }),
    [search, todos]
  );

  const stats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((todo) => todo.isCompleted).length,
      pending: todos.filter((todo) => !todo.isCompleted).length,
    }),
    [todos]
  );

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (editingTask) {
        const response = await updateTodo(editingTask._id, payload);
        setTodos((current) => current.map((todo) => (todo._id === editingTask._id ? response.data : todo)));
        setEditingTask(null);
        showStatus('Task updated.');
      } else {
        const response = await createTodo(payload);
        setTodos((current) => [response.data, ...current]);
        showStatus('Task added.');
      }
    } catch (err) {
      showStatus(err.message || 'Unable to save task.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const response = await toggleTodo(id);
      setTodos((current) => current.map((todo) => (todo._id === id ? response.data : todo)));
      showStatus('Task updated.');
    } catch (err) {
      showStatus(err.message || 'Unable to update task.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo._id !== id));
      showStatus('Task deleted.');
    } catch (err) {
      showStatus(err.message || 'Unable to delete task.');
    }
  };

  return (
    <div className="app-shell">
      <div className="page-shell">
        <Header search={search} onSearch={setSearch} />

        <section className="summary-card">
          
          <div className="stat-row">
            <div>
              <p>Total</p>
              <strong>{stats.total}</strong>
            </div>
            <div>
              <p>Completed</p>
              <strong>{stats.completed}</strong>
            </div>
            <div>
              <p>Pending</p>
              <strong>{stats.pending}</strong>
            </div>
          </div>
        </section>

        <section className="main-grid">
          <div className="form-panel">
            <AddTask
              editingTask={editingTask}
              onSave={handleSave}
              onCancel={() => setEditingTask(null)}
              saving={saving}
            />
          </div>

          <div className="tasks-panel">
            <div className="panel-header">
              <div>
                <h2>Tasks</h2>
                <p className="panel-copy">Your notes.</p>
              </div>
            </div>

            {status && <div className="status-card">{status}</div>}

            {loading ? (
              <div className="loading-card">Loading tasks...</div>
            ) : (
              <TaskList todos={filteredTodos} onToggle={handleToggle} onEdit={setEditingTask} onDelete={handleDelete} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
