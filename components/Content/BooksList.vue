<template v-slot:book-list>
  <div>
    <h1 class="page-title">All Books</h1>

    <div class="controls-item">
      <div>Filter: </div>
      <div>
        <p>Total : {{ totalsPage }} Items</p>
        <p />
      </div>
    </div>

    <BooksItem :items="booksList" />

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
.controls-item {
  display: grid;
  grid-template-columns: auto auto;
  margin-bottom: 20px;
  p {
    text-align: right;
  }
}
</style>
