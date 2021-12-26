import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  configure,
} from 'vee-validate'

import {
  required,
  email,
  alpha_spaces,
  numeric,
  min,
} from 'vee-validate/dist/rules'


extend('required', {
  ...required,
  message: 'Поле не может быть пустым'
})

extend('min', min)

extend('numeric', {
  ...numeric,
  message: 'Поле может содержать только целые цифры'
})

extend('alpha_spaces', {
  ...alpha_spaces,
  message: 'Поле может содержать только буквы или пробелы'
})

extend('email', {
  ...email,
  message: 'Введите валидный email'
})

extend('phone', {
  validate: value => {
    if (!value) return true
    const regex = /^[0-9\s- +]*$/g
    return Boolean(value.match(regex))
  },
  message: 'Введите цифры, тире или плюс'
})

configure({
  classes: {
    invalid: 'is-invalid'
  }
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
