import app from "../utils/axiosConfig";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createProcess(context, payload) {
      app
        .post("/processes/add", {
          title: "default",
          stages: payload,
          state: "create",
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
