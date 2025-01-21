import { defineCollection, z } from 'astro:content';

export const CLANS = {
  'banu-haqim': 'Banu Haqim',
  brujah: 'Brujah',
  caitiff: 'Caitiff',
  gangrel: 'Gangrel',
  hecata: 'Hecata',
  lasombra: 'Lasombra',
  malkavian: 'Malkavian',
  ministry: 'Ministry',
  nosferatu: 'Nosferatu',
  ravnos: 'Ravnos',
  salubri: 'Salubri',
  'thin-blood': 'Thin Blood',
  toreador: 'Toreador',
  tremere: 'Tremere',
  tzimisce: 'Tzimisce',
  ventrue: 'Ventrue',
} as const;

const CLAN_VALUES = Object.keys(CLANS) as [
  keyof typeof CLANS,
  ...Array<keyof typeof CLANS>,
];

const characters = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      altText: z.string(),
      character_type: z.enum(['npc', 'pc']),
      clan: z.enum(CLAN_VALUES).optional(),
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

const clans = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      symbol: image(),
    }),
});

const posts = defineCollection({
  type: 'content',
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
  clans,
  posts,
};
