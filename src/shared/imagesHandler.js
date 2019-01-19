export const setImagesArray = (servifyImages) => {
    if (!servifyImages) { return null }
    const array = [];
    servifyImages.forEach( image => {
        array.push(image.url);
    });
    return array;
}