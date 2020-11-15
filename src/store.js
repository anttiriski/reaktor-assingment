import Vue from "vue";
import Vuex from "vuex";
import moment from "moment";

Vue.use(Vuex);

import { fetchFailedManufacturer } from "./services.js";

const store = new Vuex.Store({
  state: {
    products: {},
    manufacturers: {},
    uniqueManufacturers: [],
    latestFetch: {},
  },
  mutations: {
    updateCategory(state, props) {
      const category = props.category;
      const data = props.data;
      const currentTime = moment();

      state.products = { ...state.products, [category]: data };
      updateLatestFetch({ time: currentTime, parameter: category });
    },
    updateManufacturers(state, props) {
      const manufacturersData = props.data;

      manufacturersData.forEach((response) => {
        const manufacturer = response.config.data;
        const data = response.data.response;
        const currentTime = moment();

        if (data == "[]") {
          fetchFailedManufacturer(manufacturer);
        } else {
          state.manufacturers = {
            ...state.manufacturers,
            [manufacturer]: data,
          };
          updateLatestFetch({ time: currentTime, parameter: "manufacturers" });
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
    /** Returns "Error :(" if there is problem with the api,
     *  else returns the availability information of a product */
    getAvailability: (state) => (id, manufacturer) => {
      const manufacturerData = state.manufacturers[manufacturer];

      if (manufacturerData == "Failed") {
        return "Error :(";
      } else {
        const availability = manufacturerData.find(
          (product) => product.id == id.toUpperCase()
        ).DATAPAYLOAD;

        const regex = /(?<=E>)(.*?)(?=<\/I)/;
        return availability.match(regex)[0];
      }
    },
  },
});

/** Updates fetch-time for a category */
const updateLatestFetch = (props) => {
  const time = props.time;
  const parameter = props.parameter;

  store.state.latestFetch = {
    ...store.state.latestFetch,
    [parameter]: time,
  };
};

export default store;
