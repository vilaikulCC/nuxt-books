<template>
  <div id="app">
    <FNLayout />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FNLayout from "@/components/Layout/FNLayout.vue"

export default Vue.extend({
  name: "IndexPage",
  components: {
    FNLayout
  }
});
</script>
