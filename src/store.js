import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { fetchFailedManufacturer } from "./services.js";

const store = new Vuex.Store({
  state: {
    products: {},
    manufacturers: {},
    uniqueManufacturers: [],
    currentCategory: "",
  },
  mutations: {
    updateCategory(state, props) {
      state.products[props.category] = props.data.slice(0, 50);
    },

    updateManufacturers(state, props) {
      props.data.forEach((response) => {
        const manufacturer = response.config.data;
        if (response.data.response == "[]") {
          fetchFailedManufacturer(manufacturer);
        } else {
          state.manufacturers[manufacturer] = response.data.response;
        }
      });
      store.getters.getProductArray;
    },
    updateFailedManufacturer(state, props) {
      state.manufacturers[props.manufacturer] = props.data;
      store.getters.getProductArray;
    },
    updateListOfManufacturers(state, props) {
      state.uniqueManufacturers = props.data;
    },
    updateCurrentCategory(state, props) {
      state.currentCategory = props.currentCategory;
    },
  },
});

export default store;
