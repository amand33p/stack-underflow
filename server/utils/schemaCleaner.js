const schemaCleaner = (schema) => {
  schema.set('toJSON', {
    transform: (_document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash;
    },
  });
};

module.exports = schemaCleaner;
