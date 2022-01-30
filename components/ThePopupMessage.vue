<template>
<!-- v-if="message" -> message из store-->
  <div class="popup" v-if="message" @click.self="closePopup">
    <div :class="['container', message.type]">
      <b-icon
        class="plus"
        icon="plus"
        scale="2"
        rotate="45"
        @click="closePopup"
      ></b-icon>
      <h1>{{ titleMap[message.type] }}</h1>
      <p>{{ message.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleMap: {
        primary: "Успешно!",
        danger: "Ошибка!",
        warning: "Внимание!",
      },
    };
  },

  methods: {
    closePopup() {
      this.$store.commit("loadingMessage/clearMessage");
    },
  },

  computed: {
    message() {
      return this.$store.state.loadingMessage.message;
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  z-index: 100000;
}

.primary {
  color: rgb(0, 136, 0);
}

.danger {
  color: rgb(158, 0, 0);
}

.warning {
  color: rgb(223, 171, 0);
}

.container {
  position: relative;
  top: 150px;
  width: 40%;
  height: 275px;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.plus {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  color: #000;
}

.plus:hover {
  color: rgb(0, 0, 0, 0.6);
}
</style>
