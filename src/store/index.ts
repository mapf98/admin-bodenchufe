import Vue from "vue";
import Vuex from "vuex";

import logIn from "./modules/logInModule";
import signUp from "./modules/SignUpModule";
import post from "./modules/postModule";
import provider from "./modules/providerModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    logIn,
    signUp,
    post,
    provider,
  },
});
