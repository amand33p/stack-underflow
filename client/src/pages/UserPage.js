import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { formatDateAgo } from '../utils/helperFuncs';

import { Avatar, Typography, Divider } from '@material-ui/core';
import { useUserPageStyles } from '../styles/muiStyles';

const UserPage = () => {
  const classes = useUserPageStyles();
  const { username } = useParams();
  const [fetchedUser, setFetchedUser] = useState(null);
  const [fetchUser, { data }] = useLazyQuery(GET_USER, {
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    fetchUser({ variables: { username } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    if (data) {
      setFetchedUser(data.getUser);
    }
  }, [data]);

  if (!fetchedUser) {
    return <div>loading...</div>;
  }

  const {
    id,
    username: userName,
    createdAt,
    reputation,
    totalQuestions,
    totalAnswers,
    recentQuestions,
    recentAnswers,
  } = fetchedUser;

  return (
    <div className={classes.root}>
      <div className={classes.userCard}>
        <Avatar
          src={`https://secure.gravatar.com/avatar/${id}?s=164&d=identicon`}
          alt={username}
          className={classes.avatar}
          component={RouterLink}
          to={`/user/${username}`}
        />
        <Typography variant="h5" color="secondary" className={classes.cardText}>
          {reputation} <Typography variant="subtitle1">REPUTATION</Typography>
        </Typography>
      </div>
      <div className={classes.infoCard}>
        <div className={classes.userInfo}>
          <div>
            <Typography variant="h4" color="secondary">
              {userName}
            </Typography>
            <Typography variant="body1" color="secondary">
              member for {formatDateAgo(createdAt)}
            </Typography>
          </div>
          <div className={classes.statsBar}>
            <div style={{ marginRight: 10 }}>
              <Typography variant="h6" color="secondary">
                {totalAnswers}
              </Typography>
              <Typography variant="caption" color="secondary">
                answers
              </Typography>
            </div>
            <div>
              <Typography variant="h6" color="secondary">
                {totalQuestions}
              </Typography>
              <Typography variant="caption" color="secondary">
                questions
              </Typography>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default UserPage;
