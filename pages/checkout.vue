<template>
  <div class="container">
    <h1 class="page-title">ตะกร้าสินค้า</h1>
    <CheckoutList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CheckoutList from "~/components/Checkout/CheckoutList.vue";
export default Vue.extend({
  components: { CheckoutList },
});
</script>

<style lang="sss" scoped></style>
