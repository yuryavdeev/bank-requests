<template>
  <div>
    <div v-if="error.statusCode === 404">
      <h1>Код ошибки - {{ error.statusCode }}</h1>
      <h2>{{ error.message }}</h2>
      <hr />
      <NuxtLink v-if="$store.getters['login/isAuth']" to="/">
        На главную страницу
      </NuxtLink>
      <NuxtLink v-else to="/auth">Авторизоваться</NuxtLink>
    </div>

    <div v-else>
      <h1>Что-то пошло не так...</h1>
      <hr />
      <NuxtLink v-if="$store.getters['login/isAuth']" to="/">
        На главную страницу
      </NuxtLink>
      <NuxtLink v-else to="/auth">Авторизоваться</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: Object
  },
  layout: "start",
};
</script>

<style scoped>
div {
  width: 800px;
  margin: 100px auto 0;
}

h1,
h2 {
  color: red;
}
</style>
