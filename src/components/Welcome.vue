<template>
  <v-container>
    <v-row class="d-flex align-center ma-12">
      <v-card elevation="5" class="pa-12">
        <v-col class="align-center">
          <div class="display-2 indigo--text text-center">
            Welcome To
            <v-img
              src="../assets/logoBodenchufe.png"
              height="200"
              width="auto"
              contain
              class="mt-12"
            ></v-img>
          </div>
        </v-col>
        <v-col class="align-center">
          <div class="display-2 text-center indigo--text font-weight-bold">
            Administrative Area
          </div>
        </v-col>
      </v-card>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-alert
        type="info"
        color="indigo"
        elevation="5"
        border="bottom"
        class="mt-12"
      >
        Use the administrative panel to manage the application information
      </v-alert>
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
