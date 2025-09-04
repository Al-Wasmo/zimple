"use server";





export async function saveBlogFile(metadata, markdown, isEdit) {

    const metadataObj = {};
    metadata.trim().split('\n').forEach(line => {
        const [key, ...rest] = line.split(':');
        if (key && rest.length) {
            metadataObj[key.trim()] = rest.join(':').trim();
        }

    });

    const blog_title = metadataObj.title ? metadataObj.title.toLowerCase().replace(/\s+/g, '-') : '';
    console.log(blog_title)
    if(blog_title.length == 0) {
        return [false,"Blog title not found, skipping save for now"];
    }

    let content = `
----------------------------------------------------------------------------
${metadata}
----------------------------------------------------------------------------
${markdown}  
`;


    

    // write

    const fs = await import("fs");
    const path = await import("path");



    const filePath = path.join(process.cwd(), 'markdown/posts', `${blog_title}.md`);
    const fileExists = await fs.promises
        .access(filePath)
        .then(() => true)
        .catch(() => false);



    if (!isEdit && fileExists) {
        return [false,"File already exists, skipping save for now"];
        return;
    }
    await fs.promises.writeFile(filePath, content, "utf8");
    console.log("✅ New blog saved:", filePath);

    return [true,""]
}



