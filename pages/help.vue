<template>
  <HelpPage />
</template>


<script>
export default {
  // защита роутa
  middleware: ["checkAuth"],
};
</script>
