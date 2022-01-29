<template>
  <b-table
    class="m-0"
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
</template>

<script>
import { currency } from "../middleware/currency";

export default {
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
