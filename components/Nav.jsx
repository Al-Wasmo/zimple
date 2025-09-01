"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Nav() {
    const isDev = process.env.NODE_ENV === "development";
    const pathname = usePathname();
    const isInAPost = pathname.split("/").length > 3;

    return (
        <nav className="px-16 flex justify-between items-center w-full border-b-1 border-[#2e333b] fixed bg-[#22272e] text-white p-4">
            <h1>asdasdasd</h1>

            {
                isDev &&
                <div className="flex gap-4">
                    <Link href={"/modify-blog"}>
                        <button className="bg-[#1e2127] p-2 rounded cursor-pointer">Add blog</button>
                    </Link>
                    { isInAPost && <button className="bg-[#1e2127] p-2 rounded cursor-pointer">Update blog</button> }
                </div>
            }

        </nav>
    );
}

