<template>
  <div>
    <h1 v-for="(value,idx) of this.quizzes" :key="idx">
      <router-link :to="`/quiz/${idx}`">{{idx}} {{value.name}}</router-link>
    </h1>
  </div>
</template>

<script>
import Quizzes from "./Pools";

export default {
  name: "Quiz",
  data() {
    return {
      quizzes: []
    };
  },
  created() {
    this.quizzes = Quizzes;
  }
};
</script>
