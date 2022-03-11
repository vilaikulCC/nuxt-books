<template v-slot:book-list>
  <div>
    <h1>All Books</h1>
    <div class="grid-books">
      <article v-for="(books, index) in booksList" :key="index" class="grid-item">
        <h2>{{ books.title.rendered }}</h2>
        <p v-html="books.content.rendered" />
        <img :src="books._embedded['wp:featuredmedia'][0].source_url" alt="" />
      </article>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { Books } from "@/interface";

const baseURL = "http://booksapi.vilaikul.com/wp-json/wp/v2/";
export default Vue.extend({
  name: "BooksList",
  data() {
    return {
      booksList: [] as Books[],
    };
  },
  methods: {
    // async async() {
    //   const fetchBook = await axios.post('https://books17.p.rapidapi.com/works/subject',
    //   headers: {
    //       "content-type": "application/json",
    //       "x-rapidapi-host": "books17.p.rapidapi.com",
    //       "x-rapidapi-key": "1e5c02e3f1mshe8629fad46ed3b0p1c0fdajsn828d38e352f4",
    //     },
    //     data: { cursor: 1, subject: "Fiction" })

    //   // ).then(res => {

    //   console.log(fetchBook)
    //   // });
    //   // return { fecthBook };
    // },
    async fetchBookslist() {
      const fetchedBooksList = await axios
        .get(`${baseURL}books?_embed`)
        .then((response) => {
          console.log(response.data);
          this.booksList = response.data;
        });
    },
  },
  mounted() {
    this.fetchBookslist();
  },
});
</script>
