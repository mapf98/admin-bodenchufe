<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field
          v-model="user.userEmail"
          :label="nflUser"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="user.userPassword"
          :label="nflPassword"
          required
          type="password"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        class="white--text"
        color="indigo"
        :loading="loading"
        @click="logIn()"
        >{{ navbarLogin }}</v-btn
      >
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
import { Watch } from "vue-property-decorator";

@Component({})
export default class NotFederatedLogin extends Vue {
  user = {
    userEmail: "",
    userPassword: "",
  };

  snackbarError = false;
  errors: string[] = [];
  navbarLogin = "Log In";
  nflEmailRequired = "Email required";
  nflPasswordRequired = "Password required";
  nflInvalidMailOrAccount = "Mail or Account incorrect";
  nflUserBlocked = "User blocked";
  nflMailNotRegistered = "Mail not registered";
  nflMessageError = "Please correct the following error(s):";
  nflUser = "Email";
  nflPassword = "Password";
  loading = false;

  showErrors(errors: any) {
    this.errors = errors;
    this.snackbarError = true;
  }

  logIn() {
    this.loading = true;
    this.errors.splice(0);

    if (!this.user.userEmail) {
      this.errors.push(this.nflEmailRequired);
      this.showErrors(this.errors);
      this.loading = false;
    }

    if (!this.user.userPassword) {
      this.errors.push(this.nflPasswordRequired);
      this.showErrors(this.errors);
      this.loading = false;
    }

    if (this.errors.length == 0) {
      this.$store.dispatch("logIn/logIn", { user: this.user }).then(() => {
        if (
          this.getStatus.validated == false &&
          this.getStatus.blocked == false &&
          this.getStatus.registered == true
        ) {
          this.errors.push(this.nflInvalidMailOrAccount);
          this.showErrors(this.errors);
        }
        if (
          this.getStatus.validated == false &&
          this.getStatus.blocked == true &&
          this.getStatus.registered == true
        ) {
          this.errors.push(this.nflUserBlocked);
          this.showErrors(this.errors);
        }
        if (
          this.getStatus.validated == false &&
          this.getStatus.blocked == false &&
          this.getStatus.registered == false
        ) {
          this.errors.push(this.nflMailNotRegistered);
          this.showErrors(this.errors);
        }
        if (this.getStatus.administrator == false) {
          this.errors.push("you are not administrator");
          this.showErrors(this.errors);
        }
        if (this.errors.length == 0) {
          this.$router.push("/dashboard");
        } else {
          this.showErrors(this.errors);
          this.loading = false;
        }
      });
    }
  }

  get getStatus() {
    return this.$store.getters["logIn/getLoginStatus"];
  }
}
</script>
