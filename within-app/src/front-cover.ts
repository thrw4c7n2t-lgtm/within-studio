function makeCoverCard(label: string, value: string) {
  const card = document.createElement("div");
  card.className = "coverFeatureCard";
  card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return card;
}

function enhanceFrontCover() {
  const coverPages = document.querySelectorAll<HTMLElement>(".bookPreview > .printPage.coverPage");

  coverPages.forEach((cover) => {
    const signature = [
      cover.className,
      cover.querySelector("h2")?.textContent ?? "",
      cover.querySelector("h3")?.textContent ?? "",
      Array.from(cover.querySelectorAll(".activityTile")).map((tile) => tile.textContent?.trim()).join("|"),
    ].join("::");

    if (cover.dataset.frontCoverSignature === signature) return;
    cover.dataset.frontCoverSignature = signature;
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
    const tiles = Array.from(cover.querySelectorAll<HTMLElement>(".activityTile")).map((tile) => tile.textContent?.trim() ?? "");

    if (title) title.classList.add("frontCoverTitle");
    if (subtitle) subtitle.classList.add("frontCoverSubtitle");
    if (storyScene) storyScene.classList.add("frontCoverScene");

    if (pageBody) pageBody.classList.add("frontCoverHiddenText");
    if (promptBox) promptBox.classList.add("frontCoverHiddenText");

    if (activityGrid) {
      activityGrid.classList.add("frontCoverFeatures");
      activityGrid.innerHTML = "";
      activityGrid.append(
        makeCoverCard("Animal guide", tiles[0] || "Explorer guide"),
        makeCoverCard("Story world", tiles[1] || "Adventure world"),
        makeCoverCard("Special strength", tiles[2] || "Tiny brave steps"),
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
