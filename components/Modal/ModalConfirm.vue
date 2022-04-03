<template>
  <div v-if="isShowModal" id="modal-confirm" role="dialog">
    <div class="modal">
      <div class="modal--card">
        <h4>
          {{ modalContent.title }}
        </h4>
        <p>{{ modalContent.description }}</p>
        <div class="modal--action">
          <button type="button" class="btn btn-outline-default">No</button>
          <button type="submit" class="btn btn-default">Yes</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    isShowModal: Boolean,
    modalContent: {
      type: Object,
    },
  },
});
</script>

<style lang="scss" scoped>
#modal-confirm {
  position: fixed;
  background: rgb(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &--card {
      background: $bg-color;
      box-shadow: 3px 3px 15px rgb(0, 0, 0, 0.05);
      width: 400px;
      padding: 30px;
      text-align: center;
      h4 {
      }
      p {
      }
    }
    &--action {
      text-align: center;
      margin-top: 20px;
      .btn {
        margin: 0 5px;
        min-width: 100px;
      }
    }
  }
}
</style>
