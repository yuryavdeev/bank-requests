<template>
  <b-navbar fixed="top" toggleable="lg" type="secondary" variant="light">
    <div v-b-hover="handleHoverSpin" class="h2 mb-0">
      <!-- иконка - получение через плагин - см. в плагинах импорты -->
      <b-icon
        icon="exclamation-circle"
        variant="success"
        :animation="isHoveredSpin ? 'spin' : ''"
      ></b-icon>
      <!-- иконка - импорт в компоненте + импорт в плагине BIcon -->
      <b-icon
        icon="exclamation-circle-fill"
        variant="warning"
        :animation="isHoveredSpin ? 'spin' : ''"
      ></b-icon>
      <b-icon
        icon="exclamation-circle"
        variant="danger"
        :animation="isHoveredSpin ? 'spin' : ''"
      ></b-icon>
    </div>

    <h3 class="mx-3 mb-0">TestBank</h3>

    <b-nav class="ml-auto" tabs>
      <!-- no-prefetch - подгрузит роут только при переходе на него -->
      <b-nav-item to="/" no-prefetch exact exact-active-class="active">
        Главная
      </b-nav-item>
      <b-nav-item to="/help" no-prefetch exact-active-class="active">
        Помощь
      </b-nav-item>
      <b-nav-item href="#" v-b-toggle.sidebar-variant> Информация </b-nav-item>
      <b-button size="sm" @click="logout" class="ml-3 my-auto py-0" variant="primary">
        Выход
      </b-button>
    </b-nav>
  </b-navbar>
</template>

<script>
// импорт иконки сразу в компоненте
import { BIconExclamationCircleFill } from "bootstrap-vue";

export default {
  data() {
    return {
      isHoveredSpin: false,
    };
  },

  methods: {
    handleHoverSpin(hovered) {
      this.isHoveredSpin = hovered;
    },

    async logout() {
      await this.$store.commit('logout')
      this.$router.push("/auth");
    },
  },

  components: { BIconExclamationCircleFill },
};
</script>
