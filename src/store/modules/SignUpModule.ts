import Vue from "vue";
import signUpService from "../../services/signUpService";
import logInService from "../../services/logInService";
import { fb } from "../../firebase";

async function uploadTaskPromise(userId: any, imageFile: any) {
  return new Promise(function (resolve, reject) {
    const storageRef = fb
      .storage()
      .ref("images/user/" + userId + "/" + imageFile.name);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on(
      "state_changed",
      null,
      (error: any) => {
        reject(error);
      },
      async () => {
        await uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadURL: any) => {
            resolve(downloadURL);
          });
      }
    );
  });
}

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los
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
  actions: {
    signUp: async (context: any, payload: any) => {
      let userId: any;
      let userEmail: any;
      let userPassword: any;

      const userData: any = {
        userName: "",
        userLastName: "",
        userLanguage: "en-us",
        userPhoto: "",
        userType: "notFederated",
        userRol: "administrator",
      };
      await signUpService.signUp(payload.user).then((response: any) => {
        if (response.data.registered == true) {
          userId = response.data.user[0].user_id;
          userEmail = response.data.user[0].user_email;
          userPassword = response.data.user[0].user_password;
          context.commit("setStatus", {
            validated: true,
            blocked: false,
            registered: true,
          });
        } else {
          context.commit("setStatus", { registered: false }); //el correo ya esta usado
        }
      });

      if (userId && payload.imageFile) {
        const imageUrl = await uploadTaskPromise(userId, payload.imageFile);
        await signUpService
          .setUserPhoto({
            userId: userId,
            userPhoto: imageUrl,
          })
          .then(async () => {
            await logInService
              .checkLogIn({ userEmail: userEmail, userPassword: userPassword })
              .then((response: any) => {
                if (response.data.validated == true) {
                  userData.userName = response.data.user[0].user_first_name;
                  userData.userLastName =
                    response.data.user[0].user_first_lastname;
                  userData.userLanguage = response.data.user[0].language_name;
                  userData.userPhoto = response.data.user[0].user_photo;
                  localStorage.setItem("token", response.data.token);
                  localStorage.setItem("userData", JSON.stringify(userData));
                  context.commit("setUser", response.data.user[0]);
                  context.commit("setStatus", {
                    validated: true,
                    blocked: false,
                    registered: true,
                  });
                }
              });
          });
      } else {
        await logInService
          .checkLogIn({ userEmail: userEmail, userPassword: userPassword })
          .then((response: any) => {
            if (response.data.validated == true) {
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
            }
          });
      }
    },
  },
};
