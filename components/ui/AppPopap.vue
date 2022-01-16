<template>
  <div class="popap" v-if="message" @click.self="closePopap">
    <div :class="['container', message.type]">
      <b-icon
        class="plus"
        icon="plus"
        scale="2"
        rotate="45"
        @click="closePopap"
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
    closePopap() {
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
.popap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 55555;
  display: flex;
  justify-content: center;
  align-items: center;
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
