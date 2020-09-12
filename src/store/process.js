import app from "../utils/axiosConfig";
import moment from "moment";
moment.locale("ru");

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
          title: payload.title,
          stages: payload.stages,
          state: "create",
          date: moment(new Date()).format("lll"),
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
