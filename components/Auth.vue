<template>
  <UiAppPage title="Войти в систему">
    <ValidationObserver v-slot="{ invalid }">
      <b-form class="col-10 m-auto" @submit.prevent="onSubmit">
        <ValidationProvider
          mode="eager"
          rules="required|email"
          v-slot="{ errors }"
        >
          <b-form-group id="email" label="Email:" label-for="email">
            <b-form-input
              :class="!errors.length ? 'mb-4' : 'border-danger'"
              id="email"
              v-model="form.email"
              placeholder="test@mail.ru"
            >
            </b-form-input>
            <span class="warning mt-2">{{ errors[0] }}</span>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          mode="eager"
          rules="required|min:6"
          v-slot="{ errors }"
        >
          <b-form-group id="password" label="Password:" label-for="password">
            <b-form-input
              :class="!errors.length ? 'mb-4' : 'border-danger'"
              id="password"
              v-model="form.password"
              placeholder="123456"
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

        <b-button
          class="mt-4"
          :disabled="invalid"
          type="submit"
          variant="primary"
        >
          Отправить
        </b-button>
      </b-form>
    </ValidationObserver>
  </UiAppPage>
</template>


<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch("login/login", this.form);
        this.$router.push("/");
      } catch (e) {
        // в login.js в catch выкинуть ошибку, чтобы исключить тут router.push('/') <- тут try/catch
        console.log(e);
      }
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
</style>
