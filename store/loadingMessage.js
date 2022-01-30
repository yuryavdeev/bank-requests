export const state = () => ({
  message: null, // диспатчится объект из index.js или login.js (где value - текст, type - для стилей - danger...)
})

export const mutations = {
  setMessage(state, message) { // создать сообщение (от сервера)
    state.message = message
  },
  clearMessage(state) { // очистка сообщения
    state.message = null
  }
}

export const actions = {
  showMessage({ commit }, message) { // в ThePopup.vue: div -> v-if="store.state.loadingMessage.message"
    commit('setMessage', message)
    setTimeout(() => {
      commit('clearMessage')
    }, 3000)
  }
}
