<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-img
          src="../assets/logoBodenchufe.png"
          class="pointerLogo"
          contain
          height="100"
          width="auto"
          @click="goToHome"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col class="d-flex justify-center">
        <p class="mb-0 display-1 text-center mx-5">
          The path you want to access does not exist
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex justify-center">
        <v-icon x-large color="indigo">
          mdi-emoticon-sad-outline
        </v-icon>
      </v-col>
    </v-row>
    <v-row class="mt-12">
      <v-col class="d-flex justify-center">
        <v-btn dark color="amber" @click="goToHome">
          <v-icon class="mr-3">
            mdi-keyboard-backspace
          </v-icon>
          Go to Admin Bodenchufe
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class NotFound extends Vue {
  goToHome() {
    this.$router.push("/dashboard");
  }
}
</script>

<style lang="scss">
.pointerLogo {
  cursor: pointer;
}
</style>
