<template>
  <div class="header">
    <div>
      <h2 class="title">Hi, {{ user.name }}</h2>
      <b-dropdown variant="outline-primary" size="sm" text="Select Adress">
        <b-dropdown-item
          class="text"
          href="#"
          v-for="item in address"
          :key="item.street"
          :value="item.street"
          >{{ item.street }} n {{ item.number }}</b-dropdown-item
        >
      </b-dropdown>
    </div>
    <div class="mb-4 mr-4">
      <router-link class="mt-1 text" to="checkout"
        >{{ cartItens.length }}<img class="ml-2" src="../assets/carrinho.svg"
      /></router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
  data() {
    return {
      address: [
        { id: 1, street: "Rua Caieiras", number: "30" },
        { id: 2, street: "Rua Ferramenteiros", number: "50" },
      ],
      user: {
        name: "Dwight",
      },
    };
  },
  props: {
    cartItens: {
      type: Array,
    },
  },
  computed: {
    totalCarrinho() {
      let total = 0;
      if (this.cartItens.length) {
        this.cartItens.forEach((item) => {
          total += item.price;
        });
      }
      return total;
    },
  },
};
</script>

<style scoped>
img {
  max-width: 56px;
  height: 56px;
  margin: 0 auto;
}

.text {
  font-family:"Lato-Bold" sans-serif ;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 0px;
  color: #3b3f51;
}
.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0px 2px 4px rgba(30, 60, 90, 0.1);
}

.icon {
  width: 26px;
  height: 26px;
}

.text {
  text-align: left;
  font-family: "Lato-Bold" sans-serif;
  letter-spacing: 0px;
  color: #3b3f51;
  opacity: 1;
}
</style>
