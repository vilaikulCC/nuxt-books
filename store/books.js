import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state:  {
    totalPages: 0
  },
  getters: {
    // getTotalPages(state) {
    //   const fetchedTotalPages = await axios
    //     .get(`${baseURL}books`)
    //     .then((response) => {
    //       this.totalsPage = response.headers['x-wp-total'];
    //     });
    //     return state.totalPages = fetchedTotalPages;
    // }
  },
  mutations: {
  },
  actions: {

  }
})

