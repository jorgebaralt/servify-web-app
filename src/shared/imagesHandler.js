export const setImagesArray = (servifyImages) => {
    if (!servifyImages) { return [] }
    const array = [];
    servifyImages.forEach( image => {
        array.push(image.url);
    });
    return array;
}

export const setImagesInfo = (imagesArray, imagesInfo) => {
    const updatedImagesInfo = [];
    const oldImagesInfo = [...imagesInfo];
    imagesArray.forEach((imageURL, newIndex) => {
        for (let i = 0; i < oldImagesInfo.length; i++) {
            const image = oldImagesInfo[i];
            if (imageURL === image.url) {
                updatedImagesInfo.push(image);
                oldImagesInfo.splice(i, 1);
                continue;
            }
        }
    });
    return updatedImagesInfo;
}