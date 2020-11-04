const { UserInputError, AuthenticationError } = require('apollo-server');
const Question = require('../../models/question');
const User = require('../../models/user');
const authChecker = require('../../utils/authChecker');
const { questionValidator } = require('../../utils/validators');
const errorHandler = require('../../utils/errorHandler');

module.exports = {
  Query: {
    getAllQues: async () => {
      try {
        const questions = await Question.find({}).populate(
          'author',
          'username'
        );

        return questions;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    getQuestion: async (_, args) => {
      const { quesId } = args;

      try {
        const question = await Question.findById(quesId).populate(
          'author',
          'username'
        );

        if (question) {
          return question;
        } else {
          throw new Error('Question not found.');
        }
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
  },
  Mutation: {
    postQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { title, body, tags } = args;

      const { errors, valid } = questionValidator(title, body, tags);
      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const newQuestion = new Question({
        title,
        body,
        tags,
        author: loggedUser.id,
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
    deleteQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId } = args;

      const question = await Question.findById(quesId);
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        );
      }

      const user = await User.findById(loggedUser.id);

      if (
        question.author.toString() === user._id.toString() ||
        user.role === 'admin'
      ) {
        try {
          await Question.findByIdAndDelete(quesId);
        } catch (err) {
          throw new UserInputError(err);
        }
      } else {
        throw new AuthenticationError('Access is denied.');
      }

      return question._id;
    },
    editQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId, title, body, tags } = args;

      const { errors, valid } = questionValidator(title, body, tags);
      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const question = await Question.findById(quesId);
      if (!question) {
        throw new UserInputError(
          `Question with ID: ${quesId} does not exist in DB.`
        );
      }

      if (question.author.toString() !== loggedUser.id.toString()) {
        throw new AuthenticationError('Access is denied.');
      }

      const updatedQuesObj = {
        title,
        body,
        tags,
        updatedAt: Date.now(),
      };

      try {
        const updatedQues = await Question.findByIdAndUpdate(
          quesId,
          updatedQuesObj,
          { new: true }
        ).populate('author', 'username');

        return updatedQues;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
  },
};
