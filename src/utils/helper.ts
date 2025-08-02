export const getAssetUrl = (path = 'Thumbnails') => {
    const appUrl = process.env.APP_URL ?? '';

    return `${appUrl}/uploads/${path}`;
}