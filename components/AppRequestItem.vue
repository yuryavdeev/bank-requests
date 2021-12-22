<template>
  <UiAppPage title="Заявка">
    <p><strong>Имя</strong>: {{ user.fio }}</p>
    <p><strong>Телефон</strong>: {{ user.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(user.amount) }}</p>
    <p><strong>Статус</strong>: <UiAppStatus :type="user.status" /></p>

    <div class="col-5 mb-4 p-0">
      <label for="status"><strong>Новый статус: </strong></label>
      <b-form-select size="sm" id="status" v-model="status" :options="options">
      </b-form-select>
    </div>

    <b-button class="mr-3" variant="outline-danger" @click="remove">Удалить</b-button>
    <b-button variant="outline-info" v-if="isChangesStatus">Обновить</b-button>
  </UiAppPage>
</template>

<script>
import { currency } from "../middleware/currency";

export default {
  data() {
    return {
      currency,
      user: {},
      status: null,
      options: [
        { value: "active", text: "Активен" },
        { value: "cancelled", text: "Отменен" },
        { value: "done", text: "Завершен" },
        { value: "pending", text: "В работе" },
      ],
    };
  },

  mounted() {
    this.user = this.$store.getters.requests.find(
      (request) => request.id === this.$route.params.userId
    );
    this.status = this.user.status;
  },

  computed: {
    isChangesStatus() {
      return this.status !== this.user.status;
    },
  },

  methods: {
    async remove() {
      // удалить на своей стороне при переходе на /
      await this.$store.dispatch("remove", this.$route.params.userId);
      this.$router.push("/");
    },

    // async update() {
    //   // status: status.value - чтобы отправить на сервер новый выбранный статус (связан через v-model)
    //   const data = {...request.value, status: status.value , id: this.$route.params.userId}
    //   await store.dispatch('update', data)
    //   request.value.status = status.value // если ответ - ок - локально обновил тут
    // }
  },
};
</script>
