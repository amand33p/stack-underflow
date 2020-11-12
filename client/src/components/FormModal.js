import { DialogTitle } from './CustomDialogTitle';
import { Dialog, DialogContent } from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';

const FormModal = ({ modalOpen, handleModalClose, children }) => {
  const classes = useDialogStyles();

  return (
    <Dialog
      open={modalOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle onClose={handleModalClose}></DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default FormModal;
