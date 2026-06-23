import { useMemo, useState } from "react";
import "./App.css";

type Section = "Dashboard" | "Book Creator" | "Explorer Collection" | "Parent Guides" | "Resource Library" | "Settings";
type Focus = "Big feelings" | "Anxiety" | "Transitions" | "Friendship" | "Sensory regulation" | "Confidence";
type PictureStyle = "storybook" | "colouring" | "lowInk";

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
  role: string;
  trait: string;
  helperLine: string;
};

type WorldTheme = {
  id: string;
  emoji: string;
  name: string;
  article: "A" | "An";
  setting: string;
  palette: string;
  sensoryWords: string;
  details: string[];
};

const modules: { icon: string; title: Section; description: string }[] = [
  { icon: "🏡", title: "Dashboard", description: "Start here and choose what you want to create." },
  { icon: "📚", title: "Book Creator", description: "Create printable child-friendly therapy workbooks." },
  { icon: "🌿", title: "Explorer Collection", description: "Browse therapeutic story worlds and themes." },
  { icon: "👨‍👩‍👧", title: "Parent Guides", description: "Warm co-regulation scripts and support plans." },
  { icon: "🎨", title: "Resource Library", description: "Printable tools, visuals and activities." },
  { icon: "⚙️", title: "Settings", description: "Adjust writing and print preferences." },
];

const focusOptions: Focus[] = ["Big feelings", "Anxiety", "Transitions", "Friendship", "Sensory regulation", "Confidence"];

const pictureStyles: { id: PictureStyle; emoji: string; name: string; label: string }[] = [
  { id: "storybook", emoji: "🎨", name: "Colour storybook", label: "bright cover and soft colour scenes" },
  { id: "colouring", emoji: "✏️", name: "Colouring book", label: "black-and-white printable outlines" },
  { id: "lowInk", emoji: "🖨️", name: "Low-ink", label: "lighter printable pages" },
];

const animalGuides: AnimalGuide[] = [
  { id: "frog", emoji: "🐸", name: "Fenn the Frog", role: "calm body helper", trait: "notices tiny changes", helperLine: "Fenn reminds me to pause, breathe and listen to my body." },
  { id: "koala", emoji: "🐨", name: "Koko the Koala", role: "slow-down buddy", trait: "takes gentle breaks", helperLine: "Koko reminds me that slow is still progress." },
  { id: "owl", emoji: "🦉", name: "Olive the Owl", role: "clue detective", trait: "spots patterns", helperLine: "Olive reminds me to look for clues before I choose what to do." },
  { id: "fox", emoji: "🦊", name: "Fern the Fox", role: "brave steps guide", trait: "tries tiny brave steps", helperLine: "Fern reminds me that brave can be very small." },
  { id: "turtle", emoji: "🐢", name: "Tully the Turtle", role: "safe shell friend", trait: "knows when to rest", helperLine: "Tully reminds me I can use my safe shell and come back when I am ready." },
  { id: "butterfly", emoji: "🦋", name: "Bibi the Butterfly", role: "change helper", trait: "moves through change", helperLine: "Bibi reminds me that change can happen one flutter at a time." },
];

const worldThemes: WorldTheme[] = [
  { id: "rainforest", emoji: "🌿", name: "Rainforest Creek", article: "A", setting: "a mossy rainforest creek with stepping stones, ferns and tiny hiding places", palette: "moss green, creek blue and warm clay", sensoryWords: "cool water, soft moss, bird calls and dappled light", details: ["ferns", "creek", "stepping stones", "leafy hideout"] },
  { id: "rockpool", emoji: "🐚", name: "Ocean Rockpool", article: "An", setting: "a sparkling ocean rockpool with shells, sea glass and gentle waves", palette: "seafoam, sand, coral and sky blue", sensoryWords: "salty air, smooth shells, wave sounds and bright sun", details: ["shells", "waves", "rockpool", "sea glass"] },
  { id: "burrow", emoji: "🕯️", name: "Cosy Burrow", article: "A", setting: "a cosy underground burrow with lanterns, cushions and winding tunnels", palette: "cocoa, cream, honey and soft green", sensoryWords: "warm blankets, low light, quiet corners and soft pressure", details: ["lanterns", "tunnel", "cushions", "safe den"] },
  { id: "garden", emoji: "🌼", name: "Secret Garden", article: "A", setting: "a secret garden with giant flowers, butterflies and a winding path", palette: "petal pink, sage, butter yellow and cream", sensoryWords: "flower smells, buzzing bees, soft grass and hidden doors", details: ["flowers", "butterflies", "winding path", "hidden door"] },
  { id: "stars", emoji: "⭐", name: "Starry Camp", article: "A", setting: "a starry camp with a glowing tent, moon path and quiet night sky", palette: "indigo, lavender, moon cream and pine green", sensoryWords: "cool night air, campfire warmth, soft stars and quiet sounds", details: ["tent", "moon", "stars", "campfire"] },
  { id: "mountain", emoji: "⛰️", name: "Mountain Trail", article: "A", setting: "a mountain trail with lookout rocks, wildflowers and a brave little path", palette: "stone grey, eucalyptus, sky blue and sunset peach", sensoryWords: "fresh air, crunching gravel, big views and strong legs", details: ["lookout", "trail", "clouds", "wildflowers"] },
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

function firstName(fullName: string) {
  return fullName.split(" ")[0];
}

function SceneArt({ theme, animal, large = false }: { theme: WorldTheme; animal: AnimalGuide; large?: boolean }) {
  return (
    <div className={large ? `sceneArt sceneArtLarge theme-${theme.id}` : `sceneArt theme-${theme.id}`} aria-label={`${animal.name} in ${theme.name}`}>
      <div className="sceneSky" />
      <div className="sceneSun" />
      <div className="sceneCloud cloudOne" />
      <div className="sceneCloud cloudTwo" />
      <div className="sceneGround" />
      <div className="scenePath" />
      <div className="sceneDetails">
        <span>{theme.emoji}</span>
        <span className="heroAnimal">{animal.emoji}</span>
        <span>✨</span>
        <span>🌱</span>
      </div>
    </div>
  );
}

function ColouringScene({ theme, animal }: { theme: WorldTheme; animal: AnimalGuide }) {
  return (
    <div className={`colouringScene colouring-${theme.id}`}>
      <div className="colourSky" />
      <div className="colourSun" />
      <div className="colourCloud cloudOne" />
      <div className="colourCloud cloudTwo" />
      <div className="colourGround" />
      <div className="colourPath" />
      <div className="colourAnimal">{animal.name}</div>
      {theme.details.map((detail, index) => (
        <div className={`colourDetail detail${index + 1}`} key={detail}>{detail}</div>
      ))}
      <div className="colourDirections">Colour the scene • Add feelings • Hide three tiny helper tools</div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState<Section>("Dashboard");
  const [childName, setChildName] = useState("Arthur");
  const [focus, setFocus] = useState<Focus>("Big feelings");
  const [animalGuideId, setAnimalGuideId] = useState("frog");
  const [worldThemeId, setWorldThemeId] = useState("rainforest");
  const [pictureStyle, setPictureStyle] = useState<PictureStyle>("storybook");
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

  const generatedText = useMemo(() => {
    return [
      `${name}'s Explorer Journal`,
      `${worldTheme.article} ${worldTheme.name.toLowerCase()} adventure about ${focus.toLowerCase()}`,
      `Guide: ${animalGuide.name}`,
      `Goal: ${childGoal}`,
      `Tool: ${content.tinyStep}`,
    ].join("\n");
  }, [animalGuide.name, childGoal, content.tinyStep, focus, name, worldTheme]);

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

  const workbookClass = `bookPreview style-${pictureStyle}`;

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Within</h2>
        <p className="sidebarSub">Studio builder</p>
        {modules.map((module) => (
          <button key={module.title} className={active === module.title ? "navButton active" : "navButton"} onClick={() => setActive(module.title)}>
            <span>{module.icon}</span>{module.title}
          </button>
        ))}
      </aside>

      <main className="main">
        {active === "Dashboard" && (
          <>
            <section className="welcome dashboardHero">
              <p className="eyebrow">Within Studio</p>
              <h1>What would you like to create today?</h1>
              <p>A calmer, more playful workspace for therapeutic books, family resources and printable neuroaffirming tools.</p>
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
              <p>Create a printable workbook with a colourful cover, full colouring page and varied activities.</p>
            </section>

            <section className="creator">
              <div className="formPanel">
                <h2>Create Explorer Book</h2>

                <label>Child's name</label>
                <input value={childName} onChange={(event) => setChildName(event.target.value)} placeholder="e.g. Arthur" />

                <label>Therapy focus</label>
                <select value={focus} onChange={(event) => setFocus(event.target.value as Focus)}>
                  {focusOptions.map((option) => <option key={option}>{option}</option>)}
                </select>

                <label>Animal guide</label>
                <div className="choiceGrid animalChoiceGrid">
                  {animalGuides.map((animal) => (
                    <button type="button" key={animal.id} className={animalGuideId === animal.id ? "choiceCard selected" : "choiceCard"} onClick={() => setAnimalGuideId(animal.id)}>
                      <span className="choiceEmoji">{animal.emoji}</span>
                      <strong>{animal.name}</strong>
                      <small>{animal.role}</small>
                    </button>
                  ))}
                </div>

                <label>Story world</label>
                <div className="choiceGrid themeChoiceGrid">
                  {worldThemes.map((theme) => (
                    <button type="button" key={theme.id} className={worldThemeId === theme.id ? "choiceCard selected" : "choiceCard"} onClick={() => setWorldThemeId(theme.id)}>
                      <span className="choiceEmoji">{theme.emoji}</span>
                      <strong>{theme.name}</strong>
                      <small>{theme.palette}</small>
                    </button>
                  ))}
                </div>

                <label>Picture style</label>
                <div className="choiceGrid styleChoiceGrid">
                  {pictureStyles.map((style) => (
                    <button type="button" key={style.id} className={pictureStyle === style.id ? "choiceCard selected" : "choiceCard"} onClick={() => setPictureStyle(style.id)}>
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

              <div className={workbookClass}>
                {!generated ? (
                  <div className="emptyPreview">
                    <h2>Ready when you are.</h2>
                    <p>Choose an animal guide, story world and picture style.</p>
                  </div>
                ) : (
                  <>
                    <article className={`workbookPage coverPage theme-${worldTheme.id}`}>
                      <header className="pageTop"><span>Within Explorer Collection</span><span>Front cover</span></header>
                      <h2>{name}'s Explorer Journal</h2>
                      <p className="coverSubtitle">{worldTheme.article} {worldTheme.name.toLowerCase()} adventure about {focus.toLowerCase()}</p>
                      <SceneArt theme={worldTheme} animal={animalGuide} large />
                      <div className="coverCards">
                        <div><span>Animal guide</span><strong>{animalGuide.name}</strong></div>
                        <div><span>Story world</span><strong>{worldTheme.name}</strong></div>
                        <div><span>Special strength</span><strong>{animalGuide.trait}</strong></div>
                      </div>
                      <div className="belongsTo"><span>This book belongs to</span><strong>{name}</strong></div>
                    </article>

                    <article className={`workbookPage colouringPage theme-${worldTheme.id}`}>
                      <header className="pageTop"><span>Full colouring page</span><span>Page 2</span></header>
                      <h2>Colour the {worldTheme.name.toLowerCase()}</h2>
                      <p className="miniIntro">Add patterns, helper tools, feeling colours and tiny safe places.</p>
                      <ColouringScene theme={worldTheme} animal={animalGuide} />
                    </article>

                    <article className={`workbookPage activityPage theme-${worldTheme.id}`}>
                      <header className="pageTop"><span>Body check-in</span><span>Page 3</span></header>
                      <h2>Explorer Check-In</h2>
                      <p>Sometimes {focus.toLowerCase()} can show up as {content.bodyClue}. In {worldTheme.name}, the clues might feel like {worldTheme.sensoryWords}.</p>
                      <section className="bodyActivity">
                        <div className="bodyFigure"><span>head</span><span>heart</span><span>tummy</span><span>hands</span></div>
                        <div className="activityNotes">
                          <h3>Circle, colour or mark the clues</h3>
                          <p>Where did the feeling visit first?</p>
                          <p>What helped your body feel safer?</p>
                        </div>
                      </section>
                    </article>

                    <article className={`workbookPage activityPage theme-${worldTheme.id}`}>
                      <header className="pageTop"><span>Mission trail</span><span>Page 4</span></header>
                      <h2>Today's Mission</h2>
                      <p>{content.mission}</p>
                      <div className="missionPath">
                        <div><strong>1</strong><span>Notice</span></div>
                        <div><strong>2</strong><span>Name</span></div>
                        <div><strong>3</strong><span>Support</span></div>
                      </div>
                      <div className="goalCard"><span>Tiny goal</span><strong>{childGoal}</strong></div>
                    </article>

                    <article className={`workbookPage activityPage theme-${worldTheme.id}`}>
                      <header className="pageTop"><span>Try this tool</span><span>Page 5</span></header>
                      <h2>Feeling Weather Tool</h2>
                      <p>{content.tinyStep} {animalGuide.name} can practise this with you.</p>
                      <div className="weatherBoard">
                        <div><span>Cloudy</span></div>
                        <div><span>Rainy</span></div>
                        <div><span>Stormy</span></div>
                        <div><span>Sunny again</span></div>
                      </div>
                      <p className="miniIntro">Try: {content.activity}</p>
                    </article>

                    <article className={`workbookPage grownupPage theme-${worldTheme.id}`}>
                      <header className="pageTop"><span>Grown-up support</span><span>Page 6</span></header>
                      <h2>Grown-Up Support Page</h2>
                      <div className="scriptCard">“{content.parentLine}”</div>
                      <div className="supportGrid">
                        <div><strong>Lower voice</strong><span>Use fewer words.</span></div>
                        <div><strong>Slow body</strong><span>Pause before the next instruction.</span></div>
                        <div><strong>Playful cue</strong><span>Use {animalGuide.name} as the reminder.</span></div>
                      </div>
                    </article>

                    <article className={`workbookPage reflectionPage theme-${worldTheme.id}`}>
                      <header className="pageTop"><span>Reflection</span><span>Page 7</span></header>
                      <h2>What did I learn?</h2>
                      <p>{name} and {animalGuide.name} can return to {worldTheme.name} whenever they need to practise again.</p>
                      <div className="reflectionCards">
                        <div>I noticed...</div>
                        <div>I tried...</div>
                        <div>I felt proud when...</div>
                        <div>Next time I can...</div>
                      </div>
                    </article>
                  </>
                )}
              </div>
            </section>
          </>
        )}

        {active === "Explorer Collection" && (
          <>
            <section className="welcome compactHero"><p className="eyebrow">Explorer Collection</p><h1>Therapeutic story worlds</h1><p>Choose a focus and send it straight into the Book Creator.</p></section>
            <section className="resourceGrid">
              {focusOptions.map((option) => (
                <article className="resourceCard" key={option}>
                  <p className="eyebrow">{option}</p><h3>{focusLibrary[option].metaphor.split(".")[0]}.</h3><p>{focusLibrary[option].mission}</p>
                  <button onClick={() => openFocusInCreator(option)}>Use this focus</button>
                </article>
              ))}
            </section>
          </>
        )}

        {active === "Parent Guides" && (
          <>
            <section className="welcome compactHero"><p className="eyebrow">Parent Guides</p><h1>Warm scripts for hard moments</h1><p>Simple co-regulation language that can be printed, copied or adapted.</p></section>
            <section className="guidePanel">
              <label>Guide focus</label>
              <select value={focus} onChange={(event) => setFocus(event.target.value as Focus)}>{focusOptions.map((option) => <option key={option}>{option}</option>)}</select>
              <article className="parentGuideCard"><p className="eyebrow">Try saying</p><h2>“{content.parentLine}”</h2><p><strong>Helpful next step:</strong> {content.tinyStep}</p><p><strong>Home activity:</strong> {content.activity}</p></article>
            </section>
          </>
        )}

        {active === "Resource Library" && (
          <>
            <section className="welcome compactHero"><p className="eyebrow">Resource Library</p><h1>Printable therapy tools</h1><p>A starter library for worksheets, visuals and activity prompts.</p></section>
            <section className="libraryTable">{resourceLibrary.map((resource) => <article className="libraryRow" key={resource.title}><div><p className="eyebrow">{resource.type} · Ages {resource.age}</p><h3>{resource.title}</h3><p>{resource.focus}</p></div><button onClick={() => openFocusInCreator(resource.focus)}>Create from this</button></article>)}</section>
          </>
        )}

        {active === "Settings" && (
          <>
            <section className="welcome compactHero"><p className="eyebrow">Settings</p><h1>Studio preferences</h1><p>These are local design controls for this prototype.</p></section>
            <section className="settingsPanel"><label>Default writing tone</label><select value={tone} onChange={(event) => setTone(event.target.value)}><option>gentle and playful</option><option>calm and professional</option><option>child-led and imaginative</option><option>brief and practical</option></select><div className="settingPreview"><p className="eyebrow">Current tone</p><h2>{tone}</h2></div></section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
