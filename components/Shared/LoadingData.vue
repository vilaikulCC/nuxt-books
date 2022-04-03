<template>
  <div id="loading-data" :class="setLoading">
    <div class="loading-wrapper">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
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
}
.loading-wrapper {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  padding: 20px 20px 20px;
  border-radius: 5px;

  .circle {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: $accent-color;
  }

  .circle:nth-last-child(1) {
    animation: loading 0.6s 0.1s linear infinite;
  }

  .circle:nth-last-child(2) {
    animation: loading 0.6s 0.2s linear infinite;
  }

  .circle:nth-last-child(3) {
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
