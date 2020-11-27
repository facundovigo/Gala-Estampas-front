import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        category: null,
        client: null,
        cardFlap: false,
        auth: false,
        recoveripass: null

    }
});