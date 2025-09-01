import { z } from "zod";

export const PostItemSchema = z.object({
    title: z.string(),
    path: z.string(),
    date: z.string(),
});


export const PostYearItemsSchema = z.record(z.string(), z.array(PostItemSchema));



