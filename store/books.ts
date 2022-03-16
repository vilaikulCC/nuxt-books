import Vue from "vue";
import { Module } from "Vuex";
import { Book, SelectedItem } from "@/interface";

interface RootState {
  selectedItems: SelectedItem[];
  total: number;
  countItem: number;
}

const BooksModule: Module<RootState, any> = {
  namespaced: true,
  state: { selectedItems: [] as SelectedItem[], total: 0, countItem: 0 },
  getters: {
    GET_SELECTED_ITEM(state) {
      return state.selectedItems;
    },
    GET_TOTAL_PRICE(state) {
      return state.total;
    },
    GET_COUNT_SELECTED_ITEM(state) {
      return state.countItem;
    },
  },
  mutations: {
    SET_FIRST_QTY_SELECTED_ITEM(state, data: SelectedItem) {
      state.selectedItems.push(data);
    },
    SET_INCREASE_QTY_SELECTED_ITEM(state, data: SelectedItem) {
      const { index, ...other } = data;
      Vue.set(state.selectedItems, index, other);
    },
    SET_DECREASE_QTY_SELECTED_ITEM(state, data: SelectedItem) {
      const { index, ...other } = data;
      Vue.set(state.selectedItems, index, other);
    },
    SET_REMOVE_SELECTED_ITEM(state, index) {
      Vue.delete(state.selectedItems, index);
    },
    SET_COUNT_SELECTED_ITEM(state, amount) {
      return state.countItem = state.countItem + amount;
    },
    SET_TOTAL_PRICE(state) {
      state.total = state.selectedItems.reduce((sum, i) => sum + i.total, 0);
    },
  },
  actions: {
    ADD_SELECTED_ITEM(context, data: Book) {
      console.log(context.state.selectedItems);
      const index = context.state.selectedItems.findIndex(
        (i) => i.book.id === data.id
      );
      if (index > -1) {
        const oldData = context.state.selectedItems[index];
        const increaseData = {
          qty: oldData.qty + 1,
          originalPrice: data.price,
          total: oldData.total + data.price,
          book: data,
        };
        context.commit("SET_INCREASE_QTY_SELECTED_ITEM", {
          index,
          ...increaseData,
        });
      } else {
        const setData = {
          qty: 1,
          originalPrice: data.price,
          total: data.price,
          book: data,
        };
        context.commit("SET_FIRST_QTY_SELECTED_ITEM", setData);
      }
      context.commit("SET_TOTAL_PRICE");
      context.commit("SET_COUNT_SELECTED_ITEM", 1);
    },
    INCREASE_QTY_SELECTED_ITEM(context, id) {
      const index = context.state.selectedItems.findIndex(
        (i) => i.book.id === id
      );
      const oldData = context.state.selectedItems[index];
      const increaseData = {
        qty: oldData.qty + 1,
        originalPrice: oldData.originalPrice,
        total: oldData.total + oldData.originalPrice,
        book: oldData.book,
      };
      context.commit("SET_INCREASE_QTY_SELECTED_ITEM", {
        index,
        ...increaseData,
      });

      context.commit("SET_TOTAL_PRICE");
      context.commit("SET_COUNT_SELECTED_ITEM", 1);
    },
    DECREASE_QTY_SELECTED_ITEM(context, id) {
      const index = context.state.selectedItems.findIndex(
        (i) => i.book.id === id
      );
      const oldData = context.state.selectedItems[index];

      if (oldData.qty > 1) {
        const decreaseData = {
          qty: oldData.qty - 1,
          originalPrice: oldData.originalPrice,
          total: oldData.total - oldData.originalPrice,
          book: oldData.book,
        };
        context.commit("SET_INCREASE_QTY_SELECTED_ITEM", {
          index,
          ...decreaseData,
        });
      } else {
        context.commit("SET_REMOVE_SELECTED_ITEM", index);
      }
      context.commit("SET_TOTAL_PRICE");
      context.commit("SET_COUNT_SELECTED_ITEM", -1);
    },
  },
};

export default BooksModule;
