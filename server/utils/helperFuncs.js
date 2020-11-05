const upvoteIt = (quesAns, user) => {
  if (quesAns.upvotedBy.includes(user._id.toString())) {
    quesAns.upvotedBy = quesAns.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );
  } else {
    quesAns.upvotedBy.push(user._id);
    quesAns.downvotedBy = quesAns.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );
  }

  quesAns.points = quesAns.upvotedBy.length - quesAns.downvotedBy.length;
  return quesAns;
};

const downvoteIt = (quesAns, user) => {
  if (quesAns.downvotedBy.includes(user._id.toString())) {
    quesAns.downvotedBy = quesAns.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );
  } else {
    quesAns.downvotedBy.push(user._id);
    quesAns.upvotedBy = quesAns.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );
  }

  quesAns.points = quesAns.upvotedBy.length - quesAns.downvotedBy.length;
  return quesAns;
};

const quesRep = (question, author) => {
  const calculatedRep =
    question.upvotedBy.length * 10 - question.downvotedBy.length * 2;

  author.questions = author.questions.map((q) =>
    q.quesId.equals(question.id) ? q : { quesId: q.quesId, rep: calculatedRep }
  );

  return author;
};

module.exports = { upvoteIt, downvoteIt, quesRep };
