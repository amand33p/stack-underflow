const { UserInputError, AuthenticationError } = require('apollo-server');
const Question = require('../../models/question');
const User = require('../../models/user');
const authChecker = require('../../utils/authChecker');
const errorHandler = require('../../utils/errorHandler');

module.exports = {
  Mutation: {
    addQuesComment: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId, body } = args;

      if (body.trim() === '' || body.length < 5) {
        throw new UserInputError('Comment must be atleast 5 characters long.');
      }

      try {
        const question = await Question.findById(quesId);
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          );
        }

        question.comments.push({
          body,
          author: loggedUser.id,
        });

        const savedQues = await question.save();
        const populatedQues = await savedQues
          .populate('comments.author', 'username')
          .execPopulate();

        return populatedQues.comments;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
    deleteQuesComment: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId, commentId } = args;

      try {
        const user = await User.findById(loggedUser.id);
        const question = await Question.findById(quesId);
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          );
        }

        const targetComment = question.comments.find(
          (c) => c._id.toString() === commentId
        );

        if (!targetComment) {
          throw new UserInputError(
            `Comment with ID: '${commentId}' does not exist in DB.`
          );
        }

        if (
          targetComment.author.toString() !== user._id.toString() &&
          user.role !== 'admin'
        ) {
          throw new AuthenticationError('Access is denied.');
        }

        question.comments = question.comments.filter(
          (c) => c._id.toString() !== commentId
        );
        await question.save();
        return commentId;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
    editQuesComment: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId, commentId, body } = args;

      if (body.trim() === '' || body.length < 5) {
        throw new UserInputError('Comment must be atleast 5 characters long.');
      }

      try {
        const question = await Question.findById(quesId);
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          );
        }

        const targetComment = question.comments.find(
          (c) => c._id.toString() === commentId
        );

        if (!targetComment) {
          throw new UserInputError(
            `Comment with ID: '${commentId}' does not exist in DB.`
          );
        }

        if (targetComment.author.toString() !== loggedUser.id.toString()) {
          throw new AuthenticationError('Access is denied.');
        }

        targetComment.body = body;
        targetComment.updatedAt = Date.now();

        question.comments = question.comments.map((c) =>
          c._id.toString() !== commentId ? c : targetComment
        );
        const savedQues = await question.save();
        const populatedQues = await savedQues
          .populate('comments.author', 'username')
          .execPopulate();

        return populatedQues.comments;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
  },
};
