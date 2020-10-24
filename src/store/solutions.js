import app from "../utils/axiosConfig";

export default {
  state: {
    list: [],
  },
  getters: {
    listSolutions: (state) => state.list,
  },
  mutations: {
    setListSolutions(state, list) {
      state.list = list;
    },
    setSolution(state, solution) {
      const index = state.list.findIndex((el) => el._id === solution._id);
      if(index >= 0) state.list.splice(index, 1, solution);
    },
  },
  actions: {
    async addVote(context, payload) {
      await app.post("/solutions", payload)
        .then((res) => {
          context.commit('setSolution', res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    async getListSolutions(context) {
      await app.get('/solutions')
        .then((res) => {
          context.commit('setListSolutions', res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    SOCKET_addedProcess(context, message) {
      console.log('process:', message);
      console.log(`Пользователь ${message.user.name} ${message.user.surname} создал процесс согласования в котором вы являетесь участником`);
      app.get('/solutions')
        .then((res) => {
          context.commit('setListSolutions', res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    SOCKET_changeSolution(context, message) {
      console.log('message:', message);
      app.get('/solutions')
        .then((res) => {
          context.commit('setListSolutions', res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
  },
}