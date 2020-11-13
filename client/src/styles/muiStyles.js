import { makeStyles } from '@material-ui/core/styles';

export const useBodyStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
    },
  }),
  { index: 1 }
);

export const useNavStyles = makeStyles(
  (theme) => ({
    leftPortion: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },
    logoWrapper: {
      [theme.breakpoints.down('xs')]: {
        display: 'flex',
        alignItems: 'center',
      },
    },
    logo: {
      fontFamily: 'Montserrat',
      textTransform: 'none',
      fontSize: '1.3em',
      padding: '0.1em',
      marginRight: '0.3em',
    },
    contentContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    appBar: {
      borderTop: '4px solid #f4649f',
    },
  }),
  { index: 1 }
);

export const useMainLayoutStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
    },
  }),
  { index: 1 }
);

export const useMenuStyles = makeStyles(
  (theme) => ({
    menuIcon: {
      marginRight: '6px',
      fontSize: '1.3em',
    },
    rootPanel: {
      position: 'sticky',
      top: '5.5vH',
      display: 'flex',
      minHeight: '94.5vh',
    },
    list: {
      marginTop: '1em',
    },
    madeByItem: {
      padding: '0.4em 0.8em 0.2em 0.8em',
    },
    userBtn: {
      textTransform: 'none',
      display: 'flex',
    },
    avatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      marginRight: '0.4em',
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
    },
  }),
  { index: 1 }
);

export const useQuesListStyles = makeStyles(
  (theme) => ({
    root: {
      width: '60%',
      marginTop: '1em',
      padding: '0.4em 0.7em',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    btnGroupWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '1em',
      marginBottom: '1em',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'center',
      },
    },
  }),
  { index: 1 }
);

export const useTagsPanelStyles = makeStyles(
  (theme) => ({
    rootPanel: {
      position: 'sticky',
      display: 'flex',
      minHeight: '94.5vh',
      top: '5.5vH',
    },
    content: {
      padding: '0.8em',
      paddingTop: 0,
      marginTop: '1em',
    },
    tagsWrapper: {
      marginTop: '1em',
      display: 'grid',
      width: '100%',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '12px',
    },
    tag: {
      backgroundColor: '#f7ebff',
    },
  }),
  { index: 1 }
);

export const useQuesCardStyles = makeStyles(
  (theme) => ({
    root: {
      borderBottom: '1px solid #dfdfdf',
      display: 'flex',
      padding: '0.5em 0',
    },
    infoWrapper: {
      width: '10%',
      padding: '0.4em',
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      [theme.breakpoints.down('xs')]: {
        width: '15%',
      },
    },
    mainText: {
      fontSize: '1.2em',
      fontWeight: 500,
    },
    innerInfo: {
      display: 'flex',
      flexDirection: 'column',
    },
    quesDetails: {
      paddingLeft: '0.2em',
      paddingBottom: '0.7em',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
    },
    tagsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    tag: {
      marginRight: '0.5em',
      marginTop: '0.5em',
      backgroundColor: '#f7ebff',
    },
    bottomWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    byUserWrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.7em',
    },
    avatar: {
      width: 35,
      marginRight: '0.6em',
      borderRadius: 2,
    },
  }),
  { index: 1 }
);

export const useDialogStyles = makeStyles(
  (theme) => ({
    dialogWrapper: {
      padding: 0,
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    menuIcon: {
      marginRight: '6px',
      fontSize: '1.3em',
    },
  }),
  { index: 1 }
);

export const useAuthFormStyles = makeStyles(
  (theme) => ({
    root: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      [theme.breakpoints.down('xs')]: {
        padding: '0 0 0 0',
      },
    },
    inputField: {
      marginBottom: '1.5em',
    },
    submitButton: {
      marginTop: '1.8em',
    },
    titleLogo: {
      display: 'block',
      width: '5em',
      margin: '0 auto 2em auto',
    },
    footerText: {
      marginTop: '1em',
      textAlign: 'center',
    },
    link: {
      cursor: 'pointer',
    },
  }),
  { index: 1 }
);
