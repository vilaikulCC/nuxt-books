<template v-slot:book-list>
  <div></div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "BooksList",
  data() {
    return {
      Books: [],
    };
  },
  methods: {
    async fetchBookslist() {
      await fetch("https://books17.p.rapidapi.com/works/387215")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    },
  },
  mounted() {
    this.fetchBookslist();
  },
});
</script>
