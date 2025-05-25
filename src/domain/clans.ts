import { getCollection, getEntry } from "astro:content";
import type { Character, Clan, CharacterWithClan } from "./types";

const CHARACTER_COLLECTION = "clans";

/**
 * 
 * @returns all clans from the content collection.
 */
export async function getClans() {
  return await getCollection(CHARACTER_COLLECTION);
}

/**
 * 
 * @returns the clan by id.
 */
export async function getClanById(id: string) {
  return await getEntry(CHARACTER_COLLECTION, id);
}

/** 
 * This function returns the clan of an specific character.
 */ 
/* export async function getClan(character: Character) {
  const { clan: clanRawData } = character.data;

  if (!clanRawData) {
    return null;
  }

  const { collection, id } = clanRawData;

  const clan = await getEntry(collection, id);

  return clan?.data
} */

/**
 * 
 * @returns the clan data by id.
 */
export async function getClanDataById(id: string) {
  const clan = await getClanById(id);

  return clan?.data;
}
