import fs from "fs";
import path from "path";


export default async function PostPage({params}) {
    const slug  = decodeURIComponent((await params).slug);
    // const filePath = path.join(process.cwd(), "markdown/build", `${slug}.html`);
    // const html = fs.readFileSync(filePath, "utf-8");

    const filePath = path.join(process.cwd(), "public/html", "a.html");
    const html = fs.readFileSync(filePath, "utf-8");


    return <div className="preview-container w-full h-full flex justify-center">
        <div
            className="preview revert-tailwind"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    </div>
}