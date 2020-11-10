import { Link as RouterLink } from 'react-router-dom';

import { Divider, Typography, Chip, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useTagsPanelStyles } from '../styles/muiStyles';

const PopularTagsPanel = () => {
  const classes = useTagsPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('sm'));

  if (isNotDesktop) return null;

  const tags = [
    { tagName: 'wowoow', count: 4 },
    { tagName: 'random', count: 2 },
    { tagName: 'nice', count: 1 },
    { tagName: 'verylooooong', count: 1 },
    { tagName: 'verylooooaaaaaaaaaooong', count: 1 },
    { tagName: 'verooaaaaaaaaaaooong', count: 1 },
  ];

  return (
    <div className={classes.rootPanel}>
      <Divider orientation="vertical" flexItem />
      <div className={classes.content}>
        <Typography variant="h6">Popular Tags</Typography>
        <div className={classes.tagsWrapper}>
          {tags.map((t) => (
            <div key={t.tagName}>
              <Chip
                label={
                  t.tagName.length > 10
                    ? t.tagName.slice(0, 10) + '...'
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
  );
};

export default PopularTagsPanel;
