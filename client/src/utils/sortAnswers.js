const sortAnswers = (sortBy, answers, acceptedAnswer) => {
  if (sortBy === 'OLDEST') {
    return [...answers].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  } else if (sortBy === 'NEWEST') {
    return [...answers].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else {
    const accepted = answers.find((a) => a.id === acceptedAnswer);
    const restSorted = answers
      .filter((a) => a.id !== acceptedAnswer)
      .sort((a, b) => b.points - a.points);

    if (accepted) {
      return [accepted, ...restSorted];
    } else {
      return restSorted;
    }
  }
};

export default sortAnswers;
