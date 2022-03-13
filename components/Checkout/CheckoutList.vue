<template>
  <div>
    <div v-if="selectedItems.length !== 0" class="frame-checkout-list">
      <table class="table-checkout">
        <thead>
          <tr>
            <th>รายการ</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>รวม</th>
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
              <p>{{ item.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="frame-total">
        <p>
          รวมทั้งหมด :
          {{ totalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
          บาท
        </p>
      </div>
      <div class="frame-action">
        <button class="btn btn-accent">สั่งซื้อสินค้า</button>
      </div>
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
    ...mapGetters({ totalPrice: "books/GET_TOTAL_PRICE" }),
  },
});
</script>

<style lang="scss" scoped>
.frame-checkout-list {
  .table-checkout {
    width: 100%;
    border: 1px solid $default-color;
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
  .frame-total {
    margin-top: 15px;
    text-align: right;
  }
  .frame-action {
    text-align: right;
    padding-top: 40px;
  }
}
</style>
