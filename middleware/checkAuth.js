export default function ({ store, redirect }) {
  // console.log('checkAuth', store.getters['login/isAuth'])
  if (!store.getters['login/isAuth']) {
    redirect('/auth')
  }
}
