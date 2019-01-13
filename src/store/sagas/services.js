// axios
import axios from 'axios';
import axiosServices from '../../axios-services';
// Sagas
import { put } from 'redux-saga/effects';
import { servicesActions, servicesCreator } from '../actions';
// Arry sorting
import sort from '../../shared/sortArrayByKey';
import isArray from '../../shared/isArray';

export const servicesSagas = {
    servicesInit: function* () {
        try {
            let response = yield axios.get('https://ipinfo.io');
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
            console.log(err);
        }
        const response = yield axiosServices.get('/getPopularCategories');
        const topCategories = response.data;
        yield put(servicesActions.setTopCategories(topCategories));
        yield put(servicesCreator.topServicesByCategoriesHandler(topCategories));
    },
    setTopServicesByCategories: function* (action) {
        const topCategories = action.topCategories;
        const byCategories = {};
        for (let i = 0; i < topCategories.length; i++) {
            const dbReference = topCategories[i].dbReference;
            const { data } = yield axiosServices.get('/getServices', { params: { category: dbReference } });
            byCategories[topCategories[i].title] = yield sort(data, 'rating');
        }
        yield put(servicesActions.setServices( { byCategories: byCategories } ));
    },
    sortServices: function* (action) {
        yield console.log(action);
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