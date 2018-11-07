import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    tokens: [ {api: 'darksky', token:'12345', options: ''},{api:'gmail', token:'6789', options:''} ],
  },
  mutations: {
    setUserName(state, payload) {
      state.userName = payload;
    },
  },
  actions: {
    loadUser({ commit }) {
      axios.get(process.env.VUE_APP_ROOT + '/api/auth/', {withCredentials: true}).then((res) => {
        if (res.data.success === true){
          commit('setUserName', res.data.user.name);
        }
      });
    },
  },
});
