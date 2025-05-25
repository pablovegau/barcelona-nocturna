import { type InferEntrySchema, type RenderedContent } from "astro:content";

export interface Character {
  id: string;
  body?: string;
  collection: "characters";
  data: InferEntrySchema<"characters">;
  rendered?: RenderedContent;
  filePath?: string;
}

export type Clan = {
  id: string;
  body?: string;
  collection: "clans";
  data: InferEntrySchema<"clans">;
  rendered?: RenderedContent;
  filePath?: string;
} | null | undefined;

export interface CharacterWithClan {
  original: Character,
  clan: Clan,
}