import app from "../utils/axiosConfig";

export default {
  state: {
    colleagues: [],
  },
  getters: {
    colleaguesList: (state) => state.colleagues,
  },
  mutations: {
    setColleagues(state, colleagues) {
      state.colleagues = colleagues;
    },
  },
  actions: {
    async getColleagues(context, payload) {
      app
        .get("/emtity", {
          params: {
            name: payload,
          },
        })
        .then((res) => {
          context.commit("setColleagues", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
