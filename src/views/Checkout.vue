<template>
  <div class="container">
    <p><router-link to="/"> voltar </router-link> Meu carrinho</p>

    <div
      class="card-car mt-4"
      v-for="(item, index) in itens"
      :key="item.id"
      :value="item.id"
    >
      <div class="row justify-content-center">
        <div class="col ml-5 mt-4">
          <img class="ml-5" :src="item.image" />
        </div>
        <div class="col">
          <p>{{ item.title }}</p>

          <p>{{ item.price }}</p>

          <p>Quantidade: {{ item.quantidadeFinal }}</p>
          <p>Total: {{ item.valorFinal }}</p>

          <b-button @click="removeItem(index)"> - </b-button>
          <b-button @click.prevent="addItem(item.id)"> + </b-button>
        </div>
      </div>
    </div>
    <div class="container">
      <p>Detalhes do pagamento</p>
      <p> Número de itens: {{this.newQtd }} </p>
       
        <p> Subtotal: {{this.newTotal }} </p>
    </div>
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
    };
  },
  created() {
    this.itens = localStorage.getItem("itens")
      ? JSON.parse(localStorage.getItem("itens"))
      : [];
  },
  methods: {
    removeItem(index) {
      this.itens.splice(index, 1);
      localStorage.setItem("itens", JSON.stringify(this.itens));
    },

    addItem(id) {
      this.productId = this.itens.find((item) => item.id === id);
      this.productId.quantidadeFinal++;
      

      this.totalCart();
    },
    totalCart() {
      let total = this.productId.quantidadeFinal * this.productId.price;
      this.newQtd = this.productId.quantidadeFinal;
      this.newTotal = total;
      this.productId.valorFinal = this.newTotal;

      return this.productId.valorFinal;
    },
  },
  // decreaseCart() {
  //   if (this.quantity > 1) {
  //   }
  // },
};
</script>
<style scoped>
.card-car {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #00000029;
  border-radius: 4px;
  opacity: 1;
  width: 100%;
  display: table;
}

button {
  background: #fff;
  color: #0550a0;
}

button :hover {
  background: #fff;
}

p {
  white-space: nowrap;
}

img {
  width: 83px;
  height: 110px;
}
</style>