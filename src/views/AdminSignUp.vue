<template>
  <v-container>
    <v-row class="d-flex justify-center align-center">
      <v-col>
        <v-img
          src="../assets/logoBodenchufe.png"
          height="120"
          width="auto"
          contain
          class="my-6"
        ></v-img>
      </v-col>
    </v-row>
    <v-card>
      <v-row class="ma-12">
        <v-col class="text-center" :cols="separatorCols()">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-row>
              <v-col>
                <v-text-field
                  type="text"
                  v-model="user.userFirstName"
                  :label="userFirstNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="text"
                  v-model="user.userFirstLastname"
                  :label="userFirstLastNameText"
                  :rules="nameRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="text"
                  v-model="user.userEmail"
                  :label="userEmailText"
                  :rules="emailRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="password"
                  v-model="user.userPassword"
                  :label="userPasswordText"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu
                  ref="menu"
                  v-model="menuRef"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="user.userBirthdate"
                      :label="userBirthDateText"
                      :rules="birthDateRules"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="user.userBirthdate"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
        <v-col :cols="separatorCols()">
          <SignUpPhoto @imageFiles="imageFile = $event" />
        </v-col>
      </v-row>
    </v-card>
    <v-row class="mt-12">
      <v-col class="text-center">
        <v-btn
          :disabled="!valid"
          :loading="loading"
          class="white--text mb-12"
          color="amber"
          type="submit"
          @click="signUp()"
          >{{ registerBtnText
          }}<v-icon class="ml-5">mdi-location-enter</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbarError"
      color="indigo darken-4 px-3"
      class="mb-5 my-5"
      top
    >
      <ul>
        <li class="body-1" v-for="error in errors" :key="error.id">
          {{ error }}
        </li>
      </ul>
      <v-btn color="amber" text @click="snackbarError = false" small>
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import SignUpPhoto from "../components/SignUpPhoto.vue";
import { Watch } from "vue-property-decorator";

@Component({
  components: {
    SignUpPhoto,
  },
})
export default class AdminSingUp extends Vue {
  loading = false;
  menuRef = false;
  valid = true;
  date = null;
  snackbarError = false;
  errors: Array<string> = [];

  //PoEditor Terms
  registerBtnText = "Check In";
  userFirstNameText = "First Name";
  userSecondNameText = "Second Name";
  userFirstLastNameText = "First Last Name";
  userSecondLastNameText = "Second Last Name";
  userBirthDateText = "Birthday Date";
  userEmailText = "Email ";
  userPasswordText = "Password";

  userNameRulesLength = "Name must be less than 10 characters";
  userNameRulesRequired = "Name is required";
  userPasswordRulesLength = "Password must be less than 8 characters";
  userPasswordRulesRequired = "Password is required";
  userEmailRulesRequired = "Email is required";
  userEmailRulesValid = "Email must be valid";
  userBirthdayRulesRequired = "Birthday Date is required";
  userEmailRegisteredTrue = "This email is already in use";

  //userInfo
  user = {
    userFirstName: "",
    userFirstLastname: "",
    userBirthdate: null,
    userEmail: "",
    userPassword: "",
    userPhoto: "photo",
    languageName: "en-us",
    rolName: "administrator",
  };
  imageFile: any; //foto que viene del hijo "aun no en FIREBASE"

  nameRules = [
    (v: any) => !!v || this.userNameRulesRequired,
    (v: any) => v.length <= 10 || this.userNameRulesLength,
  ];

  passwordRules = [
    (v: any) => !!v || this.userPasswordRulesRequired,
    (v: any) => v.length >= 8 || this.userPasswordRulesLength,
  ];

  emailRules = [
    (v: any) => !!v || this.userEmailRulesRequired,
    (v: any) => /.+@.+/.test(v) || this.userEmailRulesValid,
  ];

  birthDateRules = [(v: any) => !!v || this.userBirthdayRulesRequired];

  $refs!: {
    picker: any;
    menu: any;
    form: any;
  };

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  @Watch("menuRef")
  menu(val: Date) {
    val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
  }

  save(date: Date) {
    this.$refs.menu.save(date);
  }

  signUp() {
    this.loading = true;
    this.errors.splice(0);
    if (this.$refs.form.validate()) {
      this.$store
        .dispatch("signUp/signUp", {
          user: this.user,
          imageFile: this.imageFile,
        })
        .then(() => {
          if (this.getStatus.registered == false) {
            this.loading = false;
            this.errors.push(this.userEmailRegisteredTrue);
            this.showErrors(this.errors);
          } else {
            this.loading = false;
            this.$router.push("/dashboard/welcome");
          }
        });
    } else {
      this.loading = false;
    }
  }

  separatorCols() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 6;
  }

  get getStatus() {
    return this.$store.getters["signUp/getLoginStatus"];
  }
}
</script>
