import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import AddTask from './components/AddTask.jsx';
import TaskList from './components/TaskList.jsx';
import TaskDetails from './components/TaskDetails.jsx';
import Dashboard from './components/Dashboard.jsx';
import { fetchTodos, createTodo, updateTodo, toggleTodo, deleteTodo } from './api/todoService.js';
import './App.css';

const STORAGE_KEY = 'keepNotesUserName';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentView, setCurrentView] = useState('add');
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [isNameEditorOpen, setIsNameEditorOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState('');
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const savedName = localStorage.getItem(STORAGE_KEY);

    if (savedName && savedName.trim()) {
      setUserName(savedName.trim());
      setNameDraft(savedName.trim());
    } else {
      setUserName('');
      setNameDraft('');
      setShowNamePrompt(true);
    }

    document.title = 'Keep Notes';
  }, []);

  const showToast = (message) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(''), 2600);
  };

  const saveUserName = (nextValue) => {
    const normalized = nextValue.trim();

    if (normalized) {
      localStorage.setItem(STORAGE_KEY, normalized);
      setUserName(normalized);
      setNameDraft(normalized);
      setShowNamePrompt(false);
      setIsNameEditorOpen(false);
      return;
    }

    localStorage.removeItem(STORAGE_KEY);
    setUserName('');
    setNameDraft('');
    setShowNamePrompt(false);
    setIsNameEditorOpen(false);
  };

  useEffect(() => {
    let isMounted = true;

    const loadTodos = async () => {
      setLoading(true);
      try {
        const response = await fetchTodos({ search });
        const todoList = response.data || [];

        if (!isMounted) return;

        setTodos(todoList);
        if (!todoList.length) {
          setSelectedTask(null);
          return;
        }

        if (!selectedTask || !todoList.some((todo) => todo._id === selectedTask._id)) {
          setSelectedTask(todoList[0]);
        }
      } catch (err) {
        if (!isMounted) return;
        showToast(err.message || 'Unable to load tasks.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTodos();

    return () => {
      isMounted = false;
    };
  }, [search]);

  const filteredTodos = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return todos;

    return todos.filter((todo) => {
      const title = (todo.title || '').toLowerCase();
      const description = (todo.description || '').toLowerCase();
      return title.includes(term) || description.includes(term);
    });
  }, [search, todos]);

  useEffect(() => {
    if (!filteredTodos.length) {
      setSelectedTask(null);
      return;
    }

    if (!selectedTask || !filteredTodos.some((todo) => todo._id === selectedTask._id)) {
      setSelectedTask(filteredTodos[0]);
    }
  }, [filteredTodos, selectedTask]);

  const handleSave = async (payload) => {
    setSaving(true);

    try {
      if (editingTask) {
        const response = await updateTodo(editingTask._id, payload);
        const updatedTask = response.data;

        setTodos((current) =>
          current.map((todo) => (todo._id === editingTask._id ? updatedTask : todo))
        );
        setSelectedTask(updatedTask);
        setEditingTask(null);
        setCurrentView('tasks');
        showToast('Note updated.');
        return true;
      }

      const response = await createTodo(payload);
      const createdTask = response.data || response.todo;

      setTodos((current) => [createdTask, ...current]);
      setSelectedTask(createdTask);
      showToast('Note added.');
      setCurrentView('add');
      return true;
    } catch (err) {
      showToast(err.message || 'Unable to save note.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      const response = await toggleTodo(id);
      const updatedTask = response.data;

      setTodos((current) =>
        current.map((todo) => (todo._id === id ? updatedTask : todo))
      );

      setSelectedTask((current) =>
        current && current._id === id ? updatedTask : current
      );

      showToast('Note status updated.');
    } catch (err) {
      showToast(err.message || 'Unable to update note.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;

    try {
      await deleteTodo(id);
      setTodos((current) => current.filter((todo) => todo._id !== id));
      setSelectedTask((current) => (current && current._id === id ? null : current));
      showToast('Note deleted.');
    } catch (err) {
      showToast(err.message || 'Unable to delete note.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setCurrentView('add');
  };

  const profileName = userName || 'Guest';
  const greeting = userName ? `Welcome back, ${userName}` : 'Guest';

  const renderTasksView = () => (
    <section className="view-panel tasks-view">
      <div className="tasks-layout">
        <div className="task-column">
          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">Workspace</p>
              <h2>My Notes</h2>
            </div>
          </div>

          {loading ? (
            <div className="loading-card">Loading notes...</div>
          ) : (
            <TaskList
              todos={filteredTodos}
              selectedTaskId={selectedTask?._id}
              onSelect={setSelectedTask}
              onToggle={handleToggle}
              onEdit={handleEditTask}
              onDelete={handleDelete}
            />
          )}
        </div>

        <TaskDetails
          task={selectedTask}
          onEdit={handleEditTask}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </div>
    </section>
  );

  return (
    <div className="app-shell">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      <div className="content-area">
        {currentView !== 'add' && (
          <Header
            currentView={currentView}
            search={search}
            onSearch={setSearch}
            userName={profileName}
            onChangeName={() => {
              setNameDraft(userName || '');
              setIsNameEditorOpen(true);
            }}
          />
        )}

        <main className="main-content">
          {showNamePrompt && (
            <section className="name-prompt-shell">
              <div className="name-prompt-card">
                <p className="eyebrow">Welcome</p>
                <h2>Welcome to Keep Notes</h2>
                <p className="prompt-copy">What should we call you?</p>

                <div className="prompt-form">
                  <input
                    type="text"
                    value={nameDraft}
                    onChange={(event) => setNameDraft(event.target.value)}
                    placeholder="Enter your name"
                  />

                  <div className="prompt-actions">
                    <button type="button" className="primary-btn" onClick={() => saveUserName(nameDraft)}>
                      Continue
                    </button>
                    <button type="button" className="tertiary-btn" onClick={() => {
                      setShowNamePrompt(false);
                      setNameDraft('');
                    }}>
                      Skip for now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {isNameEditorOpen && (
            <div className="name-modal-backdrop" onClick={() => setIsNameEditorOpen(false)}>
              <div className="name-modal" onClick={(event) => event.stopPropagation()}>
                <p className="eyebrow">Profile</p>
                <h3>Your name</h3>
                <input
                  type="text"
                  value={nameDraft}
                  onChange={(event) => setNameDraft(event.target.value)}
                  placeholder="Enter your name"
                />
                <div className="prompt-actions">
                  <button type="button" className="primary-btn" onClick={() => saveUserName(nameDraft)}>
                    Save
                  </button>
                  <button type="button" className="tertiary-btn" onClick={() => setIsNameEditorOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentView === 'add' && (
            <section className="view-panel add-task-view">
              <div className="top-profile-row">
                <div className="profile-pill">
                  <span className="profile-greeting">{userName ? `Welcome back, ${userName}` : 'Welcome, Guest'}</span>
                  <button type="button" className="profile-link" onClick={() => {
                    setNameDraft(userName || '');
                    setIsNameEditorOpen(true);
                  }}>
                    {userName ? 'Change name' : 'Add your name'}
                  </button>
                </div>
              </div>

              <AddTask
                editingTask={editingTask}
                onSave={handleSave}
                onCancel={() => setEditingTask(null)}
                saving={saving}
                currentView={currentView}
              />
            </section>
          )}

          {currentView === 'tasks' && renderTasksView()}

          {currentView === 'dashboard' && <Dashboard todos={todos} />}
        </main>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
