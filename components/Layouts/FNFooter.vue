<template>
  <footer>
    <div class="container">
      <div class="data-footer">
        <div class="copyright">@2022 Vilaikul Books API</div>
      </div>
    </div>
  </footer>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "FNFooter",
});
</script>

<style lang="scss" scoped>
footer {
  background-color: $primary-color;
  max-height: $footer-height;
  .data-footer {
    height: $footer-height;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .copyright {
    color: $text-color-light;
  }
}
</style>
