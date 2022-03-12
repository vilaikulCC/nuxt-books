<template>
  <div class="container">
    <BooksList />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BooksList from "@/components/Content/BooksList.vue";
export default Vue.extend({
  name: "IndexPage",
  components: {
    BooksList,
  },
});
</script>
