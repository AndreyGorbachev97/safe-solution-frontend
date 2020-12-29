import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: JSON.parse(localStorage.getItem('theme')),
    themes: {
      light: {
        background: '#eeeeee',
      },
      dark: {
        background: '#121212',
      },
    },
  },
});
