export const parseIpInfo = (ipInfo) => {
    const coordsArr = ipInfo.loc.split(',');
    const currentLocation = { 
        latitude: Number(coordsArr[0]),
        longitude: Number(coordsArr[1])
    };
    const locationData = {
        city: ipInfo.city,
        region: ipInfo.region,
        country: ipInfo.country,
        postal: ipInfo.postal,
        coordinates: currentLocation,
    }
    return locationData;
}
