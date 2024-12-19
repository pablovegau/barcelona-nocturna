import { z, defineCollection } from "astro:content";

const characters = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      altText: z.string().optional(),
      clan: z.enum(["Banu Haqin", "Brujah", "Gangrel", "Malkavian", "Nosferatu", "Toreador", "Tremere", "Ventrue", "Caitiff"]).optional(),
      coterie: z.string().optional(),
      cult: z.enum(["Anarquista", "Camarilla", "Sabbat", "Independiente", "unknown"]).optional(),
      image: image(),
      name: z.string(),
      nationality: z.string().optional(),
      pattern: z.string().optional(),
      race: z.enum(["Vástago", "Ghoul", "Mortal", "Garu"]).optional(),
      tags: z.array(z.string()).optional(),
    }),
});

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
  characters,
  posts,
};
