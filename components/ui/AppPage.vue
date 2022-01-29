<template>
    <div class="container col-8 p-4" v-cloak>
      <b-row class="px-3">
        <h1 class="m-0 p-0">
          {{ title }}
        </h1>
        <!-- доп. контент в тайтле -> тут кнопка -->
        <slot name="header" />
      </b-row>
      <hr />
      <!-- осн. контент -->
      <slot />
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
  border-radius: 6px;
}

h1 {
  font-weight: 700;
}
</style>
