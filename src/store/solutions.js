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
    }
  },
  actions: {
    async addVote(context, payload) {
      app.post("/solutions", payload)
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
    }
  },
}