<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col class="d-flex justify-center">
        <v-img
          src="../assets/logoBodenchufe.png"
          contain
          height="200"
          width="200"
        ></v-img>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center mt-12">
      <v-col class="d-flex justify-center">
        <p class="mb-0 display-1 indigo--text">
          Welcome to administrative area!
        </p>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-alert
          type="info"
          color="indigo"
          elevation="5"
          border="bottom"
          class="mt-12"
        >
          Use the administrative panel to manage the application information
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Welcome extends Vue {}
</script>

<style lang="scss"></style>
