import Preview from "@/components/Preview";
import { parseBlogFile, parseTitle } from "@/lib/store";
import fs, { chownSync } from "fs";
import { marked } from "marked";
import path from "path";



export async function generateStaticParams() {
    const postsDir = path.join(process.cwd(), "markdown/posts");
    const files = fs.readdirSync(postsDir);

    const slugs = [];

    for (const file of files) {
        if (!file.endsWith(".md")) continue;

        const filePath = path.join(postsDir, file);
        const content = fs.readFileSync(filePath, "utf-8");

        const { metadata, markdown } = parseBlogFile(content);

        if (metadata?.title) {
            slugs.push({
                slug: parseTitle(metadata.title),
            });
        }
    }

    return slugs;
}

export default async function PostPage({ params }) {
    const { slug } = await params;
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
        // Read raw markdown in dev
        const filePath = path.join(process.cwd(), "markdown/posts", `${slug}.md`);
        const content = fs.readFileSync(filePath, "utf-8");
        const { markdown } = parseBlogFile(content);

        return ( <Preview markdown={markdown} /> );
    } else {
        // Serve static HTML in prod
        const filePath = path.join(process.cwd(), "markdown/build", `${slug}.html`);
        const html = fs.readFileSync(filePath, "utf-8");

        return (
            <div className="preview-container w-full h-full flex justify-center">
                <div
                    className="preview revert-tailwind"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        );
    }
}