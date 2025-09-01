import fs from "fs";
import path from "path";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

// Path to your Markdown files
const inputDir = path.join(process.cwd(), "markdown");
const outputDir = path.join(process.cwd(), "public/html");

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
    const markdown = fs.readFileSync(filePath, "utf-8");

    const html = marked.parse(markdown);

    const outputFilePath = path.join(
        outputDir,
        file.replace(/\.md$/, ".html")
    );

    fs.writeFileSync(outputFilePath, html, "utf-8");
    console.log(`Generated ${outputFilePath}`);
});
