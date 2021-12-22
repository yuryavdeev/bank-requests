<template>
  <UiAppPage title="Войти в систему">
    <b-form class="mx-5" @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="test@mail.ru"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="123456"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Отправить</b-button>
    </b-form>

    <b-card class="mt-3" header="Тут будет валидация:">
      <pre class="m-0">Email: {{ form.email }}</pre>
      <pre class="m-0">Пароль: {{ form.password }}</pre>
    </b-card>
  </UiAppPage>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      res: {},
    };
  },
  methods: {
    async onSubmit() {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.apiKey}`;
      // returnSecureToken: true - требование API (https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password)
      const { token } = await axios.post(url, {
        ...this.form,
        returnSecureToken: true,
      });
      const jwt = token.idToken
      const { data } = await axios.get(
        `${process.env.baseUrl}/request.json?auth=${jwt}`
      );
      // в data - объекты, где ключ - сгенерир. базой id и значением - объектом данных из формы =>
      // const requests = Object.keys(data).map(id => ({ ...data[id], id })) // развернул влож. объект и добавил id (он же key)
      this.$store.commit("setRequests", data);
      this.res = data;
      console.log(data);

      // console.log(data);
      // this.res = data;
      // this.form.email = "";
      // this.form.password = "";
    },
  },
};
</script>
