import { useQuery } from '@apollo/client';
import { GET_ALL_TAGS } from '../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useStateContext } from '../context/state';
import { getErrorMsg } from '../utils/helperFuncs';

import { Typography, Chip, useMediaQuery, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useRightSidePanelStyles } from '../styles/muiStyles';

const RightSidePanel = () => {
  const classes = useRightSidePanelStyles();
  const { notify } = useStateContext();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, loading } = useQuery(GET_ALL_TAGS, {
    onError: (err) => {
      notify(getErrorMsg(err), 'error');
    },
  });

  if (isNotDesktop) return null;

  return (
    <Grid item>
      <div className={classes.rootPanel}>
        <div className={classes.content}>
          <div className={classes.tagsColumn}>
            <Typography variant="h6" color="secondary">
              Top Tags
            </Typography>
            {!loading && data ? (
              <div className={classes.tagsWrapper}>
                {data.getAllTags.slice(0, 26).map((t) => (
                  <div key={t.tagName}>
                    <Chip
                      label={
                        t.tagName.length > 13
                          ? t.tagName.slice(0, 13) + '...'
                          : t.tagName
                      }
                      variant="outlined"
                      color="primary"
                      size="small"
                      component={RouterLink}
                      to={`/tags/${t.tagName}`}
                      className={classes.tag}
                      clickable
                    />
                    <Typography
                      color="secondary"
                      variant="caption"
                    >{` × ${t.count}`}</Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ minWidth: '200px' }}>
                <LoadingSpinner size={40} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default RightSidePanel;
