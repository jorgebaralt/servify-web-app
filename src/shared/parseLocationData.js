export const parseLocationData = (locationData) => {
    if (!locationData) { return null; } // Protection
    return [
        locationData.street,
        locationData.street ? ', ' : null,
        locationData.name, 
        locationData.name ? '. ' : null,
        locationData.city, 
        locationData.city ? ', ' : null,
        locationData.region, 
        locationData.region ? ' ' : null,
        locationData.postalCode,
    ].join('');
}