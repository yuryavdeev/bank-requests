import axios from 'axios'

export const state = () => ({
  token: null,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
    console.log('token', state.token) // <<<<<<<<<<<<<<<<
  },

  logout(state) { // удалил токен только на своей стороне
    state.token = null
  }
}

export const actions = {
  async login({ commit, dispatch }, form) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`
    const { data } = await axios.post(url, {
      ...form,
      returnSecureToken: true,
    })
    if (data) {
      commit('setToken', data.idToken)
      // - загруз. список заявок -> отрис-ть (от nuxtServerInit - на сервере или от Auth.vue - на клиенте)
      // { root: true } - 3-м аргументом
      await dispatch('load', null, { root: true })
      return true
    }
  },
}

export const getters = {
  token: state => state.token,

  isAuth(_, getters) { // _, - пропуск 1-го параметра
    return getters.token // -> вернет булевое значение
  }
}
