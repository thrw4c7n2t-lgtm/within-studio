import "./App.css";

function App() {
  const modules = [
    ["🏡", "Dashboard", "Overview and quick actions"],
    ["📚", "Book Creator", "Build personalised therapy books"],
    ["🌿", "Explorer Collection", "Child-friendly nature-based resources"],
    ["👨‍👩‍👧", "Parent Guides", "Family handouts and reflection tools"],
    ["🎨", "Resource Library", "Worksheets, cards and activities"],
    ["⚙️", "Settings", "Brand and export settings"],
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Within</h2>
        {modules.map(([icon, title]) => (
          <button key={title} className="navButton">
            <span>{icon}</span>
            {title}
          </button>
        ))}
      </aside>

      <main className="main">
        <section className="welcome">
          <p className="eyebrow">Within Studio</p>
          <h1>What would you like to create today?</h1>
          <p>
            Build therapeutic books, family resources, printable tools and gentle
            learning experiences from one calm creative workspace.
          </p>
        </section>

        <section className="moduleGrid">
          {modules.slice(1).map(([icon, title, text]) => (
            <div className="moduleCard" key={title}>
              <div className="icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <button>Open</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
