<template>
  <div class="container">
    <FNHeader />
    <main><slot name="book-list"></slot> <BooksList /></main>
    <FNFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FNHeader from "@/components/Layout/FNHeader.vue";
import FNFooter from "@/components/Layout/FNFooter.vue";
import BooksList from "@/components/Content/BooksList.vue";

export default Vue.extend({
  name: "FNLayout",
  components: {
    FNHeader,
    FNFooter,
    BooksList,
  },
});
</script>
