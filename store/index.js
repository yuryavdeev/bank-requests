import axios from 'axios'


export const state = () => ({
  form: { // - для автоматического вxода - см. в nuxtServerInit
    email: "test@mail.ru",
    password: "123456"
  },
  requests: [],
})


export const mutations = {
  setRequests(state, requests) {
    state.requests = requests
    console.log('store -> load -> setRequests ->', state.requests)
  },

  addRequest(state, newRequest) {
    state.requests.push(newRequest)
  },
}


export const actions = {

  // nuxtServerInit - срабатывает один раз на сервере, 2-й парам. - context
  async nuxtServerInit({ dispatch, state, getters }, { req, redirect }) {
    console.log('nuxtServerInit -> login/isAuth -> ', getters['login/isAuth'])
    if (!getters['login/isAuth']) {
      const form = { ...state.form } // <- и отсюда - dispatch login и рендер "/" <= смысл SSR
      await dispatch('login/login', form)
    }
    // console.log(req.headers) // -> доступ к cookies -> м. сохр. в токен, если API возвр. куки
  },

  async load({ commit, state, dispatch }) {
    try {
      const token = state.login.token
      
      // в data - объекты (ключ - сгенерир. базой id, значение - объект данных из формы)
      const { data } = await axios.get(`${process.env.baseUrl}/request.json?auth=${token}`)

      // развернул влож. объект и добавил id (он же key)
      const requests = Object.keys(data).map(id => ({ ...data[id], id }))
      commit('setRequests', requests) // - меняю список заявок локально в сторe
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

      // в список - данные от формы (payload) + добавл. к нему данные сервера -> id -> data.name
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

  async remove({ dispatch, state }, id) {
    try {
      const token = state.login.token
      await axios.delete(`${process.env.baseUrl}/request/${id}.json?auth=${token}`)

      // обновление стора после успешного удаления ->
      await dispatch('load')

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

  async update({ dispatch, state }, request) {
    try {
      const token = state.login.token
      await axios.put(`${process.env.baseUrl}/request/${request.id}.json?auth=${token}`, request)

      // обновление стора после успешного обновления ->
      await dispatch('load')

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
