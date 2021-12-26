<template>
  <Auth />
</template>

<script>
export default {
  layout: "start",
  mounted() {
    console.log('mounted "/auth" -> isAuth -> ', this.$store.getters.isAuth)
  }
};
</script>
