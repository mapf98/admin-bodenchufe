<template>
  <v-app>
    <v-row>
      <v-col cols="3" v-if="!$route.meta.hideBasicComponents">
        <AdminSidebar />
      </v-col>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AdminSidebar from "../src/components/AdminSidebar.vue";

@Component({
  components: {
    AdminSidebar,
  },
})
export default class App extends Vue {}
</script>
