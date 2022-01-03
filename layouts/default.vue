<template>
  <div class="py-5">
    <TheNavbar />
    <Nuxt />
    <TheSidebar />
    <TheFooter />
  </div>
</template>

<script>
export default {
  // защита роутов (Main и Help) с этим лэйаутом
  middleware: ["checkAuth"],
};
</script>
