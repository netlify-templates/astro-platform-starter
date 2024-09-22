import { client } from '../utils/sanity-client';
import { SECTIONS } from './blocks';

const PAGE_QUERY_OBJ = `{
  _id,
  slug,
  title,
  sections[] ${SECTIONS}
}`;

export async function fetchData() {
    return await client.fetch(`*[_type == "page"] ${PAGE_QUERY_OBJ}`);
}

export async function getPageById(id) {
    return await client.fetch(`*[_type == "page" && _id == "${id}"] ${PAGE_QUERY_OBJ}[0]`);
}
