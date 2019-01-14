const sort = (arr, key) => {
    return arr.sort( (b, a) => {
        return a[key] - b[key];
    });
}

export default sort;