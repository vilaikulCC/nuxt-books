<template v-slot:book-list>
  <div>
    <h1 class="page-title">All Books</h1>

    <div class="">Total : {{ totalsPage }} Items</div>

    <div class="grid-books">
      <!-- <BooksItem :items="booksList" /> -->
      <article
        v-for="(books, index) in booksList"
        :key="index"
        class="grid-item"
      >
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

    <BooksItem />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import { Books } from "@/interface";
import BooksItem from "@/components/Content/BooksItems.vue";

const baseURL = "http://booksapi.vilaikul.com/wp-json/wp/v2/";
export default Vue.extend({
  name: "BooksList",
  components: {
    BooksItem,
  },
  data() {
    return {
      booksList: [] as Books[],
      currentPage: 1 as Number,
      totalsPage: 0 as Number,
      showPages: 15 as Number,
      loading: false as Boolean,
    };
  },
  computed: {
    // ...mapGetters({totalsPage: 'getTotalPages'}),
  },
  methods: {
    async fetchTotalPages() {
      this.loading = true;
      const fetchedTotalPages = await axios
        .get(`${baseURL}books`)
        .then((response) => {
          this.totalsPage = response.headers["x-wp-total"];
          this.loading = false;
        });
    },
    async fetchBookslist() {
      this.loading = true;
      const fetchedBooksList = await axios
        .get(
          `${baseURL}books?_embed&per_page=${this.showPages}&orderby=date&order=desc&page=${this.currentPage}`
        )
        .then((response) => {
          console.log(response.data);
          this.booksList = response.data;
        });
      this.loading = false;
    },
  },
  mounted() {
    // this.fetchTotalPages();
    this.fetchBookslist();
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
