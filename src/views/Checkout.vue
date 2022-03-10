<template>
  <div class="section">
    <header>
      <p class="title-header mt-3">
        <router-link class="link" to="/">
          <b-icon
            class="icon ml-2"
            stacked
            icon="backspace"
            size="small"
            variant="primary"
          ></b-icon>
        </router-link>

        Meu carrinho
      </p>
    </header>

    <main class="container">
      <div
        class="card-car mt-4 text-center"
        v-for="(item, index) in itens"
        :key="item[index]"
        :value="item[index]"
      >
        <div class="container">
          <div class="row justify-content-end">
            <div class="col-lg col-sm-12">
              <img :alt="item.description" :src="item.image" />
            </div>
            <div class="col">
              <p class="title">{{ item.title }}</p>
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-8">
                    <b-button
                      class="button-item"
                      @click="decreaseCart(item.id)"
                    >
                      -
                    </b-button>

                    {{ item.finalQuantity }}

                    <b-button
                      class="button-item"
                      @click.prevent="addItem(item.id)"
                    >
                      +
                    </b-button>
                  </div>
                  <div class="col-6">
                    <p class="text text-center mt-3">
                      Total
                      <span class="title">
                        {{ item.finalValue }}
                      </span>
                    </p>
                  </div>
                  <div>
                    <button
                      @click.prevent="removeItem(index)"
                      type="button"
                      class="btn btn-outline-danger mt-3"
                    >
                      Remove items
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ml-3"></div>
      </div>

      <div class="container mt-5 mb-5">
        <p class="title-header text-center">Detalhes do pagamento</p>

        <div class="card-car text">
         
          <p class="col-6">Items: {{ newQtd }}</p>
          <br />
          <p class="col-6">Subtotal: {{ newTotal }}</p>
        </div>

        <b-button @click.prevent="finalizePurchase">
          Finalize purchase</b-button
        >
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: "Checkout",
  data() {
    return {
      itens: [],
      productId: null,
      newTotal: null,
      newQtd: null,
      total: null,
      quantity: null,
    };
  },
  created() {
    this.itens = localStorage.getItem("itens")
      ? JSON.parse(localStorage.getItem("itens"))
      : [];

      this.finalizePurchase();
  },

  methods: {
    removeItem(index) {
      this.itens.splice(index, 1);
      localStorage.setItem("itens", JSON.stringify(this.itens));
    },

    addItem(id) {
      this.productId = this.itens.find((item) => item.id === id);
      this.productId.finalQuantity++;

      this.totalCart();
    },
    decreaseCart(id) {
      this.productId = this.itens.find((item) => item.id === id);
      this.productId.finalQuantity--;
      this.totalDecrease();
    },
    totalCart() {
      let total = this.productId.finalQuantity * this.productId.price;
      this.newQtd = this.productId.finalQuantity;
      this.newTotal = total;
      this.productId.finalValue = this.newTotal;
      return this.newTotal;
    },
    totalDecrease() {
      let total = this.productId.finalQuantity * this.productId.price;
      this.newQtd = this.productId.finalQuantity;
      this.newTotal = total;
      this.productId.finalValue = this.newTotal;
      if (this.newTotal <= 0) {
        this.removeItem();
      }
      return this.newTotal;
    },

    finalizePurchase() {
      let total = 0;
      let qtd = 0;
      if (this.itens.length) {
        this.itens.forEach((item) => {
          total += item.finalValue;
          qtd += item.finalQuantity;
          this.newQtd = qtd;
          this.newTotal = total;
          return;
        });
      }
    },
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
.card-car {
  width: 100%;
  max-width: max-content;
  height: 100%;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #00000029;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 25px;
  opacity: 1;
  margin: 0 auto;
}

.link {
  text-decoration: none;
  color: black;
  list-style: none;
}

.float-div {
  display: flex;
  float: left;
}
.title {
  text-align: center;
  font-family: "Lato" sans-serif;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0px;
  color: #3b3f51;
}

.title-header {
  text-align: left;
  font-family: "Lato" sans-serif;
  font-weight: bold;
  font-size: 28px;
  letter-spacing: 0px;
  color: #3b3f51;
  opacity: 1;
  list-style: none !important;
  text-decoration: none !important;
}

.text {
  text-align: start;
  font-family: "Lato" sans-serif;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0px;
  color: #3b3f51;
}

.text-header a {
  list-style: none !important;
  text-decoration: none !important;
}

.icon {
  width: 20px;
  height: 20px;
  color: #3b3f51 !important;
}

.button-item {
  background: #ffffff 0% 0% no-repeat padding-box !important;
  box-shadow: 0px 2px 5px #26303c33 !important;
  border-radius: 4px !important;
  opacity: 1 !important;
  color: #0550a0 !important;
  border: none !important;
  width: max-content !important;
}

header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0px 2px 4px rgba(30, 60, 90, 0.1);
}

button :hover {
  background: #fff;
}

img {
  width: 83px;
  height: 110px;
}
</style>