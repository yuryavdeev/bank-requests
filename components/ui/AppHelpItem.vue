<template>
  <div @click="isOpen = !isOpen">
    <h4 >{{ question.title }}</h4>
    <p class="pb-4 mb-0" v-if="isOpen">{{ question.text }}</p>
  </div>
</template>

<script>
export default {
  props: ["question"],

  data() {
    return {
      isOpen: false,
    };
  },
};
</script>
