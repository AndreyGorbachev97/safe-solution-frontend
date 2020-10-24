import app from "../utils/axiosConfig";
import moment from "moment";
moment.locale("ru");

export default {
  state: {
    colleagues: [],
    listProcesses: [],
    currentProcess: {},
  },
  getters: {
    colleaguesList: (state) => state.colleagues,
    listProcesses: (state) => state.listProcesses,
    currentProcess: (state) => state.currentProcess,
  },
  mutations: {
    setColleagues(state, colleagues) {
      state.colleagues = colleagues;
    },
    setListProcesses(state, processes) {
      state.listProcesses = processes;
    },
    setProcess(state, process) {
      state.currentProcess = process;
    },
  },
  actions: {
    SOCKET_changeProcess(context, message) {
      console.log('process:', message);
      app
        .get("/processes")
        .then((res) => {
          context.commit("setListProcesses", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getProcess(context, id) {
      await app.get(`/processes/${id}`)
        .then((res) => {
          context.commit("setProcess", res.data);
        })
        .catch((e) => {
          console.error(e);
        })
    },
    async getListProcesses(context) {
      app
        .get("/processes")
        .then((res) => {
          context.commit("setListProcesses", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getColleagues(context, payload) {
      app
        .get("/entity", {
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
    async downloadFile(contex, payload) {
      await app
        .get("processes/download", {
          params: {
            path: payload,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async uploadFile(context, payload) {
      console.log("file....", payload);
      await app
        .post("/processes/addFile", payload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.get("file"));
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async createProcess(context, payload) {
      await app
        .post("/processes/addFile", payload.file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data.get("file"));
        })
        .catch((e) => {
          console.log(e);
        });
      await app
        .post("/processes/add", {
          fileName: payload.file.get("file").name,
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
