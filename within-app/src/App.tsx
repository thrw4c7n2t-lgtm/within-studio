import { useMemo, useState } from "react";
import "./App.css";

type Section =
  | "Dashboard"
  | "Book Creator"
  | "Explorer Collection"
  | "Parent Guides"
  | "Resource Library"
  | "Settings";

type Focus =
  | "Big feelings"
  | "Anxiety"
  | "Transitions"
  | "Friendship"
  | "Sensory regulation"
  | "Confidence";

type IllustrationStyle = "storybook" | "colouring" | "lowInk";

type FocusContent = {
  metaphor: string;
  bodyClue: string;
  mission: string;
  parentLine: string;
  activity: string;
  tinyStep: string;
};

type AnimalGuide = {
  id: string;
  emoji: string;
  name: string;
  label: string;
  trait: string;
  helperLine: string;
};

type WorldTheme = {
  id: string;
  emoji: string;
  name: string;
  setting: string;
  palette: string;
  sensoryWords: string;
};

type WorkbookPage = {
  kind: string;
  badge: string;
  title: string;
  subtitle: string;
  body: string;
  activityTitle: string;
  prompt: string;
  activityItems: string[];
  scene: string[];
};

const modules: { icon: string; title: Section; description: string }[] = [
  { icon: "🏡", title: "Dashboard", description: "Start here and choose what you want to create." },
  { icon: "📚", title: "Book Creator", description: "Create personalised Explorer workbooks." },
  { icon: "🌿", title: "Explorer Collection", description: "Browse themed child-friendly therapy packs." },
  { icon: "👨‍👩‍👧", title: "Parent Guides", description: "Generate warm scripts and home support plans." },
  { icon: "🎨", title: "Resource Library", description: "Find printable worksheets and activity ideas." },
  { icon: "⚙️", title: "Settings", description: "Adjust the tone and print preferences." },
];

const focusOptions: Focus[] = [
  "Big feelings",
  "Anxiety",
  "Transitions",
  "Friendship",
  "Sensory regulation",
  "Confidence",
];

const illustrationStyles: { id: IllustrationStyle; emoji: string; name: string; label: string }[] = [
  { id: "storybook", emoji: "🎨", name: "Colour storybook", label: "soft colour panels" },
  { id: "colouring", emoji: "✏️", name: "Colouring page", label: "black-and-white outlines" },
  { id: "lowInk", emoji: "🖨️", name: "Low-ink simple", label: "lighter printable pages" },
];

const animalGuides: AnimalGuide[] = [
  {
    id: "frog",
    emoji: "🐸",
    name: "Fenn the Frog",
    label: "calm body helper",
    trait: "notices tiny changes",
    helperLine: "Fenn reminds me to pause, breathe and listen to my body.",
  },
  {
    id: "koala",
    emoji: "🐨",
    name: "Koko the Koala",
    label: "slow-down buddy",
    trait: "takes gentle breaks",
    helperLine: "Koko reminds me that slow is still progress.",
  },
  {
    id: "owl",
    emoji: "🦉",
    name: "Olive the Owl",
    label: "clue detective",
    trait: "spots patterns",
    helperLine: "Olive reminds me to look for clues before I choose what to do.",
  },
  {
    id: "fox",
    emoji: "🦊",
    name: "Fern the Fox",
    label: "brave steps guide",
    trait: "tries tiny brave steps",
    helperLine: "Fern reminds me that brave can be very small.",
  },
  {
    id: "turtle",
    emoji: "🐢",
    name: "Tully the Turtle",
    label: "safe shell friend",
    trait: "knows when to rest",
    helperLine: "Tully reminds me I can use my safe shell and come back when I am ready.",
  },
  {
    id: "butterfly",
    emoji: "🦋",
    name: "Bibi the Butterfly",
    label: "change helper",
    trait: "moves through change",
    helperLine: "Bibi reminds me that change can happen one flutter at a time.",
  },
];

const worldThemes: WorldTheme[] = [
  {
    id: "rainforest",
    emoji: "🌿",
    name: "Rainforest Creek",
    setting: "a mossy rainforest creek with stepping stones, ferns and tiny hiding places",
    palette: "Moss green, creek blue and warm clay",
    sensoryWords: "cool water, soft moss, bird calls and dappled light",
  },
  {
    id: "rockpool",
    emoji: "🐚",
    name: "Ocean Rockpool",
    setting: "a sparkling ocean rockpool with shells, sea glass and gentle waves",
    palette: "Seafoam, sand, coral and sky blue",
    sensoryWords: "salty air, smooth shells, wave sounds and bright sun",
  },
  {
    id: "burrow",
    emoji: "🕯️",
    name: "Cosy Burrow",
    setting: "a cosy underground burrow with lanterns, cushions and winding tunnels",
    palette: "Warm cocoa, cream, honey and soft green",
    sensoryWords: "warm blankets, low light, quiet corners and soft pressure",
  },
  {
    id: "garden",
    emoji: "🌼",
    name: "Secret Garden",
    setting: "a secret garden with giant flowers, butterflies and a winding path",
    palette: "Petal pink, sage, butter yellow and cream",
    sensoryWords: "flower smells, buzzing bees, soft grass and hidden doors",
  },
  {
    id: "stars",
    emoji: "⭐",
    name: "Starry Camp",
    setting: "a starry camp with a glowing tent, moon path and quiet night sky",
    palette: "Indigo, lavender, moon cream and pine green",
    sensoryWords: "cool night air, campfire warmth, soft stars and quiet sounds",
  },
  {
    id: "mountain",
    emoji: "⛰️",
    name: "Mountain Trail",
    setting: "a mountain trail with lookout rocks, wildflowers and a brave little path",
    palette: "Stone grey, eucalyptus, sky blue and sunset peach",
    sensoryWords: "fresh air, crunching gravel, big views and strong legs",
  },
];

const focusLibrary: Record<Focus, FocusContent> = {
  "Big feelings": {
    metaphor: "Feelings are like weather. Some are gentle and some are stormy, but all of them can move through.",
    bodyClue: "hot cheeks, tight hands, a buzzing chest, a loud voice or a heavy tummy",
    mission: "Notice the feeling, name it, find it in the body and choose one safe way to let it move.",
    parentLine: "I can see this feeling is really big. I am not scared of it, and I will help you ride the wave.",
    activity: "Draw your feeling as weather. Add one thing that helps the weather soften.",
    tinyStep: "Put one hand on your body and say: this is a feeling, not forever.",
  },
  Anxiety: {
    metaphor: "Anxiety is a watchful guard trying to keep the body safe, even when the danger is not as big as it feels.",
    bodyClue: "a fast heart, butterflies, questions on repeat, tummy pain or needing to stay close",
    mission: "Thank the worry guard, check the facts and take one tiny brave step.",
    parentLine: "Your worry is trying to protect you. We can listen to it without letting it be the boss.",
    activity: "Make a brave ladder with three tiny steps: easy, medium and stretchy.",
    tinyStep: "Ask: what is my worry saying, and what do I know is true?",
  },
  Transitions: {
    metaphor: "Transitions are bridges. Some bridges feel wobbly until we know what is waiting on the other side.",
    bodyClue: "stalling, arguing, hiding, becoming silly, asking for more time or feeling suddenly tired",
    mission: "Name what is changing, what is staying the same, and what happens first, next and last.",
    parentLine: "This is a change moment. I will show you the next three steps and stay calm while your body catches up.",
    activity: "Draw a bridge from now to next. Add three stepping stones: first, next and last.",
    tinyStep: "Choose one transition helper: timer, visual, job, song or movement break.",
  },
  Friendship: {
    metaphor: "Friendship is like a campfire circle. Everyone needs space, warmth, turns and kindness.",
    bodyClue: "talking over others, taking control, feeling left out, getting too close or not knowing how to join",
    mission: "Notice the other person, listen for one clue and try one flexible play idea.",
    parentLine: "Friendship is a skill we practise. Let us slow the moment down and look for one clue from the other person.",
    activity: "Write three join-in lines: Can I play? What are you building? Could I have a turn after you?",
    tinyStep: "Look for one clue: face, body, words or distance.",
  },
  "Sensory regulation": {
    metaphor: "The body has a sensory compass that points toward what it needs: movement, pressure, quiet, chewing or space.",
    bodyClue: "wiggling, crashing, chewing, covering ears, hiding, humming or needing firm pressure",
    mission: "Notice the body signal, choose a sensory tool and check whether the signal changes.",
    parentLine: "Your body is asking for help. Let us choose a tool before we ask it to do something hard.",
    activity: "Make a sensory menu with movement tools, quiet tools and pressure tools.",
    tinyStep: "Choose one body tool for two minutes, then check in again.",
  },
  Confidence: {
    metaphor: "Confidence grows like a seed. It needs tiny tries, safe support and time before it blooms.",
    bodyClue: "saying I cannot, hiding work, giving up quickly, avoiding hard things or needing reassurance",
    mission: "Remember one past success, choose one small try and celebrate effort instead of perfect results.",
    parentLine: "You do not have to feel ready to begin. We can start tiny, and I will notice your effort.",
    activity: "Draw a brave seed. Write one thing it has already survived and one tiny thing it will try next.",
    tinyStep: "Do the first tiny part for two minutes only.",
  },
};

const resourceLibrary = [
  { title: "Emotion Body Map", focus: "Big feelings" as Focus, type: "Worksheet", age: "5-10" },
  { title: "Worry Guard Fact Check", focus: "Anxiety" as Focus, type: "Activity", age: "6-12" },
  { title: "First, Next, Last Bridge", focus: "Transitions" as Focus, type: "Visual", age: "4-10" },
  { title: "Friendship Clue Detective", focus: "Friendship" as Focus, type: "Worksheet", age: "6-12" },
  { title: "Sensory Menu Builder", focus: "Sensory regulation" as Focus, type: "Planning page", age: "4-12" },
  { title: "Tiny Brave Step Ladder", focus: "Confidence" as Focus, type: "Worksheet", age: "6-12" },
];

function App() {
  const [active, setActive] = useState<Section>("Dashboard");
  const [childName, setChildName] = useState("Arthur");
  const [focus, setFocus] = useState<Focus>("Big feelings");
  const [animalGuideId, setAnimalGuideId] = useState("frog");
  const [worldThemeId, setWorldThemeId] = useState("rainforest");
  const [illustrationStyle, setIllustrationStyle] = useState<IllustrationStyle>("storybook");
  const [strength, setStrength] = useState("noticing small details");
  const [goal, setGoal] = useState("pausing before the feeling gets too big");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState("gentle and playful");

  const name = childName.trim() || "Your child";
  const animalGuide = animalGuides.find((animal) => animal.id === animalGuideId) ?? animalGuides[0];
  const worldTheme = worldThemes.find((theme) => theme.id === worldThemeId) ?? worldThemes[0];
  const childStrength = strength.trim() || "trying again";
  const childGoal = goal.trim() || "taking one tiny helpful step";
  const content = focusLibrary[focus];

  const sceneItems = useMemo(() => [worldTheme.emoji, animalGuide.emoji, "✨", "🌱"], [animalGuide.emoji, worldTheme.emoji]);

  const pages: WorkbookPage[] = useMemo(
    () => [
      {
        kind: `coverPage theme-${worldTheme.id}`,
        badge: "Explorer cover",
        title: `${name}'s Explorer Journal`,
        subtitle: `A ${worldTheme.name.toLowerCase()} adventure about ${focus.toLowerCase()}`,
        body: `Today, ${name} steps into ${worldTheme.setting} and meets ${animalGuide.name}, a ${animalGuide.label}. ${animalGuide.name.split(" ")[0]} explains: ${content.metaphor}`,
        activityTitle: "Explorer strength",
        prompt: `${childStrength}. Guide gift: ${animalGuide.helperLine}`,
        activityItems: [animalGuide.name, worldTheme.name, animalGuide.trait],
        scene: sceneItems,
      },
      {
        kind: `checkPage theme-${worldTheme.id}`,
        badge: "Body check-in",
        title: "Explorer Check-In",
        subtitle: "Before we begin",
        body: `Sometimes ${focus.toLowerCase()} can show up as ${content.bodyClue}. Every body speaks in its own way. In ${worldTheme.name}, the clues might feel like ${worldTheme.sensoryWords}.`,
        activityTitle: "Body map prompt",
        prompt: "Draw where you notice this feeling or signal in your body.",
        activityItems: ["Head", "Chest", "Tummy", "Hands", "Legs", "Whole body"],
        scene: [animalGuide.emoji, "🔎", "💛", worldTheme.emoji],
      },
      {
        kind: `missionPage theme-${worldTheme.id}`,
        badge: "Today's mission",
        title: "Today's Mission",
        subtitle: "Notice, name, support",
        body: content.mission,
        activityTitle: "Tiny goal",
        prompt: childGoal,
        activityItems: ["I can notice", "I can name", "I can ask for help"],
        scene: ["🗺️", animalGuide.emoji, "⭐", worldTheme.emoji],
      },
      {
        kind: `toolPage theme-${worldTheme.id}`,
        badge: "Try this tool",
        title: "Try This Tool",
        subtitle: "One small helpful step",
        body: `${content.tinyStep} ${animalGuide.name} can practise this with you.`,
        activityTitle: "Creative activity",
        prompt: content.activity,
        activityItems: ["First try", "What changed?", "What could help next?"],
        scene: [animalGuide.emoji, "🎨", "🌈", worldTheme.emoji],
      },
      {
        kind: `grownupPage theme-${worldTheme.id}`,
        badge: "Grown-up page",
        title: "Grown-Up Support Page",
        subtitle: "Co-regulation script",
        body: `Try saying: “${content.parentLine}”`,
        activityTitle: "Adult reminder",
        prompt: `Use ${animalGuide.name} as a playful cue when words feel too hard. Notice what helped before giving a new instruction.`,
        activityItems: ["Lower voice", "Slow body", "Fewer words", "One next step"],
        scene: ["🤝", animalGuide.emoji, "💬", "🌿"],
      },
      {
        kind: `reflectionPage theme-${worldTheme.id}`,
        badge: "Reflection",
        title: "Reflection Page",
        subtitle: "What did I learn?",
        body: `Feelings and body signals can be noticed, named and supported. ${name} and ${animalGuide.name} can return to ${worldTheme.name} whenever they need to practise again.`,
        activityTitle: "Finish these sentences",
        prompt: "One thing I practised today was...",
        activityItems: ["I noticed", "I tried", "I felt proud when", "Next time I can"],
        scene: ["🌟", animalGuide.emoji, "📖", worldTheme.emoji],
      },
    ],
    [animalGuide, childGoal, childStrength, content, focus, name, sceneItems, worldTheme],
  );

  const generatedText = pages
    .map(
      (page, index) =>
        `Page ${index + 1}: ${page.title}\n${page.subtitle}\n${page.body}\n${page.activityTitle}: ${page.prompt}\n${page.activityItems.join(" | ")}`,
    )
    .join("\n\n");

  const openFocusInCreator = (selectedFocus: Focus) => {
    setFocus(selectedFocus);
    setGenerated(true);
    setCopied(false);
    setActive("Book Creator");
  };

  const copyWorkbookText = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Within</h2>
        <p className="sidebarSub">Studio builder</p>
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
            <section className="welcome dashboardHero">
              <p className="eyebrow">Within Studio</p>
              <h1>What would you like to create today?</h1>
              <p>A calm creative workspace for therapeutic books, family resources and printable neuroaffirming tools.</p>
            </section>
            <section className="moduleGrid">
              {modules.filter((module) => module.title !== "Dashboard").map((module) => (
                <article className="moduleCard" key={module.title}>
                  <div className="icon">{module.icon}</div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <button onClick={() => setActive(module.title)}>Open</button>
                </article>
              ))}
            </section>
          </>
        )}

        {active === "Book Creator" && (
          <>
            <section className="welcome compactHero">
              <p className="eyebrow">Within Studio</p>
              <h1>Book Creator</h1>
              <p>Create a printable mini Explorer Collection workbook with story pages, child activities, animal guides and parent scripts.</p>
            </section>

            <section className="creator">
              <div className="formPanel">
                <h2>Create Explorer Book</h2>

                <label>Child's name</label>
                <input value={childName} onChange={(event) => setChildName(event.target.value)} placeholder="e.g. Arthur" />

                <label>Therapy focus</label>
                <select value={focus} onChange={(event) => setFocus(event.target.value as Focus)}>
                  {focusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>

                <label>Animal guide</label>
                <div className="choiceGrid animalChoiceGrid">
                  {animalGuides.map((animal) => (
                    <button
                      type="button"
                      key={animal.id}
                      className={animalGuideId === animal.id ? "choiceCard selected" : "choiceCard"}
                      onClick={() => setAnimalGuideId(animal.id)}
                    >
                      <span className="choiceEmoji">{animal.emoji}</span>
                      <strong>{animal.name}</strong>
                      <small>{animal.label}</small>
                    </button>
                  ))}
                </div>

                <label>Story world</label>
                <div className="choiceGrid themeChoiceGrid">
                  {worldThemes.map((theme) => (
                    <button
                      type="button"
                      key={theme.id}
                      className={worldThemeId === theme.id ? "choiceCard selected" : "choiceCard"}
                      onClick={() => setWorldThemeId(theme.id)}
                    >
                      <span className="choiceEmoji">{theme.emoji}</span>
                      <strong>{theme.name}</strong>
                      <small>{theme.palette}</small>
                    </button>
                  ))}
                </div>

                <label>Picture style</label>
                <div className="choiceGrid styleChoiceGrid">
                  {illustrationStyles.map((style) => (
                    <button
                      type="button"
                      key={style.id}
                      className={illustrationStyle === style.id ? "choiceCard selected" : "choiceCard"}
                      onClick={() => setIllustrationStyle(style.id)}
                    >
                      <span className="choiceEmoji">{style.emoji}</span>
                      <strong>{style.name}</strong>
                      <small>{style.label}</small>
                    </button>
                  ))}
                </div>

                <label>Child strength</label>
                <input value={strength} onChange={(event) => setStrength(event.target.value)} placeholder="e.g. curious, funny, brave" />

                <label>Workbook goal</label>
                <textarea value={goal} onChange={(event) => setGoal(event.target.value)} placeholder="e.g. using a body break before school" />

                <button onClick={() => setGenerated(true)}>Generate Workbook</button>
                <button className="secondaryButton" onClick={copyWorkbookText}>{copied ? "Copied" : "Copy Workbook Text"}</button>
                {generated && <button className="secondaryButton" onClick={() => window.print()}>Print Workbook</button>}
              </div>

              <div className="bookPreview">
                {!generated ? (
                  <div className="emptyPreview">
                    <h2>Ready when you are.</h2>
                    <p>Choose an animal guide, pick a story world and click Generate Workbook.</p>
                  </div>
                ) : (
                  pages.map((page, index) => (
                    <article className={`printPage ${page.kind} style-${illustrationStyle}`} key={page.title}>
                      <div className="pageDecor decorOne" aria-hidden="true" />
                      <div className="pageDecor decorTwo" aria-hidden="true" />
                      <header className="printHeader">
                        <p className="pageNumber">Page {index + 1}</p>
                        <span className="pageBadge">{page.badge}</span>
                      </header>
                      <div className={`storyScene storyScene-${worldTheme.id}`} aria-hidden="true">
                        <div className="sceneSky" />
                        <div className="sceneGround" />
                        <div className="scenePath" />
                        <div className="sceneStickerStrip">
                          {page.scene.map((item, sceneIndex) => (
                            <span key={`${page.title}-${item}-${sceneIndex}`}>{item}</span>
                          ))}
                        </div>
                      </div>
                      <h2><span>{page.title}</span></h2>
                      <h3>{page.subtitle}</h3>
                      <p className="pageBody">{page.body}</p>
                      <div className="promptBox">
                        <strong>{page.activityTitle}</strong>
                        <p>{page.prompt}</p>
                      </div>
                      <div className="activityGrid">
                        {page.activityItems.map((item) => (
                          <div className="activityTile" key={item}>{item}</div>
                        ))}
                      </div>
                      <div className="drawBox">Draw, write, colour or map it here</div>
                    </article>
                  ))
                )}
              </div>
            </section>
          </>
        )}

        {active === "Explorer Collection" && (
          <>
            <section className="welcome compactHero">
              <p className="eyebrow">Explorer Collection</p>
              <h1>Therapeutic story worlds</h1>
              <p>Choose a theme and send it straight into the Book Creator.</p>
            </section>
            <section className="resourceGrid">
              {focusOptions.map((option) => (
                <article className="resourceCard" key={option}>
                  <p className="eyebrow">{option}</p>
                  <h3>{focusLibrary[option].metaphor.split(".")[0]}.</h3>
                  <p>{focusLibrary[option].mission}</p>
                  <button onClick={() => openFocusInCreator(option)}>Use this theme</button>
                </article>
              ))}
            </section>
          </>
        )}

        {active === "Parent Guides" && (
          <>
            <section className="welcome compactHero">
              <p className="eyebrow">Parent Guides</p>
              <h1>Warm scripts for hard moments</h1>
              <p>Simple co-regulation language that can be printed, copied or adapted.</p>
            </section>
            <section className="guidePanel">
              <div className="guideControls">
                <label>Guide focus</label>
                <select value={focus} onChange={(event) => setFocus(event.target.value as Focus)}>
                  {focusOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <article className="parentGuideCard">
                <p className="eyebrow">Try saying</p>
                <h2>“{content.parentLine}”</h2>
                <p><strong>What to notice:</strong> {content.bodyClue}.</p>
                <p><strong>Helpful next step:</strong> {content.tinyStep}</p>
                <p><strong>Home activity:</strong> {content.activity}</p>
                <button onClick={() => window.print()}>Print guide</button>
              </article>
            </section>
          </>
        )}

        {active === "Resource Library" && (
          <>
            <section className="welcome compactHero">
              <p className="eyebrow">Resource Library</p>
              <h1>Printable therapy tools</h1>
              <p>A starter library for worksheets, visuals and activity prompts.</p>
            </section>
            <section className="libraryTable">
              {resourceLibrary.map((resource) => (
                <article className="libraryRow" key={resource.title}>
                  <div>
                    <p className="eyebrow">{resource.type} · Ages {resource.age}</p>
                    <h3>{resource.title}</h3>
                    <p>{resource.focus}</p>
                  </div>
                  <button onClick={() => openFocusInCreator(resource.focus)}>Create from this</button>
                </article>
              ))}
            </section>
          </>
        )}

        {active === "Settings" && (
          <>
            <section className="welcome compactHero">
              <p className="eyebrow">Settings</p>
              <h1>Studio preferences</h1>
              <p>These are local design controls for this prototype.</p>
            </section>
            <section className="settingsPanel">
              <label>Default writing tone</label>
              <select value={tone} onChange={(event) => setTone(event.target.value)}>
                <option>gentle and playful</option>
                <option>calm and professional</option>
                <option>child-led and imaginative</option>
                <option>brief and practical</option>
              </select>
              <div className="settingPreview">
                <p className="eyebrow">Current tone</p>
                <h2>{tone}</h2>
                <p>Future versions can save this to a profile, template library or client-safe workspace.</p>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
