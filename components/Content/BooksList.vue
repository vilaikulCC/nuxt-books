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
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import axios from "axios";
import https from "https";
import BooksItem from "@/components/Content/BooksItems.vue";

const baseURL = process.env.baseUrl;
export default Vue.extend({
  name: "BooksList",
  components: {
    BooksItem,
  },
  data() {
    return {
      booksList: [],
      totalItems: 0 as Number,
      currentPage: 1 as Number,
      totalPage: 0 as Number,
      showPages: 15 as Number,
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
        .get(`${baseUrl}books`)
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
          this.totalPage = response.headers["x-wp-totalpages"];
          this.loading = false;
        });
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
          console.log(response.data);
          this.booksList = response.data;
        });
      this.loading = false;
    },
  },
  mounted() {
    this.fetchTotalItems();
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
