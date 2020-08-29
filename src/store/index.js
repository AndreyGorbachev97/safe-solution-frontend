import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import user from "./user";
import process from "./process";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    process,
  },
});
