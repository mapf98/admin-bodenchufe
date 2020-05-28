<template>
  <v-row>
    <v-col>
      <v-card class="d-flex flex-wrap" outlined elevation="2">
        <v-col :cols="responsive()">
          <v-list-item-avatar tile size="160">
            <v-img :src="product.product_photo"></v-img>
          </v-list-item-avatar>
        </v-col>
        <v-col>
          <v-list-item-title class="headline mb-1">{{
            product.product_name
          }}</v-list-item-title>
          <v-row>
            <v-col>
              <v-text-field
                v-model="product.product_provider_price"
                label="Price"
                outlined
                prefix="$"
                type="number"
                min="1"
                :disabled="!edit"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="In stock"
                outlined
                type="number"
                min="1"
                v-model="product.product_provider_available_quantity"
                prefix="Units:"
                :disabled="!edit"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete
                :items="offers"
                v-model="selectedOffer"
                type="text"
                outlined
                return-object
                clearable
                label="Discount"
                :disabled="!edit"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-card-text class="indigo--text" v-if="invalidPrice">
              The product price must be greater than 0 $
            </v-card-text>
            <v-card-text class="indigo--text" v-if="invalidStock">
              The Stock must be greater than 0
            </v-card-text>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                outlined
                clearable
                counter
                rows="3"
                auto-grow
                v-model="product.product_provider_description"
                label="Post description"
                :disabled="!edit"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-end">
            <v-btn
              v-if="edit"
              x-small
              color="amber"
              class="mr-12 black--text font-weight-light"
              @click="updatePost()"
              :loading="loadingUpdate"
            >
              Update post
            </v-btn>
            <v-btn
              v-if="edit"
              x-small
              color="red"
              class="mr-12 white--text font-weight-light"
              @click="updatePostStatus()"
              :loading="loadingStatus"
            >
              {{ showStatus() }}
            </v-btn>
            <v-chip
              v-if="edit"
              outlined
              small
              :color="setStatusColor(product.product_status)"
              :text-color="setStatusColor(product.product_status)"
              class="mr-12"
            >
              STATUS: {{ product.product_status }}
            </v-chip>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      color="success"
      class="mb-8 ml-8"
      right
      bottom
    >
      Post successfully updated
      <v-btn text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ProviderPosts extends Vue {
  @Prop() product!: any;
  @Prop() providerStatus!: any;

  quantity = "Quantity";
  loadingUpdate = false;
  loadingStatus = false;
  edit = this.providerStatus == "INACTIVE" ? false : true;
  selectedOffer: any = {
    text: this.product.product_discount_rate,
    value: this.product.product_discount_id,
  };
  snackbar = false;
  invalidPrice = false;
  invalidStock = false;

  mounted() {
    this.$store.dispatch("post/getOffers");
  }

  @Watch("providerStatus")
  canEdit() {
    if (this.providerStatus === "INACTIVE") this.edit = false;
    else this.edit = true;
  }

  setStatusColor(status: any) {
    if (status == "ACTIVE") return "teal darken-1";
    if (status == "INACTIVE") return "deep-orange darken-4";
  }

  showStatus() {
    if (this.product.product_status == "ACTIVE") return "Don't show post";
    else return "Show post";
  }

  updatePost() {
    this.invalidPrice = false;
    this.invalidStock = false;
    if (this.product.product_provider_price < 1) {
      this.invalidPrice = true;
    }
    if (this.product.product_provider_available_quantity < 1) {
      this.invalidStock = true;
    }
    if (!this.invalidPrice && !this.invalidStock) {
      this.loadingUpdate = true;
      this.$store
        .dispatch("provider/updatePost", {
          description:
            this.product.product_provider_description == ""
              ? null
              : this.product.product_provider_description,
          price: this.product.product_provider_price,
          available_quantity: this.product.product_provider_available_quantity,
          offer_rate:
            this.selectedOffer === undefined ? null : this.selectedOffer.text,
          post_id: this.product.product_provider_id,
        })
        .then(() => {
          this.loadingUpdate = false;
          this.snackbar = true;
          this.invalidPrice = false;
          this.invalidStock = false;
        });
    }
  }

  updatePostStatus() {
    this.loadingStatus = true;
    let newStatus = "";

    if (this.product.product_status === "ACTIVE") newStatus = "INACTIVE";
    else newStatus = "ACTIVE";

    this.$store
      .dispatch("provider/updatePostStatus", {
        post_id: this.product.product_provider_id,
        status_name: newStatus,
      })
      .then(() => {
        this.loadingStatus = false;
        this.$store.dispatch("post/getProviders");
      });
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

  getProductPrice() {
    if (this.product.discount != null) {
      return (
        Math.round(
          this.product.product_provider_price *
            (1 - this.product.discount.split("%")[0] / 100) *
            100
        ) / 100
      );
    }
    return Math.round(this.product.product_provider_price * 100) / 100;
  }

  responsive() {
    const { xs, sm } = this.$vuetify.breakpoint;
    return xs || sm ? 12 : 3;
  }
}
</script>

<style lang="scss"></style>
