import { useQuery } from '@apollo/client';
import { GET_ALL_TAGS } from '../graphql/queries';
import { Link as RouterLink } from 'react-router-dom';

import { Typography, Chip, useMediaQuery, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useTagsPanelStyles } from '../styles/muiStyles';

const RightSidePanel = () => {
  const { data, loading } = useQuery(GET_ALL_TAGS);
  const classes = useTagsPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('sm'));

  if (isNotDesktop) return null;

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <Grid item>
      <div className={classes.rootPanel}>
        <div className={classes.content}>
          <div className={classes.tagsColumn}>
            <Typography variant="h6" color="secondary">
              Top Tags
            </Typography>
            <div className={classes.tagsWrapper}>
              {data.getAllTags.slice(0, 26).map((t) => (
                <div key={t.tagName}>
                  <Chip
                    label={
                      t.tagName.length > 12
                        ? t.tagName.slice(0, 12) + '...'
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
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default RightSidePanel;
