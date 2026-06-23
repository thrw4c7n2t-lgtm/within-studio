const textFixes: Array<[string, string]> = [
  ["A ocean rockpool", "An ocean rockpool"],
  ["A Ocean Rockpool", "An Ocean Rockpool"],
];

function fixTextNode(node: Text) {
  let nextValue = node.nodeValue ?? "";

  for (const [from, to] of textFixes) {
    nextValue = nextValue.replaceAll(from, to);
  }

  if (nextValue !== node.nodeValue) {
    node.nodeValue = nextValue;
  }
}

function fixVisibleText(root: ParentNode = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    fixTextNode(node as Text);
    node = walker.nextNode();
  }
}

function startGrammarFixes() {
  fixVisibleText();

  const observer = new MutationObserver(() => {
    window.requestAnimationFrame(() => fixVisibleText());
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startGrammarFixes, { once: true });
} else {
  startGrammarFixes();
}
