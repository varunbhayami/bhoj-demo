import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

import mutations from './mutations';
import createState from './createState';

Vue.use(Vuex);
const state = {
    globalSetting: [],
    userData: null,
    cuisinelist: [],
    delivery_menu: []
};

export const createStore = initialState => new Vuex.Store({
    state: createState(initialState),
    plugins: [],
    mutations: {
        ...mutations,
    },
    actions,
    getters
});

export default createStore();
