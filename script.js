const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const htmlPreview = document.getElementById("preview");

const convertMarkdown = () => {
  const input = markdownInput.value;

  if (!input.trim()) {
    htmlOutput.textContent = "";
    htmlPreview.innerHTML = "";
    return "";
  }

  const lines = input.split("\n");

  const htmlLines = lines.map(line => {
    // Headers (in order)
    if (/^###\s+/.test(line)) {
      line = `<h3>${line.replace(/^###\s+/, "")}</h3>`;
    } else if (/^##\s+/.test(line)) { 
      line = `<h2>${line.replace(/^##\s+/, "")}</h2>`; 
    } else if (/^#\s+/.test(line)) {
      line = `<h1>${line.replace(/^#\s+/, "")}</h1>`;
    }
    
    // Blockquote
    if (/^>\s+/.test(line)) {
      line = `<blockquote>${line.replace(/^>\s+/, "")}</blockquote>`;
    }

    // Image
    if (/^!\[(.+?)\]\((.+?)\)/.test(line)) {
      const match = line.match(/^!\[(.+?)\]\((.+?)\)/);
      line = `<img src="${match[2]}" alt="${match[1]}">`;
    }

    // Link
    if (/^\[(.+?)\]\((.+?)\)/.test(line)) {
      const match = line.match(/^\[(.+?)\]\((.+?)\)/);
      line = `<a href="${match[2]}">${match[1]}</a>`;
    }

    // Bold and Italic
    line = line
      .replace(/([*_])\1(.+?)\1\1/g, "<strong>$2</strong>")
      .replace(/([*_])(.+?)\1/g, "<em>$2</em>");

    return line;
  })

  const result = htmlLines.join("");

  htmlOutput.textContent = result;
  htmlPreview.innerHTML = result;

  return result;
} 

markdownInput.addEventListener("input", convertMarkdown);