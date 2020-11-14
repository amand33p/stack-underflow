import { Link as RouterLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

import { Typography, Link, Avatar } from '@material-ui/core';
import { useQuesCardStyles } from '../styles/muiStyles';

const ByUser = ({ username, userId, createdAt }) => {
  const classes = useQuesCardStyles();

  return (
    <div className={classes.byUserWrapper}>
      <Avatar
        src={`https://secure.gravatar.com/avatar/${userId}?s=164&d=identicon`}
        alt={username}
        className={classes.avatar}
        component={RouterLink}
        to={`/user/${username}`}
      />
      <div>
        <Typography variant="caption" color="secondary">
          {`asked ${formatDistanceToNow(new Date(createdAt), {
            includeSeconds: true,
          })} ago`}
        </Typography>

        <Link component={RouterLink} to="/user/username">
          <Typography variant="body2">{username}</Typography>
        </Link>
      </div>
    </div>
  );
};

export default ByUser;
