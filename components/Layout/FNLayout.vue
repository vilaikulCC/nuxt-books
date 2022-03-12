<template>
  <div>
    <FNHeader />
    <main>
      <div class="container">
        <slot name="book-list"></slot>
        <BooksList />
      </div>
    </main>
    <FNFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FNHeader from "@/components/Layout/FNHeader.vue";
import FNFooter from "@/components/Layout/FNFooter.vue";
import BooksList from "@/components/Content/BooksList.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBasketShopping);
Vue.component("font-awesome-icon", FontAwesomeIcon);

export default Vue.extend({
  name: "FNLayout",
  components: {
    FNHeader,
    FNFooter,
    BooksList,
  },
});
</script>

<style lang="scss" scoped>
  main {
    padding-top: $layout-gap;
    padding-bottom: $layout-gap;
  }
</style>
