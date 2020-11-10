import { Divider, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useTagsPanelStyles } from '../styles/muiStyles';

const PopularTagsPanel = () => {
  const classes = useTagsPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('sm'));

  if (isNotDesktop) return null;

  return (
    <div className={classes.rootPanel}>
      <Divider orientation="vertical" flexItem />
      <div className={classes.content}>
        <Typography variant="h6">Popular Tags</Typography>
      </div>
    </div>
  );
};

export default PopularTagsPanel;
