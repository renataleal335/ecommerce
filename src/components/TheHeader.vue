<template>
  <div class="header">
    <div>
      <h2>Hi, Renata</h2>

      <b-dropdown size="sm" text="Button text via Prop">
        <b-dropdown-item href="#">An item</b-dropdown-item>
        <b-dropdown-item href="#">Another item</b-dropdown-item>
      </b-dropdown>
    </div>

    <div class="mb-4 mr-2">
      
      <router-link to="checkout"
        >{{ cartItens.length }}<img class="ml-2" src="../assets/carrinho.svg"
      /></router-link>
      | icon
    </div>
  </div>
</template>
<script>
export default {
  name: "TheHeader",
  props: {
    cartItens: {
      type: Array,
    },
  },
  computed:{
     totalCarrinho() {
      let total = 0;
      if (this.cartItens.length) {
        this.cartItens.forEach((item) => {
          total += item.price;
        });
      }
      return total;
    },
  }
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0px 2px 4px rgba(30, 60, 90, 0.1);
}

a {
  text-decoration: none;
  color: black;
}
</style>
