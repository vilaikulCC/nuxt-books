<template>
  <div class="container">
    <h1>{{ post.title.rendered }}</h1>
    <figure>
      <img
        :src="post._embedded['wp:featuredmedia'][0].source_url"
        alt=""
      />
    </figure>
    <p v-html="post.content.rendered" class="item-excerpt" />

    <p class="item-author">{{ post.acf.author }}</p>
    <p class="item-price">{{ Number(post.acf.price).toFixed(2) }}</p>
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
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import https from "https";

const baseURL = "http://booksapi.vilaikul.com/wp-json/wp/v2/";
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

<style lang="scss" scoped></style>
