// axios
import axios from 'axios';
import axiosServices from '../../axios-services';
// Sagas
import { put, call } from 'redux-saga/effects';
import { servicesActions, servicesCreator, usersActions } from '../actions';
// Worker functions
import sort from '../../shared/sortArrayByKey';
import isArray from '../../shared/isArray';
import { parseIpInfo } from '../../shared/parseIpInfo';

export const servicesSagas = {
    servicesInit: function* () {
        const response = yield axiosServices.get('/getPopularCategories');
        const topCategories = response.data;
        yield put(servicesActions.setTopCategories(topCategories));
        yield put(servicesCreator.topServicesByCategoriesHandler(topCategories));
        try {
            // Expiration date from local storage for ipInfo.io data.
            let ipInfoExpirationDate = new Date(localStorage.getItem('ipInfoExpirationDate'));
            const bIsExpired = ipInfoExpirationDate ? (new Date() >= ipInfoExpirationDate) : null;
            /**
             * If the token has expired, then set the user as null in local storage,
             * set the initial state userId as null and logout from Firebase and return.
             */
            if (bIsExpired) {
                let response = yield axios.get(['https://ipinfo.io?token=', ipInfoToken].join('')); // ipinfo token
                // If the fetch is successful then set a new ipInfo expiration date, avoiding a new fetch for 1 day time.
                ipInfoExpirationDate = yield new Date(new Date().getTime() + oneDayInMilliseconds); 
                yield localStorage.setItem('ipInfoExpirationDate', ipInfoExpirationDate);
                // Storing locationData in the database.
                const locationData = yield parseIpInfo(response.data);
                yield put(usersActions.usersSaveLocation(locationData));
                // Saving locationData inside the user's localStorage.
                yield localStorage.setItem('locationData', JSON.stringify(locationData));
                const coordinates = yield response.data.loc.split(",");
                const currentLocation = yield { 
                    latitude: Number(coordinates[0]),
                    longitude: Number(coordinates[1])
                };
                const services = {};
                response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 30 } });
                services.nearServices = yield sort(response.data, 'rating');
                response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 500 } });
                services.topServices = yield sort(response.data, 'rating');
                yield put(servicesActions.setServices(services));
            } else {
                /**
                 * If the token has not expired, parse the stored locationData to fetch near services.
                 */
                const data = yield JSON.parse(localStorage.getItem('locationData')); // ipinfo token
                yield put(usersActions.usersSaveLocation(data));
                const currentLocation = yield { 
                    latitude: Number(data.coordinates.latitude),
                    longitude: Number(data.coordinates.longitude)
                };
                const services = {};
                let response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 30 } });
                services.nearServices = yield sort(response.data, 'rating');
                response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 500 } });
                yield put(servicesActions.setServices(services));
                services.topServices = yield sort(response.data, 'rating');
                yield put(servicesActions.setServices(services));
            }  
        } catch (err) {
            if (navigator.geolocation) {
                try {
                    const getCurrentPosition = () => new Promise(
                        (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
                    );
                    const position = yield call(getCurrentPosition);
                    const currentLocation = { 
                        latitude: Number(position.coords.latitude),
                        longitude: Number(position.coords.longitude)
                    };
                    let response;
                    const services = {};
                    response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 30 } });
                    services.nearServices =  sort(response.data, 'rating');
                    response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 500 } });
                    services.topServices =  sort(response.data, 'rating');
                    yield put(servicesActions.setServices(services));
                    const locationData = yield {
                        coordinates: { ...currentLocation }
                    };
                    yield put(usersActions.usersSaveLocation(locationData));
                /**
                 * The block below will fetch ONLY top services in case the user has ad blockers,
                 * and the navigator.geolocation is unavailable for whatever reason.
                 */
                } catch {
                    // TODO: Figure out a way to handle fetching better in catch block later on.
                    // Centered in Orlando, FL for the time being
                    const currentLocation = { 
                        latitude: 28.538336,
                        longitude: -81.379234
                    };
                    const services = {};
                    const response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 500 } });
                    services.topServices =  sort(response.data, 'rating');
                    yield put(servicesActions.setServices(services));
                }
            /**
             * The block below will fetch ONLY top services in case the user has ad blockers,
             * and the navigator.geolocation is unavailable for whatever reason.
             */
            } else {
                // Centered in Orlando, FL
                const currentLocation = { 
                    latitude: 28.538336,
                    longitude: -81.379234
                };
                const services = {};
                const response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 500 } });
                services.topServices =  sort(response.data, 'rating');
                yield put(servicesActions.setServices(services));
            }
        }
    },
    setTopServicesByCategories: function* (action) {
        const topCategories = action.topCategories;
        const byCategories = {};
        for (let i = 0; i < topCategories.length; i++) {
            const dbReference = topCategories[i].dbReference;
            const { data } = yield axiosServices.get('/getServices', { params: { category: dbReference } });
            // Using title instead of dbReference because the category name will be rendered
            byCategories[topCategories[i].title] = yield sort(data, 'rating');
        }
        yield put(servicesActions.setServices( { byCategories: byCategories } ));
    },
    sortServices: function* (action) {
        const key = yield action.key;
        const services = yield action.services;
        for (let service in services) {
            if (!isArray(services[services])) { continue; }
            services[service] = yield sort(services[service], key);
        }
        yield put(servicesActions.setServices(services));
    },
    setFilteredCategories: function* (action) {
        const categories = yield {
            ...action.prevCategories,
            [action.toggledCategory]: !action.prevCategories[action.toggledCategory]
        }
        yield put(servicesActions.setFilteredCategories(categories));
        let filteredServices = yield [];
        for (let category in categories) {
            if (categories[category]) {
                const dbReference = yield category.toLocaleLowerCase().replace(" ", "_");
                const response = yield axiosServices.get('/getServices', { params: { category: dbReference } });
                // Set services 
                // Using title instead of dbReference because the category name will be rendered
                yield put(servicesActions.setServicesByCategory({ category: category, services: response.data }));
                if (response.data.length) {
                    yield filteredServices.push(response.data);
                }
            }
        }
        filteredServices = yield [].concat.apply([], filteredServices);
        filteredServices = yield sort(filteredServices, 'rating')
        yield put(servicesActions.setFilteredServices(filteredServices));
        yield put(servicesActions.setBIsDefault(!Object.values(categories).includes(true)));
    },
    resetFilteredCategories: function* () {
        yield put(servicesActions.resetCategories());
    }
}

// ipinfo.io public key token for SSL IP information fetching
const ipInfoToken = '746d3b0f51ffff';

/**
* Hours times seconds times milliseconds. 24 hours times 
* 3600 seconds, times 1000 milliseconds equals 1 day.
 */
const oneDayInMilliseconds = 24 * 3600 * 1000;