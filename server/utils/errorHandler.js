const errorHandler = (error) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return 'Malformatted ID.';
  } else {
    return error.message;
  }
};

module.exports = errorHandler;
