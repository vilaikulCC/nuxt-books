import Vue from "vue";
import Vuex from "Vuex";
import books from "./books";
import BooksModule from "./books";

Vue.use(Vuex);

export default () =>
  new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
      books: BooksModule,
    },
  });
