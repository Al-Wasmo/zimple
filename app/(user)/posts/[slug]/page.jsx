import Preview from "@/components/Preview";
import { parseBlogFile } from "@/lib/store";
import fs, { chownSync } from "fs";
import { marked } from "marked";
import path from "path";


export default async function PostPage({ params }) {
    const slug = decodeURIComponent((await params).slug);
    const isDev = process.env.NODE_ENV === "development";


    let filePath = "";
    let html = "";
    if (isDev) {
        filePath = path.join(process.cwd(), "markdown/posts", `${slug}.md`);
        const content = fs.readFileSync(filePath, "utf-8");
        const { markdown, metadata } = parseBlogFile(content);
        html = markdown;
    } else {
        filePath = path.join(process.cwd(), "markdown/build", `${slug}.html`);
        html = fs.readFileSync(filePath, "utf-8");
    }



    return <div className="preview-container w-full h-full flex justify-center">
        {
            isDev ?
                <Preview markdown={html} />
                :
                <div
                    className="preview revert-tailwind"
                    dangerouslySetInnerHTML={{ __html: html }}
                />

        }
    </div>
}