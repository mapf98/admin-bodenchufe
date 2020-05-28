<template>
  <v-container class="mb-12">
    <v-row class="d-flex">
      <v-col class="d-flex align-center">
        <v-dialog v-model="showModal" persistent max-width="490">
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" dark color="indigo" v-on="on">
              <v-icon dark>mdi-plus</v-icon>
              Add new provider
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline font-weight-light indigo--text mb-10">
              ADD NEW PROVIDER
            </v-card-title>
            <v-card-text class="indigo--text" v-if="duplicatedProvider">
              The provider name is already in use
            </v-card-text>
            <v-card-text class="indigo--text" v-if="emptyProviderName">
              You must specify a provider name
            </v-card-text>
            <v-textarea
              filled
              v-model="newName"
              no-resize
              label="Provider Name"
              rows="1"
              row-height="20"
              class="mx-12"
            ></v-textarea>
            <v-textarea
              filled
              auto-grow
              v-model="newDescription"
              label="Provider description"
              rows="1"
              row-height="20"
              class="mx-12 mb-10"
              hint="Optional"
              persistent-hint
            ></v-textarea>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo" text @click="closeModal">Close</v-btn>
              <v-btn color="indigo" text @click="createProvider">
                Add provider
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col class="d-flex align-center">
        <v-card-text class="d-flex justify-end indigo--text title">
          Find a provider
        </v-card-text>
      </v-col>
      <v-col>
        <v-autocomplete
          @change="setFilter"
          :loading="loadingProviders"
          :items="providersBar"
          v-model="selectedProvider"
          outlined
          clearable
          return-object
          label="Provider"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col>
        <v-expansion-panels popout class="mt-12">
          <v-expansion-panel
            v-for="provider in selectProvider()"
            :key="provider.provider.provider_id"
          >
            <v-expansion-panel-header
              color="grey lighten-2"
              class="title indigo--text d-flex flex-wrap"
            >
              <v-row class="mb-n6">
                <v-col class="d-flex align-center">
                  <p class="font-weight-light body-1">
                    {{ provider.provider.provider_name }}
                  </p>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-chip
                    v-if="provider.provider.status_name === 'INACTIVE'"
                    outlined
                    small
                    color="deep-orange darken-4"
                    text-color="deep-orange darken-4"
                    class="mr-12"
                  >
                    <v-avatar left>
                      <v-icon small>mdi-information</v-icon>
                    </v-avatar>
                    {{ provider.provider.status_name }} PROVIDER
                  </v-chip>
                </v-col>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="grey lighten-3">
              <v-row class="d-flex">
                <v-col>
                  <v-card-text class="indigo--text">PROVIDER POSTS</v-card-text>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn
                    v-if="provider.provider.status_name === 'ACTIVE'"
                    small
                    color="red"
                    class="mr-12 white--text font-weight-light"
                    @click="
                      updateProviderStatus(
                        provider.provider.provider_id,
                        provider.provider.status_name
                      )
                    "
                  >
                    Disable Provider
                  </v-btn>
                  <v-btn
                    v-if="provider.provider.status_name === 'INACTIVE'"
                    small
                    color="indigo"
                    class="mr-12 white--text font-weight-light"
                    @click="
                      updateProviderStatus(
                        provider.provider.provider_id,
                        provider.provider.status_name
                      )
                    "
                  >
                    Enable Provider
                  </v-btn>
                </v-col>
              </v-row>
              <v-col>
                <div v-if="provider.posts.length === 0" class="mt-12">
                  <p class="mb-0 mt-12 indigo--text title text-center">
                    This provider does not have any posts
                  </p>
                  <div class="d-flex justify-center mt-6 mb-12">
                    <v-icon color="indigo" x-large>
                      mdi-magnify-remove-outline
                    </v-icon>
                  </div>
                </div>
              </v-col>
              <ProviderPosts
                v-for="product in provider.posts"
                :key="product.product_provider_id"
                :providerStatus="provider.provider.status_name"
                v-bind:product="product"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      color="success"
      class="mb-8 ml-8"
      right
      bottom
    >
      Provider successfully created
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import ProviderPosts from "../components/ProviderPosts.vue";

@Component({
  components: {
    ProviderPosts,
  },
})
export default class Provider extends Vue {
  loadingProviders = true;
  selectedProvider: any = { selected: false };
  loadingStatus = false;
  providersFilter = [];
  showModal = false;
  showProviderDetails = false;
  newName = "";
  newDescription = "";
  duplicatedProvider = false;
  emptyProviderName = false;
  snackbar = false;

  closeModal() {
    this.showModal = false;
    this.duplicatedProvider = false;
    this.emptyProviderName = false;
    this.newName = "";
    this.newDescription = "";
  }

  closeProviderDetails() {
    this.showProviderDetails = false;
    this.duplicatedProvider = false;
    this.emptyProviderName = false;
  }

  mounted() {
    this.$store.dispatch("post/getProviders").then(() => {
      this.loadingProviders = false;
    });
  }

  selectProvider() {
    const pro =
      this.selectedProvider == undefined ||
      this.selectedProvider.selected == false
        ? this.providers
        : this.providersFilter;
    return pro;
  }

  setFilter() {
    let providersArray: any = [];

    if (
      this.selectedProvider == undefined ||
      this.selectedProvider.selected == false
    ) {
      providersArray = this.providers;
    } else
      this.providers.forEach((el: any) => {
        if (this.selectedProvider.text === el.provider.provider_name) {
          providersArray.push(el);
        }
      });
    this.providersFilter = providersArray;
  }

  get providers() {
    this.providersFilter = this.$store.getters["post/getProviders"];
    return this.$store.getters["post/getProviders"];
  }

  get providersBar() {
    const providers = this.$store.getters["post/getProviders"];
    let autocompleteProviders: any = [];

    if (providers.length !== undefined) {
      providers.forEach((provider: any) => {
        autocompleteProviders.push({
          text: provider.provider.provider_name,
          value: provider.provider.provider_id,
        });
      });
    }
    return autocompleteProviders;
  }

  updateProviderStatus(id: any, status: any) {
    this.loadingStatus = true;
    let newStatus = "";

    if (status === "ACTIVE") newStatus = "INACTIVE";
    else newStatus = "ACTIVE";

    this.$store
      .dispatch("provider/updateProviderStatus", {
        provider_id: id,
        status_name: newStatus,
      })
      .then(() => {
        this.loadingStatus = false;
        this.$store.dispatch("post/getProviders");
      });
  }

  createProvider() {
    this.duplicatedProvider = false;
    this.emptyProviderName = false;

    this.providers.forEach((el: any) => {
      if (el.provider.provider_name == this.newName)
        this.duplicatedProvider = true;
    });

    if (this.newName == "") this.emptyProviderName = true;

    if (!this.duplicatedProvider && !this.emptyProviderName) {
      this.$store
        .dispatch("provider/createProvider", {
          provider_name: this.newName,
          provider_description: this.newDescription,
        })
        .then(() => {
          this.showModal = false;
          this.duplicatedProvider = false;
          this.emptyProviderName = false;
          this.snackbar = true;
          this.newName = "";
          this.newDescription = "";
          this.$store.dispatch("post/getProviders");
        });
    }
  }
}
</script>

<style lang="scss"></style>
