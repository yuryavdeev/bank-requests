<template>
  <MainPageRequestItem />
</template>

<script>
export default {
  // защита роутa
  middleware: ["checkAuth"],

  // валидация перед переходом на роут - чтобы вывести кастомную страницу ошибки (на продакте не работает)
  validate({ params, store }) {
    let is = store.getters.requests.some(request => request.id === params.userId)
    return is
  },
};
</script>
