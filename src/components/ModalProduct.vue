<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <p class="card-title">{{ currentProduct.title }}</p>
      </div>
      <div class="text-center col mt-3">
        <img :src="currentProduct.image" />
      </div>
      <div class="col">
        <p class="text mt-3">
          Price : {{ currentProduct.price | filterPrice }}
        </p>
        <b-button
          :disabled="this.quantity === 0"
          class="button-modal mr-2"
          @click="$emit('decrease')"
        >
          -
        </b-button>
        <span style="padding: 10px" class="text-button mb-4"
          >{{ quantity }}
        </span>
        <b-button class="button-modal ml-2" @click="$emit('addItem')">
          +
        </b-button>
        <div class="mt-4">
          <p class="text" v-if="this.quantity === 1">
            Total:
            <span class="total">
              {{ currentProduct.price | filterPrice }}
            </span>
          </p>
          <p class="text" v-if="this.quantity > 1">
            Total: <span class="total"> {{ valueTotal | filterPrice }} </span>
          </p>
          <b-button
            style="margin: 10px"
            @click="$emit('hideModal')"
            variant="danger"
            >Cancel</b-button
          >
          <b-button
            :disabled="this.quantity === 0"
            variant="primary"
            @click="$emit('adcProduct')"
          >
            Purchase
          </b-button>
        </div>
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
      default: 1,
    },
    valueTotal: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  filters: {
    filterPrice(value) {
      return value.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>
<style scoped>
img {
  width: 95px;
  height: 126px;
  margin: 0 auto;
}

.button-modal {
  background: #ffffff 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 2px 5px #26303c33 !important;
  border-radius: 4px !important;
  opacity: 1 !important;
  color: #0550a0 !important;
  border: none !important;
  width: 50px !important;
}

.card-title {
  text-align: left;
  font-family: "Lato" sans-serif;
  font-weight: bold;
  letter-spacing: 0px;
  color: #3b3f51;
}

.text-button {
  text-align: center;
  font-family: "Lato" sans-serif;
  color: #3b3f51;
  opacity: 1;
}

.total {
  text-align: left;
  font-family: "Lato" sans-serif;
  font-weight: bold;
  color: #3b3f51;
}
.text {
  text-align: left;
  color: #3b3f51;
  font-family: "Lato" sans-serif;
  font-weight: normal;
  opacity: 1;
}

button {
  text-align: center !important;
  font-family: "Lato" sans-serif !important;
  font-weight: normal !important;
  letter-spacing: 0px !important;
  color: #ffffff !important;
  text-transform: uppercase !important;
  border: none !important;
}

button :hover {
  background: none !important;
}
</style>