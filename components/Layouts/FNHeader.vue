<template>
  <header>
    <div class="container">
      <div class="data-header">
        <div class="start">
          <NuxtLink to="/"
            ><img
              :src="require(`~/assets/imgs/chompu-logo.svg`)"
              alt=""
              id="site-logo"
          /></NuxtLink>
        </div>

        <div class="end">
          <nav class="header-menu">
            <ul class="menu-list">
              <li>
                <NuxtLink to="/">Home</NuxtLink>
              </li>
            </ul>
          </nav>
          <NuxtLink to="/checkout" class="header-btn-icon btn-actions-cart">
            <font-awesome-icon icon="fa-solid fa-basket-shopping" />
            <p v-show="selectedItems.length !== 0" class="isHasItem">
              {{ selectedItems.length }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "Vuex";
import { SelectedItem } from "@/interface";

export default Vue.extend({
  name: "FNHeader",
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({selectedItems: 'books/GET_SELECTED_ITEM'}),

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
  .end {
    justify-self: end;
    display: flex;
    color: $default-color;
    a {
      color: $menu-link-color;
      &:hover {
        color: $menu-link-hover-color;
      }
    }
    nav {
      ul {
        li {
          list-style: none;
          a {
            text-decoration: none;
            padding-left: $menu-item-padding;
            padding-right: $menu-item-padding;
            font-weight: 600;
          }
        }
      }
    }

    .header-btn-icon {
      background: transparent;
      border: 0;
      font-size: 18px;
      &:first-of-type {
        margin-left: 15px;
      }
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
