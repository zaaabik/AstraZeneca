export default [
  {
    question: "What is your pressure?",
    type: "number",
    score_func: pressure => pressure > 120
  },
  {
    question: "What is your heart rate?",
    type: "number",
    score_func: rate => (rate < 50 || rate > 120)
  }
];
