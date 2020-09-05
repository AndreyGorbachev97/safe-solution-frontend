import app from "../utils/axiosConfig";

export default {
  state: {
    registration: null,
    login: null,
    userProfile: {},
  },
  getters: {
    registration(state) {
      return state.registration;
    },
    login(state) {
      return state.login;
    },
    userProfile(state) {
      return state.userProfile;
    },
  },
  mutations: {
    setRegistration(state, registration) {
      state.registration = registration;
    },
    setLogin(state, login) {
      state.login = login;
    },
  },
  actions: {
    SOCKET_news(ctx, m) {
      console.log("message resevid", m);
    },
    async register(context, payload) {
      await app
        .post(`auth/register`, payload)
        .then((res) => {
          console.log(res.data);
          context.commit("setRegistration", res.data.registration);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async logIn(context, payload) {
      await app
        .post(`auth/login`, payload)
        .then((res) => {
          context.commit("setLogin", res.data.login);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async logOut(context) {
      await app
        .get("auth/logout")
        .then((res) => {
          context.commit("setLogin", res.data.login);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
