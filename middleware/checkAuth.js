// подписка на мидлвару - в /pages
export default function ({ store, redirect }) {
  if (!store.getters['login/isAuth']) {
    console.log('checkAuth -> redirect("/auth")')
    redirect('/auth')
  }
}
