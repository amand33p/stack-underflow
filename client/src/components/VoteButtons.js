import { ReactComponent as UpvoteIcon } from '../svg/upvote.svg';
import { ReactComponent as DownvoteIcon } from '../svg/downvote.svg';

import { Checkbox, SvgIcon } from '@material-ui/core';
import { useVoteBtnsStyles } from '../styles/muiStyles';

export const UpvoteButton = ({ user, upvotedBy, handleUpvote }) => {
  const classes = useVoteBtnsStyles();

  return (
    <Checkbox
      checked={user && upvotedBy.includes(user.id)}
      icon={
        <SvgIcon className={classes.icon}>
          <UpvoteIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon className={classes.checkedIcon}>
          <UpvoteIcon />
        </SvgIcon>
      }
      onChange={handleUpvote}
    />
  );
};

export const DownvoteButton = ({ user, downvotedBy, handleDownvote }) => {
  const classes = useVoteBtnsStyles();

  return (
    <Checkbox
      checked={user && downvotedBy.includes(user.id)}
      icon={
        <SvgIcon className={classes.icon}>
          <DownvoteIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon className={classes.checkedIcon}>
          <DownvoteIcon />
        </SvgIcon>
      }
      onChange={handleDownvote}
    />
  );
};
