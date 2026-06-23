function makeCoverCard(label: string, value: string) {
  const card = document.createElement("div");
  card.className = "coverFeatureCard";
  card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return card;
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getCoverDetails(cover: HTMLElement) {
  const tileValues = Array.from(cover.querySelectorAll<HTMLElement>(".activityTile")).map((tile) => tile.textContent?.trim() ?? "");
  const bodyText = cover.querySelector<HTMLElement>(".pageBody")?.textContent ?? "";
  const subtitleText = cover.querySelector<HTMLElement>("h3")?.textContent ?? "";
  const promptText = cover.querySelector<HTMLElement>(".promptBox")?.textContent ?? "";

  const animalFromBody = bodyText.match(/meets\s+([^,]+),/i)?.[1]?.trim();
  const worldFromSubtitle = subtitleText.match(/An?\s+(.+?)\s+adventure/i)?.[1]?.trim();
  const strengthFromPrompt = promptText
    .replace(/Explorer strength/i, "")
    .split(".")[0]
    ?.trim();

  return {
    animal: tileValues[0] || animalFromBody || "Animal guide",
    world: tileValues[1] || (worldFromSubtitle ? toTitleCase(worldFromSubtitle) : "Story world"),
    strength: tileValues[2] || strengthFromPrompt || "Special strength",
  };
}

function enhanceFrontCover() {
  const coverPages = document.querySelectorAll<HTMLElement>(".bookPreview > .printPage.coverPage");

  coverPages.forEach((cover) => {
    if (cover.classList.contains("frontCoverPage") && cover.querySelector(".coverFeatureCard")) {
      return;
    }

    cover.classList.add("frontCoverPage");

    const badge = cover.querySelector<HTMLElement>(".pageBadge");
    if (badge) badge.textContent = "Within Explorer Collection";

    const pageNumber = cover.querySelector<HTMLElement>(".pageNumber");
    if (pageNumber) pageNumber.textContent = "Front cover";

    const title = cover.querySelector<HTMLElement>("h2");
    const subtitle = cover.querySelector<HTMLElement>("h3");
    const storyScene = cover.querySelector<HTMLElement>(".storyScene");
    const pageBody = cover.querySelector<HTMLElement>(".pageBody");
    const promptBox = cover.querySelector<HTMLElement>(".promptBox");
    const activityGrid = cover.querySelector<HTMLElement>(".activityGrid");
    const drawBox = cover.querySelector<HTMLElement>(".drawBox");
    const details = getCoverDetails(cover);

    if (title) title.classList.add("frontCoverTitle");
    if (subtitle) subtitle.classList.add("frontCoverSubtitle");
    if (storyScene) storyScene.classList.add("frontCoverScene");

    if (pageBody) pageBody.classList.add("frontCoverHiddenText");
    if (promptBox) promptBox.classList.add("frontCoverHiddenText");

    if (activityGrid) {
      activityGrid.classList.add("frontCoverFeatures");
      activityGrid.innerHTML = "";
      activityGrid.append(
        makeCoverCard("Animal guide", details.animal),
        makeCoverCard("Story world", details.world),
        makeCoverCard("Special strength", details.strength),
      );
    }

    if (drawBox) {
      drawBox.className = "coverNamePlate";
      drawBox.innerHTML = `
        <span>This book belongs to</span>
        <strong>____________________________</strong>
      `;
    }
  });
}

function startFrontCoverEnhancer() {
  let frame = 0;
  const schedule = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(enhanceFrontCover);
  };

  schedule();

  const observer = new MutationObserver(schedule);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startFrontCoverEnhancer, { once: true });
} else {
  startFrontCoverEnhancer();
}
