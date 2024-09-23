export type BlobParameterProps = {
    seed: number;
    size: number;
    edges: number;
    growth: number;
    name: string;
    colors: string[];
};

export type BlobProps = {
    svgPath: string;
    parameters: BlobParameterProps;
};

export type Button = {
    _type?: string;
    label: string;
    url?: string;
}

export type CustomImage = {
    _id?: string;
    src: string;
    alt?: string;
    dimensions?: { height: number; width: number };
}

export type FeaturedItem = {
    heading?: string;
    body?: string;
    cta?: Button;
    image?: CustomImage;
}

export type FeaturedItems = Section & {
    heading?: string;
    body?: string;
    items?: Array<FeaturedItem>;
}

export type Hero = Section & {
    heading?: string;
    body?: string;
    cta?: Button;
    image?: CustomImage;
    layout?: 'imgLeft' | 'imgRight'
}

export type Page = {
    _id: string;
    slug: Slug;
    title: string;
    sections: Array<FeaturedItems | Hero | Quote>;
}

export type Person = {
    _id: string;
    name: string;
    title?: string;
    image?: CustomImage;
}

export type Post = {
    _id: string;
    slug: Slug;
    title: string;
    publishDate: string;
    author?: Person;
    excerpt?: string;
    image?: CustomImage;
    body?: string;
}

export type Quote = Section & {
    quote: string;
    author?: Person;
}

export type Section = {
    _type: string;
    background?: 'light' | 'primary' | 'transparent';
}

export type Slug = {
    current: string;
}
