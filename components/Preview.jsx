"use client";

import hljs from "highlight.js";
import { Marked } from "marked";


import { useInputuStore } from "@/lib/store";
import { markedHighlight } from "marked-highlight";


export default function Preview() {

    const text = useInputuStore((state) => state.text);

    const marked = new Marked(
        markedHighlight({
            emptyLangClass: 'hljs',
            langPrefix: 'hljs language-',
            highlight(code, lang, info) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        }),
    );

    return <div className="preview-container w-full h-full flex justify-center">
        <div
            className="preview revert-tailwind"
            dangerouslySetInnerHTML={{ __html: marked.parse(text) }}
        />
    </div>
}