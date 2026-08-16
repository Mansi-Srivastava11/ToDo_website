import './Header.css';

function Header({ search, onSearch }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Shraddha's notes</p>
        <h1>Add your important notes here.</h1>
      </div>
      <div className="search-field">
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search tasks..."
        />
      </div>
    </header>
  );
}

export default Header;
