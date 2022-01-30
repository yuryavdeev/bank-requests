<template>
  <ui-page-frame title="Помощь">
    <HelpPageItem v-for="q in questions" :key="q.title" :question="q" />
  </ui-page-frame>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          title: "Что можно делать с этой системой?",
          text: "Добавлять и удалять заявки, обновлять статус заявок.",
        },
        {
          title: "Как тут налажена работа с данными?",
          text: "Всё реализовано с помощью Firebase.",
        },
        {
          title: "Можно ли создать своего пользователя?",
          text: "Нет.",
        },
      ],
    };
  },
};
</script>
