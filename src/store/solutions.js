import app from "../utils/axiosConfig";

export default {
  state: {
    list: [],
  },
  getters: {
    listSolutions: (state) => state.list,
  },
  mutations: {
    setListSolotions(state, list) {
      state.list = list;
    },
  },
  actions: {
    async addVote(context, payload) {
      await app.post("/solutions", payload)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    async getListSolutions(context) {
      await app.get('/solutions')
        .then((res) => {
          context.commit('setListSolotions', res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    SOCKET_changeProcess(context, message) {
      console.log('process:', message);
      console.log(`Пользователь ${message.user.name} ${message.user.surname} создал процесс согласования в котором вы являетесь участником`);
      app.get('/solutions')
        .then((res) => {
          context.commit('setListSolotions', res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
    SOCKET_changeSolution(context, message) {
      console.log('message:', message);
      app.get('/solutions')
        .then((res) => {
          context.commit('setListSolotions', res.data);
        })
        .catch((e) => {
          console.log(e);
        })
    },
  },
}