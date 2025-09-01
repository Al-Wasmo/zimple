"use client";

import dynamic from 'next/dynamic';



import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import MarkdownEditor from "@/components/Editor";
const Preview = dynamic(() => import('@/components/Preview'), { ssr: false });

export default function Home() {
  return (
    <div className='flex-1 flex flex-col'>

      <ResizablePanelGroup direction="horizontal" className={"flex-1 flex h-full w-full"}>

        <ResizablePanel>
          <MarkdownEditor />
        </ResizablePanel>

        <ResizableHandle className={"bg-black w-[2px]"} />


        <ResizablePanel defaultSize={60}>
          <Preview />
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>

  );
}


// ability to integrate it in any blog kind site
// ability to inspect html elems for quick updateing
// ability to code custom components and extend the markdown