import app from "../utils/axiosConfig";

export default {
  state: {
    user: {},
    processes: [],
  },
  getters: {
    userData(state) {
      return state.user;
    },
    userProcesses(state) {
      return state.processes;
    },
  },
  mutations: {
    setUserData(state, user) {
      state.user = user;
    },
  },
  actions: {
    async getUserData(context) {
      await app
        .get("user")
        .then((res) => {
          context.commit("setUserData", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
