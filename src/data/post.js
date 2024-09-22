import { client } from '../utils/sanity-client';
import { IMAGE } from './blocks';

const POST_QUERY_OBJ = `{
  _id,
  slug,
  title,
  publishDate,
  author-> {
    _type,
    _id,
    name,
    title,
    image ${IMAGE},
  },
  excerpt,
  body,
  image ${IMAGE}
} | order(publishDate desc)`;

export async function fetchData() {
    return await client.fetch(`*[_type == "post"] ${POST_QUERY_OBJ}`);
}

export async function getPostById(id) {
    return await client.fetch(`*[_type == "post" && _id == "${id}"] ${POST_QUERY_OBJ}[0]`);
}
