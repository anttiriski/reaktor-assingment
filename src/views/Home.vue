<template>
  <div>
    {{ category }}
    <div v-if="loading">LOADING...</div>
    <RecycleScroller
      v-else
      class="scroller"
      :items="products"
      :item-size="32"
      key-field="id"
      v-slot="{ item }"
    >
      <ListItem :key="item.id" :product="item" />
    </RecycleScroller>
  </div>
</template>

<script>
import store from "../store.js";
import { fetchProducts } from "../services.js";
import { RecycleScroller } from "vue-virtual-scroller";
import ListItem from "../components/ListItem.vue";

export default {
  name: "Home",
  computed: {
    category() {
      return this.$route.params.category;
    },
    products() {
      return store.getters.getProducts(this.category);
    },
    loading() {
      return !(this.$route.params.category in store.state.products);
    },
  },
  mounted() {
    fetchProducts(this.category);
  },
  components: {
    RecycleScroller,
    ListItem,
  },
};
</script>

<style scoped>
.scroller {
  height: 88vh;
}

.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
