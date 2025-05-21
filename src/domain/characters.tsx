import { getCollection, getEntry, type InferEntrySchema, type RenderedContent } from "astro:content";

const CHARACTER_COLLECTION = "characters";

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

/**
 * 
 * @returns all characters from the content collection.
 */
export async function getCharacters() {
  return await getCollection(CHARACTER_COLLECTION);
}

// TODO: MOVE THIS TO A clans.tsx FILE in the domain folder
/** 
 * This function returns the clan of an specific character.
 */ 
export async function getClan(character: Character) {
  const { clan: clanRawData } = character.data;

  if (!clanRawData) {
    return null;
  }

  const { collection, id } = clanRawData;

  const clan = await getEntry(collection, id);

  return clan?.data
}

/** 
 * This function returns a character data with the clan.
 */
async function getCharacterWithClan(character: Character) {
  const clan = await getClan(character);

  return {
    original: character,
    clan,
  };
}

/**
 * This function returns all characters with their clans.
 */
async function getCharactersWithClans() {
  const characters = await getCharacters();

  const charactersWithClans = await Promise.all(
    characters.map(async (character) => {
      return getCharacterWithClan(character);
    })
  );

  return charactersWithClans;
}

/**
 * This function returns all characters with their clans if the character is visible (hide === false).
 */
export async function getVisibleCharacters() {
  const characters = await getCharacters();

  return characters.filter(({ data }) => data.hide !== true);
}

/**
 * This function return an array with the Ids of the characters passed by parameter
 */
export function getCharactersIds(characters: Character[]) {
  return characters.map((character) => character.data.slug);
}

/**
 * This function return all characters matching the clan passed by parameter
 */
export async function getCharactersNamesFilteredByClan(clans: string[]) {
  const characters = await getVisibleCharacters();

  let characterIds = [];

  if (clans?.length > 0) {
    const filteredCharacters = 
      characters
        .filter(({ data }) => data.clan?.id && clans.includes(data.clan?.id));

    characterIds = getCharactersIds(filteredCharacters);
  } else {
    characterIds = getCharactersIds(characters);
  }

  return characterIds;
}
