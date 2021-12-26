<template>
  <ui-app-page title="Список заявок">
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

    <div>
      <b-table
        bordered
        head-variant="light"
        hover
        :items="requests"
        :fields="fields"
        sort-icon-left
        responsive="sm"
      >
        <template #cell(№)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(amount)="data">
          {{ currency(data.item.amount) }}
        </template>

        <template #cell(status)="data">
          <!-- cм. -> https://router.vuejs.org/ru/api/#router-link -->
          <!-- name: 'request-userId' - автоматич. Nuxt сгенерир. имя роута -->
          <router-link
            v-slot="{ navigate }"
            custom
            :to="{ name: 'request-userId', params: { userId: data.item.id } }"
          >
            <span @click="navigate">
              <UiAppStatus :type="data.item.status" />
            </span>
          </router-link>
        </template>
      </b-table>
    </div>
  </ui-app-page>
</template>

<script>
import { currency } from "../middleware/currency";

export default {
  // props: ['requests'], // - 2-й вариант получ-я данных (в index.vue ч/з asyncData при переходе на Main)

  data() {
    return {
      currency,
      fields: [
        "№",
        { sortable: true, key: "fio", label: "ФИО" },
        { sortable: true, key: "amount", label: "Сумма" },
        { key: "phone", label: "Телефон" },
        { sortable: true, key: "status", label: "Статус" },
      ],
    };
  },

  computed: {
    requests() {
      return this.$store.getters.requests;
    },
  },
};
</script>
