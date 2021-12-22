<template>
  <div class="container col-8 my-5 p-4">
    <h1>
      {{ title }}
      <hr />
      <!-- <slot name="header" /> - для доп. контента в тайтле - напр. кнопка -->
      <slot name="header" />
    </h1>
    <!-- <slot/> - указал куда складывать осн. контент -->
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

  setup(props) {
    // меняем тайтл вкладки
    document.title = `${props.title} | КлонБанк`;
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
