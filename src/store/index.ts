import Vue from "vue";
import Vuex from "vuex";

import logIn from "./modules/logInModule"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    logIn,
  },
});
