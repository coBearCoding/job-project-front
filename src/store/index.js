import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    registered: null
  },
  mutations: {
    setToken(state, payload){
      state.token = payload;
    },
    setRegistered(state, payload){
      state.registered = payload
    }
  },
  actions: {
    async login({commit}, user){
      try{
        const response = await fetch('http://localhost:1337/api/user/login', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        const responseDB = await response.json();
        commit('setToken', responseDB.data);

        localStorage.setItem('token', responseDB.data);
      }catch(err){
        console.log(err);
      }
    },

    async register({commit}, user){
      try{
        axios.post('http://localhost:1337/api/user/register',{
          name: user.name,
          email: user.email,
          password: user.password
        })
        .then(response=>{
          console.log(response.data.message)
          commit('setRegistered', response.data.message);
        });
      
      }catch(err){
        console.log(err);
      }
    },

    getToken({commit}){
      if(localStorage.getItem('token')){
        commit('setToken', localStorage.getItem('token'));
      }else{
        commit('setToken', null);
      }
    },
    logOut({commit}){
      localStorage.removeItem('token');
      commit('setToken', null); 
    }
  },
  modules: {
  }
})
