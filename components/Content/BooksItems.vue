<template>
  <div class="grid-books">
    <article v-for="(books, index) in items" :key="index" class="grid-item">
      <img :src="books._embedded['wp:featuredmedia'][0].source_url" alt="" />
      <h2>{{ books.title.rendered }}</h2>
      <!-- <p v-html="books.excerpt.rendered" class="item-excerpt" /> -->
      <p class="item-author">{{ books.acf.author }}</p>
      <p class="item-price">{{ Number(books.acf.price).toFixed(2) }}</p>

      <button
        type="button"
        class="btn btn-default btn-add-to-cart"
        v-if="books.acf.status !== 'outOfStock'"
      >
        <font-awesome-icon icon="fa-solid fa-basket-shopping" /> Add to Cart
      </button>
      <button
        type="button"
        class="btn btn-default btn-add-to-cart"
        v-else-if="books.acf.status === 'outOfStock'"
        disabled
      >
        <font-awesome-icon icon="fa-solid fa-basket-shopping" /> Out of stock
      </button>
      <!-- <a :href=""></a> -->
    </article>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    items: {
      type: [],
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
</style>
