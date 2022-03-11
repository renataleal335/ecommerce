<template>
  <div>
    <the-header :cartItens="cartItens"></the-header>
    <div class="container mt-5">
      <Busca :products="products" />
    </div>

    <div class="container mt-5">
      <div class="row justify-content-start">
        <div class="col">
          <h3 class="title">Products</h3>
        </div>
        <div class="col ml-4">
          <p class="text">Categories</p>
          <b-select v-model="selected">
            <option
              v-for="category in this.categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </b-select>
        </div>
      </div>
      <div></div>
    </div>

    <div class="text-center list-container mt-5 mb-4">
      <div
        class="container"
        v-for="product in products"
        :key="product.id"
        :value="product.id"
      >
        <div class="product-card">
          <p class="price-product">{{ product.price | filterPrice }}</p>
          <img :src="product.image" />
          <p class="small-text mt-2">{{ product.category }}</p>
          <b-button @click="getProduct(product.id)"> Purchase </b-button>
        </div>
      </div>
    </div>

    <b-modal ref="modalProduct" hide-header hide-footer>
      <modal-product
        :quantity="quantity"
        :valueTotal="valueTotal"
        @adcProduct="adcProduct"
        @addItem="addItem"
        @decrease="decrease"
        @hideModal="hideModal"
        :currentProduct="currentProduct"
      ></modal-product>
    </b-modal>
  </div>
</template>
<script >
import { api } from "@/service.js";
import TheHeader from "../components/TheHeader.vue";
import ModalProduct from "./ModalProduct.vue";
import Busca from "./Busca.vue";

export default {
  name: "ProductList",
  components: {
    TheHeader,
    ModalProduct,
    Busca,
  },
  data() {
    return {
      products: [],
      categories: [],
      cartItens: [],
      selected: this.value,
      currentProduct: {
        finalQuantity: 1,
        finalValue: 0,
      },
      quantity: 0,
      valueTotal: 0,
    };
  },
  filters: {
    filterPrice(value) {
      return value.toLocaleString("en-us", {
        style: "currency",
        currency: "USD",
      });
    },
  },
  methods: {
    totalCart() {
      if (this.quantity === 1) {
        let total = +this.currentProduct.price;
        this.valueTotal = total;
        this.currentProduct.finalValue = this.valueTotal;
        this.currentProduct.finalQuantity = this.quantity;
        return;
      } else {
        let total = this.quantity * this.currentProduct.price;
        this.valueTotal = +total;
        this.currentProduct.finalValue = this.valueTotal;
        this.currentProduct.finalQuantity = this.quantity;
        return;
      }
    },
    decreaseCart() {
      let total = this.quantity * this.currentProduct.price;
      this.valueTotal = -total;
      this.currentProduct.finalValue = this.valueTotal;

      return this.valueTotal;
    },
    getProducts() {
      api.get(this.url).then((response) => {
        this.products = response.data;
      });
    },
    getCategories() {
      api.get("/products/categories").then((response) => {
        this.categories = response.data;
      });
    },
    getProduct(id) {
      api.get(`/products/${id}`).then((response) => {
        this.currentProduct = response.data;
      });
      this.$refs.modalProduct.show();
    },
    checkStorage() {
      if (window.localStorage.itens) {
        this.cartItens = JSON.parse(localStorage.getItem("itens"));
      }
    },
    adcProduct() {
      const {
        id,
        title,
        price,
        image,
        finalValue,
        finalQuantity,
        description,
        category,
      } = this.currentProduct;
      this.cartItens.push({
        id,
        title,
        price,
        image,
        finalValue,
        finalQuantity,
        description,
        category,
      });
      this.quantity = 0;
      this.hideModal();
    },
    hideModal() {
      this.quantity = this.quantity;
      this.$refs.modalProduct.hide();
    },

    addItem() {
      this.quantity++;
      this.totalCart();
      this.currentProduct.finalQuantity = this.quantity;
      return;
    },
    decrease() {
      this.quantity--;
      this.decreaseCart();
      this.currentProduct.finalQuantity = this.quantity;
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
    cartItens() {
      localStorage.setItem("itens", JSON.stringify(this.cartItens));
    },
  },
  computed: {
    url() {
      let category = this.selected;
      if (category) {
        let apiEndpoint = `/products/category/${category}`;
        return apiEndpoint;
      } else {
        let apiEndpoint = "/products";
        return apiEndpoint;
      }
    },
  },
  mounted() {
    this.getProducts();
    this.getCategories();
    this.checkStorage();
  },
};
</script>
<style scoped>
.product-card {
  max-width: 100%;
  height: 100%;
  opacity: 1;
  box-shadow: 0px 2px 5px #00000029;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

img {
  max-width: 100%;
  height: 156px;
  margin: 0 auto;
}

.list-container {
  display: grid;
  grid-template-columns: repeat(2, 0.5fr);
  max-width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  grid-gap: 10px;
}

.price-product {
  text-align: left;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 0px;
  color: #3b3f51;
  opacity: 1;
}

.small-text {
  text-align: left;
  font-family: "Lato", sans-serif;
  font-size: 16px;
  color: #3b3f51;
  opacity: 1;
}

button {
  background: #00519d 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #26303c33;
  border-radius: 4px;
  opacity: 1;
  border: none !important;
  text-align: center;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
  opacity: 1;
  width: 50%;
  margin: 0 auto;
}

select {
  width: 176px;
  height: 48px;
  background: #ffffff !important;
  box-shadow: 0px 2px 5px #26303c33;
  border-radius: 4px;
  opacity: 1;
  text-align: left;
  letter-spacing: 0px;
  color: #3b3f51;
}
</style>

