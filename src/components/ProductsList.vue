<template>
  <div>
    <the-header :cartItens="cartItens"></the-header>

    <div class="container mt-5">
      <div class="row justify-content-start">
        <div class="col-1">
          <p class="product-title">Products</p>
        </div>
        <div class="col">
          <b-select v-model="selected">
            <option
              v-for="category in this.categories"
              :key="category.value"
              placeholder="Selecione uma categoria"
            >
              {{ category }}
            </option>
          </b-select>
        </div>
      </div>
    </div>

    <div
      class="container-list mt-5"
      v-for="product in products"
      :key="product.id"
      :value="product.id"
    >
      <div class="row justify-content-center">
        <div class="col-4">
          <div class="product-card">
            <p>{{ product.price }}</p>
            <img :src="product.image" />

            <p class="mt-2">{{ product.title }}</p>
            <p>{{ product.category }}</p>

            <b-button @click="getProduct(product.id)"> ADICIONAR</b-button>
          </div>
        </div>
      </div>
    </div>
    <b-modal :title="currentProduct.title" ref="modalProduct" hide-footer>
      <modal-product
        :quantity="quantity"
        :valueTotal="valueTotal"
        @adcProduct="adcProduct"
        @addItem="addItem"
        :currentProduct="currentProduct"
      ></modal-product>
    </b-modal>
  </div>
</template>
<script >
import { api } from "@/service.js";
import TheHeader from "../components/TheHeader.vue";
import ModalProduct from "./ModalProduct.vue";

export default {
  name: "ProductList",
  components: {
    TheHeader,
    ModalProduct,
  },
  data() {
    return {
      products: [],
      categories: [],
      cartItens: [],
      selected: this.value,
      currentProduct: {
        quantidadeFinal: null,
        valorFinal: null,
      },
      quantity: 1,
      valueTotal: 0,
    };
  },
  methods: {
    totalCart() {
      if (this.quantity === 1) {
        this.valueTotal = this.currentProduct.price;
        this.currentProduct.valorFinal = this.quantity;
        return this.valueTotal;
      } else {
        let total = this.quantity * this.currentProduct.price;
        this.valueTotal = +total;
        this.currentProduct.valorFinal = this.valueTotal;
        console.log(this.currentProduct.valorFinal);
        return this.valueTotal;
      }
    },
    decreaseCart() {
      if (this.quantity > 1) {
      }
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
      const { id, title, price, image, valorFinal, quantidadeFinal } =
        this.currentProduct;
      this.cartItens.push({
        id,
        title,
        price,
        image,
        valorFinal,
        quantidadeFinal,
      });
      console.log(this.cartItens);

      this.hideModal();
    },
    hideModal() {
      this.$refs.modalProduct.hide();
    },

    addItem() {
      this.quantity++;
      this.totalCart();
      this.currentProduct.quantidadeFinal = this.quantity;
      console.log(this.currentProduct.quantidadeFinal);
    },
    decrease() {
      this.quantity--;
      this.totalCart();
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
  top: 505px;
  left: 34px;
  width: 170px;
  height: max-content;
  opacity: 1;
  box-shadow: 0px 2px 5px #00000029;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 10px;
}

img {
  width: 95px;
  height: 126px;
  margin: 0 auto;
}

.container-list {
  display: flex;
  flex-direction: row (2);
}

button {
  text-align: center;
  background: #00519d 0% 0% no-repeat padding-box;
  letter-spacing: 0px;
  color: #ffffff;
  text-transform: uppercase;
  opacity: 1;
  font-family: "Lato", sans-serif;
}

select {
  top: 418px;
  left: 219px;
  width: 176px;
  height: 48px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #26303c33;
  border-radius: 4px;
  opacity: 1;
}

.section {
  display: flex;
  text-align: left;
  font-family: "Lato", sans-serif;
  letter-spacing: 0px;
  color: #3b3f51;
  opacity: 1;
}

.product-title {
  text-align: left;
  font: " Lato-Bold" sans-serif;
  letter-spacing: 0px;
  color: #503b51;
  opacity: 1;
}
</style>

