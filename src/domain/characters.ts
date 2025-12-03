import { getCollection, getEntry } from 'astro:content';
import type { Character } from './types';

import { getClanDataById } from './clans';
import { getFactionDataById } from './factions';

const CHARACTER_COLLECTION = 'characters';

/**
 *
 * @returns all characters from the content collection.
 */
export async function getCharacters() {
  return await getCollection(CHARACTER_COLLECTION);
}

/**
 * This function returns the data for multiple characters by their IDs.
 * @param  ids - An array of character IDs.
 *
 * @returns An array of character data objects that match the provided IDs.
 */
export async function getCharactersById(ids: string[]) {
  const characters = await Promise.all(
    ids.map(async (id) => {
      const character = await getEntry(CHARACTER_COLLECTION, id);
      return character;
    }),
  );

  return characters.filter(
    (character): character is NonNullable<typeof character> =>
      character !== undefined,
  );
}

/**
 * This function returns a character data with the clan.
 */
async function getCharacterWithReferencedData(character: Character) {
  const clan = character.data.clan?.id
    ? await getClanDataById(character.data.clan?.id)
    : undefined;

  const faction = character.data.faction?.id
    ? await getFactionDataById(character.data.faction.id)
    : undefined;

  return {
    original: character,
    clan,
    faction,
  };
}

/**
 * This function returns all characters with their clans.
 */
export async function getCharactersWithReferencedData() {
  const characters = await getCharacters();

  const charactersWithClans = await Promise.all(
    characters.map(async (character) => {
      return getCharacterWithReferencedData(character);
    }),
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
    const filteredCharacters = characters.filter(
      ({ data }) => data.clan?.id && clans.includes(data.clan?.id),
    );

    characterIds = getCharactersIds(filteredCharacters);
  } else {
    characterIds = getCharactersIds(characters);
  }

  return characterIds;
}

export async function getCharactersNamesFiltered(
  clans: string[],
  entityTypes: string[],
  selectedFactions: string[],
) {
  const characters = await getVisibleCharacters();

  const filteredCharacters = characters.filter(({ data }) => {
    const matchesEntityType =
      entityTypes.length === 0 ||
      (data.entityType?.id && entityTypes.includes(data.entityType.id));
    const matchesClan =
      clans.length === 0 || (data.clan?.id && clans.includes(data.clan.id));
    const matchesFaction =
      selectedFactions.length === 0 ||
      (data.faction?.id && selectedFactions.includes(data.faction.id));

    return matchesEntityType && matchesClan && matchesFaction;
  });

  return getCharactersIds(filteredCharacters);
}
