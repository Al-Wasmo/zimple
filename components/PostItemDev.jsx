"use client";

import { parseTitle } from "@/lib/store";
import Link from "next/link";
import { useEffect } from "react";

export function PostItemDev({ data,markdown, metadata }) {
    function onSelectPost() {
        localStorage.setItem("markdown", markdown);
        localStorage.setItem("metadata", metadata);
    }

    return <Link href={`/posts/${parseTitle(data.title)}`} onClick={onSelectPost}>
        <div className="hover:text-[#ff4d4d] text-lg flex flex-row gap-32 justify-between cursor-pointer">
            <p>{data.title}</p>
            <p>{data.date}</p>
        </div>
    </Link>
}
