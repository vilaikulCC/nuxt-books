<template>
  <section class="grid-books">
    <div v-for="(item, index) in items" :key="index" class="grid-item">
      <img :src="item._embedded['wp:featuredmedia'][0].source_url" alt="" />
      <h2>{{ item.title.rendered }}</h2>
      <!-- <p v-html="item.excerpt.rendered" class="item-excerpt" /> -->
      <p class="item-author">{{ item.acf.author }}</p>
      <p class="item-price">{{ Number(item.acf.price).toFixed(2) }}</p>

      <button
        type="button"
        class="btn btn-default btn-add-to-cart"
        v-if="item.acf.status !== 'outOfStock'"
        @click="addToCart(item)"
      >
        <font-awesome-icon icon="fa-solid fa-basket-shopping" />
        เพิ่มในตะกร้า
      </button>
      <button
        type="button"
        class="btn btn-default btn-add-to-cart"
        v-else-if="item.acf.status === 'outOfStock'"
        disabled
      >
        <font-awesome-icon icon="fa-solid fa-basket-shopping" /> สินค้าหมด
      </button>
      <!-- <a :href=""></a> -->
    </div>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import Vuex from "vuex";
import { Book } from "~/interface";

export default Vue.extend({
  props: {
    items: {
      type: [],
    },
  },
  methods: {
    addToCart(item: any) {
      let selectedBook = {
        id: item.id,
        title: item.title.rendered,
        price: item.acf.price,
      };
      this.$store.dispatch("books/ADD_SELECTED_ITEM", selectedBook);
    },
  },
});
</script>
<style lang="scss" scoped>
.grid-books {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;

  .grid-item {
    background-color: #ffffff;
    text-align: center;
    h2 {
      text-align: center;
      padding: 10px 20px 10px;
    }
    img {
      max-width: 100%;
    }
    .item-excerpt {
      padding: 0 20px 10px;
      ::v-deep p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .item-author {
      text-align: center;
    }

    .item-price {
      text-align: center;
    }
    .btn-add-to-cart {
      display: block;
      margin: 20px auto;
    }
    .btn-add-to-cart:disabled {
    }
  }
}

@media screen and (max-width: 1200px) {
}
@media screen and (max-width: 900px) {
  .grid-books {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media screen and (max-width: 600px) {
  .grid-books {
    grid-template-columns: 1fr;
  }
}
</style>
