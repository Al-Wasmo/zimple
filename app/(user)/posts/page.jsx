import Preview from "@/components/Preview"; // can still be client
import { PostYearItemsSchema } from "@/lib/schemas";
import fs from "fs";
import Link from "next/link";
import path from "path";


const data = {
    "2025": [
        {
            "title": "blind large bin attack",
            "path": "2025/3/12",
            "date": "2025/03/12"
        },
        {
            "title": "heap overflow analysis",
            "path": "2025/heap/overflow",
            "date": "2025/02/20"
        },
        {
            "title": "tcache double free",
            "path": "2025/tcache/double-free",
            "date": "2025/01/15"
        }
    ],
    "2024": [
        {
            "title": "writeup",
            "path": "2024/brics/chains",
            "date": "2024/11/15"
        },
        {
            "title": "fastbin poison chains",
            "path": "2024/11/1",
            "date": "2024/11/01"
        },
        {
            "title": "writeup",
            "path": "2023/lit/stiller-printf",
            "date": "2024/10/15"
        },
        {
            "title": "writeup",
            "path": "2020/hxp/still-printf",
            "date": "2024/10/14"
        },
        {
            "title": "format string exploitation",
            "path": "2024/exploits/fmtstr",
            "date": "2024/09/30"
        },
        {
            "title": "rop chain writeup",
            "path": "2024/rop/chains",
            "date": "2024/08/25"
        }
    ],
    "2023": [
        {
            "title": "heap metadata attacks",
            "path": "2023/heap/meta",
            "date": "2023/12/10"
        },
        {
            "title": "stack smashing writeup",
            "path": "2023/stack/smash",
            "date": "2023/11/05"
        },
        {
            "title": "format string 2.0",
            "path": "2023/exploits/fmtstr2",
            "date": "2023/10/22"
        }
    ],
    "2022": [
        {
            "title": "use-after-free analysis",
            "path": "2022/uaf/analysis",
            "date": "2022/06/18"
        },
        {
            "title": "glibc malloc internals",
            "path": "2022/glibc/malloc",
            "date": "2022/05/11"
        }
    ],
    "2021": [
        {
            "title": "heap exploitation tutorial",
            "path": "2021/heap/tutorial",
            "date": "2021/03/08"
        },
        {
            "title": "tcache attacks",
            "path": "2021/tcache/attacks",
            "date": "2021/02/20"
        }
    ],
    "2020": [
        {
            "title": "initial heap writeups",
            "path": "2020/heap/init",
            "date": "2020/12/12"
        },
        {
            "title": "basic format string",
            "path": "2020/exploits/fmtstr-basic",
            "date": "2020/10/05"
        }
    ]
}



function PostItem({ data }) {
    return <Link href={`/posts/${data.title}`}>
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
    // const filePath = path.join(process.cwd(), "public/html", "a.html");
    // const html = fs.readFileSync(filePath, "utf-8");



    const parsedData = PostYearItemsSchema.parse(data);
    return <div className="flex-1 text-white  w-full h-full flex flex-col items-center gap-16 p-8">
        <h1 className="text-3xl font-bold mt-5">Posts</h1>
        <div className="flex flex-col-reverse gap-14 w-[800px]">
            {
                Object.entries(parsedData).map((data, idx) => {
                    return <PostYearItems key={idx} data={data} />
                })
            }
        </div>

    </div>
}

