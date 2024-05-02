const allPageImages = import.meta.glob<{ default: ImageMetadata }>('/src/content/pages/_images/*.{png,jpg,jpeg,webp,svg}');

export async function resolveImage(url: string | undefined) {
    if (!url) return;

    if (!(url in allPageImages)) {
        throw new Error(`Image "${url}" not found! Is there a typo?`);
    }

    const { default: image } = await allPageImages[url]();

    return image;
}
