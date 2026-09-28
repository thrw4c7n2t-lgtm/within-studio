const evidence = [
  {
    title: 'Nature-based mental health interventions',
    text: 'A 2026 systematic review of 47 randomised controlled trials found encouraging results across nature walks, horticultural therapy, green exercise and other structured nature-based interventions, particularly for depression, anxiety, mood and stress. The authors also found substantial variation between studies and significant risk-of-bias limitations, so the evidence should be described as promising rather than definitive.',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13326778/',
    source: '2026 systematic review · 47 RCTs',
  },
  {
    title: 'Nature-based interventions for anxiety, depression and stress',
    text: 'A systematic review and meta-analysis reported improvements following nature-based health interventions for people experiencing anxiety, depression and stress, while rating the certainty of causal evidence as very low because of study heterogeneity and methodological limitations.',
    href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12306343/',
    source: 'Systematic review + meta-analysis',
  },
  {
    title: 'Nature and creative expression',
    text: 'A 2025 scoping review of nature-based art therapy research identified themes including wellbeing, emotion regulation, stress management, social connection, self-discovery, trauma and grief, personal growth and creative self-expression. It also described the field as emerging and in need of further evidence-based development.',
    href: 'https://pubmed.ncbi.nlm.nih.gov/39944050/',
    source: '2025 scoping review · 11 publications',
  },
];

const practiceExamples = [
  {
    title: 'Nature in the room',
    text: 'Leaves, stones, seed pods, flowers, textures and other natural objects can become prompts for noticing, arranging, reflecting or making meaning — without needing to create “good art”.',
  },
  {
    title: 'Taking counselling outside',
    text: 'Where suitable, counselling may include walking, sitting outdoors, sensory noticing or using the surrounding environment as part of reflection rather than remaining in a conventional face-to-face room setup.',
  },
  {
    title: 'Creative ways to communicate',
    text: 'Drawing, colour, clay, visual mapping, journalling, collage, movement or construction can offer another route into an experience when finding the perfect words feels difficult.',
  },
  {
    title: 'Nature as metaphor',
    text: 'Roots, seasons, weather, seeds, shedding, growth, water and landscape can sometimes provide useful language for belonging, change, identity, grief, possibility and what feels stuck — but only when the metaphor feels meaningful to the person using it.',
  },
];

function NaturePageNavigation() {
  return (
    <nav className="profile-page-nav" aria-label="Within approach navigation">
      <a className="profile-page-brand" href="#top" aria-label="Return to Within home">
        <span aria-hidden="true">✺</span>
        Within
      </a>
      <div className="profile-page-links">
        <a href="#top">Home</a>
        <a href="#/about-me">About me</a>
        <a href="#/qualifications">Qualifications</a>
        <a href="#/nature-creative">Nature + creativity</a>
        <a className="profile-page-cta" href="#waitlist">Join the waitlist</a>
      </div>
    </nav>
  );
}

export function NatureApproachPage() {
  return (
    <main className="profile-page">
      <header className="profile-page-header">
        <NaturePageNavigation />
        <div className="qualification-hero">
          <p className="eyebrow">Nature-informed + creative counselling</p>
          <h1>Sometimes words are not the easiest place to begin.</h1>
          <p className="profile-hero-lead">
            Within is being developed as a counselling space where talking can sit alongside nature, movement, sensory
            experience and creative expression. These are options rather than expectations — designed to give people
            more than one way to notice, communicate, regulate and make meaning.
          </p>
          <div className="profile-hero-actions">
            <a className="primary-action" href="#/qualifications">Qualifications + experience</a>
            <a className="secondary-action" href="#waitlist">Join the waitlist</a>
          </div>
        </div>
      </header>

      <section className="profile-section profile-intro-section">
        <div className="profile-section-heading">
          <p className="eyebrow">A broader counselling space</p>
          <h2>Counselling does not have to mean sitting still and talking for an hour.</h2>
        </div>
        <div className="profile-long-copy">
          <p>
            Some people process experience through words. Others understand themselves more clearly when they can move,
            make, draw, touch, arrange, walk, look outward or work with something concrete. Many people use a mixture of
            all of these.
          </p>
          <p>
            Within may incorporate creative, sensory, experiential and nature-informed practices alongside conversation,
            depending on the person, their goals, their preferences and what sits appropriately within counselling scope.
          </p>
          <p>
            You do not need to be artistic, outdoorsy, spiritual or particularly good at sitting still. A natural object
            can be meaningful, or it can simply be a rock. The aim is not to impose meaning; it is to create more possible
            ways into the work.
          </p>
        </div>
      </section>

      <section className="profile-section profile-thread-section">
        <div className="profile-section-heading compact-heading">
          <p className="eyebrow">What this might look like</p>
          <h2>Talk. Make. Move. Notice. Pause.</h2>
        </div>
        <div className="profile-thread-grid">
          {practiceExamples.map((item) => (
            <article className="profile-thread-card" key={item.title}>
              <span aria-hidden="true">✦</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section relevance-section">
        <div className="profile-section-heading">
          <p className="eyebrow">Why nature?</p>
          <h2>Encouraging evidence, described carefully.</h2>
          <p>
            Research into structured nature-based interventions is growing. Reviews have reported promising effects for
            several mental-health outcomes, but the studies vary substantially in quality, population, intervention and
            setting. Within therefore treats nature-informed work as a potentially useful complement to counselling — not
            as a cure, a substitute for appropriate healthcare or a claim that being outdoors works for everyone.
          </p>
        </div>
        <div className="relevance-grid">
          {evidence.map((item) => (
            <article className="relevance-card" key={item.title}>
              <p className="small-label">{item.source}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a className="secondary-action" href={item.href} target="_blank" rel="noreferrer">Read the research</a>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section learning-section">
        <div>
          <p className="eyebrow">Nature + creativity + neuroaffirming practice</p>
          <h2>More ways to participate.</h2>
          <p>
            A flexible counselling environment can be particularly useful when conventional expectations — sustained eye
            contact, sitting still, rapid verbal processing or explaining complex internal experiences on demand — make a
            session harder to access. Within aims to provide options while following the individual rather than assuming
            one method suits every neurotype or nervous system.
          </p>
        </div>
        <div className="learning-cloud" aria-label="Nature-informed counselling options">
          <span>walk + talk</span>
          <span>natural materials</span>
          <span>visual expression</span>
          <span>journalling</span>
          <span>sensory noticing</span>
          <span>movement</span>
          <span>metaphor</span>
          <span>clay + making</span>
          <span>outdoor reflection</span>
          <span>creative mapping</span>
        </div>
      </section>

      <section className="profile-section scope-note">
        <p className="eyebrow">Clear professional scope</p>
        <h2>Creative does not mean art therapy.</h2>
        <p>
          Within does not represent its practitioner as an art therapist or psychologist. Nature-informed, creative,
          sensory and experiential practices are incorporated within counselling scope where appropriate and supported by
          the practitioner’s education, experience and continuing professional development.
        </p>
        <p>
          Additional nature-based and creative training will only be listed as a completed qualification or certificate
          once it has actually been completed. The aim is to be transparent about both capability and professional limits.
        </p>
      </section>

      <footer className="profile-page-footer">
        <div>
          <p className="eyebrow">Within Counselling</p>
          <h2>Different ways inward.</h2>
          <p>Warm, neuroaffirming counselling for women, parents and families.</p>
        </div>
        <div className="profile-page-footer-links">
          <a href="#top">Home</a>
          <a href="#/about-me">About me</a>
          <a href="#/qualifications">Qualifications</a>
          <a href="#/nature-creative">Nature + creativity</a>
        </div>
      </footer>
    </main>
  );
}
