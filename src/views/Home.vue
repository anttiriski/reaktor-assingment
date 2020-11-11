<template>
  <div>
    {{ category }}
  </div>
</template>

<script>
import store from "../store.js";
import { fetchProducts } from "../services.js";
export default {
  name: "Home",
  computed: {
    category() {
      return this.$route.params.category;
    },
    products() {
      return store.state.products[this.category];
    },
    loading() {
      return this.category in store.state.products ? false : true;
    },
  },
  mounted() {
    fetchProducts(this.category);
  },
};
</script>

<style>
.list {
  display: flex;
  margin: 2rem 1rem 0rem;
}

.list div {
  font-size: 1.7rem;
  font-weight: bold;
  width: 20%;
}
</style>
