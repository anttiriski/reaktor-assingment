<template>
  <div class="product">
    <div>{{ product.name }}</div>
    <div v-if="loading">Loading Stock...</div>
    <div v-else>{{ availability }}</div>
    <div>{{ product.color[0] }}</div>
    <div>${{ product.price }}</div>
    <div>{{ product.manufacturer }}</div>
  </div>
</template>

<script>
import store from "../store.js";

export default {
  props: {
    product: Object,
  },
  computed: {
    availability() {
      const id = this.product.id;
      const manufacturer = this.product.manufacturer;
      return store.getters.getAvailability(id, manufacturer);
    },
    loading() {
      const manufacturer = this.product.manufacturer;
      return !(manufacturer in store.state.manufacturers);
    },
  },
};
</script>

<style>
.product {
  display: flex;
  border-bottom: 2px rgb(255, 237, 211) solid;
}

.product div {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 48px;
  text-transform: uppercase;
}
</style>
