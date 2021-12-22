<template>
  <Main />
</template>

<script>
export default {
  async asyncData({ store }) {
    // - доступен только на комп-х уровня страницы <- доступ на сервере -> как пропс вниз => доч. компонет отрисуется с данными полученными на сервере
    if (Object.keys(store.getters.requests).length) {
      // const data = store.getters.requests; // - чтобы работать с массивом в Main - получаю из стора, а не пропсом
      return;
    } else {
      const data = await store.dispatch("load");
      // return { data };
    }
  },
};
</script>
