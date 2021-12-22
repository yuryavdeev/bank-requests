import axios from 'axios'
// // import { error } from '../../utils/error'

// {
//   amount: 65500,
//   fio: 'А. Денисов',
//   phone: '+7-855-698-25-14',
//   status: 'done',
//   id: '-MqdqZXrMspMxvHS8kMe'
// }


export const state = () => ({
  form: {
    email: "test@mail.ru",
    password: "123456"
  },
  token: '',
  requests: {},
})

export const mutations = {
  setToken(state, token) {
    state.token = token
    console.log('token', token) // <<<<<<<<<<<<<<<<<<<<<<<<<<<<
  },
  setRequests(state, requests) {
    // развернул влож. объект и добавил id (он же key)
    state.requests = Object.keys(requests).map(id => ({ ...requests[id], id }))
    console.log('requests', state.requests) // <<<<<<<<<<<<<<<<
  }
}

export const actions = {
  // nuxtServerInit - срабатывает один раз на сервере, 2-й парам. - context
  async nuxtServerInit({ commit, state }, { store }) {
    const form = {...state.form}
    console.log(form)
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`
    const { data } = await axios.post(url, {
      ...form,
      returnSecureToken: true,
    })
    if (data) {
      commit('setToken', data.idToken)
    }
  },

  async load({ commit, state }) {
    try {
      const token = state.token
      const { data } = await axios.get(`${process.env.baseUrl}/request.json?auth=${token}`)
      // в data - объекты, где ключ - сгенерир. базой id и значением - объектом данных из формы
      commit('setRequests', data)
      return data
    } catch (err) {
      console.log(err)
      // dispatch('showMessage', {
      //   value: err.message,
      //   type: 'danger'
      // }, { root: true })
    }
  },

  async remove({ dispatch, state }, id) { // удаление записи
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
}

export const getters = {
  token(state) {
    return state.token
  },
  requests(state) {
    return state.requests
  }
}
