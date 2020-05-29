import Vue from "vue";
import Vuex from "vuex";

import logIn from "./modules/logInModule";
import signUp from "./modules/SignUpModule";
import post from "./modules/postModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    logIn,
    signUp,
    post,
  },
});
