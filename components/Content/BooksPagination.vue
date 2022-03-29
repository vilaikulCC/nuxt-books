<template>
  <div class="pagination">
    <button
      type="button"
      class="pagination-item"
      @click="onClickPreviousPage"
      :disabled="isFirstPage"
    >
      <font-awesome-icon icon="fa-solid fa-angle-left" />
    </button>
    <button
      type="button"
      v-for="len in totalPage"
      :key="len"
      class="pagination-item"
      :class="len === currentPage ? 'active' : ''"
      :disabled="len === currentPage"
      @click="onClickPage(len)"
    >
      {{ len }}
    </button>
    <button
      type="button"
      class="pagination-item"
      @click="onClickNextPage"
      :disabled="isLastPage"
    >
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    totalPage: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  computed: {
    isFirstPage() {
      return this.currentPage === 1;
    },
    isLastPage() {
      return this.currentPage === this.totalPage;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit("pageChanged", this.currentPage - 1);
    },
    onClickNextPage() {
      this.$emit("pageChanged", this.currentPage + 1);
    },
    onClickPage(page: Number) {
      this.$emit("pageChanged", page);
    },
  },
});
</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .pagination-item {
    height: 40px;
    width: 40px;
    margin: 5px;
    padding: 5px;
    background-color: transparent;
    color: $text-color;
    border: 1px solid $link-color;
    border-radius: 40px;
    &:hover {
      color: white;
      background-color: $link-color;
    }
    &.active {
      color: white;
      background-color: $link-color;
    }
  }
}
</style>
