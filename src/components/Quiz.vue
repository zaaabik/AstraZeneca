<template>
  <div>
    <div v-if="!!!ended">
      <el-button>Answer</el-button>
      <h1>{{ currentQuiz.question }}</h1>
      <h2
        v-for="(v, idx) of currentQuiz.answers"
        :key="idx"
        class="answer"
        v-on:click="submitAnswer(idx)"
        :class="getClass(idx)"
      >
        {{ idx }}) {{ v }}
      </h2>
      <span>{{ currentQuizNumber }} / {{ quizzes.length }}</span>
    </div>
    <div v-else>
      Result {{ correctAnswers }} out of {{ quizzes.length }}
    </div>
  </div>
</template>

<script>
import Quizzes from "./Quizzes";

const states = {
  inProgress: "inProgress",
  Answered: "Answered",
  end: "End"
};

const defaultQuiz = {
  question: "",
  answers: [""],
  true: 0
};

export default {
  name: "Quiz",
  data() {
    return {
      quizzes: [],
      answer: 0,
      currentAnswer: -1,
      currentQuizNumber: 0,
      correctAnswers: 0,
      currentState: states.inProgress
    };
  },
  created() {
    this.quizzes = Quizzes;
  },
  computed: {
    ended() {
      return this.currentQuizNumber === this.quizzes.length;
    },
    currentQuiz() {
      return this.quizzes && this.quizzes.length > this.currentQuizNumber
        ? this.quizzes[this.currentQuizNumber]
        : defaultQuiz;
    }
  },
  methods: {
    reset() {
      this.currentState = states.inProgress;
      this.currentAnswer = -1;
    },
    submitAnswer(idx) {
      if (this.currentState === states.inProgress) {
        console.log("p -> a");
        this.currentAnswer = idx;
        this.currentState = states.Answered;
      } else {
        this.correctAnswers += this.currentAnswer === this.currentQuiz.true;
        this.reset();
        this.currentQuizNumber++;
      }
    },
    getClass(idx) {
      if (this.currentState === states.inProgress) {
        if (this.currentAnswer === idx) {
          return "chose";
        } else {
          return "";
        }
      } else {
        if (this.currentAnswer === idx) {
          if (this.currentAnswer === this.currentQuiz.true) {
            return "answered-correct";
          } else {
            return "answered-incorrect";
          }
        } else {
          return "";
        }
      }
    }
  }
};
</script>

<style scoped>
.chose {
  color: yellow;
}
.answered-correct {
  color: green;
}
.answered-incorrect {
  color: red;
}
.answer {
  cursor: pointer;
}
</style>
