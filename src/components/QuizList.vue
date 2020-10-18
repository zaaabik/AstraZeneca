<template>
  <div>
    <img alt="Vue logo" src="../assets/image3.png" />
    <div v-if="!!!ended">
      <H1 style="color:darkgreen">Question # {{ correctAnswers + 1 }}</H1>
      <h1>{{ currentQuiz.question }}</h1>
      <hr>
      <h2
        v-for="(v, idx) of currentQuiz.answers"
        :key="idx"
        class="answer"
        v-on:click="submitAnswer(idx)"
        :class="getClass(idx)"
      >
        {{ idx }}) {{ v }}
      </h2>
    </div>
    <div v-else>
      <h2>Numbers of questions: {{ quizzes.length }}</h2>
      <h2 class="answered-correct">Right answers: {{ correctAnswers }}</h2>
      <h2 class="answered-incorrect">
        Wrong answers: {{ quizzes.length - correctAnswers }}
      </h2>
      <el-button v-on:click="goToMenu">Menu</el-button>
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
  props: {
    id: String
  },
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
    const id = Number(this.id);
    try {
      this.quizzes = Quizzes[id].quiz;
    } catch (e) {
      this.$router.push({path: '/'});
    }
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
    goToMenu() {
      this.$router.push({ path: "/" });
    },
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
