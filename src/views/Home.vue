<template>
  <div>
    {{ category }}
  </div>
</template>

<script>
export default {
  computed: {
    category() {
      return this.$route.params.category;
    },
  },
  methods: {},
};
</script>

<style></style>
