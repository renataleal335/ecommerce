<template>
  <div class="container">
    <div class="row justify-content-start">
      <div class="col mt-4">
        <img :src="currentProduct.image" />
      </div>
      <div class="col">
        <p>{{ currentProduct.title }}</p>
        <p> Price : {{ currentProduct.price }}</p>
      </div>
      <div class="col">
        <p>quantidade de itens: {{ quantity }}</p>
         <p v-if="this.quantity === 1">Total: {{currentProduct.price}}</p>
        <p v-if="this.quantity > 1">Total: {{valueTotal}}</p>
        <b-button>-</b-button> <b-button @click="$emit('addItem')">+</b-button>
      </div>
      <div class="mt-4">
        <b-button @click="$emit('adcProduct')"> adc item </b-button>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    currentProduct: {
      type: Object,
    },
    quantity: {
      type: Number,
    },
    valueTotal:{
      type: Number,
    }
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
img {
  width: 95px;
  height: 126px;
  margin: 0 auto;
}
</style>