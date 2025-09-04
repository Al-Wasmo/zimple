"use client";

import { useInputStore } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Nav() {
    function onAddNewBlog() {
        onMarkdownChange("");
        onMedatadataChange("");
    }

    function onEditNewBlog() { 
    }


    const {onMarkdownChange,onMedatadataChange} = useInputStore((state) => state);

    const isDev = process.env.NODE_ENV === "development";
    const pathname = usePathname();
    const isInAPost = pathname.startsWith("/posts") && pathname.split("/").length >= 3 ;

    return (
        <nav className="px-16 h-[64px]  flex justify-between items-center w-full border-b-1 border-[#2e333b] fixed bg-[#22272e] text-white">
            <h1>T4k1</h1>
            {
                isDev &&
                <div className="flex gap-4">
                    <Link href={"/owner/add"} onClick={onAddNewBlog}>
                        <button className="bg-[#1e2127] p-2 rounded cursor-pointer">Add blog</button>
                    </Link>
                    { isInAPost && 
                    <Link href={"/owner/edit"} onClick={onEditNewBlog} >
                    <button  className="bg-[#1e2127] p-2 rounded cursor-pointer">Update blog</button> 
                    </Link>
                    }
                </div>
            }

        </nav>
    );
}

