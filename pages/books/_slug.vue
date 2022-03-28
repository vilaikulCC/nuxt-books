<template>
  <div class="book-details-template">
    <div class="book-short-details">
      <div class="container">
        <div class="grid-box-1">
          <figure>
            <img
              :src="post._embedded['wp:featuredmedia'][0].source_url"
              alt=""
            />
          </figure>
        </div>
        <div class="grid-box-2">
          <h1>{{ post.title.rendered }}</h1>
          <p class="item-author">{{ post.acf.author }}</p>
          <div class="box-prices">
            <p class="item-price">
              {{ Number(post.acf.price).toFixed(2) }} บาท
            </p>
            <button
              type="button"
              class="btn btn-default btn-add-to-cart"
              v-if="post.acf.status !== 'outOfStock'"
              @click="addToCart(post)"
            >
              <font-awesome-icon icon="fa-solid fa-basket-shopping" />
              เพิ่มในตะกร้า
            </button>
            <button
              type="button"
              class="btn btn-default btn-add-to-cart"
              v-else-if="post.acf.status === 'outOfStock'"
              disabled
            >
              <font-awesome-icon icon="fa-solid fa-basket-shopping" /> สินค้าหมด
            </button>
          </div>
          <p v-html="post.excerpt.rendered" class="item-excerpt" />
        </div>
      </div>
    </div>
    <div class="book-full-details">
      <div class="container">
        <div class="grid-box-1"></div>
        <div class="grid-box-2">
          <p v-html="post.content.rendered" class="item-content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import https from "https";

const baseURL = process.env.baseUrl;
export default Vue.extend({
  async asyncData({ params }) {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });
    const slug = params.slug;
    const post = await axios
      .get(`${baseURL}books?_embed&slug=${slug}`, { httpsAgent: agent })
      .then((response) => response.data[0]);
    return { post };
  },
  methods: {
    addToCart(item: any) {
      console.log(`item ${item}`);
      let selectedBook = {
        id: item.id,
        title: item.title.rendered,
        price: item.acf.price,
        imageURL: item._embedded["wp:featuredmedia"][0].source_url,
      };
      this.$store.dispatch("books/ADD_SELECTED_ITEM", selectedBook);
    },
  },
});
</script>

<style lang="scss" scoped>
.book-details-template {
  .book-short-details,
  .book-full-details {
    .container {
      display: grid;
      grid-template-columns: 30% 70%;
      column-gap: 30px;
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }

  .book-full-details {
    background-color: lighten($default-color, 16%);
    margin-bottom: -40px;
  }

  .grid-box-1 {
    figure img {
      width: 100%;
    }
  }

  .grid-box-2 {
    width: 100%;
    .item-author {
      margin-bottom: 20px;
    }
    .box-prices {
      border: 1px solid $default-color;
      padding: 20px;
      margin-bottom: 20px;
      .item-price {
        font-weight: 500;
        font-size: 2rem;
        line-height: 2rem;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
