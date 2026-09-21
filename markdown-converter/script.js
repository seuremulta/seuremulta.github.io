const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  const input = markdownInput.value;

  const lines = input.split("\n");

  const convertedLines = lines.map((line) => {
    if (/^\s*###\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*###\s+(.*)$/, "<h3>$1</h3>");
    } else if (/^\s*##\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*##\s+(.*)$/, "<h2>$1</h2>");
    } else if (/^\s*#\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*#\s+(.*)$/, "<h1>$1</h1>");
    }

    if (/^\s*>\s+(.*)$/.test(line)) {
      line = line.replace(/^\s*>\s+(.*)$/, "<blockquote>$1</blockquote>");
    }

    // Images: ![alt-text](image-source)
    line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">');

    // Links: [link text](URL)
    line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Bold text: **bold** or __bold__
    line = line.replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>");

    // Italic text: *italic* or _italic_
    line = line.replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

    return line;
  });

  return convertedLines.join("");
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  htmlOutput.textContent = html;
  preview.innerHTML = html;
});

