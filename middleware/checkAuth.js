export default function ({ store, redirect }) {
  // store.getters['login/isAuth'] - синтаксис для геттера из модуля login
  // console.log('checkAuth', store.getters['login/isAuth'])
  if (!store.getters['login/isAuth']) {
    redirect('/auth')
  }
}
