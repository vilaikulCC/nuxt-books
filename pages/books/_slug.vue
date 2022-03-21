<template>
  <div class="container">
    <h1>{{ this.content.title.rendered }}</h1>
    <figure>
      <img
        :src="this.content._embedded['wp:featuredmedia'][0].source_url"
        alt=""
      />
    </figure>
    <p v-html="this.content.content.rendered" class="item-excerpt" />

    <p class="item-author">{{ this.content.acf.author }}</p>
    <p class="item-price">{{ Number(this.content.acf.price).toFixed(2) }}</p>
    <button
      type="button"
      class="btn btn-default btn-add-to-cart"
      v-if="this.content.acf.status !== 'outOfStock'"
      @click="addToCart(this.content)"
    >
      <font-awesome-icon icon="fa-solid fa-basket-shopping" />
      เพิ่มในตะกร้า
    </button>
    <button
      type="button"
      class="btn btn-default btn-add-to-cart"
      v-else-if="this.content.acf.status === 'outOfStock'"
      disabled
    >
      <font-awesome-icon icon="fa-solid fa-basket-shopping" /> สินค้าหมด
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

const baseURL = "http://booksapi.vilaikul.com/wp-json/wp/v2/";
export default Vue.extend({
  async asyncData({ params }) {
    const slug = params.slug;
    const content = await axios
      .get(`${baseURL}books?_embed&slug=${slug}`)
      .then((response) => response.data[0]);
    console.log(content);
    return { content };
  },
  methods: {
    addToCart(item: any) {
      console.log(`item ${item}`)
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
