"use client";

import { useInputuStore } from "@/lib/store"
import { useEffect, useRef } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs/components/prism-core';
import "@/css/custom.css";

export default function MarkdownEditor() {
    function onTextAreaChange(e) {
        onChange(e.target.value);
    }
    const onChange = useInputuStore((state) => state.onChange)
    const text = useInputuStore((state) => state.text)


    return <div className="w-full h-full flex flex-col bg-[#181818]">
        <div className="w-full flex gap-4 p-2 border-b-2">
            <button className="p-2 border-2 bg-white cursor-pointer rounded">Editor</button>
            <button className="p-2 border-2 bg-white cursor-pointer rounded">Metadata</button>
            <button className="p-2 border-2 bg-white cursor-pointer rounded">Export</button>
        </div>

        <textarea className="flex-1 w-full p-4 text-[18px]  border-none outline-none text-white" defaultValue={text} onChange={onTextAreaChange} spellCheck={false} ></textarea>
    </div>



}




