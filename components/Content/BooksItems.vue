<template>

</template>
<script lang="ts">
import Vue from "vue";
import { Books } from "@/interface";

export default Vue.extend({
  data() {
    return {
      booksList: [] as Books[],
    };
  },

  props: {
    items: {} as Object,
  },
});
</script>
