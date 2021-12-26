export default function ({ store, redirect }) {
  console.log('checkAuth')
  if (!store.getters.isAuth) {
    // console.log('isAuth', store.getters.isAuth)
    redirect('/auth')
  }
}
