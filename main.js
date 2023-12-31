import Vue from 'vue';
import App from './App.vue'; 
import Vuelidate from 'vuelidate';


new Vue({
  el: '#app',
  render: h => h(App)
});

Vue.use(Vuelidate);