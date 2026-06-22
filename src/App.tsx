import { useMemo, useRef, useState } from 'react';

type FocusKey = 'Big feelings' | 'Anxiety' | 'Transitions' | 'Friendship' | 'Sensory regulation' | 'Confidence';
type StudioTool = 'book' | 'parents' | 'explorer' | 'print';

type BookForm = {
  childName: string;
  focus: FocusKey;
  animal: string;
  setting: string;
  strength: string;
};

const focusOptions: FocusKey[] = [
  'Big feelings',
  'Anxiety',
  'Transitions',
  'Friendship',
  'Sensory regulation',
  'Confidence',
];

const focusContent: Record<FocusKey, {
  title: string;
  metaphor: string;
  mission: string;
  bodyClue: string;
  parentScript: string;
  activity: string;
}> = {
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

const starterResources = [
  'One-page emotion body map',
  'Transition bridge visual',
  'Parent co-regulation script card',
  'Sensory menu planning page',
  'Tiny brave steps ladder',
  'Friendship join-in sentence strip',
];

const defaultForm: BookForm = {
  childName: 'Arthur',
  focus: 'Big feelings',
  animal: 'frog',
  setting: 'a mossy rainforest creek',
  strength: 'noticing small details',
};

function App() {
  const [activeTool, setActiveTool] = useState<StudioTool>('book');
  const [form, setForm] = useState<BookForm>(defaultForm);
  const [copied, setCopied] = useState(false);
  const builderRef = useRef<HTMLElement | null>(null);

  const focus = focusContent[form.focus];
  const child = form.childName.trim() || 'Your child';
  const animal = form.animal.trim() || 'butterfly';
  const setting = form.setting.trim() || 'a quiet garden path';
  const strength = form.strength.trim() || 'trying again';

  const generatedText = useMemo(() => {
    return `${child}'s Explorer Journal\n\n${focus.title}\nA child-friendly therapeutic story about ${form.focus.toLowerCase()}.\n\nStory beginning:\nToday, ${child} stepped into ${setting} and met a wise little ${animal}. The ${animal} explained: \"${focus.metaphor}\"\n\nBody clue:\nSometimes ${form.focus.toLowerCase()} can show up as ${focus.bodyClue}.\n\nExplorer mission:\n${focus.mission}\n\nActivity page:\n${focus.activity}\n\nParent support line:\n${focus.parentScript}\n\nStrength reminder:\n${child}'s explorer strength is ${strength}. Tiny steps count.`;
  }, [animal, child, focus, form.focus, setting, strength]);

  const handleToolClick = (tool: StudioTool) => {
    setActiveTool(tool);
    window.setTimeout(() => builderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

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
      <section className="hero-section">
        <nav className="top-nav" aria-label="Within Studio navigation">
          <div className="brand-mark">Within</div>
          <div className="nav-links">
            <button type="button" onClick={() => handleToolClick('book')}>Book Creator</button>
            <button type="button" onClick={() => handleToolClick('parents')}>Parent Resources</button>
            <button type="button" onClick={() => window.print()}>Print</button>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Within Studio</p>
            <h1>Create therapeutic books, activities and family resources.</h1>
            <p className="hero-text">
              A warm, printable resource builder for neuroaffirming counselling tools, child-friendly explorer stories,
              parent scripts and emotional wellbeing activities.
            </p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={() => handleToolClick('book')}>
                Start Book Creator
              </button>
              <button className="secondary-action" type="button" onClick={() => handleToolClick('explorer')}>
                View Resource Library
              </button>
            </div>
          </div>

          <aside className="hero-card" aria-label="Studio snapshot">
            <div className="orb one" />
            <div className="orb two" />
            <p className="small-label">Today’s build</p>
            <h2>Explorer Collection</h2>
            <p>Generate a personalised, printable page set in under a minute.</p>
            <div className="mini-pages" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </aside>
        </div>
      </section>

      <section className="tool-grid" aria-label="Studio tools">
        <button className="tool-card" type="button" onClick={() => handleToolClick('book')}>
          <span>📚</span>
          <h2>Book Creator</h2>
          <p>Create a personalised Explorer Collection therapy book.</p>
        </button>
        <button className="tool-card" type="button" onClick={() => handleToolClick('explorer')}>
          <span>🌿</span>
          <h2>Explorer Collection</h2>
          <p>Nature-based emotional wellbeing activities for children.</p>
        </button>
        <button className="tool-card" type="button" onClick={() => handleToolClick('parents')}>
          <span>👨‍👩‍👧</span>
          <h2>Parent Resources</h2>
          <p>Generate parent handouts, scripts and reflection pages.</p>
        </button>
        <button className="tool-card" type="button" onClick={() => window.print()}>
          <span>🖨</span>
          <h2>Print Centre</h2>
          <p>Print your generated resource pages instantly.</p>
        </button>
      </section>

      <section className="builder-section" ref={builderRef}>
        <div className="builder-header">
          <p className="eyebrow">{activeTool === 'book' ? 'Book Creator' : activeTool === 'parents' ? 'Parent Resources' : activeTool === 'explorer' ? 'Explorer Library' : 'Print Centre'}</p>
          <h2>{activeTool === 'book' ? 'Create an Explorer Book' : activeTool === 'parents' ? 'Create a parent support page' : activeTool === 'explorer' ? 'Starter resource library' : 'Print your current resource'}</h2>
          <p>
            Use this first version to generate polished draft content. Later we can connect this to saved templates,
            PDF export, intake notes and a resource database.
          </p>
        </div>

        {activeTool === 'explorer' ? (
          <div className="resource-list">
            {starterResources.map((resource) => (
              <article className="resource-pill" key={resource}>
                <span>✦</span>
                <p>{resource}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="builder-grid">
            <form className="builder-form" onSubmit={(event) => event.preventDefault()}>
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
        )}
      </section>
    </main>
  );
}

export default App;
