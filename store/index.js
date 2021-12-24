import axios from 'axios'
// // import { error } from '../../utils/error'


export const state = () => ({
  form: {
    email: "test@mail.ru",
    password: "123456"
  },
  token: '',
  requests: [],
})

export const mutations = {
  setToken(state, token) {
    state.token = token
    console.log('token', token) // <<<<<<<<<<<<<<<<<<<<<<
  },
  setRequests(state, requests) {
    state.requests = requests
    console.log('requests', requests) // <<<<<<<<<<<<<<<<
  },
  addRequest(state, newRequest) {
    state.requests.push(newRequest)
    console.log(newRequest)
  },
}

export const actions = {
  // nuxtServerInit - срабатывает один раз на сервере, 2-й парам. - context
  async nuxtServerInit({ commit, dispatch, state }, { store }) {
    const form = { ...state.form }
    // console.log(form)
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`
    const { data } = await axios.post(url, {
      ...form,
      returnSecureToken: true,
    })
    if (data) {
      commit('setToken', data.idToken)
      await dispatch('load') // - загрузить список заявок -> отрисовать на сервере
    }
  },

  async load({ commit, state }) {
    try {
      const token = state.token
      const { data } = await axios.get(`${process.env.baseUrl}/request.json?auth=${token}`)
      // в data - объекты, где ключ - сгенерир. базой id и значением - объектом данных из формы
      // развернул влож. объект и добавил id (он же key)
      const requests = Object.keys(data).map(id => ({ ...data[id], id }))
      commit('setRequests', requests) // - меняю список заявок локально - не подгружаю с сревера в компоненте
    } catch (err) {
      console.log(err)
      // dispatch('showMessage', {
      //   value: err.message,
      //   type: 'danger'
      // }, { root: true })
    }
  },

  async create({ commit, dispatch }, payload) {
    try {
      const token = state.token
      const { data } = await axios.post(`${process.env.baseUrl}/request.json?auth=${token}`, payload)
      // в список - данные от формы - payload и добавл. к нему данные сервера - id: data.name
      commit('addRequest', { ...payload, id: data.name })
      // dispatch('showMessage', {
      //   value: 'Заявка успешно создана',
      //   type: 'primary'
      // }, { root: true })
    } catch (err) {
      console.log(err)
      // dispatch('showMessage', {
      //   value: err.message,
      //   type: 'danger'
      // }, { root: true })
    }
  },

  async remove({ dispatch, state }, id) { // обновить стор после успешного удаления
    try {
      const token = state.token
      await axios.delete(`${process.env.baseUrl}/request/${id}.json?auth=${token}`)
      // dispatch('showMessage', {
      //   value: 'Запись удалена',
      //   type: 'primary'
      // }, { root: true })
    } catch (err) {
      console.log(err)
      // dispatch('showMessage', {
      //   value: err.message,
      //   type: 'danger'
      // }, { root: true })
    }
  },

  async update({ dispatch, state }, request) { // обновить стор после успешного обновления
    console.log('inUpdate')
    try {
      const token = state.token
      await axios.put(`${process.env.baseUrl}/request/${request.id}.json?auth=${token}`, request)
      // dispatch('showMessage', {
      //   value: 'Запись обновлена',
      //   type: 'primary'
      // }, { root: true })
      console.log('updated')
    } catch (err) {
      console.log(err)
      // dispatch('showMessage', {
      //   value: err.message,
      //   type: 'danger'
      // }, { root: true })
    }
  },
}

export const getters = {
  token(state) {
    return state.token
  },
  requests(state) {
    return state.requests
  }
}
