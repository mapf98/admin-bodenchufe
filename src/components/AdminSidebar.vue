<template>
  <v-navigation-drawer permanent color="indigo" app>
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
            <v-icon size="200" v-if="!agregado">mdi-account</v-icon>
            <v-img
              :src="userUrlPhoto == 'photo' ? placeHolcerImg : userUrlPhoto"
              v-if="agregado"
              :contain="userUrlPhoto == placeHolcerImg"
            ></v-img>
          </v-avatar>
          <p class="mb-0 white--text">{{ this.userData.userName }}</p>
        </div>
      </v-col>
    </v-row>
    <v-divider class="my-10 amber"></v-divider>
    <v-row>
      <v-col :class="users ? `white` : ``">
        <v-btn disabled text large block :dark="!users" tile @click="goToUsers"
          >Users</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="providers ? `white` : ``">
        <v-btn text large block :dark="!providers" tile @click="goToProviders"
          >Providers</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="products ? `white` : ``">
        <v-btn text large block :dark="!products" tile @click="goToProducts"
          >Posts</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="inventory ? `white` : ``">
        <v-btn
          disabled
          text
          large
          block
          :dark="!inventory"
          tile
          @click="goToInventory"
          >Categories</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col :class="transactions ? `white` : ``">
        <v-btn
          disabled
          text
          large
          block
          :dark="!transactions"
          tile
          @click="goToTransactions"
          >Transactions</v-btn
        >
      </v-col>
    </v-row>
    <v-divider class="my-10 amber"></v-divider>
    <v-row>
      <v-col :class="config ? `white` : ``">
        <v-btn
          disabled
          text
          large
          block
          :dark="!config"
          tile
          @click="goToConfig"
          >Settings
          <v-icon class="ml-3">
            mdi-file-cog-outline
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn text large block dark class="error" tile @click="signOut()"
          >Log out</v-btn
        >
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AdminSidebar extends Vue {
  users = false;
  providers = false;
  products = false;
  inventory = false;
  transactions = false;
  config = false;
  userData: any = {};
  agregado = false;
  placeHolcerImg =
    "https://firebasestorage.googleapis.com/v0/b/bodenchufe-client.appspot.com/o/images%2Faplication%2FFotofinal.png?alt=media&token=d9d54e10-3ad2-4906-8986-890b38a27d38";
  userUrlPhoto = "";

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
    this.$router.push("/dashboard/addPost");
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

  signOut() {
    localStorage.clear();
    this.$router.push("/login");
  }

  showImageIfExist() {
    const userDataString: any = localStorage.getItem("userData");
    this.userData = JSON.parse(userDataString);
    this.userUrlPhoto = this.userData.userPhoto;
    if (this.userUrlPhoto.length > 0) {
      this.agregado = true;
    }
  }

  mounted() {
    this.showImageIfExist();
  }
}
</script>

<style lang="scss"></style>
