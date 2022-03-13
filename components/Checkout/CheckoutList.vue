<template>
  <div>
    <div v-if="selectedItems.length !== 0" class="frame-checkout-list">
      <table class="table-checkout">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in selectedItems"
            :key="index"
            class="grid-checkout-item"
          >
            <td>
              <p>{{ item.book.title }}</p>
            </td>
            <td>
              <p>{{ item.book.price }}</p>
            </td>
            <td>
              <p>{{ item.qty }}</p>
            </td>
            <td>
              <p>{{ (item.total).toFixed(2) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Cart is empty</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
  computed: {
    ...mapGetters({ selectedItems: "books/GET_SELECTED_ITEM" }),
  },
});
</script>

<style lang="scss" scoped>
.frame-checkout-list {
  border: 1px solid $default-color;
  .table-checkout {
    width: 100%;
    thead {
      width: 100%;
      th {
        width: 25%;
        padding: 10px;
        &:first-child {
          text-align: left;
        }
      }
    }
    tbody {
      td {
        text-align: center;
        padding: 10px;
        &:first-child {
          text-align: left;
        }
      }
    }
  }
}
</style>
