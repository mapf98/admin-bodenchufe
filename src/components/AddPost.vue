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
        <v-switch
          v-model="newProduct"
          label="New product"
          color="indigo"
        ></v-switch>
      </v-col>
    </v-row>
    <v-row v-if="!newProduct">
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
    <v-row v-if="newProduct">
      <v-col>
        <v-card outlined class="pa-4" elevation="3">
          <v-row>
            <v-col cols="4">
              <div class="photoPreviews mb-4 d-flex justify-center pa-2">
                <v-img
                  :src="image1"
                  contain
                  height="200"
                  width="200"
                  v-if="image1 !== ``"
                ></v-img>
                <v-icon size="200" v-if="image1 == ``">
                  mdi-file-image-outline
                </v-icon>
              </div>
              <div class="d-flex justify-center d-flex justify-center">
                <v-file-input
                  accept="image/png, image/jpeg"
                  placeholder="Select preview photo 1"
                  prepend-icon="mdi-camera"
                  dense
                  outlined
                  @change="previewImage1"
                ></v-file-input>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="photoPreviews mb-4 d-flex justify-center pa-2">
                <v-img
                  :src="image2"
                  contain
                  height="200"
                  width="200"
                  v-if="image2 !== ``"
                ></v-img>
                <v-icon size="200" v-if="image2 == ``">
                  mdi-file-image-outline
                </v-icon>
              </div>
              <div class="d-flex justify-center">
                <v-file-input
                  accept="image/png, image/jpeg"
                  placeholder="Select preview photo 2"
                  prepend-icon="mdi-camera"
                  dense
                  outlined
                  hint="Optional"
                  persistent-hint
                  @change="previewImage2"
                ></v-file-input>
              </div>
            </v-col>
            <v-col cols="4">
              <div class="photoPreviews mb-4 d-flex justify-center pa-2">
                <v-img
                  :src="image3"
                  contain
                  height="200"
                  width="200"
                  v-if="image3 !== ``"
                ></v-img>
                <v-icon size="200" v-if="image3 == ``">
                  mdi-file-image-outline
                </v-icon>
              </div>
              <div class="d-flex justify-center">
                <v-file-input
                  accept="image/png, image/jpeg"
                  placeholder="Select preview photo 3"
                  prepend-icon="mdi-camera"
                  dense
                  outlined
                  hint="Optional"
                  persistent-hint
                  @change="previewImage3"
                ></v-file-input>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Product name"
                outlined
                clearable
                v-model="productName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                :loading="loadingCategories"
                :items="categories"
                v-model="selectedCategory"
                outlined
                clearable
                return-object
                label="Product category"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                label="Long"
                outlined
                clearable
                type="number"
                min="1"
                v-model="productLong"
                suffix="cm"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Height"
                suffix="cm"
                outlined
                type="number"
                min="1"
                v-model="productH"
                clearable
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Width"
                suffix="cm"
                outlined
                type="number"
                min="1"
                v-model="productW"
                clearable
              ></v-text-field>
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
                v-model="productDescription"
                label="Product description"
                hint="Description between 15 and 500 characters"
                persistent-hint
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card>
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
          label="Discount"
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
          hint="Description between 15 and 500 characters"
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
    <v-snackbar
      v-model="snackbar"
      color="success"
      class="mb-8 ml-8"
      right
      bottom
    >
      Post created successfully
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AddPost extends Vue {
  newProduct = false;
  snackbar = false;
  loadingProducts = true;
  loadingProviders = true;
  loadingOffers = true;
  loadingAdd = false;
  loadingCategories = true;
  selectedCategory: any = {};
  selectedProduct: any = {};
  selectedProvider: any = {};
  selectedOffer: any = {};
  files: any = [];
  postDescription = "";
  productDescription = "";
  pricePerProduct = "";
  inStockProducts = "";
  productLong = "";
  productH = "";
  productW = "";
  productName = "";
  image1 = "";
  image2 = "";
  image3 = "";
  file1 = undefined;
  file2 = undefined;
  file3 = undefined;

  addNewPost() {
    this.loadingAdd = true;
    if (this.newProduct == false) {
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
          this.snackbar = true;
          this.loadingAdd = false;
          this.clearAll();
        });
    } else {
      this.$store
        .dispatch("post/createPost", {
          provider_id: this.selectedProvider.value,
          provider_available_quantity: parseInt(this.inStockProducts),
          provider_price: parseFloat(this.pricePerProduct),
          provider_description: this.postDescription,
          offer_rate:
            this.selectedOffer === undefined ? null : this.selectedOffer.text,
          new_product: this.newProduct,
          product: {
            product_name: this.productName,
            product_description: this.productDescription,
            product_photo: "photo",
            product_long: parseFloat(this.productLong),
            product_height: parseFloat(this.productH),
            product_width: parseFloat(this.productW),
            category_name: this.selectedCategory.text,
          },
        })
        .then((response: any) => {
          const photos = [];

          if (this.file1 !== undefined) {
            photos.push(this.file1);
          }

          if (this.file2 !== undefined) {
            photos.push(this.file2);
          }

          if (this.file3 !== undefined) {
            photos.push(this.file3);
          }

          this.$store
            .dispatch("post/uploadPhotos", {
              photos: photos,
              productId: response.data.product_id,
            })
            .then(() => {
              this.snackbar = true;
              this.loadingAdd = false;
              this.clearAll();
            });
        });
    }
  }

  previewImage1(event: any) {
    if (event) {
      const file = event || event.dataTransfer.files;
      this.file1 = file;
      this.createImg(file, 1);
    } else {
      this.file1 = undefined;
      this.image1 = "";
    }
  }

  previewImage2(event: any) {
    if (event) {
      const file = event || event.dataTransfer.files;
      this.file2 = file;
      this.createImg(file, 2);
    } else {
      this.file2 = undefined;
      this.image2 = "";
    }
  }

  previewImage3(event: any) {
    if (event) {
      const file = event || event.dataTransfer.files;
      this.file3 = file;
      this.createImg(file, 3);
    } else {
      this.file3 = undefined;
      this.image3 = "";
    }
  }

  createImg(file: any, image: number) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      if (image == 1) {
        this.image1 = e.target.result;
      } else if (image == 2) {
        this.image2 = e.target.result;
      } else {
        this.image3 = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  }

  clearAll() {
    this.newProduct = false;
    this.selectedProduct = undefined;
    this.selectedProvider = {};
    this.selectedOffer = {};
    this.postDescription = "";
    this.pricePerProduct = "";
    this.inStockProducts = "";
    this.selectedCategory = {};
    this.productDescription = "";
    this.productLong = "";
    this.productH = "";
    this.productW = "";
    this.productName = "";
    this.image1 = "";
    this.image2 = "";
    this.image3 = "";
    this.file1 = undefined;
    this.file2 = undefined;
    this.file3 = undefined;
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
    if (this.postDescription == null || this.selectedProvider === undefined) {
      return true;
    } else {
      if (
        this.selectedProvider.value !== undefined &&
        parseFloat(this.pricePerProduct) > 0 &&
        parseInt(this.inStockProducts) > 0 &&
        this.postDescription.length >= 15 &&
        this.postDescription.length <= 500
      ) {
        if (this.newProduct == false && this.selectedProduct !== undefined) {
          if (this.selectedProduct.value === undefined) {
            return true;
          } else {
            return false;
          }
        } else if (
          this.newProduct == true &&
          this.selectedCategory.value !== undefined &&
          this.productDescription !== null
        ) {
          if (
            this.image1 !== "" &&
            this.file1 !== undefined &&
            this.productName !== "" &&
            this.productDescription.length >= 15 &&
            this.productDescription.length <= 500 &&
            parseFloat(this.productLong) > 0 &&
            parseFloat(this.productH) > 0 &&
            parseFloat(this.productW) > 0
          ) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
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
    this.$store.dispatch("post/getCategories").then(() => {
      this.loadingCategories = false;
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

  get categories() {
    const categories = this.$store.getters["post/getCategories"];
    let autocompleteCategories: any = [];

    if (categories.length !== undefined) {
      categories.forEach((category: any) => {
        autocompleteCategories.push({
          text: category.category_name,
          value: category.category_id,
        });
      });
    }

    return autocompleteCategories;
  }
}
</script>

<style lang="scss">
.photoPreviews {
  border: 1px solid black;
}
</style>
