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
            let response = yield axios.get('https://ipinfo.io?token=746d3b0f51ffff'); // ipinfo token
            const locationData = yield parseIpInfo(response.data);
            yield put(usersActions.usersSaveLocation(locationData));
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