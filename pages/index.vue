<template>
  <MainPage />
</template>

<script>
export default {
  // защита роутa
  middleware: ["checkAuth"],

  // этот вариант исключил - работает только при development'e ->
  // доступ на комп-х уровня страницы <- на сервере -> данные как пропс вниз в <MainPage /> - отрисуется с данными на сервере
  // async asyncData({ store }) {
  //   let list = [];
  //   list = await store.dispatch("load");
  //   console.log("asyncData -> MainPage -> ", list);
  //   return { list }
  // },
};
</script>
