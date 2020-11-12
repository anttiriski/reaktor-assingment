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
      const manufacturersData = props.data;
      manufacturersData.forEach((response) => {
        const manufacturer = response.config.data;
        const data = response.data.response;
        if (data == "[]") {
          fetchFailedManufacturer(manufacturer);
        } else {
          state.manufacturers = {
            ...state.manufacturers,
            [manufacturer]: data,
          };
        }
      });
    },
    updateFailedManufacturer(state, props) {
      const manufacturer = props.manufacturer;
      const data = props.data;

      state.manufacturers = {
        ...state.manufacturers,
        [manufacturer]: data,
      };
    },
    updateUniqueManufacturers(state, props) {
      state.uniqueManufacturers = props.data;
    },
  },
  getters: {
    getAvailability: (state) => (id, manufacturer) => {
      const productData = state.manufacturers[manufacturer].find(
        (product) => product.id == id.toUpperCase()
      );
      return productData.DATAPAYLOAD;
    },
  },
});

export default store;
