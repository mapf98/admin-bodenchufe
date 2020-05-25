import Vue from "vue";
import logInService from "../../services/logInService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    user: {},
    status: {},
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getLoginUserData: (state: any) => state.user,
    getLoginStatus: (state: any) => state.status,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setUser(state: any, user: any) {
      Vue.set(state, "user", user);
    },
    setStatus(state: any, status: any) {
      Vue.set(state, "status", status);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    logIn: async (context: any, payload: any) => {
      console.log(payload);
      const userData: any = {
        userName: "",
        userLastName: "",
        userLanguage: "",
        userPhoto: "",
        userType: "notFederated",
        userRol: "",
      };
      await logInService.checkLogIn(payload.user).then((response: any) => {
        console.log(response);
        if (response.data.validated == true) {
          if (response.data.user[0].rol_name == "administrator") {
            userData.userName = response.data.user[0].user_first_name;
            userData.userLastName = response.data.user[0].user_first_lastname;
            userData.userLanguage = response.data.user[0].language_name;
            userData.userPhoto = response.data.user[0].user_photo;
            userData.userRol = response.data.user[0].rol_name;
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userData", JSON.stringify(userData));
            context.commit("setUser", response.data.user[0]);
            context.commit("setStatus", {
              validated: true,
              blocked: false,
              registered: true,
              administrator: true,
            });
          } else {
            context.commit("setStatus", {
              validated: true,
              blocked: false,
              registered: true,
              administrator: false,
            });
          }
        }
        if (response.data.validated == false) {
          context.commit("setStatus", {
            validated: false,
            blocked: false,
            registered: true,
          }); //combinacion de correo y password incorrecto
          if (response.data.blocked == true) {
            context.commit("setStatus", {
              validated: false,
              blocked: true,
              registered: true,
            }); //usuario bloqueado
          }
        }
        if (response.data.registered == false) {
          context.commit("setStatus", {
            validated: false,
            blocked: false,
            registered: false,
          }); //correo no registrado
        }
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
