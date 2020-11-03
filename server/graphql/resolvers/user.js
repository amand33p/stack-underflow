const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidator, loginValidator } = require('../../utils/validators');
const { UserInputError } = require('apollo-server');
const { SECRET } = require('../../utils/config');

module.exports = {
  Mutation: {
    register: async (_, args) => {
      const { username, password } = args;
      const { errors, valid } = registerValidator(username, password);

      if (!valid) {
        throw new UserInputError(Object.values(errors).join(', '), { errors });
      }

      const existingUser = await User.findOne({
        username: { $regex: new RegExp('^' + username + '$', 'i') },
      });

      if (existingUser) {
        throw new UserInputError(`Username '${username}' is already taken.`);
      }

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        passwordHash,
      });

      const savedUser = await user.save();
      const token = jwt.sign(
        {
          id: savedUser._id,
        },
        SECRET
      );

      return {
        id: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
        token,
      };
    },

    login: async (_, args) => {
      const { username, password } = args;
      const { errors, valid } = loginValidator(username, password);

      if (!valid) {
        throw new UserInputError(Object.values(errors).join(', '), { errors });
      }

      const user = await User.findOne({
        username: { $regex: new RegExp('^' + username + '$', 'i') },
      });

      if (!user) {
        throw new UserInputError(`User: '${username}' not found.`);
      }

      const credentialsValid = await bcrypt.compare(
        password,
        user.passwordHash
      );

      if (!credentialsValid) {
        throw new UserInputError('Invalid credentials.');
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        SECRET
      );

      return {
        id: user._id,
        username: user.username,
        role: user.role,
        token,
      };
    },
  },
};
