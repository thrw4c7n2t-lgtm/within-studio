function App() {
  const collections = [
    {
      title: "Explorer Collection",
      description:
        "ADHD, Autism, executive functioning, emotions and strengths."
    },
    {
      title: "Parent Collection",
      description:
        "Visual supports, regulation tools and family resources."
    },
    {
      title: "Professional Collection",
      description:
        "Therapy resources, assessments and intervention tools."
    },
    {
      title: "School Collection",
      description:
        "Supports for teachers, educators and learning environments."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">

      <header
        style={{
          background:
            "linear-gradient(135deg,#d7cbb7,#b8cdb3,#c9d7c3)"
        }}
        className="py-20 text-center"
      >
        <h1 className="text-6xl font-serif font-bold">
          Within
        </h1>

        <p className="mt-5 text-xl opacity-80">
          Resources that help children, parents and professionals understand
          what exists within.
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-10">

        <h2 className="text-3xl font-serif mb-8">
          Collections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {collections.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white shadow-lg p-8 hover:shadow-2xl transition"
            >
              <div className="text-5xl mb-4">🌿</div>

              <h3 className="text-2xl font-serif">
                {item.title}
              </h3>

              <p className="mt-4 text-stone-600">
                {item.description}
              </p>

              <button className="mt-8 rounded-full bg-green-800 text-white px-5 py-3 hover:bg-green-900">
                Open Collection
              </button>
            </div>
          ))}

        </div>

      </main>

    </div>
  );
}

export default App;
