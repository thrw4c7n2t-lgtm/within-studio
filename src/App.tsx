import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type View = 'website' | 'studio';
type FocusKey = 'Big feelings' | 'Anxiety' | 'Transitions' | 'Friendship' | 'Sensory regulation' | 'Confidence';

type BookForm = {
  childName: string;
  focus: FocusKey;
  animal: string;
  setting: string;
  strength: string;
};

type FocusContent = {
  title: string;
  metaphor: string;
  mission: string;
  bodyClue: string;
  parentScript: string;
  activity: string;
};

const focusOptions: FocusKey[] = [
  'Big feelings',
  'Anxiety',
  'Transitions',
  'Friendship',
  'Sensory regulation',
  'Confidence',
];

const focusContent: Record<FocusKey, FocusContent> = {
  'Big feelings': {
    title: 'The Weather Inside',
    metaphor: 'Feelings move like weather: sometimes soft, sometimes stormy, and always allowed to pass through.',
    mission: 'Name the feeling, find where it lives in the body, and choose one safe way to let it move.',
    bodyClue: 'tight hands, hot cheeks, a buzzing chest or a heavy tummy',
    parentScript: 'I can see your feeling is really big. I am not scared of it, and I will help you ride the wave.',
    activity: 'Draw your feeling as weather. Add one thing that helps the weather soften.',
  },
  Anxiety: {
    title: 'The Watchful Wombat',
    metaphor: 'Anxiety is a watchful guard trying to keep the body safe, even when the danger is not as big as it feels.',
    mission: 'Thank the guard, check the facts, and take one brave tiny step.',
    bodyClue: 'a fast heart, butterflies, asking the same question again or wanting to stay close',
    parentScript: 'Your worry is trying to protect you. We can listen to it without letting it be the boss.',
    activity: 'Make a worry ladder with three tiny brave steps from easiest to hardest.',
  },
  Transitions: {
    title: 'The Bridge Between Places',
    metaphor: 'Transitions are bridges. Some bridges feel wobbly until we know what is on the other side.',
    mission: 'See what is changing, what is staying the same, and what happens first, next and last.',
    bodyClue: 'stalling, arguing, running away, asking for more time or suddenly becoming silly',
    parentScript: 'This is a change moment. I will show you the next three steps and stay calm while your body catches up.',
    activity: 'Draw a bridge from now to next. Add three stepping stones: first, next, last.',
  },
  Friendship: {
    title: 'The Campfire Circle',
    metaphor: 'Friendship is like a campfire circle: everyone needs space, warmth, turns and kindness.',
    mission: 'Notice the other person, listen for a clue, and try one flexible play idea.',
    bodyClue: 'talking over others, taking control, feeling left out or not knowing how to join',
    parentScript: 'Friendship is a skill we practise. Let’s slow the moment down and look for one clue from the other person.',
    activity: 'Create three join-in lines: Can I play? What are you building? Could I have a turn after you?',
  },
  'Sensory regulation': {
    title: 'The Sensory Compass',
    metaphor: 'The body has a compass that points toward what it needs: movement, pressure, quiet, chewing, warmth or space.',
    mission: 'Notice the signal, choose a body tool, and check if the signal changes.',
    bodyClue: 'wiggling, crashing, chewing, covering ears, hiding, humming or needing firm pressure',
    parentScript: 'Your body is asking for help. Let’s choose a tool before we ask it to do something hard.',
    activity: 'Make a sensory menu with three movement tools, three quiet tools and three pressure tools.',
  },
  Confidence: {
    title: 'The Brave Seed',
    metaphor: 'Confidence grows like a seed: it needs tiny tries, safe support and time underground before it blooms.',
    mission: 'Remember one past success, choose one small try, and celebrate effort rather than perfect results.',
    bodyClue: 'saying I cannot, hiding work, giving up quickly or needing lots of reassurance',
    parentScript: 'You do not have to feel ready to begin. We can start tiny, and I will notice your effort.',
    activity: 'Draw a brave seed. Write one thing it has already survived and one tiny thing it will try next.',
  },
};

const defaultForm: BookForm = {
  childName: 'Arthur',
  focus: 'Big feelings',
  animal: 'frog',
  setting: 'a mossy rainforest creek',
  strength: 'noticing small details',
};

const serviceCards = [
  {
    title: 'Counselling for women',
    text: 'Warm support for anxiety, overwhelm, identity, boundaries, emotional load, burnout and life transitions.',
    tag: 'Gentle + practical',
  },
  {
    title: 'Parenting support',
    text: 'Neuroaffirming guidance for families navigating big feelings, school stress, behaviour, connection and repair.',
    tag: 'Parent-safe support',
  },
  {
    title: 'Neurodivergent families',
    text: 'ADHD and autism-affirming sessions that reduce shame and build practical tools around nervous-system needs.',
    tag: 'ND affirming',
  },
  {
    title: 'Resources + advocacy',
    text: 'Printable scripts, school meeting prep, parent resources and child-friendly emotional literacy tools.',
    tag: 'Tools you can use',
  },
];

const approachCards = [
  'Trauma-informed and paced gently',
  'Neuroaffirming, not behaviourist',
  'Practical tools without shame',
  'Warm, human and collaborative',
  'Designed for busy, overloaded parents',
  'Accessible, visual and ADHD-friendly',
];

const resourceCards = [
  {
    title: 'ADHD-friendly home rhythm',
    text: 'A simple visual routine page for mornings, afternoons and bedtime without turning the house into a battleground.',
  },
  {
    title: 'School meeting prep sheet',
    text: 'A calm one-page planner for concerns, strengths, requested adjustments and follow-up notes.',
  },
  {
    title: 'Big feelings script card',
    text: 'A parent co-regulation prompt for when children are overwhelmed and adults need words quickly.',
  },
];

const faqs = [
  {
    question: 'Is Within open for bookings yet?',
    answer: 'The site is set up as a pre-opening website. The waitlist section can capture interest now, then connect to a booking platform later.',
  },
  {
    question: 'Who is Within for?',
    answer: 'Within is being shaped for women, parents and families who want warm, neuroaffirming, practical counselling support.',
  },
  {
    question: 'Will sessions be online or in person?',
    answer: 'The current website copy leaves room for telehealth, parent consults, resources and future local services as the practice model is finalised.',
  },
];

function getInitialView(): View {
  return window.location.pathname.startsWith('/studio') ? 'studio' : 'website';
}

function App() {
  const [view, setView] = useState<View>(getInitialView);

  useEffect(() => {
    const handlePopState = () => setView(getInitialView());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (nextView: View) => {
    const nextPath = nextView === 'studio' ? '/studio' : '/';
    window.history.pushState({}, '', nextPath);
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return view === 'studio' ? <BookStudio onNavigateHome={() => navigate('website')} /> : <WithinWebsite onOpenStudio={() => navigate('studio')} />;
}

function WithinWebsite({ onOpenStudio }: { onOpenStudio: () => void }) {
  const [waitlistMessage, setWaitlistMessage] = useState('');

  const handleWaitlist = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaitlistMessage('Thank you — this front-end waitlist is ready. The next build step is connecting it to email, Tally, Google Forms or a database.');
    event.currentTarget.reset();
  };

  return (
    <main className="within-site">
      <section className="site-hero" id="top">
        <WebsiteNav onOpenStudio={onOpenStudio} />
        <div className="hero-bloom bloom-one" />
        <div className="hero-bloom bloom-two" />

        <div className="site-hero-grid">
          <div className="site-hero-copy">
            <p className="eyebrow">Within Counselling</p>
            <h1>Neuroaffirming therapy for women, parents & families.</h1>
            <p className="hero-lead">
              A warm, practical counselling space for people carrying a lot — big feelings, parenting pressure,
              neurodivergence, family stress, identity shifts and the invisible mental load.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#waitlist">Join the waitlist</a>
              <a className="secondary-action" href="#services">Explore support</a>
            </div>
            <div className="trust-row" aria-label="Practice values">
              <span>Trauma-informed</span>
              <span>ADHD-friendly</span>
              <span>Parent-safe</span>
            </div>
          </div>

          <aside className="hero-portrait-card" aria-label="Within brand card">
            <div className="portrait-orb" />
            <div className="line-art-face" aria-hidden="true">
              <span />
            </div>
            <p className="small-label">A gentler way inward</p>
            <h2>Support that meets you where your nervous system actually is.</h2>
            <p>
              Calm language, clear tools, realistic expectations and deeply human care for the messy middle.
            </p>
          </aside>
        </div>
      </section>

      <section className="intro-band" id="about">
        <div>
          <p className="eyebrow">Why Within exists</p>
          <h2>Because support should feel safe, useful and un-shaming.</h2>
        </div>
        <p>
          Within is being built for people who are tired of being told to try harder when what they really need is
          understanding, structure, nervous-system support and language that honours their lived experience.
        </p>
      </section>

      <section className="section-wrap" id="services">
        <div className="section-heading">
          <p className="eyebrow">Support areas</p>
          <h2>Counselling and practical resources with a soft landing.</h2>
        </div>
        <div className="service-grid">
          {serviceCards.map((card) => (
            <article className="service-card" key={card.title}>
              <span>{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-card large-feature">
          <p className="eyebrow">The Within approach</p>
          <h2>Less fixing. More understanding, tools and repair.</h2>
          <p>
            Sessions are designed to help you make sense of what is happening underneath the surface,
            then build supports that work in real life — especially when everyone is tired, overstimulated or stretched thin.
          </p>
        </div>
        <div className="approach-list">
          {approachCards.map((item) => (
            <div className="approach-pill" key={item}>
              <span>✦</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrap muted-section" id="resources">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Resources</p>
            <h2>Printable tools are part of the ecosystem.</h2>
          </div>
          <button className="secondary-action" type="button" onClick={onOpenStudio}>Open Studio</button>
        </div>
        <div className="resource-preview-grid">
          {resourceCards.map((resource) => (
            <article className="resource-card" key={resource.title}>
              <div className="paper-edge" />
              <h3>{resource.title}</h3>
              <p>{resource.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-copy">
          <p className="eyebrow">Pre-opening waitlist</p>
          <h2>Register interest in Within.</h2>
          <p>
            This form is currently front-end only. It is ready for the next step: connecting submissions to your preferred
            system once your email, booking and privacy workflow are chosen.
          </p>
        </div>
        <form className="waitlist-form" onSubmit={handleWaitlist}>
          <label>
            Name
            <input name="name" placeholder="Your name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" required />
          </label>
          <label>
            What kind of support are you interested in?
            <select name="support" defaultValue="">
              <option value="" disabled>Select one</option>
              <option>Individual counselling</option>
              <option>Parent support</option>
              <option>Neurodivergent family resources</option>
              <option>School advocacy / adjustment planning</option>
            </select>
          </label>
          <button className="primary-action" type="submit">Join waitlist</button>
          {waitlistMessage && <p className="status-message">{waitlistMessage}</p>}
        </form>
      </section>

      <section className="section-wrap" id="faq">
        <div className="section-heading">
          <p className="eyebrow">Questions</p>
          <h2>Simple answers for now.</h2>
        </div>
        <div className="faq-grid">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div>
          <h2>Within</h2>
          <p>Neuroaffirming therapy for women, parents & families.</p>
        </div>
        <div className="footer-links">
          <a href="#top">Top</a>
          <a href="#services">Services</a>
          <a href="#waitlist">Waitlist</a>
          <button type="button" onClick={onOpenStudio}>Studio</button>
        </div>
      </footer>
    </main>
  );
}

function WebsiteNav({ onOpenStudio }: { onOpenStudio: () => void }) {
  return (
    <nav className="website-nav" aria-label="Within website navigation">
      <a className="website-brand" href="#top" aria-label="Within home">
        <span>✺</span>
        Within
      </a>
      <div className="website-links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#resources">Resources</a>
        <a href="#waitlist">Waitlist</a>
        <button type="button" onClick={onOpenStudio}>Studio</button>
      </div>
    </nav>
  );
}

function BookStudio({ onNavigateHome }: { onNavigateHome: () => void }) {
  const [form, setForm] = useState<BookForm>(defaultForm);
  const [copied, setCopied] = useState(false);
  const builderRef = useRef<HTMLElement | null>(null);

  const focus = focusContent[form.focus];
  const child = form.childName.trim() || 'Your child';
  const animal = form.animal.trim() || 'butterfly';
  const setting = form.setting.trim() || 'a quiet garden path';
  const strength = form.strength.trim() || 'trying again';

  const generatedText = useMemo(() => {
    return `${child}'s Explorer Journal\n\n${focus.title}\nA child-friendly therapeutic story about ${form.focus.toLowerCase()}.\n\nStory beginning:\nToday, ${child} stepped into ${setting} and met a wise little ${animal}. The ${animal} explained: "${focus.metaphor}"\n\nBody clue:\nSometimes ${form.focus.toLowerCase()} can show up as ${focus.bodyClue}.\n\nExplorer mission:\n${focus.mission}\n\nActivity page:\n${focus.activity}\n\nParent support line:\n${focus.parentScript}\n\nStrength reminder:\n${child}'s explorer strength is ${strength}. Tiny steps count.`;
  }, [animal, child, focus, form.focus, setting, strength]);

  const updateForm = <K extends keyof BookForm>(key: K, value: BookForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setCopied(false);
  };

  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="studio-shell">
      <section className="studio-hero no-print">
        <nav className="top-nav" aria-label="Within Studio navigation">
          <button className="brand-mark" type="button" onClick={onNavigateHome}>← Within website</button>
          <div className="nav-links">
            <button type="button" onClick={() => builderRef.current?.scrollIntoView({ behavior: 'smooth' })}>Book Creator</button>
            <button type="button" onClick={() => window.print()}>Print</button>
          </div>
        </nav>
        <div className="studio-hero-copy">
          <p className="eyebrow">Within Studio</p>
          <h1>Create therapeutic books, activities and family resources.</h1>
          <p>
            This area keeps the earlier book creation platform available while the main Within website is built at the homepage.
          </p>
        </div>
      </section>

      <section className="builder-section" ref={builderRef}>
        <div className="builder-header no-print">
          <p className="eyebrow">Book Creator</p>
          <h2>Create an Explorer Book</h2>
          <p>Generate polished draft content for a printable child-friendly support book.</p>
        </div>

        <div className="builder-grid">
          <form className="builder-form no-print" onSubmit={(event) => event.preventDefault()}>
            <label>
              Child’s name
              <input
                value={form.childName}
                onChange={(event) => updateForm('childName', event.target.value)}
                placeholder="e.g. Arthur"
              />
            </label>

            <label>
              Therapy focus
              <select
                value={form.focus}
                onChange={(event) => updateForm('focus', event.target.value as FocusKey)}
              >
                {focusOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              Favourite animal or guide
              <input
                value={form.animal}
                onChange={(event) => updateForm('animal', event.target.value)}
                placeholder="e.g. frog, koala, butterfly"
              />
            </label>

            <label>
              Story setting
              <input
                value={form.setting}
                onChange={(event) => updateForm('setting', event.target.value)}
                placeholder="e.g. rainforest creek"
              />
            </label>

            <label>
              Child strength to weave in
              <input
                value={form.strength}
                onChange={(event) => updateForm('strength', event.target.value)}
                placeholder="e.g. curiosity, humour, bravery"
              />
            </label>

            <div className="form-actions">
              <button className="primary-action" type="button" onClick={copyOutput}>
                {copied ? 'Copied' : 'Copy Text'}
              </button>
              <button className="secondary-action" type="button" onClick={() => window.print()}>
                Print Resource
              </button>
            </div>
          </form>

          <article className="resource-preview" aria-live="polite">
            <div className="page cover-page">
              <p className="small-label">Explorer Journal</p>
              <h2>{child}’s {focus.title}</h2>
              <p>A gentle adventure about {form.focus.toLowerCase()} with a wise little {animal}.</p>
            </div>

            <div className="page">
              <h3>Story Beginning</h3>
              <p>
                Today, {child} stepped into {setting} and met a wise little {animal}. The {animal} whispered,
                “{focus.metaphor}”
              </p>
            </div>

            <div className="page split-page">
              <div>
                <h3>Body Clue</h3>
                <p>{form.focus} can show up as {focus.bodyClue}.</p>
              </div>
              <div>
                <h3>Mission</h3>
                <p>{focus.mission}</p>
              </div>
            </div>

            <div className="page">
              <h3>Activity</h3>
              <p>{focus.activity}</p>
              <div className="drawing-box">Draw or write here</div>
            </div>

            <div className="page parent-page">
              <h3>Parent Support Line</h3>
              <p>“{focus.parentScript}”</p>
              <p className="strength-line">Strength woven in: {strength}.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default App;
