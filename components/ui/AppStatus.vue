<template>
  <b-button
    class="py-0"
    style="width: 115px;"
    small
    :variant="classesMap[$props.type]"
    :disabled="!!$route.params.userId"
  >
    {{ textMap[$props.type] }}
  </b-button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ["active", "cancelled", "done", "pending"].includes(value);
      },
    },
  },

  data() {
    return {
      classesMap: {
        active: "outline-primary",
        cancelled: "outline-danger",
        done: "outline-success",
        pending: "outline-secondary",
      },

      textMap: {
        active: "Активен",
        cancelled: "Отменён",
        done: "Завершён",
        pending: "В работе",
      },
    };
  },
};
</script>
