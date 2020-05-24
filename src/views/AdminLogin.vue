<template>
  <v-container fluid>
    <v-row>
      <v-col>
        Hola, este es el login
        <v-btn @click="goToDashboard">
          Ir al dashboard
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AdminLogin extends Vue {
  goToDashboard() {
    this.$router.push("/dashboard");
  }
}
</script>

<style lang="scss"></style>
