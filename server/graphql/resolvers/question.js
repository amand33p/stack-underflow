const question = require('../../models/question');
const Question = require('../../models/question');

module.exports = {
  Query: {
    getAllQues: async () => {
      try {
        const questions = await Question.find({});
        return questions;
      } catch (err) {
        throw new Error(err);
      }
    },

    getQuestion: async (_, args) => {
      const { quesId } = args;

      try {
        const question = await Question.findById(quesId);
        if (question) {
          return question;
        } else {
          throw new Error('Question not found.');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
