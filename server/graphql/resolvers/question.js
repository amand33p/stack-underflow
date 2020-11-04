const { UserInputError } = require('apollo-server');
const Question = require('../../models/question');
const authChecker = require('../../utils/authChecker');
const { questionValidator } = require('../../utils/validators');

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
  Mutation: {
    postQuestion: async (_, args, context) => {
      const user = authChecker(context);
      const { title, body, tags } = args;
      const { errors, valid } = questionValidator(title, body, tags);

      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const newQuestion = new Question({
        title,
        body,
        tags,
        author: user.id,
      });

      try {
        const savedQues = await newQuestion.save();
        const populatedQues = await savedQues
          .populate('author', 'username')
          .execPopulate();

        return populatedQues;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
  QuestionList: {
    answersCount: (parent) => parent.answers.length,
  },
};
