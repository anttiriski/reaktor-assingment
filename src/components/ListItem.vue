<template>
  <div class="product">
    <div>{{ product.name }}</div>
    <div>{{ availability }}</div>
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
    active: Boolean,
  },
  computed: {
    availability() {
      const id = this.product.id;
      const manufacturer = this.product.manufacturer;
      const datapayload = store.getters.getAvailability(id, manufacturer);

      const regex = /(?<=E>)(.*?)(?=<\/I)/;
      return datapayload.match(regex)[0];
    },
  },
  created() {
    this.availability;
  },
};
</script>

<style>
.product {
  display: flex;
}

.product div {
  width: 20%;
}
</style>
