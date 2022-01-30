<template>
  <MainPageRequestItem />
</template>

<script>
export default {
  // защита роутa
  middleware: ["checkAuth"],
};
</script>

