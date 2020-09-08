import app from "../utils/axiosConfig";

export default {
  state: {
    user: {},
    isAuthenticated: null,
  },
  getters: {
    userData(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
  },
  mutations: {
    setUserData(state, user) {
      state.user = user;
    },
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
  actions: {
    async getUserData(context) {
      await app
        .get("user")
        .then((res) => {
          if (res.data.isAuthenticated) {
            context.commit("setUserData", res.data);
          }
          context.commit("setIsAuthenticated", res.data.isAuthenticated);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
