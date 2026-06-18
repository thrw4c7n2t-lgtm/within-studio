import { useState } from "react";
import "./App.css";

function App() {
  const [active, setActive] = useState("Dashboard");

  const modules = [
    ["🏡", "Dashboard"],
    ["📚", "Book Creator"],
    ["🌿", "Explorer Collection"],
    ["👨‍👩‍👧", "Parent Guides"],
    ["🎨", "Resource Library"],
    ["⚙️", "Settings"],
  ];

  const screenText: Record<string, string> = {
    Dashboard: "Your calm creative home base for Within.",
    "Book Creator": "Build personalised therapeutic books and printable journals.",
    "Explorer Collection": "Nature-based resources for children’s emotions, regulation and confidence.",
    "Parent Guides": "Gentle family handouts, scripts and reflection tools.",
    "Resource Library": "Worksheets, cards, prompts, activities and visual supports.",
    Settings: "Brand colours, export settings and future account options.",
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Within</h2>

        {modules.map(([icon, title]) => (
          <button
            key={title}
            className={active === title ? "navButton active" : "navButton"}
            onClick={() => setActive(title)}
          >
            <span>{icon}</span>
            {title}
          </button>
        ))}
      </aside>

      <main className="main">
        <section className="welcome">
          <p className="eyebrow">Within Studio</p>
          <h1>{active}</h1>
          <p>{screenText[active]}</p>
        </section>

        <section className="moduleGrid">
          {modules
            .filter(([, title]) => title !== "Dashboard")
            .map(([icon, title]) => (
              <div className="moduleCard" key={title}>
                <div className="icon">{icon}</div>
                <h3>{title}</h3>
                <p>{screenText[title]}</p>
                <button onClick={() => setActive(title)}>Open</button>
              </div>
            ))}
        </section>
      </main>
    </div>
  );
}

export default App;