import { ReactComponent as Error404 } from '../svg/404-error.svg';

import { Typography, SvgIcon } from '@material-ui/core';
import { useNotFoundPageStyles } from '../styles/muiStyles';

const NotFoundPage = () => {
  const classes = useNotFoundPageStyles();

  return (
    <div className={classes.root}>
      <div className={classes.textWrapper}>
        <SvgIcon color="primary" className={classes.icon}>
          <Error404 />
        </SvgIcon>
        <Typography color="secondary" variant="h5">
          Page Not Found
        </Typography>
        <Typography color="secondary" variant="body1">
          The page you requested does not exist.
        </Typography>
      </div>
    </div>
  );
};

export default NotFoundPage;
