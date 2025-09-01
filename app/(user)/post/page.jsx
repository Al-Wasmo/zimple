import Preview from "@/components/Preview"; // can still be client
import fs from "fs";
import path from "path";

export default function Home() {
    const filePath = path.join(process.cwd(), "public/html", "a.html");
    const html = fs.readFileSync(filePath, "utf-8");

    return <div className="preview-container w-full h-full flex justify-center">
        <div
            className="preview revert-tailwind"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    </div>
}




//     return (
//         <div className="w-full h-full bg-[#f5f7fa]">
//             {/* <Preview html={html} /> */}
//             <div className="preview-container w-full h-full flex justify-center">

//                 <div className="revert-tailwind" dangerouslySetInnerHTML={{ __html: html }}>
//                 </div>
//             </div>
//         </div>
//     );
// }
