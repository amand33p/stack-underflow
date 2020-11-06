const { UserInputError, AuthenticationError } = require('apollo-server');
const Question = require('../../models/question');
const User = require('../../models/user');
const authChecker = require('../../utils/authChecker');
const { questionValidator } = require('../../utils/validators');
const errorHandler = require('../../utils/errorHandler');
const { upvoteIt, downvoteIt, quesRep } = require('../../utils/helperFuncs');

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
  },
  Mutation: {
    viewQuestion: async (_, args) => {
      const { quesId } = args;

      try {
        const question = await Question.findById(quesId);
        if (!question) {
          throw new Error(`Question with ID: ${quesId} does not exist in DB.`);
        }

        question.views++;
        const savedQues = await question.save();
        const populatedQues = await savedQues
          .populate('author', 'username')
          .populate('comments.author', 'username')
          .execPopulate();

        return populatedQues;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
    postQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { title, body, tags } = args;

      const { errors, valid } = questionValidator(title, body, tags);
      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      try {
        const author = await User.findById(loggedUser.id);
        const newQuestion = new Question({
          title,
          body,
          tags,
          author: author._id,
        });
        const savedQues = await newQuestion.save();
        const populatedQues = await savedQues
          .populate('author', 'username')
          .execPopulate();

        author.questions.push({ quesId: savedQues._id });
        await author.save();

        return populatedQues;
      } catch (err) {
        throw new UserInputError(err);
      }
    },
    deleteQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId } = args;

      try {
        const user = await User.findById(loggedUser.id);
        const question = await Question.findById(quesId);
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          );
        }

        if (
          question.author.toString() !== user._id.toString() &&
          user.role !== 'admin'
        ) {
          throw new AuthenticationError('Access is denied.');
        }

        await Question.findByIdAndDelete(quesId);
        return question._id;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
    editQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId, title, body, tags } = args;

      const { errors, valid } = questionValidator(title, body, tags);
      if (!valid) {
        throw new UserInputError(Object.values(errors)[0], { errors });
      }

      const updatedQuesObj = {
        title,
        body,
        tags,
        updatedAt: Date.now(),
      };

      try {
        const question = await Question.findById(quesId);
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          );
        }

        if (question.author.toString() !== loggedUser.id) {
          throw new AuthenticationError('Access is denied.');
        }

        const updatedQues = await Question.findByIdAndUpdate(
          quesId,
          updatedQuesObj,
          { new: true }
        )
          .populate('author', 'username')
          .populate('comments.author', 'username')
          .populate('answers.author', 'username')
          .populate('answers.comments.author', 'username');

        return updatedQues;
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
    voteQuestion: async (_, args, context) => {
      const loggedUser = authChecker(context);
      const { quesId, voteType } = args;

      try {
        const user = await User.findById(loggedUser.id);
        const question = await Question.findById(quesId);
        if (!question) {
          throw new UserInputError(
            `Question with ID: ${quesId} does not exist in DB.`
          );
        }

        if (question.author.toString() === user._id.toString()) {
          throw new UserInputError("You can't vote for your own post.");
        }

        let votedQues;
        if (voteType === 'UPVOTE') {
          votedQues = upvoteIt(question, user);
        } else {
          votedQues = downvoteIt(question, user);
        }

        const savedQues = await votedQues.save();
        const author = await User.findById(question.author);
        const addedRepAuthor = quesRep(question, author);
        await addedRepAuthor.save();

        return await savedQues
          .populate('author', 'username')
          .populate('comments.author', 'username')
          .populate('answers.author', 'username')
          .populate('answers.comments.author', 'username')
          .execPopulate();
      } catch (err) {
        throw new UserInputError(errorHandler(err));
      }
    },
  },
};
