export const IMAGE = `
  {
    "_id": image.asset->_id,
    "src": image.asset->url,
    "dimensions": image.asset->metadata.dimensions,
    "alt": alt,
  }
`;

export const SECTIONS = `{
  ...,
  _type == "featuredItems" => {
    items[] {
      ...,
      image ${IMAGE}
    }
  },
  _type == "hero" => {
    ...,
    image ${IMAGE}
  },
  _type == "quote" => {
    ...,
    author-> {
        _type,
        _id,
        name,
        title,
        image ${IMAGE},
    }
  },
}`;
