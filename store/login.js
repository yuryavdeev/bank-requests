import axios from 'axios'
import { createErrorMessage } from '../middleware/errorAuth'


export const state = () => ({
  token: null,
})


export const mutations = {
  setToken(state, token) {
    state.token = token
  },

  logout(state) { // удалил токен только на своей стороне
    state.token = null
  }
}


export const actions = {

  async login({ commit, dispatch }, form) {
    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`

      const { data } = await axios.post(url, { ...form, returnSecureToken: true })

      commit('setToken', data.idToken)

      // - загруз. список заявок -> отрис-ть (от nuxtServerInit - на сервере или от AuthPage.vue - на клиенте)
      await dispatch('load', null, { root: true })

    } catch (err) {
      dispatch('loadingMessage/showMessage', {
        value: createErrorMessage(err.response.data.error.message),
        type: 'danger'
      }, { root: true }) // доступ к loadingMessage/showMessage через { root: true }
      throw new Error() // -> исключить router.push('/') после сабмита в AuthPage.vue - там соотв. try/catch
    }
  },
}


export const getters = {
  token: state => state.token,

  isAuth(_, getters) { // _, - пропуск 1-го параметра
    return !!getters.token
  }
}
