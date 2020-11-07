const schemaCleaner = (schema) => {
  schema.set('toJSON', {
    virtuals: true,
    transform: (_document, returnedObject) => {
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.passwordHash;
    },
  });
};

module.exports = schemaCleaner;
