import axios from 'axios'
import { error } from '../middleware/error'

export const state = () => ({
  token: null,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
    // console.log('token', state.token) // <<<<<<<<<<<<<<<<
  },

  logout(state) { // удалил токен только на своей стороне
    state.token = null
  }
}

export const actions = {
  async login({ commit, dispatch }, form) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`
      const { data } = await axios.post(url, {
        ...form,
        returnSecureToken: true,
      })
      commit('setToken', data.idToken)
      // - загруз. список заявок -> отрис-ть (от nuxtServerInit - на сервере или от Auth.vue - на клиенте)
      // { root: true } - 3-м аргументом
      await dispatch('load', null, { root: true })
    } catch (err) {
      dispatch('loadingMessage/showMessage', {
        value: error(err.response.data.error.message),
        type: 'danger'
      }, { root: true }) // <<<<<<<<<<<<<<<<<< доступ к loadingMessage/showMessage через { root: true }
      // console.log(error(err.response.data.error.message))
      // выкинуть ошибку, чтобы исключить автоматич. router.push('/') после сабмита в Auth.vue- там соотв. try/catch
      throw new Error()
    }
  },
}


export const getters = {
  token: state => state.token,

  isAuth(_, getters) { // _, - пропуск 1-го параметра
    return getters.token // -> вернет булевое значение
  }
}
