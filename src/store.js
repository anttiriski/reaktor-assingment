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
      state.products[props.category] = props.data;
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
  getters: {
    getAvailability: (state) => (id, manufacturer) => {
      const element = state.manufacturers[manufacturer].find(
        (element) => element.id == id.toUpperCase()
      );
      return element.DATAPAYLOAD;
    },
  },
});

export default store;
