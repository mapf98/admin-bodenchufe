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
    <v-row>
      <v-col class="d-flex justify-center">
        <h1 class="indigo--text font-weight-bold">Administrative Area</h1>
      </v-col>
    </v-row>
    <v-card class="ma-12" elevation="12">
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <v-btn
            type="submit"
            width="300"
            class="white--text"
            color="indigo"
            rounded
            @click="goToSignUp()"
          >
            Register
          </v-btn>
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <Login />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Login from "../components/Login.vue";

@Component({
  components: {
    Login,
  },
})
export default class AdminLogin extends Vue {
  goToDashboard() {
    this.$router.push("/dashboard");
  }
  goToSignUp() {
    this.$router.push("/signup");
  }
}
</script>

<style lang="scss"></style>
