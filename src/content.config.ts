import { glob } from 'astro/loaders';
import { defineCollection, z, reference } from 'astro:content';

const clans = defineCollection({
  loader: glob({
    pattern: 'src/content/clans/**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      name_es: z.string(),
      symbol: image(),
    }),
});

const factions = defineCollection({
  loader: glob({
    pattern: 'src/content/factions/**/*.md',
  }),
  schema: () =>
    z.object({
      slug: z.string(),
      name: z.string(),
      name_es: z.string(),
    }),
});

const characters = defineCollection({
  loader: glob({
    pattern: 'src/content/characters/**/*.{md,mdx}',
  }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      altText: z.string(),
      character_type: z.enum(['npc', 'pc']),
      clan: reference('clans').optional(),
      coterie: z.string().optional(),
      cult: z
        .enum([
          'anarchs',
          'camarilla',
          'sabbat',
          'independent',
          'autarkis',
          'unknown',
        ])
        .optional(),
      faction: reference('factions').optional(),
      description: z.string().optional(),
      hide: z.boolean(),
      image: image(),
      name: z.string(),
      nationality: z.string(),
      pattern: z.string(),
      race: z.enum(['kindred', 'ghoul', 'mortal', 'garou']),
      related_characters: z.array(z.string()).optional(),
      role: z.string().optional(), // TODO: this can be an array
      showInfo: z.boolean().optional(),
      status: z.enum(['dead', 'living', 'unlive']),
      tags: z.array(z.string()).optional(),
    }),
});

const posts = defineCollection({
  loader: glob({
    pattern: 'src/content/posts/**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    abstract: z.string(),
    publishDate: z.string(),
    sessionDate: z.string(),
    tags: z.array(z.string()),
    isDraft: z.boolean(),
  }),
});

export const collections = {
  characters,
  clans,
  factions,
  posts,
};
