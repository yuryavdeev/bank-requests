<template>
  <div>
    <TheNavbar />
    <TheSidebar />
    <TheFooter />
    <Nuxt />
  </div>
</template>

<script>
export default {
  // защита роутов (Main и Help) с этим лэйаутом
  middleware: ["checkAuth"],
};
</script>
