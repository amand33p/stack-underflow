const registerValidator = (username, password) => {
  const errors = {};

  if (!username || username.length > 20 || username.length < 3) {
    errors.username = 'Username must be in range of 3-20 characters length .';
  }

  if (!password || password.length < 6) {
    errors.password = 'Password must be atleast 6 characters long.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const loginValidator = (username, password) => {
  const errors = {};

  if (!username) {
    errors.username = "Username field can't be empty.";
  }

  if (!password) {
    errors.password = "Password field can't be empty.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { registerValidator, loginValidator };
