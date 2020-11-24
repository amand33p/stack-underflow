import { formatDistanceToNowStrict, format } from 'date-fns';

export const filterDuplicates = (originalArr, arrToConcat) => {
  return arrToConcat.filter((a) => !originalArr.find((o) => o.id === a.id));
};

export const formatDateAgo = (date) => {
  return formatDistanceToNowStrict(new Date(date));
};

export const formatDayTime = (date) => {
  return format(new Date(date), "MMM d', ' yy 'at' H':'mm");
};

export const getErrorMsg = (err) => {
  if (err.graphQLErrors[0]?.message) {
    return err.graphQLErrors[0].message;
  } else {
    return err?.message;
  }
};
