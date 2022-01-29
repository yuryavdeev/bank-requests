<template>
  <UiAppPage title="Список заявок">
    <template #header>
      <b-button
        v-b-modal.modal-1
        class="ml-auto h-75 my-auto"
        variant="success"
      >
        Создать
      </b-button>
    </template>
    <TheModalForm title="Создать заявку" />
    <TheRequestsTable />
  </UiAppPage>
</template>

<script>
import TheRequestsTable from "./TheRequestsTable.vue";

export default {
  components: { TheRequestsTable },
};
</script>
