import axios from 'axios';
import axiosServices from '../../axios-services';
import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga'
import { servicesActions, servicesCreator } from '../actions';

export const servicesSagas = {
    servicesInit: function* () {
        try {
            let response = yield axios.get('http://ipinfo.io');
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
            response = yield axiosServices.get('/getPopularCategories');
            const topCategories = response.data;
            yield put(servicesActions.setTopCategories(topCategories));
            yield put(servicesCreator.topServicesByCategoriesHandler(topCategories));
        } catch (err) {
            console.log(err);
        }
    },
    setTopServicesByCategories: function* (action) {
        const topCategories = action.topCategories;
        const byCategories = {};
        yield console.log(topCategories);
        for (let i = 0; i < topCategories.length; i++) {
            const dbReference = topCategories[i].dbReference;
            const { data } = yield axiosServices.get('/getServices', { params: { category: dbReference } });
            byCategories[topCategories[i].title] = data;
        }
        yield put(servicesActions.setServices( { byCategories: byCategories } ));
    },
    setFilteredCategories: function* (action) {
        const categories = {
            ...action.prevCategories,
            [action.toggledCategory]: !action.prevCategories[action.toggledCategory]
        }
        yield put(servicesActions.setFilteredCategories(categories));
        yield delay(250); // To force asynchronous loading, 250ms. TODO This might be replaced by axios call to fetch services later on.
        yield put(servicesActions.setBIsDefault(!Object.values(categories).includes(true)));
    },
    resetFilteredCategories: function* () {
        yield put(servicesActions.resetCategories());
    }
}