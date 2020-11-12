import { Link as RouterLink } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import { Typography, Link } from '@material-ui/core';
import { useQuesCardStyles } from '../styles/muiStyles';

const ByUser = ({ username, userId, createdAt }) => {
  const classes = useQuesCardStyles();

  return (
    <div className={classes.byUserWrapper}>
      <img
        src={`https://secure.gravatar.com/avatar/${userId}?s=164&d=identicon`}
        alt={username}
        className={classes.avatar}
      />
      <div>
        <Typography variant="caption" color="secondary">
          asked <ReactTimeAgo date={new Date(createdAt)} locale="en" />
        </Typography>

        <Link component={RouterLink} to="/user/username">
          <Typography variant="body2">{username}</Typography>
        </Link>
      </div>
    </div>
  );
};

export default ByUser;
