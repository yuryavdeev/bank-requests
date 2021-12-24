<template>
  <b-modal id="modal-1" :title="title">
    <!-- <h3 v-if="title">{{  }}</h3> -->
    <slot />

    <template #modal-footer>
      <b-button size="sm" variant="success">Отправить</b-button>
    </template>
  </b-modal>

  <!-- <div class="modal-backdrop" @click.stop="$emit('close')"></div>
  <div class="modal">
    <h3 v-if="title">{{ title }}</h3>
    <slot />
  </div> -->
</template>

<script>
export default {
  //   emits: ['close'],
  props: ["title"],
};
</script>

<style scoped></style>
