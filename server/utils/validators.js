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
    errors.username = 'Username field must not be empty.';
  }

  if (!password) {
    errors.password = 'Password field must not be empty.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const questionValidator = (title, body, tags) => {
  const errors = {};

  if (!title || title.length < 15) {
    errors.title = 'Title must be atleast 15 characters long.';
  }

  if (!body || body.length < 30) {
    errors.body = 'Question body must be atleast 30 characters long.';
  }

  if (!tags || !Array.isArray(tags) || tags.length === 0 || tags.length > 5) {
    errors.tags = '1-5 tags must be added.';
  }

  if (tags.filter((t, index) => tags.indexOf(t) !== index).length > 0) {
    errors.tags = 'Duplicate tags cannot be added.';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { registerValidator, loginValidator, questionValidator };
