import axios from "axios";
import store from "./store.js";
import moment from "moment";
const URL = "https://bad-api-assignment.reaktor.com/";

/** Fetches the category data, and stores is in vuex
 *  Checks for new manufacturers, and fetches availability data if needed.
 * */
export const fetchCategory = async (category) => {
  const lastFetch = store.state.latestFetch[category];
  const fiveMinutesAgo = moment().subtract(5, "minutes");
  const fetchNeeded = fiveMinutesAgo.isAfter(lastFetch);

  if (!(category in store.state.products) || fetchNeeded) {
    try {
      const response = await axios.get(URL + `products/${category}`);
      const categoryData = response.data;

      store.commit("updateCategory", {
        category: category,
        data: categoryData,
      });

      const uniqueManufacturers = [
        ...new Set(categoryData.map((item) => item.manufacturer)),
      ];

      const vuexManufacturers = JSON.parse(
        JSON.stringify(store.state.uniqueManufacturers)
      );

      // If new manufacturers are found, fetch them
      if (vuexManufacturers.sort() != uniqueManufacturers.sort()) {
        fetchManufacturers(uniqueManufacturers);
      }

      store.commit("updateUniqueManufacturers", {
        data: uniqueManufacturers,
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }
};

/** Executes parallel get-requests for every manufacturer in parameter array,
 *  stores the response in vuex
 */
export const fetchManufacturers = async (manufacturers) => {
  try {
    const promises = manufacturers.map((manuf) => {
      return axios.get(URL + `availability/${manuf}`, {
        data: manuf,
      });
    });

    const response = await Promise.all(promises);
    store.commit("updateManufacturers", {
      data: response,
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

/** A get-request for a single manufacturer,
 *  if the response from parallel request is empty */
export const fetchFailedManufacturer = (manufacturer) => {
  const MAX_RETRY = 5;
  let currentRetry = 0;

  console.log("Failed to fetch: ", manufacturer);

  const sendWithRetry = async () => {
    if (currentRetry < MAX_RETRY) {
      try {
        const response = await axios.get(URL + `availability/${manufacturer}`);
        const data = response.data.response;

        if (data == "[]") {
          currentRetry += 1;
          sendWithRetry();
        } else {
          store.commit("updateFailedManufacturer", {
            data: data,
            manufacturer: manufacturer,
          });
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      console.log("Retrieved several times but still failed...");
      store.commit("updateFailedManufacturer", {
        data: "Failed",
        manufacturer: manufacturer,
      });
    }
  };

  sendWithRetry();
};
