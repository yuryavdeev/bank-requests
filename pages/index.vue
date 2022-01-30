<template>
  <MainPage />
</template>

<script>
export default {
  // защита роутa
  middleware: ["checkAuth"],
};
// этот вариант исключил из-за траффика (отправка отрисов-й страницы при каждом переходе на роут /) ->
// доступ на комп-х уровня страницы <- на сервере -> данные как пропс вниз в <MainPage /> - отрисуется с данными на сервере

// export default {
//   async asyncData({ store }) {
//     await store.dispatch("load");
//   },
// };
</script>
