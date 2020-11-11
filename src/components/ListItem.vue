<template>
  <div class="flex mx-5 border-b-2 py-4 listItem">
    <div>{{ product.name }}</div>
    <div>{{ state.availability }}</div>
    <div class="flex relative">
      {{ product.color[0] }}
    </div>
    <div>${{ product.price }}</div>
    <div>{{ product.manufacturer }}</div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import ListItemColor from "./ListItemColor.vue";
export default {
  props: {
    product: Object,
  },
  setup(props) {
    const regex = /(?<=E>)(.*?)(?=<\/I)/;

    const state = reactive({
      loading: computed(() => "datapayload" in props.product),
      availability: computed(() => {
        if (state.loading) {
          return props.product.datapayload.match(regex)[0];
        }
      }),
    });

    return {
      state,
      ListItemColor,
    };
  },
};
</script>

<style>
.listItem div {
  width: 20%;
}

.product div {
  margin: 0.1rem 2rem;
}
</style>
