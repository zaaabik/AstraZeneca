export default [
  {
    'question' : 'What is your pressure?',
    'score_func' : (pressure) => pressure > 120
  },
  {
    'question' : 'What is your heart rate?',
    'score_func' : (rate) => rate < 70
  }
];
