<template>
  <div>
    <FNHeader />
    <main>
      <Nuxt />
    </main>
    <FNFooter />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FNHeader from "@/components/Layouts/FNHeader.vue";
import FNFooter from "@/components/Layouts/FNFooter.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBasketShopping, faPlus, faMinus ,faXmark  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBasketShopping, faPlus, faMinus, faXmark);
Vue.component("font-awesome-icon", FontAwesomeIcon);

export default Vue.extend({
  components: {
    FNHeader,
    FNFooter,
  },
});
</script>

<style lang="scss" scoped>
main {
  padding-top: $layout-gap;
  padding-bottom: $layout-gap;
  min-height: calc(100vh - ($header-height + $footer-height));
}
</style>
