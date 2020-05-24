<template>
  <v-navigation-drawer absolute permanent color="indigo">
    <v-row>
      <v-col class="indigo lighten-4">
        <v-img
          src="../assets/logoBodenchufe.png"
          height="80"
          width="auto"
          contain
          class="my-6"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="amber darken-1">
        <div class="d-flex justify-center align-center my-2">
          <v-avatar color="teal" size="48" class="mr-5">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <p class="mb-0 white--text">Diego De Quintal</p>
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-10 amber"></v-divider>
    <v-row>
      <v-col :class="users ? `white` : ``">
        <v-btn text large block :dark="!users" tile @click="goToUsers"
          >Usuarios</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="providers ? `white` : ``">
        <v-btn text large block :dark="!providers" tile @click="goToProviders"
          >Proveedores</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="products ? `white` : ``">
        <v-btn text large block :dark="!products" tile @click="goToProducts"
          >Productos</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="inventory ? `white` : ``">
        <v-btn text large block :dark="!inventory" tile @click="goToInventory"
          >Inventario</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="transactions ? `white` : ``">
        <v-btn
          text
          large
          block
          :dark="!transactions"
          tile
          @click="goToTransactions"
          >Transacciones</v-btn
        >
      </v-col>
    </v-row>
    <v-divider class="my-10 amber"></v-divider>
    <v-row>
      <v-col :class="config ? `white` : ``">
        <v-btn text large block :dark="!config" tile @click="goToConfig"
          >Configuraciones
          <v-icon class="ml-3">
            mdi-file-cog-outline
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn text large block dark class="error" tile>Cerrar sesión</v-btn>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AdminDashboard extends Vue {
  users = false;
  providers = false;
  products = false;
  inventory = false;
  transactions = false;
  config = false;

  goToUsers() {
    this.users = true;
    this.providers = false;
    this.products = false;
    this.inventory = false;
    this.transactions = false;
    this.config = false;
    console.log("Ir a users");
  }

  goToProviders() {
    this.users = false;
    this.providers = true;
    this.products = false;
    this.inventory = false;
    this.transactions = false;
    this.config = false;
    console.log("Ir a proveedores");
  }

  goToProducts() {
    this.users = false;
    this.providers = false;
    this.products = true;
    this.inventory = false;
    this.transactions = false;
    this.config = false;
    console.log("Ir a productos");
  }

  goToInventory() {
    this.users = false;
    this.providers = false;
    this.products = false;
    this.inventory = true;
    this.transactions = false;
    this.config = false;
    console.log("Ir a inventario");
  }

  goToTransactions() {
    this.users = false;
    this.providers = false;
    this.products = false;
    this.inventory = false;
    this.transactions = true;
    this.config = false;
    console.log("Ir a transacciones");
  }

  goToConfig() {
    this.users = false;
    this.providers = false;
    this.products = false;
    this.inventory = false;
    this.transactions = false;
    this.config = true;
    console.log("Ir a configuración");
  }
}
</script>

<style lang="scss"></style>
