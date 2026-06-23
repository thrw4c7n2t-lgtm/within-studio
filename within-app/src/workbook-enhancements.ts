type WorkbookTheme = "rainforest" | "rockpool" | "burrow" | "garden" | "stars" | "mountain";

const themeLabels: Record<WorkbookTheme, string> = {
  rainforest: "rainforest creek",
  rockpool: "ocean rockpool",
  burrow: "cosy burrow",
  garden: "secret garden",
  stars: "starry camp",
  mountain: "mountain trail",
};

const themeSceneLabels: Record<WorkbookTheme, string[]> = {
  rainforest: ["fern", "creek", "stepping stone", "leaf"],
  rockpool: ["shell", "wave", "rockpool", "sea glass"],
  burrow: ["lantern", "tunnel", "cushion", "safe den"],
  garden: ["flower", "butterfly", "path", "hidden door"],
  stars: ["tent", "moon", "stars", "campfire"],
  mountain: ["lookout", "path", "cloud", "wildflower"],
};

function getThemeFromPage(page: Element): WorkbookTheme {
  const match = Array.from(page.classList)
    .find((className) => className.startsWith("theme-"))
    ?.replace("theme-", "") as WorkbookTheme | undefined;

  return match && match in themeLabels ? match : "garden";
}

function getStyleFromPage(page: Element): string {
  return Array.from(page.classList).find((className) => className.startsWith("style-")) ?? "style-storybook";
}

function createColouringPage(coverPage: HTMLElement) {
  const theme = getThemeFromPage(coverPage);
  const style = getStyleFromPage(coverPage);
  const animalName = coverPage.querySelector(".activityTile")?.textContent?.trim() || "your animal guide";
  const sceneLabels = themeSceneLabels[theme];

  const page = document.createElement("article");
  page.className = `printPage enhancedBonusPage fullColouringPage theme-${theme} ${style}`;
  page.dataset.enhanced = "true";
  page.innerHTML = `
    <header class="printHeader">
      <p class="pageNumber">Page 2</p>
      <span class="pageBadge">Bonus colouring scene</span>
    </header>
    <h2><span>Colour the ${themeLabels[theme]}</span></h2>
    <h3>Add colours, patterns, feelings and tiny details</h3>
    <div class="fullColouringCanvas colouring-${theme}" aria-label="Full page colouring scene">
      <div class="colouringSky"></div>
      <div class="colouringSun"></div>
      <div class="colouringCloud cloudOne"></div>
      <div class="colouringCloud cloudTwo"></div>
      <div class="colouringGround"></div>
      <div class="colouringPath"></div>
      <div class="colouringAnimalBadge">${animalName}</div>
      <div class="colouringObject objectOne">${sceneLabels[0]}</div>
      <div class="colouringObject objectTwo">${sceneLabels[1]}</div>
      <div class="colouringObject objectThree">${sceneLabels[2]}</div>
      <div class="colouringObject objectFour">${sceneLabels[3]}</div>
    </div>
    <div class="colouringPromptStrip">
      <span>Find one feeling colour</span>
      <span>Add a safe place</span>
      <span>Draw your guide's helper tool</span>
    </div>
  `;

  return page;
}

function replaceDrawBox(drawBox: HTMLElement, page: HTMLElement) {
  if (drawBox.dataset.enhanced === "true") return;

  const pageClass = Array.from(page.classList).join(" ");
  drawBox.dataset.enhanced = "true";

  if (pageClass.includes("coverPage")) {
    drawBox.classList.add("activityBox", "badgeActivity");
    drawBox.innerHTML = `
      <strong>Make your explorer badge</strong>
      <div class="badgeCircles"><span>guide</span><span>place</span><span>tool</span></div>
    `;
    return;
  }

  if (pageClass.includes("checkPage")) {
    drawBox.classList.add("activityBox", "bodyMapActivity");
    drawBox.innerHTML = `
      <strong>Body clue map</strong>
      <div class="bodyMapFigure"><span>head</span><span>heart</span><span>tummy</span><span>hands</span></div>
    `;
    return;
  }

  if (pageClass.includes("missionPage")) {
    drawBox.classList.add("activityBox", "missionTrailActivity");
    drawBox.innerHTML = `
      <strong>Mission trail</strong>
      <div class="trailSteps"><span>1 notice</span><span>2 name</span><span>3 support</span></div>
    `;
    return;
  }

  if (pageClass.includes("toolPage")) {
    drawBox.classList.add("activityBox", "weatherActivity");
    drawBox.innerHTML = `
      <strong>Feeling weather picture</strong>
      <div class="weatherShapes"><span>cloud</span><span>rain</span><span>sun</span><span>rainbow</span></div>
    `;
    return;
  }

  if (pageClass.includes("grownupPage")) {
    drawBox.classList.add("activityBox", "grownupCueActivity");
    drawBox.innerHTML = `
      <strong>Grown-up cue card</strong>
      <div class="cueSteps"><span>pause</span><span>validate</span><span>one next step</span></div>
    `;
    return;
  }

  if (pageClass.includes("reflectionPage")) {
    drawBox.classList.add("activityBox", "reflectionActivity");
    drawBox.innerHTML = `
      <strong>Reflection stars</strong>
      <div class="reflectionStars"><span>I noticed</span><span>I tried</span><span>I can</span></div>
    `;
  }
}

function renumberPages(preview: Element) {
  const allPages = Array.from(preview.querySelectorAll<HTMLElement>(":scope > .printPage"));

  allPages.forEach((page, index) => {
    const pageNumber = page.querySelector<HTMLElement>(".pageNumber");
    if (pageNumber) pageNumber.textContent = `Page ${index + 1}`;
  });
}

function enhanceWorkbook() {
  const preview = document.querySelector(".bookPreview");
  if (!preview) return;

  const realPages = Array.from(preview.querySelectorAll<HTMLElement>(":scope > .printPage:not(.enhancedBonusPage)"));
  if (realPages.length === 0) return;

  preview.querySelectorAll(".enhancedBonusPage").forEach((page) => page.remove());

  const coverPage = realPages[0];
  const colouringPage = createColouringPage(coverPage);
  coverPage.insertAdjacentElement("afterend", colouringPage);

  const allPages = Array.from(preview.querySelectorAll<HTMLElement>(":scope > .printPage"));
  allPages.forEach((page) => {
    page.querySelectorAll<HTMLElement>(".drawBox").forEach((drawBox) => replaceDrawBox(drawBox, page));
  });

  renumberPages(preview);
}

function startWorkbookEnhancements() {
  let frame = 0;
  const schedule = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(enhanceWorkbook);
  };

  schedule();

  const observer = new MutationObserver(schedule);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startWorkbookEnhancements, { once: true });
} else {
  startWorkbookEnhancements();
}
