<template>
  <section>
    <div v-if="selectedItems.length !== 0" class="frame-checkout-list">
      <div class="grid-checkout">
        <div class="grid-checkout-header">
          <div>รายการ</div>
          <div>ราคา</div>
          <div class="text-center">จำนวน</div>
          <div>รวม</div>
        </div>
        <div
          v-for="(item, index) in selectedItems"
          :key="index"
          class="grid-checkout-item"
        >
          <img :src="item.book.imageURL" alt="" class="grid-item-thumbnail" />
          <p class="grid-item-title">{{ item.book.title }}</p>

          <p class="grid-item-price">
            {{
              item.book.price
                .toFixed(2)
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            }}
          </p>
          <div class="grid-item-control text-center">
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
          </div>
          <p class="grid-item-qtytotal">
            {{
              item.total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
            }}
          </p>
          <button
            class="btn btn-control btn-delete-row grid-item-remove"
            @click="removeSelectedItem(item.book.id)"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </div>

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
    <div v-else class="frame-empty-checkout">
      <p>Cart is empty</p>
    </div>
  </section>
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
      this.$store.dispatch("books/REMOVE_SELECTED_ITEM", id);
    },
  },
});
</script>

<style lang="scss" scoped>
.frame-checkout-list {
  .grid-checkout {
    border: 1px solid $default-color;
    width: 100%;
    padding: 10px 20px;
    .grid-checkout-header {
      display: grid;
      grid-template-columns: auto 100px 200px 120px 0px;
      gap: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100%;
      border-bottom: 1px solid $default-color;
      margin-bottom: 15px;
    }
    .grid-checkout-item {
      display: grid;
      grid-template-columns: 100px auto 100px 200px 100px 20px;
      column-gap: 10px;
      padding-top: 10px;
      padding-bottom: 10px;
      width: 100%;
      align-items: center;
      .grid-item-thumbnail {
        width: 100px;
        height: 100px;
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
      .btn-delete-row {
        font-size: 18px;
        width: 30px;
        padding: 0;
        background-color: transparent;
        color: $link-color;
        &:hover {
          color: $link-hover-color;
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
.frame-empty-checkout {
  border: 1px solid $default-color;
  text-align: center;
  padding: 20px;
}

@media screen and (max-width: 600px) {
  .frame-checkout-list {
    .grid-checkout {
      .grid-checkout-header {
        display: none;
      }
      .grid-checkout-item {
        width: 100%;
        display: grid;
        grid-template-areas:
          "80px titleArea removeArea"
          "priceArea controlArea controlArea";
        grid-template-columns: 80px auto auto;
        &:not(:last-child) {
          border-bottom: 1px solid $default-color;
        }
        .grid-item-thumbnail {
          width: 80px;
          height: 80px;
        }
        .grid-item-title {
          grid-area: titleArea;
          align-self: start;
        }
        .grid-item-price {
          grid-area: priceArea;
        }
        .grid-item-control {
          grid-area: controlArea;
          justify-self: end;
        }
        .grid-item-qtytotal {
          grid-area: qtytotalArea;
          display: none;
        }
        .grid-item-remove {
          grid-area: removeArea;
          justify-self: end;
          align-self: start;
        }
      }
    }
  }
}
</style>
