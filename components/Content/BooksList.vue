<template>
  <section>
    <h2 class="section-title">สินค้าทั้งหมด</h2>

    <div class="controls-item">
      <div></div>
      <div>
        <p>รายการหนังสือ : {{ totalItems }} รายการ</p>
        <p />
      </div>
    </div>

    <BooksItem :items="booksList" />
    <BooksPagination
      :totalPage="totalPage"
      :currentPage="currentPage"
      @pageChanged="onPageChange"
    />
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import https from "https";
import BooksItem from "@/components/Content/BooksItems.vue";
import BooksPagination from "@/components/Content/BooksPagination.vue";

const baseURL = process.env.baseUrl;
export default Vue.extend({
  name: "BooksList",
  components: {
    BooksItem,
    BooksPagination,
  },
  data() {
    return {
      booksList: [],
      totalItems: 0 as number,
      currentPage: 1 as Number,
      totalPage: 0 as Number,
      showPages: 15 as number,
      loading: false as Boolean,
    };
  },
  computed: {
    // ...mapGetters({totalPage: 'getTotalPages'}),
  },
  methods: {
    async fetchTotalItems() {
      this.loading = true;
      const fetchedTotalPages = await axios
        .get(`${baseURL}books`)
        .then((response) => {
          this.totalItems = response.headers["x-wp-total"];
          this.loading = false;
        });
    },
    async fetchTotalPages() {
      this.loading = true;

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const fetchedTotalPages = await axios
        .get(`${baseURL}books`, { httpsAgent: agent })
        .then((response) => {

          this.totalPage = Math.ceil(this.totalItems / this.showPages);
          this.loading = false;
        });
    },
    async onPageChange(page: Number) {
      this.currentPage = page;
      this.fetchBookslist();
    },
    async fetchBookslist() {
      this.loading = true;

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const fetchedBooksList = await axios
        .get(
          `${baseURL}books?_embed&per_page=${this.showPages}&orderby=date&order=desc&page=${this.currentPage}`,
          { httpsAgent: agent }
        )
        .then((response) => {
          this.booksList = response.data;
        });
      this.loading = false;
    },
  },
  mounted() {
    this.fetchTotalItems();
    this.fetchTotalPages();
    this.fetchBookslist();
  },
});
</script>

<style lang="scss" scoped>
.controls-item {
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 20px;
  p {
    text-align: right;
  }
}
</style>
