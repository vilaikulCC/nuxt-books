<template>
  <div id="loading-data" :class="setLoading">
    <div class="loading-wrapper">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    isLoading: {
      type: Boolean,
    },
  },
  computed: {
    setLoading() {
      return this.isLoading ? "is-active" : "";
    },
  },
});
</script>

<style lang="scss" scoped>
#loading-data {
  display: none;
}
#loading-data.is-active {
  display: block;
  z-index: 1;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(255 255 255 / 90%);
}
.loading-wrapper {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  padding: 20px 20px 20px;
  border-radius: 5px;

  .line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: $accent-color;
  }

  .line:nth-last-child(1) {
    animation: loading 0.6s 0.1s linear infinite;
  }

  .line:nth-last-child(2) {
    animation: loading 0.6s 0.2s linear infinite;
  }

  .line:nth-last-child(3) {
    animation: loading 0.6s 0.3s linear infinite;
  }
}
@keyframes loading {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 15px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
