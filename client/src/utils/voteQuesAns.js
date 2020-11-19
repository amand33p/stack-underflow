export const upvote = (upvotedBy, downvotedBy, user) => {
  let updatedUpvotedArr;
  let updatedDownvotedArr;

  if (upvotedBy.includes(user.id)) {
    updatedUpvotedArr = upvotedBy.filter((u) => u !== user.id);
    updatedDownvotedArr = downvotedBy;
  } else {
    updatedUpvotedArr = [...upvotedBy, user.id];
    updatedDownvotedArr = downvotedBy.filter((d) => d !== user.id);
  }
  const updatedPoints = updatedUpvotedArr.length - updatedDownvotedArr.length;

  return { updatedUpvotedArr, updatedDownvotedArr, updatedPoints };
};

export const downvote = (upvotedBy, downvotedBy, user) => {
  let updatedUpvotedArr;
  let updatedDownvotedArr;

  if (downvotedBy.includes(user.id)) {
    updatedDownvotedArr = downvotedBy.filter((d) => d !== user.id);
    updatedUpvotedArr = upvotedBy;
  } else {
    updatedDownvotedArr = [...downvotedBy, user.id];
    updatedUpvotedArr = upvotedBy.filter((u) => u !== user.id);
  }
  const updatedPoints = updatedUpvotedArr.length - updatedDownvotedArr.length;

  return { updatedUpvotedArr, updatedDownvotedArr, updatedPoints };
};
