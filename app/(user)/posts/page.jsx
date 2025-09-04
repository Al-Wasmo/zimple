import { PostItemDev } from "@/components/PostItemDev";
import Preview from "@/components/Preview"; // can still be client
import { PostYearItemsSchema } from "@/lib/schemas";
import { extractMetadata, parseBlogFile, parseTitle, useInputStore } from "@/lib/store";
import fs from "fs";
import Link from "next/link";
import path from "path";




function PostItem({ data }) {

    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
        //TODO: force file name
        const blog_title = parseTitle(data.title);
        const filePath = path.join(process.cwd(), 'markdown/posts',blog_title) + ".md";
        const content = fs.readFileSync(filePath, "utf-8");
        const {metadata, markdown} = parseBlogFile(content);
        return <PostItemDev data={data} metadata={metadata} markdown={markdown} />
    }

    return <Link href={`/posts/${parseTitle(data.title)}`}>
        <div className="hover:text-[#ff4d4d] text-lg flex flex-row gap-32 justify-between cursor-pointer">
            <p>{data.title}</p>
            <p>{data.date}</p>
        </div>
    </Link>
}


function PostYearItems({ data }) {
    const year = data[0];
    const posts = data[1];

    return <div className="flex flex-col gap-4">
        <h1 className="text-2xl">{year}</h1>
        <div className="flex flex-col gap-2 w-[95%] m-auto">
            {
                posts.map((post, idx) => {
                    return <PostItem key={idx} data={post} />
                })
            }
        </div>
    </div>
}

export default function PostsPage() {
    const dirPath = path.join(process.cwd(), 'markdown/posts');
    const files = fs.readdirSync(dirPath);



    let posts_metadata = [];
    for (let file of files) {
        const filePath = path.join(process.cwd(), "markdown/posts", file);
        const content = fs.readFileSync(filePath, "utf-8");
        let metadata = extractMetadata(content);
        if (Object.entries(metadata).length) {
            posts_metadata.push(metadata);
        }
    }

    // group by year
    posts_metadata = posts_metadata.reduce((acc, post) => {
        const year = post.date ? post.date.split('-')[0] : "SomeTime";
        if (!acc[year]) acc[year] = [];
        acc[year].push(post);
        return acc;
    }, {});







    return <div className="flex-1 text-white  w-full h-full flex flex-col items-center gap-16 p-8">
        <h1 className="text-3xl font-bold mt-5">Posts</h1>
        <div className="flex flex-col-reverse gap-14 w-[800px]">
            {
                Object.entries(posts_metadata).map((data, idx) => {
                    return <PostYearItems key={idx} data={data} />
                })
            }
        </div>

    </div>
}

