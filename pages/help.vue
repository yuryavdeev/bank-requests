<template>
  <Help />
</template>


<script>
export default {
  // защита роутa
  middleware: ["checkAuth"],
};
</script>
