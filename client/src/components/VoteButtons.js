import { ReactComponent as UpvoteIcon } from '../svg/upvote.svg';
import { ReactComponent as DownvoteIcon } from '../svg/downvote.svg';

import { Checkbox, SvgIcon } from '@material-ui/core';
import { useVoteBtnsStyles } from '../styles/muiStyles';

export const UpvoteButton = ({ checked, handleUpvote }) => {
  const classes = useVoteBtnsStyles();

  return (
    <Checkbox
      checked={checked}
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

export const DownvoteButton = ({ checked, handleDownvote }) => {
  const classes = useVoteBtnsStyles();

  return (
    <Checkbox
      checked={checked}
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
