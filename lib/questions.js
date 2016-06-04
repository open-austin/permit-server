module.exports = {
  '1': {
    text: 'What kind of construction permit do you need to submit?',
    answers: {
      'Commercial': 2,
      'Residential': 3
    }
  },

  '3': {
    text: 'Ok you picked residential. Follow up question here',
    permits: [1]
  }
};
