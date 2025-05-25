import { getCollection } from "astro:content";

/** 
  * This function returns all posts from the content collection.
  * @returns 
  */
export async function getPosts() {
  return await getCollection('posts');
}
