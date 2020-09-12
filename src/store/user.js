import app from "../utils/axiosConfig";

export default {
  state: {
    user: {},
    isAuthenticated: null,
    processes: [],
  },
  getters: {
    userData(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    userProcesses(state) {
      return state.processes;
    },
  },
  mutations: {
    setUserData(state, user) {
      state.user = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        entity: user.entity,
      };
    },
    setUserProcesses(state, processes) {
      state.processes = processes;
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
            console.log(res.data);
            context.commit("setUserData", res.data);
            context.commit("setUserProcesses", res.data.processes.items);
          }
          context.commit("setIsAuthenticated", res.data.isAuthenticated);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
