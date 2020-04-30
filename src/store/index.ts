import Vue from "vue";
import Vuex from "vuex";

//Aqui se importan los modulos
import users from "./modules/userModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
  },
});
