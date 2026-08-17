import './Header.css';

function Header({ currentView, search, onSearch, userName, onChangeName }) {
  const pageTitles = {
    add: 'Create a New Note',
    tasks: 'My Notes',
    dashboard: 'Dashboard',
  };

  return (
    <header className="topbar">
      <div className="topbar-copy">
        <p className="eyebrow">Keep Notes</p>
        <h1>{pageTitles[currentView] || 'Keep Notes'}</h1>
      </div>

      <div className="topbar-meta">
        {currentView === 'tasks' && (
          <label className="search-field" aria-label="Search notes">
            <span className="search-icon">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search notes..."
            />
          </label>
        )}

        <div className="profile-mini">
          <span className="profile-mini-name">{userName || 'Guest'}</span>
          <button type="button" className="profile-mini-button" onClick={onChangeName}>
            {userName ? 'Profile' : 'Add name'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
