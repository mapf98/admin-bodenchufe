import Vue from "vue";

import userService from "../../services/userService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    users: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    //collection: (state: any) => state.users,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setAllUsers(state: {}, users: []) {
      Vue.set(state, "users", users);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getAllUsers: async (context: any) => {
      console.log(typeof context);
      await userService.getAllUsers().then((response: any) => {
        context.commit("setAllUsers", response.data);
      });
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};

//Ejemplo de obtener datos:
// beforeCreate() {
//   this.$store.dispatch("banks/read");
// }

// get banks() {
//   return this.$store.state.banks;
// }
