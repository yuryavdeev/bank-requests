export const state = () => ({
  message: null, // объект из index.js и  с value (текст) и type (для стилей - danger...)
})

export const mutations = {
  setMessage(state, message) { // создать сообщение об ошибке (от сервера)
    state.message = message
  },
  clearMessage(state) { // очистка ошибки
    console.log('clearMessage')
    state.message = null
  }
}

export const actions = {
  showMessage({ commit }, message) { // вызов в auth.js => показ ошибки и ее очистка через 4 сек. (в AppMessage.vue)
    commit('setMessage', message)
    setTimeout(() => {
      commit('clearMessage')
    }, 4000)
  }
}
