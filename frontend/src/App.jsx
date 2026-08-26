import { useEffect, useMemo, useRef, useState } from 'react';

import Header from './components/Header/Header.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import AddTask from './components/AddTask/AddTask.jsx';
import TaskList from './components/TaskList/TaskList.jsx';
import TaskDetails from './components/TaskDetails/TaskDetails.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';

import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';

import {
  getToken,
  getCurrentUser,
  logoutUser,
} from './services/authService.js';

import {
  fetchTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from './services/todoService.js';

import { loginUser } from "../services/authService.js";
import { registerUser } from "../services/authService.js";

import './App.css';

const STORAGE_KEY = 'keepNotesUserName';

function App() {
  // ================================
  // Authentication
  // ================================

  const [token, setToken] = useState(() => getToken());
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [authView, setAuthView] = useState('login');

  const isAuthenticated = Boolean(token);

  // ================================
  // Existing Todo States
  // ================================

  const [todos, setTodos] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentView, setCurrentView] = useState('add');
  const [search, setSearch] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  // ================================
  // User Name
  // ================================

  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [isNameEditorOpen, setIsNameEditorOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState('');

  const toastTimerRef = useRef(null);

  // ================================
  // Set User Information
  // ================================

  useEffect(() => {
    if (!isAuthenticated || !currentUser) {
      return;
    }

    const registeredName = currentUser.name?.trim();

    const savedName = localStorage.getItem(STORAGE_KEY);

    const finalName =
      registeredName ||
      (savedName && savedName.trim());

    if (finalName) {
      setUserName(finalName);
      setNameDraft(finalName);
      setShowNamePrompt(false);
    } else {
      setUserName('');
      setNameDraft('');
      setShowNamePrompt(true);
    }

    document.title = 'Keep Notes';
  }, [isAuthenticated, currentUser]);

  // ================================
  // Login
  // ================================

  const handleLogin = (user) => {
    const newToken = getToken();

    setToken(newToken);
    setCurrentUser(user);

    if (user?.name) {
      localStorage.setItem(
        STORAGE_KEY,
        user.name.trim()
      );

      setUserName(user.name.trim());
      setNameDraft(user.name.trim());
    }

    setCurrentView('add');
    setTodos([]);
    setSelectedTask(null);
    setSearch('');
  };

  // ================================
  // Register
  // ================================

  const handleRegister = (user) => {
    const newToken = getToken();

    setToken(newToken);
    setCurrentUser(user);

    if (user?.name) {
      localStorage.setItem(
        STORAGE_KEY,
        user.name.trim()
      );

      setUserName(user.name.trim());
      setNameDraft(user.name.trim());
    }

    setCurrentView('add');
    setTodos([]);
    setSelectedTask(null);
    setSearch('');
  };

  // ================================
  // Logout
  // ================================

  const handleLogout = () => {
    logoutUser();

    setToken(null);
    setCurrentUser(null);

    setTodos([]);
    setSelectedTask(null);
    setEditingTask(null);
    setSearch('');

    setUserName('');
    setNameDraft('');

    setCurrentView('add');
    setAuthView('login');

    showToast('Logged out successfully.');
  };

  // ================================
  // Toast
  // ================================

  const showToast = (message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToast(message);

    toastTimerRef.current = setTimeout(
      () => setToast(''),
      2600
    );
  };

  // ================================
  // Save User Name
  // ================================

  const saveUserName = (nextValue) => {
    const normalized = nextValue.trim();

    if (normalized) {
      localStorage.setItem(
        STORAGE_KEY,
        normalized
      );

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

  // ================================
  // Fetch Todos
  // ================================

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    let isMounted = true;

    const loadTodos = async () => {
      setLoading(true);

      try {
        const response = await fetchTodos({
          search,
        });

        const todoList = response.data || [];

        if (!isMounted) return;

        setTodos(todoList);

        if (!todoList.length) {
          setSelectedTask(null);
          return;
        }

        if (
          !selectedTask ||
          !todoList.some(
            (todo) => todo._id === selectedTask._id
          )
        ) {
          setSelectedTask(todoList[0]);
        }
      } catch (err) {
        if (!isMounted) return;

        if (
          err.message?.toLowerCase().includes('authentication') ||
          err.message?.toLowerCase().includes('token') ||
          err.message?.toLowerCase().includes('unauthorized')
        ) {
          handleLogout();
          return;
        }

        showToast(
          err.message || 'Unable to load tasks.'
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTodos();

    return () => {
      isMounted = false;
    };
  }, [search, isAuthenticated]);

  // ================================
  // Filter Todos
  // ================================

  const filteredTodos = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return todos;

    return todos.filter((todo) => {
      const title = (
        todo.title || ''
      ).toLowerCase();

      const description = (
        todo.description || ''
      ).toLowerCase();

      return (
        title.includes(term) ||
        description.includes(term)
      );
    });
  }, [search, todos]);

  // ================================
  // Selected Task
  // ================================

  useEffect(() => {
    if (!filteredTodos.length) {
      setSelectedTask(null);
      return;
    }

    if (
      !selectedTask ||
      !filteredTodos.some(
        (todo) =>
          todo._id === selectedTask._id
      )
    ) {
      setSelectedTask(filteredTodos[0]);
    }
  }, [filteredTodos, selectedTask]);

  // ================================
  // Save Todo
  // ================================

  const handleSave = async (payload) => {
    setSaving(true);

    try {
      if (editingTask) {
        const response = await updateTodo(
          editingTask._id,
          payload
        );

        const updatedTask = response.data;

        setTodos((current) =>
          current.map((todo) =>
            todo._id === editingTask._id
              ? updatedTask
              : todo
          )
        );

        setSelectedTask(updatedTask);
        setEditingTask(null);
        setCurrentView('tasks');

        showToast('Note updated.');

        return true;
      }

      const response = await createTodo(payload);

      const createdTask =
        response.data || response.todo;

      setTodos((current) => [
        createdTask,
        ...current,
      ]);

      setSelectedTask(createdTask);

      showToast('Note added.');

      setCurrentView('add');

      return true;
    } catch (err) {
      showToast(
        err.message || 'Unable to save note.'
      );

      return false;
    } finally {
      setSaving(false);
    }
  };

  // ================================
  // Toggle Todo
  // ================================

  const handleToggle = async (id) => {
    try {
      const response = await toggleTodo(id);

      const updatedTask = response.data;

      setTodos((current) =>
        current.map((todo) =>
          todo._id === id
            ? updatedTask
            : todo
        )
      );

      setSelectedTask((current) =>
        current && current._id === id
          ? updatedTask
          : current
      );

      showToast('Note status updated.');
    } catch (err) {
      showToast(
        err.message || 'Unable to update note.'
      );
    }
  };

  // ================================
  // Delete Todo
  // ================================

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) {
      return;
    }

    try {
      await deleteTodo(id);

      setTodos((current) =>
        current.filter(
          (todo) => todo._id !== id
        )
      );

      setSelectedTask((current) =>
        current && current._id === id
          ? null
          : current
      );

      showToast('Note deleted.');
    } catch (err) {
      showToast(
        err.message || 'Unable to delete note.'
      );
    }
  };

  // ================================
  // Edit Todo
  // ================================

  const handleEditTask = (task) => {
    setEditingTask(task);
    setCurrentView('add');
  };

  // ================================
  // Login/Register Screen
  // ================================

  if (!isAuthenticated) {
    if (authView === 'register') {
      return (
        <Register
          onRegister={handleRegister}
          onLogin={() => setAuthView('login')}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => setAuthView('register')}
      />
    );
  }

  // ================================
  // Existing Tasks View
  // ================================

  const renderTasksView = () => (
    <section className="view-panel tasks-view">
      <div className="tasks-layout">

        <div className="task-column">

          <div className="panel-heading-row">
            <div>
              <p className="eyebrow">
                Workspace
              </p>

              <h2>My Notes</h2>
            </div>
          </div>

          {loading ? (
            <div className="loading-card">
              Loading notes...
            </div>
          ) : (
            <TaskList
              todos={filteredTodos}
              selectedTaskId={
                selectedTask?._id
              }
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

  // ================================
  // Main UI
  // ================================

  const profileName =
    userName ||
    currentUser?.name ||
    'Guest';

  return (
    <div className="app-shell">

      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />

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

          {/* Name Prompt */}

          {showNamePrompt && (
            <section className="name-prompt-shell">

              <div className="name-prompt-card">

                <p className="eyebrow">
                  Welcome
                </p>

                <h2>
                  Welcome to Keep Notes
                </h2>

                <p className="prompt-copy">
                  What should we call you?
                </p>

                <div className="prompt-form">

                  <input
                    type="text"
                    value={nameDraft}
                    onChange={(event) =>
                      setNameDraft(
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                  />

                  <div className="prompt-actions">

                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() =>
                        saveUserName(
                          nameDraft
                        )
                      }
                    >
                      Continue
                    </button>

                    <button
                      type="button"
                      className="tertiary-btn"
                      onClick={() => {
                        setShowNamePrompt(false);
                        setNameDraft('');
                      }}
                    >
                      Skip for now
                    </button>

                  </div>

                </div>

              </div>

            </section>
          )}

          {/* Name Editor */}

          {isNameEditorOpen && (
            <div
              className="name-modal-backdrop"
              onClick={() =>
                setIsNameEditorOpen(false)
              }
            >

              <div
                className="name-modal"
                onClick={(event) =>
                  event.stopPropagation()
                }
              >

                <p className="eyebrow">
                  Profile
                </p>

                <h3>Your name</h3>

                <input
                  type="text"
                  value={nameDraft}
                  onChange={(event) =>
                    setNameDraft(
                      event.target.value
                    )
                  }
                  placeholder="Enter your name"
                />

                <div className="prompt-actions">

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() =>
                      saveUserName(
                        nameDraft
                      )
                    }
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="tertiary-btn"
                    onClick={() =>
                      setIsNameEditorOpen(false)
                    }
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>
          )}

          {/* Add Task */}

          {currentView === 'add' && (
            <section className="view-panel add-task-view">

              <div className="top-profile-row">

                <div className="profile-pill">

                  <span className="profile-greeting">
                    {userName
                      ? `Welcome back, ${userName}`
                      : 'Welcome, Guest'}
                  </span>

                  <button
                    type="button"
                    className="profile-link"
                    onClick={() => {
                      setNameDraft(
                        userName || ''
                      );

                      setIsNameEditorOpen(true);
                    }}
                  >
                    {userName
                      ? 'Change name'
                      : 'Add your name'}
                  </button>

                </div>

              </div>

              <AddTask
                editingTask={editingTask}
                onSave={handleSave}
                onCancel={() =>
                  setEditingTask(null)
                }
                saving={saving}
                currentView={currentView}
              />

            </section>
          )}

          {/* Tasks */}

          {currentView === 'tasks' &&
            renderTasksView()}

          {/* Dashboard */}

          {currentView === 'dashboard' && (
            <Dashboard
              todos={todos}
            />
          )}

        </main>

      </div>

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}

    </div>
  );
}

export default App;