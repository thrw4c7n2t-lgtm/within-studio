import "./App.css";

function App() {
  const tools = [
    ["📚", "Book Creator", "Build personalised therapy books and printable journals."],
    ["🌿", "Explorer Collection", "Nature-based resources for children’s emotions, confidence and regulation."],
    ["👨‍👩‍👧", "Parent Guides", "Gentle handouts and reflection tools for families."],
    ["🎨", "Resource Library", "Worksheets, cards, prompts, activities and visual supports."],
  ];

  return (
    <div className="app">
      <section className="hero">
        <h1>Within</h1>
        <p>
          A calm creative studio for building therapeutic books, family resources,
          printable tools and gentle learning experiences.
        </p>
      </section>

      <section className="grid">
        {tools.map(([icon, title, text]) => (
          <div className="card" key={title}>
            <h2>{icon} {title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <footer className="footer">
        Within Studio · Version 1
      </footer>
    </div>
  );
}

export default App;