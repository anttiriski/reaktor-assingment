<template>
  <div class="center">
    <div v-if="loading" class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
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

/* Loading animation below */
.spinner {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  animation-delay: -1s;
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}
</style>
