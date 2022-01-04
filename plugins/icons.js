import Vue from 'vue'
import { BIcon, BIconExclamationCircle, BIconPlus } from 'bootstrap-vue'

// Vue.use(BootstrapVue) -> работает, т.к подключен как модуль в конфиге - ?!? -> и убрал из импортов
Vue.component('BIcon', BIcon)
Vue.component('BIconExclamationCircle', BIconExclamationCircle)
Vue.component('BIconPlus', BIconPlus)
