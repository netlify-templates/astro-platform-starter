const allImages = import.meta.glob<{ default: ImageMetadata }>('/src/content/_images/*.{png,jpg,jpeg,webp,svg}');

export async function resolveImage(url: string | undefined) {
    if (!url) return;

    if (!(url in allImages)) {
        throw new Error(`Image "${url}" not found! Is there a typo?`);
    }

    const { default: image } = await allImages[url]();

    return image;
}
