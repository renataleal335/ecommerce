<template>
  <div class="home">
    <products-list></products-list>
  </div>
</template>

<script>
import ProductsList from "@/components/ProductsList.vue";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  components: {
    ProductsList,
  },
};
</script>
