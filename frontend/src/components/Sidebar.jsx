import './Sidebar.css';

const navItems = [
  { id: 'add', label: 'Add Note', icon: '+' },
  { id: 'tasks', label: 'My Notes', icon: '✓' },
  { id: 'dashboard', label: 'Dashboard', icon: '◫' },
];

function Sidebar({ currentView, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">K</div>
        <div>
          <p className="brand-label">Keep Notes</p>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
