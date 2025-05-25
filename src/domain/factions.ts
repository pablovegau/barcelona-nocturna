import { getCollection, getEntry } from "astro:content";

const CHARACTER_COLLECTION = "factions";

/**
 * 
 * @returns all factions from the content collection.
 */
export async function getFactions() {
  return await getCollection(CHARACTER_COLLECTION);
}

/**
 * 
 * @returns the faction by id.
 */
export async function getFactionById(id: string) {
  return await getEntry(CHARACTER_COLLECTION, id);
}

/**
 * 
 * @returns the faction data by id.
 */
export async function getFactionDataById(id: string) {
  const faction = await getFactionById(id);

  return faction?.data;
}
