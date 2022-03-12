<template>
  <header>
    <div class="container">
      <div class="data-header">
        <img
          :src="require(`~/assets/imgs/chompu-logo.svg`)"
          alt=""
          id="site-logo"
        />
        <div class="menu">
          <button class="btn-icon btn-actions-cart">
            <font-awesome-icon icon="fa-solid fa-basket-shopping" />
            <p :class='countItems!==0 ? "isHasItem" : ""'></p>
          </button>
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
    align-content: center;
  }
  #site-logo {
    height: 40px;
  }
  .menu {
    display: flex;
    justify-content: end;
    .btn-icon {
      background: transparent;
      color: $default-color;
      border: 0;
      font-size: 16px;
      &.btn-actions-cart {
        position: relative;
        p.isHasItem {
          position: absolute;
          top: -2px;
          right: -12px;
          text-align: center;
          background-color: $noti-color;
          width: 20px;
          height: 20px;
          padding: 2px;
          border-radius: 20px;
          font-size: 0.85rem;
        }
      }
    }
  }
}
</style>
