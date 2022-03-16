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
              <button
                class="btn btn-control btn-control-qty"
                @click="decreaseQty(item.book.id)"
              >
                <font-awesome-icon icon="fa-solid fa-minus" />
              </button>
              <input
                type="number"
                :value="item.qty"
                class="inp-qty"
                min="0"
                max="99"
              />
              <button
                class="btn btn-control btn-control-qty"
                @click="increaseQty(item.book.id)"
              >
                <font-awesome-icon icon="fa-solid fa-plus" />
              </button>
            </td>
            <td>
              <p>
                {{
                  item.total
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                }}
              </p>
            </td>
            <td>
              <button
                class="btn btn-control btn-control-qty"
                @click="removeSelectedItem(item.book.id)"
              >
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </button>
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
  methods: {
    decreaseQty(id: number) {
      console.log(`decreaseQty ${id}`);
      this.$store.dispatch("books/DECREASE_QTY_SELECTED_ITEM", id);
    },
    increaseQty(id: number) {
      console.log(`increaseQty ${id}`);
      this.$store.dispatch("books/INCREASE_QTY_SELECTED_ITEM", id);
    },
    removeSelectedItem(id: number) {
      this.$store.dispatch("books/REMOVE_SELECTED_ITEM", id)
    }
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

        input[type="number"].inp-qty {
          width: 45px;
          text-align: center;
          -moz-appearance: textfield;
          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
          }
        }

        .btn-control-qty {
          font-size: 12px;
          width: 30px;
          height: 30px;
          border-radius: 30px;
          padding: 0;
          margin: 0 5px;
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
