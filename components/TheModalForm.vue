<template>
  <ValidationObserver v-slot="{ invalid }">
    <b-modal class="col-10" id="modal-1" :title="title">
      <b-form id="createRequest" @submit.prevent="onSubmit">
        <!-- mode="eager" - эффект blur -->
        <ValidationProvider
          mode="eager"
          rules="required|min:2|alpha_spaces"
          v-slot="{ errors }"
        >
          <b-form-group class="mb-0" id="fio" label="ФИО" label-for="fio">
            <b-form-input
              :class="!errors.length ? 'mb-4' : 'border-danger'"
              id="fio"
              v-model="form.fio"
            ></b-form-input>
            <span class="warning mt-2">
              {{
                errors[0] === "{field} is not valid."
                  ? "Минимальное количество символов - 2"
                  : errors[0]
              }}
            </span>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          mode="eager"
          rules="required|min:6|phone"
          v-slot="{ errors }"
        >
          <b-form-group
            class="mt-2 mb-0"
            id="phone"
            label="Телефон"
            label-for="phone"
          >
            <b-form-input
              :class="!errors.length ? 'mb-4' : 'border-danger'"
              id="phone"
              v-model="form.phone"
            ></b-form-input>
            <span class="warning mt-2">
              {{
                errors[0] === "{field} is not valid."
                  ? "Минимальное количество символов - 6"
                  : errors[0]
              }}
            </span>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          mode="eager"
          rules="required|numeric"
          v-slot="{ errors }"
        >
          <b-form-group
            class="mt-2 mb-0"
            id="amount"
            label="Сумма"
            label-for="amount"
          >
            <b-form-input
              :class="!errors.length ? 'mb-4' : 'border-danger'"
              id="amount"
              v-model="form.amount"
            ></b-form-input>
            <span class="warning mt-2"> {{ errors[0] }} </span>
          </b-form-group>
        </ValidationProvider>

        <b-form-group
          class="mt-2 mb-0 col-6 p-0"
          id="status"
          label="Статус"
          v-model="form.status"
        >
          <b-form-radio v-model="form.status" value="active">
            Активен
          </b-form-radio>
          <b-form-radio v-model="form.status" value="cancelled">
            Отменен
          </b-form-radio>
          <b-form-radio v-model="form.status" value="done">
            Завершен
          </b-form-radio>
          <b-form-radio v-model="form.status" value="pending">
            В работе
          </b-form-radio>
        </b-form-group>
      </b-form>

      <template #modal-footer="{ ok }">
        <b-button
          :disabled="invalid"
          type="submit"
          form="createRequest"
          size="sm"
          variant="success"
          @click="ok()"
        >
          Отправить
        </b-button>
      </template>
    </b-modal>
  </ValidationObserver>
</template>

<script>
export default {
  props: ["title"],

  data() {
    return {
      form: {
        fio: "",
        phone: "",
        amount: "",
        status: "active",
      },
    };
  },

  methods: {
    async onSubmit() {
      await this.$store.dispatch("create", this.form);
      this.form.fio = "";
      this.form.phone = "";
      this.form.amount = "";
      this.form.status = "active";
    },
  },
};
</script>

<style>
.warning {
  display: block;
  color: red;
  font-size: 14px;
  line-height: 1;
}

label {
  margin: 0;
}
</style>
