import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { fetchFailedManufacturer } from "./services.js";

const store = new Vuex.Store({
  state: {
    products: {},
    manufacturers: {},
    uniqueManufacturers: [],
    updates: {},
  },
  mutations: {
    updateCategory(state, props) {
      const category = props.category;
      const data = props.data;
      state.products = { ...state.products, [category]: data };
    },
    updateManufacturers(state, props) {
      props.data.forEach((response) => {
        const manufacturer = response.config.data;
        if (response.data.response == "[]") {
          fetchFailedManufacturer(manufacturer);
        } else {
          state.manufacturers = {
            ...state.manufacturers,
            [manufacturer]: response.data.response,
          };
        }
      });
    },
    updateFailedManufacturer(state, props) {
      state.manufacturers = {
        ...state.manufacturers,
        [props.manufacturer]: props.data,
      };
    },
    updateListOfManufacturers(state, props) {
      state.uniqueManufacturers = props.data;
    },
  },
  getters: {
    getAvailability: (state) => (id, manufacturer) => {
      const element = state.manufacturers[manufacturer].find(
        (element) => element.id == id.toUpperCase()
      );
      return element.DATAPAYLOAD;
    },
    getProducts: (state) => (category) => {
      return state.products[category];
    },
  },
});

export default store;
