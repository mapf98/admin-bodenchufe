import providerService from "../../services/providerService";

export default {
  namespaced: true,
  state: {
    providers: [],
  },
  getters: {},
  mutations: {},
  actions: {
    updatePost: async (context: any, payload: any) => {
      return await providerService.updatePost(payload);
    },
    updatePostStatus: async (context: any, payload: any) => {
      return await providerService.updatePostStatus(payload);
    },
    updateProviderStatus: async (context: any, payload: any) => {
      return await providerService.updateProviderStatus(payload);
    },
    createProvider: async (context: any, payload: any) => {
      return await providerService.createProvider(payload);
    },
  },
};
