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

  const name = childName || "Your child";
  const guide = animal || "butterfly";

  const pages = [
    {
      title: `${name}'s Explorer Journal`,
      subtitle: `A gentle adventure about ${focus.toLowerCase()}`,
      body: `Today, ${name} begins a journey through Within Valley with a wise little ${guide} guide.`,
    },
    {
      title: "Explorer Check-In",
      subtitle: "Before we begin",
      body: "Circle or draw: How does your body feel today? What is your energy like? What feeling is visiting you?",
    },
    {
      title: "Today's Mission",
      subtitle: "Notice, name, support",
      body: `When ${name} notices a big feeling, they can pause, breathe, name it, and choose one helpful next step.`,
    },
    {
      title: "Reflection Page",
      subtitle: "What did I learn?",
      body: "Feelings are visitors. They can be noticed, named and gently supported. I do not need to fight them or hide them.",
    },
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
            <span>{module.icon}</span>{module.title}
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
              <p>Create a printable mini Explorer Collection workbook.</p>
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

                <button onClick={() => setGenerated(true)}>Generate Workbook</button>
                {generated && <button onClick={() => window.print()}>Print Workbook</button>}
              </div>

              <div className="bookPreview">
                {!generated ? (
                  <p>Fill in the form and click Generate Workbook.</p>
                ) : (
                  pages.map((page, index) => (
                    <div className="printPage" key={page.title}>
                      <p className="pageNumber">Page {index + 1}</p>
                      <h2>{page.title}</h2>
                      <h3>{page.subtitle}</h3>
                      <p>{page.body}</p>
                      <div className="drawBox">Draw or write here</div>
                    </div>
                  ))
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
