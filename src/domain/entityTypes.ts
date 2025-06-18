import { getCollection } from "astro:content";

/** 
  * This function returns all entity types.
  *  
  */
export async function getEntityTypes() {
  return await getCollection('entityTypes');
}
