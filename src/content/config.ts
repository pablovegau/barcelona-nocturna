import { z, defineCollection } from "astro:content";
// import { Schema } from "astro:schema";

// const characters = defineCollection({
//   type: "content",
//   schema: z.object({
//     altText: z.string().optional(),
//     clan: z.enum(["Banu Haqin", "Brujah", "Gangrel", "Malkavian", "Nosferatu", "Toreador", "Tremere", "Ventrue", "Caitiff"]),
//     cult: z.enum(["Anarquista", "Camarilla", "Sabbat", "Independiente"]),
//     image: z.string().optional(), // URL
//     name: z.string(),
//     nationality: z.string().optional(),
//     pattern: z.string(),
//   }),
// });

const posts = defineCollection({
  type: "content",
  schema: z.object({
    abstract: z.string(),
    publishDate: z.string(),
    sessionDate: z.string(),
    tags: z.array(z.string()),
    title: z.string(),
    isDraft: z.boolean(),
  }),
});

export const collections = {
  // characters,
  posts,
};
