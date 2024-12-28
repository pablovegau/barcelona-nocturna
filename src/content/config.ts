import { z, defineCollection } from "astro:content";

const characters = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      altText: z.string(),
      character_type: z.enum(["npc", "pc"]),
      clan: z.enum(["banu_haqin", "brujah", "caitiff", "gangrel", "hecata", "lasombra", "malkavian", "ministry", "nosferatu", "ravnos", "salubri", "thin_blood", "toreador", "tremere", "tzimisce", "ventrue",]).optional(),
      coterie: z.string().optional(),
      cult: z.enum(["anarchs", "camarilla", "sabbat", "independent", "autarkis", "unknown"]).optional(),
      description: z.string().optional(),
      hide: z.boolean(),
      image: image(),
      name: z.string(),
      nationality: z.string(),
      pattern: z.string(),
      race: z.enum(["kindred", "ghoul", "mortal", "garou"]),
      related_characters: z.array(z.string()).optional(),
      role: z.string().optional(), // TODO: this can be an array
      showInfo: z.boolean().optional(),
      status: z.enum(["dead", "living", "unlive"]),
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
