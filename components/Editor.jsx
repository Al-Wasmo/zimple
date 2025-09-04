"use client";

import { useEditMode, useInputStore } from "@/lib/store"
import "@/css/custom.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveBlogFile } from "@/lib/server";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

export default function MarkdownEditor() {

    async function onSave() {
        const [err, msg] = await saveBlogFile(metadata, markdown, pageMode === "edit");
        if (!err) {
            setAlertOpen(true);2
        }
    }

    function onMarkdownTextAreaChange(e) {
        onMarkdownChange(e.target.value);
    }
    function onMetadataTextAreaChange(e) {
        onMedatadataChange(e.target.value);
    }
    function onSelectMode(mode) {
        setEditMode(mode);
    }

    const onMarkdownChange = useInputStore((state) => state.onMarkdownChange)
    const onMedatadataChange = useInputStore((state) => state.onMedatadataChange)

    const { mode, setEditMode } = useEditMode((state) => state);

    const markdown = useInputStore((state) => state.markdown)
    const metadata = useInputStore((state) => state.metadata)



    const { mode: pageMode } = useParams();
    const isEdit = pageMode === "edit";

    useEffect(() => {
        if (isEdit) {
            const markdown = localStorage.getItem("markdown");
            const metadata = localStorage.getItem("metadata");
            onMarkdownChange(markdown);
            onMedatadataChange(metadata);
        }
    }, [isEdit])


    const [alertOpen,setAlertOpen] = useState(false);

    const selected_btn = "text-white bg-transparent";
    const unselected_btn = "text-black bg-white cursor-pointer";

    return <div className="w-full h-full flex flex-col bg-[#0D1117]">
        <div className="w-full flex gap-4 p-2">
            <button onClick={() => onSelectMode('markdown')} className={`${mode == 'markdown' ? selected_btn : unselected_btn} p-2 border-2  rounded`}>Editor</button>
            <button onClick={() => onSelectMode('metadata')} className={`${mode == 'markdown' ? unselected_btn : selected_btn} p-2 border-2 rounded`}>Metadata</button>
            <button onClick={() => onSave()} className="p-2 border-2 bg-white cursor-pointer rounded">Save</button>
        </div>

        <hr />

        {
            mode == "markdown" ?
                <textarea className="flex-1 w-full p-4 text-[18px]  border-none outline-none text-white" value={markdown} onChange={onMarkdownTextAreaChange} spellCheck={false} ></textarea> :
                <textarea className="flex-1 w-full p-4 text-[18px]  border-none outline-none text-white" value={metadata} onChange={onMetadataTextAreaChange} spellCheck={false} ></textarea>
        }


        <AlertDialog open={alertOpen} onOpenChange={(val) => setAlertOpen(val)}>
            <AlertDialogTrigger asChild>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Failed to save markdown</AlertDialogTitle>
                    <AlertDialogDescription>
                        Either you didnt provide any title or title is already used by another markdown file
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction>OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    </div>




}




