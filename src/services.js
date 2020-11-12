import axios from "axios";
import store from "./store.js";

const URL = "https://bad-api-assignment.reaktor.com/";

export const fetchProducts = (category) => {
  if (category in store.state.products) {
    return;
  } else {
    axios
      .get(URL + `products/${category}`)
      .then((res) => {
        store.commit("updateCategory", {
          category: category,
          data: res.data,
        });

        const uniqueManufacturers = [
          ...new Set(res.data.map((item) => item.manufacturer)),
        ];

        if (
          uniqueManufacturers.length ==
          Object.values(store.state.uniqueManufacturers).length
        ) {
          store.getters.getProductArray;
        } else {
          fetchManufacturers(uniqueManufacturers);
        }

        store.commit("updateUniqueManufacturers", {
          data: uniqueManufacturers,
        });
      })
      .then(() => {
        console.log("haettu");
      });
  }
};

export const fetchManufacturers = (manufacturers) => {
  const promises = manufacturers.map((manuf) => {
    return axios.get(URL + `availability/${manuf}`, {
      data: manuf,
    });
  });

  Promise.all(promises)
    .then((result) => {
      store.commit("updateManufacturers", {
        data: result,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

export const fetchFailedManufacturer = (manufacturer) => {
  console.log("Failed to fetch: ", manufacturer);

  const sendWithRetry = () => {
    axios
      .get(URL + `availability/${manufacturer}`)
      .then((response) => {
        if (response.data.response == "[]") {
          sendWithRetry();
        } else {
          store.commit("updateFailedManufacturer", {
            data: response.data.response,
            manufacturer: manufacturer,
          });
        }
      })
      .catch((error) => console.log("Error: ", error));
  };

  sendWithRetry();
};
