import fs from "fs";
import path from "path";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
// import { parseBlogFile, parseTitle } from "../lib/store.js";





function parseBlogFile(content) {
  const parts = content.split(/^-{10,}$/m).map(p => p.trim()).filter(Boolean);
  const metadata = parts[0] || '';
  const markdown = parts[1] || '';


  const metadataBlock = metadata;
  const lines = metadataBlock.split('\n');
  const metadataObj = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length > 0) {
      metadataObj[key.trim()] = rest.join(':').trim();
    }
  }
  return { metadata  :metadataObj , markdown };
}

function parseTitle(title) {
  return title ? title.toLowerCase().replace(/\s+/g, '-') : ''
}


const inputDir = path.join(process.cwd(), "markdown/posts");
const outputDir = path.join(process.cwd(), "markdown/build");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f => f.endsWith(".md"));

const marked = new Marked(
    markedHighlight({
        emptyLangClass: "hljs",
        langPrefix: "hljs language-",
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
    })
);

files.forEach((file) => {
    const filePath = path.join(inputDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const { metadata, markdown } = parseBlogFile(content);
    if (metadata?.title) {


        const html = marked.parse(markdown);
        const title = parseTitle(metadata.title);

        const outputFilePath = path.join(
            outputDir,
            `${title}.html`,
        );

        fs.writeFileSync(outputFilePath, html, "utf-8");
        console.log(`Generated ${outputFilePath}`);
    }

});
