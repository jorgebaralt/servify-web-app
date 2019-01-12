// axios
import axios from 'axios';
import axiosServices from '../../axios-services';
// Sagas
import { put } from 'redux-saga/effects';
import { servicesActions, servicesCreator } from '../actions';

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
            services.nearServices = response.data;
            response = yield axiosServices.get('/getNearService', { params: { currentLocation, distance: 500 } });
            services.topServices = response.data;
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
            byCategories[topCategories[i].title] = data;
        }
        yield put(servicesActions.setServices( { byCategories: byCategories } ));
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
        yield filteredServices = [].concat.apply([], filteredServices);
        yield put(servicesActions.setFilteredServices(filteredServices));
        yield put(servicesActions.setBIsDefault(!Object.values(categories).includes(true)));
    },
    resetFilteredCategories: function* () {
        yield put(servicesActions.resetCategories());
    }
}