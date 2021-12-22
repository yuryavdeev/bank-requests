<template>
  <b-button
    class="py-0"
    small
    :variant="classesMap[$props.type]"
    :disabled="$route.params.userId"
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

  // для динамики отрисовки возврата сервера  - при обновлении записи (в Request.vue)
  // watch(props, (val) => {
  //   className.value = classesMap[val.type]
  //   text.value = textMap[val.type]
  // }),
};
</script>
