<template>
  <div class="container">
    <div class="row justify-content-start">
      <div class="col-lg-11 col-sm-12">
        <input placeholder="search your product" />
      </div>
      <div class="col-lg col-sm-12">
        <b-icon
          class="icon mt-3"
          stacked
          icon="search"
          size="small"
          variant="primary"
        ></b-icon>
      </div>
    </div>
    
    <div class="card-list">
    
    </div>
  </div>
</template>
<script>
export default {
  name: "Busca",
  props: {
    products: {
      type: Array,
    },
  },
};
</script>
<style scoped>
input {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;

  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #26303c33;
  border: 1px solid #f2f6f9;
  opacity: 1;
}

img {
  width: 95px;
  height: 126px;
  margin: 0 auto;
}
.card-list{
    display: flex;
    flex-direction: row;
}
.card-busca {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #00000029;
  border-radius: 4px;
  opacity: 1;
  width: 100%;
  
}

.icon {
  width: 20px;
  height: 20px;
}

::placeholder {
  text-align: left;
  font-family: "Lato-Retgular" sans-serif;
  font-size: 14px;
  letter-spacing: 0px;
  color: #3b3f51;
  opacity: 1;
  filter: blur(0px);
}
</style>