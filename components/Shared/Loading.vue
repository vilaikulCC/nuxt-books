<template>
  <div id="loading-body" :class="setLoading">
    <div>
      <font-awesome-icon icon="fas fa-hourglass-half" />
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
#loading-body {
  display: none;
}
#loading-body.is-active {
  display: block;
  // position: absolute;
  z-index: 1;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgb(255 255 255 / 90%);
}
#loading-body.is-active div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.2rem;
  margin-top: 50px;
  animation-duration: 4s;
  animation-name: loading;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes loading {
  0% {
    color: #b1d6eb;
  }
  33% {
    color: $accent-color;
  }
  50% {
    transform: rotate(180deg);
  }
  70% {
    color: lighten($accent-color, 15%);
  }
  100% {
    color: $accent-color;
    transform: rotate(360deg);
  }
}
</style>
