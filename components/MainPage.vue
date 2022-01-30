<template>
  <ui-page-frame title="Список заявок">
    <template #header>
      <b-button
        v-b-modal.modal-1
        class="ml-auto h-75 my-auto"
        variant="success"
      >
        Создать
      </b-button>
    </template>
    <MainPageFormNewRequest title="Создать заявку" />
    <MainPageTable />
  </ui-page-frame>
</template>
