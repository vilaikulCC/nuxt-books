import Vue from "vue";
import { Module } from "Vuex";
import { Book, SelectedItem } from "@/interface";

interface RootState {
  selectedItems: SelectedItem[];
}

const BooksModule: Module<RootState, any> = {
  namespaced: true,
  state: { selectedItems: [] as SelectedItem[] },
  getters: {
    GET_SELECTED_ITEM(state) {
      return state.selectedItems;
    },
  },
  mutations: {
    SET_SELECTED_ITEM(state, data: SelectedItem) {
      state.selectedItems.push(data);
    },
  },
  actions: {
    ADD_SELECTED_ITEM(context, data: Book) {
      const setData = {
        qty: 1,
        total: parseFloat(data.price),
        book: data,
      };
      console.log(data);
      context.commit("SET_SELECTED_ITEM", setData);
    },
  },
};

export default BooksModule;
