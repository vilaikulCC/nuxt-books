<template>
  <header>
    <div class="container">
      <div class="data-header">
        <NuxtLink to="/"
          ><img
            :src="require(`~/assets/imgs/chompu-logo.svg`)"
            alt=""
            id="site-logo"
        /></NuxtLink>

        <div class="menu">
          <NuxtLink to="/cart" class="btn-icon btn-actions-cart">
            <font-awesome-icon icon="fa-solid fa-basket-shopping" />
            <p v-show="countItems !== 0" class="isHasItem">{{ countItems }}</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FNHeader",
  data() {
    return {
      countItems: 0 as Number,
    };
  },
});
</script>

<style lang="scss" scoped>
header {
  background-color: $primary-color;
  max-height: 80px;
  .data-header {
    display: grid;
    grid-template-columns: auto auto;
    height: 80px;
    align-items: center;
  }
  #site-logo {
    height: 40px;
  }
  .menu {
    justify-self: end;
    .btn-icon {
      background: transparent;
      color: $default-color;
      border: 0;
      font-size: 18px;
      &.btn-actions-cart {
        position: relative;
        p.isHasItem {
          position: absolute;
          top: -5px;
          right: -15px;
          text-align: center;
          background-color: $noti-color;
          width: 22px;
          height: 22px;
          padding: 2px;
          border-radius: 22px;
          font-size: 0.9rem;
          line-height: 1rem;
        }
      }
    }
  }
}
</style>
