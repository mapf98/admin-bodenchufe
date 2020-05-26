import Vue from "vue";
import postService from "../../services/postService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    // Aqui van los atributos
    products: [],
    providers: [],
    offers: [],
  },
  // -----------------------------------------------------------------
  getters: {
    // getters and computed props
    getProducts: (state: any) => state.products,
    getProviders: (state: any) => state.providers,
    getOffers: (state: any) => state.offers,
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
