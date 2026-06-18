import { useState } from "react";
import "./App.css";

function App() {
  const [active, setActive] = useState("Dashboard");
  const [childName, setChildName] = useState("");
  const [focus, setFocus] = useState("Big feelings");
  const [animal, setAnimal] = useState("");
  const [generated, setGenerated] = useState(false);

  const modules = [
    { icon: "🏡", title: "Dashboard" },
    { icon: "📚", title: "Book Creator" },
    { icon: "🌿", title: "Explorer Collection" },
    { icon: "👨‍👩‍👧", title: "Parent Guides" },
    { icon: "🎨", title: "Resource Library" },
    { icon: "⚙️", title: "Settings" },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Within</h2>

        {modules.map((module) => (
          <button
            key={module.title}
            className={active === module.title ? "navButton active" : "navButton"}
            onClick={() => setActive(module.title)}
          >
            <span>{module.icon}</span>
            {module.title}
          </button>
        ))}
      </aside>

      <main className="main">
        {active === "Dashboard" && (
          <>
            <section className="welcome">
              <p className="eyebrow">Within Studio</p>
              <h1>What would you like to create today?</h1>
              <p>A calm creative workspace for therapeutic books, family resources and printable tools.</p>
            </section>

            <section className="moduleGrid">
              {modules.filter((m) => m.title !== "Dashboard").map((module) => (
                <div className="moduleCard" key={module.title}>
                  <div className="icon">{module.icon}</div>
                  <h3>{module.title}</h3>
                  <p>Open this area to begin creating.</p>
                  <button onClick={() => setActive(module.title)}>Open</button>
                </div>
              ))}
            </section>
          </>
        )}

        {active === "Book Creator" && (
          <>
            <section className="welcome">
              <p className="eyebrow">Within Studio</p>
              <h1>Book Creator</h1>
              <p>Create a personalised Explorer Collection therapy book preview.</p>
            </section>

            <section className="creator">
              <div className="formPanel">
                <h2>Create Explorer Book</h2>

                <label>Child's name</label>
                <input value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="e.g. Arthur" />

                <label>Therapy focus</label>
                <select value={focus} onChange={(e) => setFocus(e.target.value)}>
                  <option>Big feelings</option>
                  <option>Anxiety</option>
                  <option>Transitions</option>
                  <option>Friendship</option>
                  <option>Sensory regulation</option>
                  <option>Confidence</option>
                </select>

                <label>Animal guide</label>
                <input value={animal} onChange={(e) => setAnimal(e.target.value)} placeholder="e.g. frog, koala, owl" />

                <button onClick={() => setGenerated(true)}>Generate Preview</button>
              </div>

              <div className="bookPreview">
                <p className="eyebrow">Printable Preview</p>
                <h2>{childName || "Your child"}'s Explorer Journal</h2>
                <h3>A gentle adventure about {focus.toLowerCase()}</h3>

                {generated ? (
                  <>
                    <p>
                      Today, {childName || "your child"} begins a journey through Within Valley with a wise little{" "}
                      {animal || "butterfly"} guide.
                    </p>

                    <div className="missionBox">
                      <h4>Today's Mission</h4>
                      <p>Notice one feeling in your body, give it a name, and draw where it lives.</p>
                    </div>

                    <div className="missionBox">
                      <h4>Reflection</h4>
                      <p>Feelings are visitors. They can be noticed, named and gently supported.</p>
                    </div>

                    <button onClick={() => window.print()}>Print Preview</button>
                  </>
                ) : (
                  <p>Fill in the form and click Generate Preview.</p>
                )}
              </div>
            </section>
          </>
        )}

        {active !== "Dashboard" && active !== "Book Creator" && (
          <section className="welcome">
            <p className="eyebrow">Coming soon</p>
            <h1>{active}</h1>
            <p>This section is ready for us to build next.</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;