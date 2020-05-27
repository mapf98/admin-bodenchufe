import Vue from "vue";
import postService from "../../services/postService";
import { fb } from "../../firebase";

async function uploadTaskPromise(productId: any, imageFile: any) {
  return new Promise(function (resolve, reject) {
    const storageRef = fb
      .storage()
      .ref("images/products/" + productId + "/" + imageFile.name);
    const uploadTask = storageRef.put(imageFile);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      async () => {
        await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    products: [],
    providers: [],
    offers: [],
    categories: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getProducts: (state: any) => state.products,
    getProviders: (state: any) => state.providers,
    getOffers: (state: any) => state.offers,
    getCategories: (state: any) => state.categories,
  },
  // -----------------------------------------------------------------
  mutations: {
    // Aqui se setean los atributos del state
    setProducts(state: any, products: any) {
      Vue.set(state, "products", products);
    },
    setProviders(state: any, providers: any) {
      Vue.set(state, "providers", providers);
    },
    setOffers(state: any, offers: any) {
      Vue.set(state, "offers", offers);
    },
    setCategories(state: any, categories: any) {
      Vue.set(state, "categories", categories);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    // create: (context, bankData) => {
    //   // stuff to create a new bank on the backend : CRUD CREATE ACTION
    // },
    getProducts: async (context: any) => {
      await postService.getProducts().then((response: any) => {
        context.commit("setProducts", response.data.product);
      });
    },
    getProviders: async (context: any) => {
      await postService.getProviders().then((response: any) => {
        context.commit("setProviders", response.data.providers);
      });
    },
    getOffers: async (context: any) => {
      await postService.getOffers().then((response: any) => {
        context.commit("setOffers", response.data.offers);
      });
    },
    getCategories: async (context: any) => {
      await postService.getCategories().then((response: any) => {
        context.commit("setCategories", response.data.categories);
      });
    },
    createPost: async (context: any, payload: any) => {
      await postService.createPost(payload);
    },
    // update: (context, bankData) => {
    //   // stuff to update bank data to the backend : CRUD UPDATE ACTION
    // },
    // delete: context => {
    //   // stuff to erase bank on the backend : CRUD DELETE ACTION
    // },
  },
};
