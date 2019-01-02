import Vue from 'vue'
import App from './App'
//  import VConsole from 'vconsole'
Vue.config.productionTip = false
App.mpType = 'app'
// 
// if(process.env.NODE_ENV==='development'){
//     var vConsole = new VConsole();
//   }
const app = new Vue(App)
app.$mount()
