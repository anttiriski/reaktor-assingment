<template>
  <div class="center">
    <div v-if="loading" class="spinner">
      <LoadingAnimation />
    </div>
    <RecycleScroller
      v-else
      class="scroller"
      key-field="id"
      v-slot="{ item }"
      :items="products"
      :item-size="50"
      :buffer="1000"
    >
      <ListItem :key="item.id" :product="item" />
    </RecycleScroller>
  </div>
</template>

<script>
import { fetchCategory } from "../services.js";
import { RecycleScroller } from "vue-virtual-scroller";
import ListItem from "../components/ListItem.vue";
import LoadingAnimation from "../components/LoadingAnimation.vue";
import store from "../store.js";

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
      return !(this.$route.params.category in store.state.products);
    },
  },
  created() {
    fetchCategory(this.category);
  },
  components: {
    RecycleScroller,
    ListItem,
    LoadingAnimation,
  },
};
</script>

<style scoped>
.scroller {
  height: 82vh;
}

.header {
  text-align: center;
  text-transform: uppercase;
}
</style>
