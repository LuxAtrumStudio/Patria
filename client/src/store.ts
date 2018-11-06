import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    tokens: [],
  },
  mutations: {

  },
  actions: {
    login({ commit }) {
      axios.get('http://localhost:8000/api/auth/login').then((res) => {
        console.log(res);
      });
      console.log("HI");
    },
  },
});
