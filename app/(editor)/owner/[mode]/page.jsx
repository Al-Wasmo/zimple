"use client";

import dynamic from 'next/dynamic';
import { useParams } from "next/navigation";



import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import MarkdownEditor from "@/components/Editor";
const Preview = dynamic(() => import('@/components/Preview'), { ssr: false });

export default function EditCreatePage() {



  return (
    <div className='flex-1 flex flex-col'>

      <ResizablePanelGroup direction="horizontal" className={"flex-1 flex h-full w-full"}>
    
        <ResizablePanel>
          <MarkdownEditor />
        </ResizablePanel>

        <ResizableHandle className={"bg-black w-[1px]"} />


        <ResizablePanel defaultSize={60}>
          <Preview />
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>

  );
}


// ability to code custom components and extend the markdown