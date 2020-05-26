<template>
  <v-container fluid>
    <v-row>
      <v-col class="d-flex justify-center">
        <p class="mb-0 indigo--text display-1">Posts</p>
      </v-col>
    </v-row>
    <v-row class="mb-8">
      <v-divider class="indigo"></v-divider>
    </v-row>
    <v-row>
      <v-col>
        <p class="mb-0 title indigo--text">Select or add a new product:</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          :loading="loadingProducts"
          :items="products"
          v-model="selectedProduct"
          outlined
          clearable
          return-object
          label="Product"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="mb-0 title indigo--text">Select a provider:</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          :loading="loadingProviders"
          :items="providers"
          v-model="selectedProvider"
          outlined
          clearable
          return-object
          label="Provider"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="mb-0 title indigo--text">Post detail:</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="In stock"
          outlined
          clearable
          type="number"
          min="1"
          max="1000"
          v-model="inStockProducts"
          prefix="Units:"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Price per unit"
          prefix="$"
          outlined
          type="number"
          min="1"
          max="1000"
          v-model="pricePerProduct"
          clearable
        ></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          :loading="loadingOffers"
          :items="offers"
          v-model="selectedOffer"
          outlined
          clearable
          return-object
          label="Offer rate"
          hint="Optional"
          persistent-hint
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          outlined
          clearable
          counter
          rows="3"
          auto-grow
          v-model="postDescription"
          label="Post description"
          hint="Description between 50 and 500 characters"
          persistent-hint
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert type="warning" dense v-show="checkNumberTypes()">
          Fields of type number must be greater than zero
        </v-alert>
        <v-alert type="info" dense v-show="checkPostInfo()">
          Complete required fields to continue
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          @click="addNewPost"
          block
          :loading="loadingAdd"
          :disabled="checkPostInfo()"
          color="indigo"
          class="white--text"
        >
          Add new product
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AddPost extends Vue {
  newProduct = false;
  loadingProducts = true;
  loadingProviders = true;
  loadingOffers = true;
  loadingAdd = false;
  selectedProduct: any = {};
  selectedProvider: any = {};
  selectedOffer: any = {};
  postDescription = "";
  pricePerProduct = "";
  inStockProducts = "";

  addNewPost() {
    this.loadingAdd = true;
    this.$store
      .dispatch("post/createPost", {
        provider_id: this.selectedProvider.value,
        provider_available_quantity: parseInt(this.inStockProducts),
        provider_price: parseFloat(this.pricePerProduct),
        provider_description: this.postDescription,
        offer_rate:
          this.selectedOffer === undefined ? null : this.selectedOffer.text,
        new_product: this.newProduct,
        product: this.selectedProduct.value,
      })
      .then(() => {
        this.loadingAdd = false;
        this.clearAll();
      });
  }

  clearAll() {
    this.newProduct = false;
    this.selectedProduct = {};
    this.selectedProvider = {};
    this.selectedOffer = {};
    this.postDescription = "";
    this.pricePerProduct = "";
    this.inStockProducts = "";
  }

  checkNumberTypes() {
    if (
      parseFloat(this.pricePerProduct) < 0 ||
      parseInt(this.inStockProducts) < 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkPostInfo() {
    if (this.postDescription == null) {
      return true;
    } else {
      if (
        this.selectedProduct.value !== undefined &&
        this.selectedProvider.value !== undefined &&
        parseFloat(this.pricePerProduct) > 0 &&
        parseInt(this.inStockProducts) > 0 &&
        this.postDescription.length >= 50 &&
        this.postDescription.length <= 500
      ) {
        return false;
      } else {
        return true;
      }
    }
  }

  created() {
    this.$store.dispatch("post/getProducts").then(() => {
      this.loadingProducts = false;
    });
    this.$store.dispatch("post/getProviders").then(() => {
      this.loadingProviders = false;
    });
    this.$store.dispatch("post/getOffers").then(() => {
      this.loadingOffers = false;
    });
  }

  get products() {
    const products = this.$store.getters["post/getProducts"];
    let autocompleteProducts: any = [];

    if (products.length !== undefined) {
      products.forEach((product: any) => {
        autocompleteProducts.push({
          text: product.product_name,
          value: product.product_id,
        });
      });
    }

    return autocompleteProducts;
  }

  get providers() {
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

  get offers() {
    const offers = this.$store.getters["post/getOffers"];
    let autocompleteOffers: any = [];

    if (offers.length !== undefined) {
      offers.forEach((offer: any) => {
        autocompleteOffers.push({
          text: offer.offer_rate,
          value: offer.offer_id,
        });
      });
    }

    return autocompleteOffers;
  }
}
</script>

<style lang="scss"></style>
