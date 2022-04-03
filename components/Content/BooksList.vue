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

    <LoadingData :isLoading="loading" />
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
import LoadingData from "../Shared/LoadingData.vue";
import { faL } from "@fortawesome/free-solid-svg-icons";

const baseURL = process.env.baseUrl;
export default Vue.extend({
  name: "BooksList",
  components: {
    BooksItem,
    BooksPagination,
    LoadingData,
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
  methods: {
    async fetchTotalItems() {
      const fetchedTotalPages = await axios
        .get(`${baseURL}books`)
        .then((response) => {
          this.totalItems = response.headers["x-wp-total"];
        });
    },
    async fetchTotalPages() {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const fetchedTotalPages = await axios
        .get(`${baseURL}books`, { httpsAgent: agent })
        .then((response) => {
          this.totalPage = Math.ceil(this.totalItems / this.showPages);
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
