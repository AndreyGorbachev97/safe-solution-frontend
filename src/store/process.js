import app from "../utils/axiosConfig";
import moment from "moment";
moment.locale("ru");

export default {
  state: {
    colleagues: [],
    listProcesses: [],
  },
  getters: {
    colleaguesList: (state) => state.colleagues,
    listProcesses: (state) => state.listProcesses,
  },
  mutations: {
    setColleagues(state, colleagues) {
      state.colleagues = colleagues;
    },
    setListProcesses(state, processes) {
      state.listProcesses = processes;
    },
  },
  actions: {
    async getListProcesses(context) {
      app
        .get("/processes")
        .then((res) => {
          context.commit("setListProcesses", res.data.items);
        })
        .catch((e) => {
          console.log(e);
        });
    },
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
