export const state = () => ({
  message: null, // объект из index.js и  с value (текст) и type (для стилей - danger...)
})

export const mutations = {
  setMessage(state, message) { // создать сообщение (от сервера)
    state.message = message
  },
  clearMessage(state) { // очистка сообщения
    // console.log('clearMessage')
    state.message = null
  }
}

export const actions = {
  showMessage({ commit }, message) { // вызов в auth.js => показ ошибки и ее очистка через 4 сек. (в AppPopup.vue)
    commit('setMessage', message)
    setTimeout(() => {
      commit('clearMessage')
    }, 4000)
  }
}
