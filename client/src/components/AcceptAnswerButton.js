import { ReactComponent as AcceptedIcon } from '../svg/accepted.svg';

import { Checkbox, SvgIcon } from '@material-ui/core';
import { useQuesPageStyles } from '../styles/muiStyles';

const AcceptAnswerButton = ({ checked, handleAcceptAns }) => {
  const classes = useQuesPageStyles();

  return (
    <Checkbox
      checked={checked}
      icon={
        <SvgIcon className={classes.acceptIcon}>
          <AcceptedIcon />
        </SvgIcon>
      }
      checkedIcon={
        <SvgIcon className={classes.checkedAcceptIcon}>
          <AcceptedIcon />
        </SvgIcon>
      }
      onChange={handleAcceptAns}
    />
  );
};

export default AcceptAnswerButton;
