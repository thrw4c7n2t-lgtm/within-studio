import { useMemo, useState } from "react";
import "./App.css";
import "./canva-assets.css";
import { starryAssets } from "./starryAssets";

type Section = "Dashboard" | "Book Creator" | "Explorer Collection" | "Parent Guides" | "Resource Library" | "Settings";
type Focus = "Big feelings" | "Anxiety" | "Transitions" | "Friendship" | "Sensory regulation" | "Confidence";
type PictureStyle = "storybook" | "colouring" | "lowInk";

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
  { id: "storybook", emoji: "🎨", name: "Colour storybook", label: "image-led pages using Canva-style assets" },
  { id: "colouring", emoji: "✏️", name: "Colouring book", label: "black-and-white printable pages" },
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

const focusCopy: Record<Focus, { bodyClue: string; mission: string; parentLine: string; tool: string; activity: string }> = {
  "Big feelings": {
    bodyClue: "hot cheeks, tight hands, a buzzing chest, a loud voice or a heavy tummy",
    mission: "Notice the feeling, name it, find it in the body and choose one safe way to let it move.",
    parentLine: "I can see this feeling is really big. I am not scared of it, and I will help you ride the wave.",
    tool: "Put one hand on your body and say: this is a feeling, not forever.",
    activity: "Draw your feeling as weather. Add one thing that helps the weather soften.",
  },
  Anxiety: {
    bodyClue: "a fast heart, butterflies, questions on repeat, tummy pain or needing to stay close",
    mission: "Thank the worry guard, check the facts and take one tiny brave step.",
    parentLine: "Your worry is trying to protect you. We can listen to it without letting it be the boss.",
    tool: "Ask: what is my worry saying, and what do I know is true?",
    activity: "Make a brave ladder with three tiny steps: easy, medium and stretchy.",
  },
  Transitions: {
    bodyClue: "stalling, arguing, hiding, becoming silly, asking for more time or feeling suddenly tired",
    mission: "Name what is changing, what is staying the same, and what happens first, next and last.",
    parentLine: "This is a change moment. I will show you the next three steps and stay calm while your body catches up.",
    tool: "Choose one transition helper: timer, visual, job, song or movement break.",
    activity: "Draw a bridge from now to next. Add three stepping stones: first, next and last.",
  },
  Friendship: {
    bodyClue: "talking over others, taking control, feeling left out, getting too close or not knowing how to join",
    mission: "Notice the other person, listen for one clue and try one flexible play idea.",
    parentLine: "Friendship is a skill we practise. Let us slow the moment down and look for one clue from the other person.",
    tool: "Look for one clue: face, body, words or distance.",
    activity: "Write three join-in lines: Can I play? What are you building? Could I have a turn after you?",
  },
  "Sensory regulation": {
    bodyClue: "wiggling, crashing, chewing, covering ears, hiding, humming or needing firm pressure",
    mission: "Notice the body signal, choose a sensory tool and check whether the signal changes.",
    parentLine: "Your body is asking for help. Let us choose a tool before we ask it to do something hard.",
    tool: "Choose one body tool for two minutes, then check in again.",
    activity: "Make a sensory menu with movement tools, quiet tools and pressure tools.",
  },
  Confidence: {
    bodyClue: "saying I cannot, hiding work, giving up quickly, avoiding hard things or needing reassurance",
    mission: "Remember one past success, choose one small try and celebrate effort instead of perfect results.",
    parentLine: "You do not have to feel ready to begin. We can start tiny, and I will notice your effort.",
    tool: "Do the first tiny part for two minutes only.",
    activity: "Draw a brave seed. Write one thing it has already survived and one tiny thing it will try next.",
  },
};

const resourceLibrary = [
  { title: "Emotion Body Map", focus: "Big feelings" as Focus, type: "Worksheet", age: "5-10" },
  { title: "Worry Guard Fact Check", focus: "Anxiety" as Focus, type: "Activity", age: "6-12" },
  { title: "First, Next, Last Bridge", focus: "Transitions" as Focus, type: "Visual", age: "4-10" },
  { title: "Friendship Clue Detective", focus: "Friendship" as Focus, type: "Worksheet", age: "6-12" },
];

function FallbackScene({ theme, animal, large = false }: { theme: WorldTheme; animal: AnimalGuide; large?: boolean }) {
  return (
    <div className={large ? `sceneArt sceneArtLarge theme-${theme.id}` : `sceneArt theme-${theme.id}`}>
      <div className="sceneSky" />
      <div className="sceneSun" />
      <div className="sceneCloud cloudOne" />
      <div className="sceneCloud cloudTwo" />
      <div className="sceneGround" />
      <div className="scenePath" />
      <div className="sceneDetails"><span>{theme.emoji}</span><span className="heroAnimal">{animal.emoji}</span><span>✨</span><span>🌱</span></div>
    </div>
  );
}

function FallbackColouring({ theme, animal }: { theme: WorldTheme; animal: AnimalGuide }) {
  return (
    <div className={`colouringScene colouring-${theme.id}`}>
      <div className="colourSky" /><div className="colourSun" /><div className="colourCloud cloudOne" /><div className="colourCloud cloudTwo" /><div className="colourGround" /><div className="colourPath" />
      <div className="colourAnimal">{animal.name}</div>
      {theme.details.map((detail, index) => <div className={`colourDetail detail${index + 1}`} key={detail}>{detail}</div>)}
      <div className="colourDirections">Colour the scene • Add feelings • Hide three tiny helper tools</div>
    </div>
  );
}

function App() {
  const [active, setActive] = useState<Section>("Dashboard");
  const [childName, setChildName] = useState("Arthur");
  const [focus, setFocus] = useState<Focus>("Big feelings");
  const [animalGuideId, setAnimalGuideId] = useState("butterfly");
  const [worldThemeId, setWorldThemeId] = useState("stars");
  const [pictureStyle, setPictureStyle] = useState<PictureStyle>("storybook");
  const [strength, setStrength] = useState("noticing small details");
  const [goal, setGoal] = useState("pausing before the feeling gets too big");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState("gentle and playful");

  const name = childName.trim() || "Your child";
  const animalGuide = animalGuides.find((animal) => animal.id === animalGuideId) ?? animalGuides[0];
  const worldTheme = worldThemes.find((theme) => theme.id === worldThemeId) ?? worldThemes[0];
  const copy = focusCopy[focus];
  const isStarry = worldTheme.id === "stars";
  const isBibi = animalGuide.id === "butterfly";

  const generatedText = useMemo(() => [
    `${name}'s Explorer Journal`,
    `${worldTheme.article} ${worldTheme.name.toLowerCase()} adventure about ${focus.toLowerCase()}`,
    `Guide: ${animalGuide.name}`,
    `Goal: ${goal}`,
    `Tool: ${copy.tool}`,
  ].join("\n"), [animalGuide.name, copy.tool, focus, goal, name, worldTheme]);

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
        {modules.map((module) => <button key={module.title} className={active === module.title ? "navButton active" : "navButton"} onClick={() => setActive(module.title)}><span>{module.icon}</span>{module.title}</button>)}
      </aside>

      <main className="main">
        {active === "Dashboard" && (
          <>
            <section className="welcome dashboardHero"><p className="eyebrow">Within Studio</p><h1>What would you like to create today?</h1><p>A calmer, more playful workspace for therapeutic books, family resources and printable neuroaffirming tools.</p></section>
            <section className="moduleGrid">{modules.filter((module) => module.title !== "Dashboard").map((module) => <article className="moduleCard" key={module.title}><div className="icon">{module.icon}</div><h3>{module.title}</h3><p>{module.description}</p><button onClick={() => setActive(module.title)}>Open</button></article>)}</section>
          </>
        )}

        {active === "Book Creator" && (
          <>
            <section className="welcome compactHero"><p className="eyebrow">Within Studio</p><h1>Book Creator</h1><p>Create a printable workbook with real Canva-style images, a full colouring page and calmer activities.</p></section>
            <section className="creator">
              <div className="formPanel">
                <h2>Create Explorer Book</h2>
                <label>Child's name</label><input value={childName} onChange={(event) => setChildName(event.target.value)} />
                <label>Therapy focus</label><select value={focus} onChange={(event) => setFocus(event.target.value as Focus)}>{focusOptions.map((option) => <option key={option}>{option}</option>)}</select>
                <label>Animal guide</label><div className="choiceGrid animalChoiceGrid">{animalGuides.map((animal) => <button type="button" key={animal.id} className={animalGuideId === animal.id ? "choiceCard selected" : "choiceCard"} onClick={() => setAnimalGuideId(animal.id)}><span className="choiceEmoji">{animal.emoji}</span><strong>{animal.name}</strong><small>{animal.role}</small></button>)}</div>
                <label>Story world</label><div className="choiceGrid themeChoiceGrid">{worldThemes.map((theme) => <button type="button" key={theme.id} className={worldThemeId === theme.id ? "choiceCard selected" : "choiceCard"} onClick={() => setWorldThemeId(theme.id)}><span className="choiceEmoji">{theme.emoji}</span><strong>{theme.name}</strong><small>{theme.palette}</small></button>)}</div>
                <label>Picture style</label><div className="choiceGrid styleChoiceGrid">{pictureStyles.map((style) => <button type="button" key={style.id} className={pictureStyle === style.id ? "choiceCard selected" : "choiceCard"} onClick={() => setPictureStyle(style.id)}><span className="choiceEmoji">{style.emoji}</span><strong>{style.name}</strong><small>{style.label}</small></button>)}</div>
                <label>Child strength</label><input value={strength} onChange={(event) => setStrength(event.target.value)} />
                <label>Workbook goal</label><textarea value={goal} onChange={(event) => setGoal(event.target.value)} />
                <button onClick={() => setGenerated(true)}>Generate Workbook</button>
                <button className="secondaryButton" onClick={copyWorkbookText}>{copied ? "Copied" : "Copy Workbook Text"}</button>
                {generated && <button className="secondaryButton" onClick={() => window.print()}>Print Workbook</button>}
              </div>

              <div className={workbookClass}>
                {!generated ? <div className="emptyPreview"><h2>Ready when you are.</h2><p>Choose an animal guide, story world and picture style.</p></div> : (
                  <>
                    <article className={`workbookPage coverPage theme-${worldTheme.id} ${isStarry ? "assetPage" : ""}`}>
                      {isStarry && <img className="coverAsset" src={starryAssets.starryCover} alt="Starry camp illustration" />}
                      <div className="coverTextPanel"><p className="eyebrow">Within Explorer Collection</p><h2>{name}'s Explorer Journal</h2><p>{worldTheme.article} {worldTheme.name.toLowerCase()} adventure about {focus.toLowerCase()}</p></div>
                      {isBibi && <img className="guidePortrait" src={starryAssets.bibi} alt="Bibi the Butterfly" />}
                    </article>

                    <article className="workbookPage storyPage">
                      <p className="eyebrow">Story page · Page 2</p><h2>Meet {animalGuide.name}</h2><p>{name} steps into {worldTheme.setting}. {animalGuide.name} is waiting nearby. {animalGuide.helperLine}</p>
                      {isStarry ? <img className="wideSceneAsset" src={starryAssets.starryCover} alt="Starry camp scene" /> : <FallbackScene theme={worldTheme} animal={animalGuide} />}
                    </article>

                    <article className="workbookPage fullColouringPage">
                      <p className="eyebrow">Full colouring page · Page 3</p><h2>Colour the {worldTheme.name.toLowerCase()}</h2>
                      {isStarry ? <img className="colouringAsset" src={starryAssets.starryColouring} alt="Starry camp colouring scene" /> : <FallbackColouring theme={worldTheme} animal={animalGuide} />}
                    </article>

                    {isStarry ? (
                      <>
                        <article className="workbookPage templateImagePage"><img className="templatePageAsset" src={starryAssets.bodyMapTemplate} alt="Starry Camp body feelings map" /><div className="templateTextOverlay templateInstruction">Colour, circle, or gently mark the places your body notices feelings.</div></article>
                        <article className="workbookPage templateImagePage"><img className="templatePageAsset" src={starryAssets.missionPathTemplate} alt="Starry Camp mission path" /><div className="templateTextOverlay missionLabel missionNotice">Notice</div><div className="templateTextOverlay missionLabel missionName">Name it</div><div className="templateTextOverlay missionLabel missionSupport">Choose support</div><div className="templateTextOverlay missionLabel missionAgain">Try again</div><div className="templateTextOverlay missionGoalOverlay">Tiny goal: {goal}</div></article>
                        <article className="workbookPage templateImagePage"><img className="templatePageAsset" src={starryAssets.grownupSupportTemplate} alt="Starry Camp grown-up support" /><div className="templateTextOverlay supportIntroOverlay">When big feelings show up, the grown-up does not need to fix everything at once. Small, steady support can help the next step feel possible.</div><div className="templateTextOverlay supportCardOverlay supportPause"><strong>Pause</strong><br />Lower your voice.</div><div className="templateTextOverlay supportCardOverlay supportConnect"><strong>Connect</strong><br />Name the feeling.</div><div className="templateTextOverlay supportCardOverlay supportNext"><strong>Next</strong><br />Offer one small step.</div><div className="templateTextOverlay supportScriptOverlay">“{copy.parentLine}”</div></article>
                        <article className="workbookPage templateImagePage"><img className="templatePageAsset" src={starryAssets.certificateTemplate} alt="Starry Camp certificate" /><div className="templateTextOverlay certificateTitleOverlay">Starry Camp Bravery Certificate</div><div className="templateTextOverlay certificateChildOverlay">{name}</div><div className="templateTextOverlay certificateSentenceOverlay">I tried something brave today.</div></article>
                      </>
                    ) : (
                      <>
                        <article className="workbookPage activityPage quietPage"><p className="eyebrow">Body map · Page 4</p><h2>Where do I feel it?</h2><p>Sometimes {focus.toLowerCase()} can show up as {copy.bodyClue}. Circle or colour the places your body gives you clues.</p><div className="bodyMapReal"><div className="head" /><div className="body" /><div className="arm left" /><div className="arm right" /><div className="leg left" /><div className="leg right" /></div></article>
                        <article className="workbookPage activityPage quietPage"><p className="eyebrow">Mission path · Page 5</p><h2>My tiny mission</h2><p>{copy.mission}</p><div className="pathActivity"><span>Notice</span><span>Name it</span><span>Choose support</span><span>Try again</span></div><div className="goalCard"><span>Tiny goal</span><strong>{goal}</strong></div></article>
                        <article className="workbookPage grownupPage quietPage"><p className="eyebrow">Grown-up support · Page 6</p><h2>Support script</h2><div className="scriptCard">“{copy.parentLine}”</div><div className="supportGrid"><div><strong>Pause</strong><span>Lower your voice.</span></div><div><strong>Connect</strong><span>Name the feeling.</span></div><div><strong>Next</strong><span>Offer one small step.</span></div></div></article>
                        <article className="workbookPage reflectionPage quietPage"><p className="eyebrow">Reflection · Page 7</p><h2>Explorer certificate</h2><p>{name} practised noticing feelings with {animalGuide.name} in {worldTheme.name}.</p><div className="certificateBox">I tried something brave today.</div></article>
                      </>
                    )}
                  </>
                )}
              </div>
            </section>
          </>
        )}

        {active === "Explorer Collection" && <><section className="welcome compactHero"><p className="eyebrow">Explorer Collection</p><h1>Therapeutic story worlds</h1><p>Choose a focus and send it straight into the Book Creator.</p></section><section className="resourceGrid">{focusOptions.map((option) => <article className="resourceCard" key={option}><p className="eyebrow">{option}</p><h3>{option}</h3><p>{focusCopy[option].mission}</p><button onClick={() => openFocusInCreator(option)}>Use this focus</button></article>)}</section></>}
        {active === "Parent Guides" && <><section className="welcome compactHero"><p className="eyebrow">Parent Guides</p><h1>Warm scripts for hard moments</h1><p>Simple co-regulation language that can be printed, copied or adapted.</p></section><section className="guidePanel"><label>Guide focus</label><select value={focus} onChange={(event) => setFocus(event.target.value as Focus)}>{focusOptions.map((option) => <option key={option}>{option}</option>)}</select><article className="parentGuideCard"><p className="eyebrow">Try saying</p><h2>“{copy.parentLine}”</h2><p><strong>Helpful next step:</strong> {copy.tool}</p><p><strong>Home activity:</strong> {copy.activity}</p></article></section></>}
        {active === "Resource Library" && <><section className="welcome compactHero"><p className="eyebrow">Resource Library</p><h1>Printable therapy tools</h1><p>A starter library for worksheets, visuals and activity prompts.</p></section><section className="libraryTable">{resourceLibrary.map((resource) => <article className="libraryRow" key={resource.title}><div><p className="eyebrow">{resource.type} · Ages {resource.age}</p><h3>{resource.title}</h3><p>{resource.focus}</p></div><button onClick={() => openFocusInCreator(resource.focus)}>Create from this</button></article>)}</section></>}
        {active === "Settings" && <><section className="welcome compactHero"><p className="eyebrow">Settings</p><h1>Studio preferences</h1><p>These are local design controls for this prototype.</p></section><section className="settingsPanel"><label>Default writing tone</label><select value={tone} onChange={(event) => setTone(event.target.value)}><option>gentle and playful</option><option>calm and professional</option><option>child-led and imaginative</option><option>brief and practical</option></select><div className="settingPreview"><p className="eyebrow">Current tone</p><h2>{tone}</h2></div></section></>}
      </main>
    </div>
  );
}

export default App;
