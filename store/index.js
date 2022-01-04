import axios from 'axios'
// // import { error } from '../../utils/error'


export const state = () => ({
  form: { // - для автоматического вxода + в nuxtServerInit
    email: "test@mail.ru",
    password: "123456"
  },
  requests: [],
})

export const mutations = {
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
  async nuxtServerInit({ commit, dispatch, state, getters }, { req, redirect }) {
    console.log('nuxtServerInit -> ', getters['login/isAuth'])
    if (!getters['login/isAuth']) {
      const form = { ...state.form } // <- и отсюда - dispatch login и рендер "/" <= смысл SSR
      await dispatch('login/login', form)
    }
    // console.log(req.headers) // -> доступ к cookies -> м. сохр. в токен, если API возвр. куки
    // console.log('nuxtServerInit -> state.token -> ', state.login.token)
    // redirect('/auth')  // <- сделал ч/з мидлвару checkAuth для дефолтного лэйаута
  },

  async load({ commit, state, dispatch }) {
    try {
      const token = state.login.token
      const { data } = await axios.get(`${process.env.baseUrl}/request.json?auth=${token}`)
      // в data - объекты, где ключ - сгенерир. базой id и значением - объектом данных из формы
      // развернул влож. объект и добавил id (он же key)
      const requests = Object.keys(data).map(id => ({ ...data[id], id }))
      commit('setRequests', requests) // - меняю список заявок локально - не подгружаю с сревера в компоненте
    } catch (err) {
      console.log(err)
      dispatch('loadingMessage/showMessage', {
        value: err.message,
        type: 'danger'
      })
    }
  },

  async create({ commit, state, dispatch }, payload) {
    try {
      const token = state.login.token
      const { data } = await axios.post(`${process.env.baseUrl}/request.json?auth=${token}`, payload)
      // в список - данные от формы - payload и добавл. к нему данные сервера - id: data.name
      commit('addRequest', { ...payload, id: data.name })
      dispatch('loadingMessage/showMessage', {
        value: 'Заявка успешно создана',
        type: 'primary'
      })
    } catch (err) {
      console.log(err)
      dispatch('loadingMessage/showMessage', {
        value: err.message,
        type: 'danger'
      })
    }
  },

  async remove({ dispatch, state }, id) { // обновить стор после успешного удаления
    try {
      const token = state.login.token
      await axios.delete(`${process.env.baseUrl}/request/${id}.json?auth=${token}`)
      dispatch('loadingMessage/showMessage', {
        value: 'Запись удалена',
        type: 'primary'
      })
    } catch (err) {
      console.log(err)
      dispatch('loadingMessage/showMessage', {
        value: err.message,
        type: 'danger'
      })
    }
  },

  async update({ dispatch, state }, request) { // обновить стор после успешного обновления
    try {
      const token = state.login.token
      await axios.put(`${process.env.baseUrl}/request/${request.id}.json?auth=${token}`, request)
      dispatch('loadingMessage/showMessage', {
        value: 'Запись обновлена',
        type: 'primary'
      })
    } catch (err) {
      console.log(err)
      dispatch('loadingMessage/showMessage', {
        value: err.message,
        type: 'danger'
      })
    }
  },
}

export const getters = {
  requests(state) {
    return state.requests
  }
}
