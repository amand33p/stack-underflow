import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

import {
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Link,
} from '@material-ui/core';
import { useUsersPageStyles } from '../styles/muiStyles';
import SearchIcon from '@material-ui/icons/Search';

const AllUsersPage = () => {
  const { data, loading } = useQuery(GET_ALL_USERS);
  const [filterInput, setFilterInput] = useState('');
  const classes = useUsersPageStyles();

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5">Users</Typography>
      <TextField
        className={classes.filterInput}
        value={filterInput}
        placeholder="Filter by username"
        onChange={(e) => setFilterInput(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.usersWrapper}>
        {data.getAllUsers
          .filter((u) => u.username.includes(filterInput))
          .map((u) => (
            <div key={u.id} className={classes.userBox}>
              <Avatar
                src={`https://secure.gravatar.com/avatar/${u.id}?s=164&d=identicon`}
                alt={u.username}
                className={classes.avatar}
                component={RouterLink}
                to={`/user/${u.username}`}
              />
              <div>
                <Link component={RouterLink} to={`/user/${u.username}`}>
                  <Typography variant="body2">{u.username}</Typography>
                </Link>
                <Typography variant="caption">
                  {`created ${formatDistanceToNow(new Date(u.createdAt), {
                    includeSeconds: true,
                  })} ago`}
                </Typography>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllUsersPage;
