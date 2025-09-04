import { create } from 'zustand'
import { persist } from 'zustand/middleware'



// TODO: there is a limit to data in the local storage


export const useInputStore = create(
  persist(
    (set) => ({
      markdown: '',
      metadata: '',
      onMarkdownChange: (markdown) => set({ markdown }),
      onMedatadataChange: (metadata) => set({ metadata }),
    }),
    {
      name: "blog-info",
    }
));




export const useDevStore = create((set) => ({
  isDev: false,
  setIsDev: (dev) => set({ dev }),
}))



export const useEditMode = create((set) => ({
  mode: "markdown",
  setEditMode: (mode) => set({ mode }),
}))



export function parseBlogFile(content) {
  const parts = content.split(/^-{10,}$/m).map(p => p.trim()).filter(Boolean);

  const metadata = parts[0] || '';
  const markdown = parts[1] || '';

  return { metadata, markdown };
}

export function extractMetadata(content) {
  const match = content.match(/^-{76,}\n([\s\S]*?)\n-{76,}/m);
  if (!match) return {};

  const metadataBlock = match[1].trim();
  const lines = metadataBlock.split('\n');

  const metadata = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length > 0) {
      metadata[key.trim()] = rest.join(':').trim();
    }
  }
  return metadata;
}

export function parseTitle(title) {
  return title ? title.toLowerCase().replace(/\s+/g, '-') : ''
}