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

export const useMenuStyles = makeStyles(
  (theme) => ({
    menuIcon: {
      marginRight: '6px',
      fontSize: '1.3em',
    },
    closeIcon: {
      boxSizing: 'border-box',
      border: `0.5px solid ${theme.palette.primary.main}60`,
      borderRadius: 3,
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
      borderRadius: 2,
      [theme.breakpoints.down('xs')]: {
        marginRight: '0.2em',
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
      width: '100%',
      marginTop: '1em',
      padding: '0.4em 0.7em',
      [theme.breakpoints.down('xs')]: {
        paddingLeft: '0.3em',
        paddingRight: '0.3em',
      },
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      [theme.breakpoints.down('xs')]: {
        paddingLeft: '0.4em',
        paddingRight: '0.4em',
      },
    },
    btnGroupWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '1em 0',
      [theme.breakpoints.down('xs')]: {
        width: '97%',
        margin: '1em auto',
      },
    },
    loadBtnWrapper: {
      display: 'flex',
      justifyContent: 'center',
    },
    loadBtn: {
      marginTop: '0.8em',
      marginBottom: '0.4em',
      width: '50%',
      display: 'flex',
    },
  }),
  { index: 1 }
);

export const useTagsPanelStyles = makeStyles(
  (theme) => ({
    rootPanel: {
      position: 'sticky',
      display: 'flex',
      minHeight: '10vh',
      top: '5.5vH',
    },
    content: {
      paddingTop: 0,
      marginTop: '1em',
    },
    tagsColumn: {
      border: `1px solid ${theme.palette.primary.main}50`,
      borderRadius: 4,
      padding: '0.8em',
      backgroundColor: `${theme.palette.primary.main}08`,
    },
    tagsWrapper: {
      marginTop: '1em',
      display: 'grid',
      width: '100%',
      gridTemplateColumns: 'repeat(2, minmax(130px, 1fr))',
      gridGap: '8px',
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
        width: '22%',
        paddingRight: '0.2em',
      },
    },
    mainText: {
      fontSize: '1.2em',
      fontWeight: 500,
    },
    title: {
      fontSize: '1.2em',
      fontWeight: 500,
      textDecoration: 'none',
      '&:hover': {
        filter: 'brightness(200%)',
      },
      transition: 'all 0.4s ease',
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
    filledByUser: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.7em',
      backgroundColor: `${theme.palette.primary.main}10`,
      padding: '0.5em',
      borderRadius: 3,
      border: `1px solid ${theme.palette.primary.main}40`,
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: '0.4em',
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

export const useTagsPageStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: '1em',
      padding: '0.4em 0.7em',
      width: '100%',
    },
    titleText: {
      marginBottom: '0.9em',
    },
    filterInput: {
      marginTop: '1.2em',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    tagsWrapper: {
      marginTop: '1em',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, 1fr))',
      gridGap: '12px',
    },
    tagBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0.8em',
      paddingBottom: '0.4em',
      border: '1px solid #d3d3d3',
      borderRadius: 4,
    },
    tag: {
      marginBottom: '0.9em',
      backgroundColor: '#f7ebff',
    },
  }),
  { index: 1 }
);

export const useUsersPageStyles = makeStyles(
  (theme) => ({
    root: {
      marginTop: '1em',
      padding: '0.4em 0.7em',
      width: '100%',
    },
    filterInput: {
      marginTop: '1.2em',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    usersWrapper: {
      marginTop: '1.4em',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gridGap: '14px',
    },
    userBox: {
      display: 'flex',
    },
    avatar: {
      width: theme.spacing(6),
      height: theme.spacing(6),
      marginRight: '0.6em',
      borderRadius: 2,
    },
  }),
  { index: 1 }
);

export const useQuesPageStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      paddingLeft: '0.7em',
      marginTop: '1em',
      [theme.breakpoints.down('xs')]: {
        paddingRight: '0.7em',
      },
    },
    titleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingBottom: '0.4em',
    },
    quesInfo: {
      display: 'flex',
      paddingBottom: '0.8em',
    },
    content: {
      paddingTop: '0.5em',
      width: '100%',
      paddingBottom: '1em',
    },
    quesAnsWrapper: {
      display: 'flex',
      marginBottom: '1em',
    },
    voteColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: 30,
      alignItems: 'center',
    },
    quesBody: {
      padding: '0.6em 1em',
      paddingBottom: 0,
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        paddingRight: '0',
      },
    },
    tag: {
      marginRight: '0.5em',
      marginTop: '0.5em',
      backgroundColor: '#f7ebff',
    },
    tagsWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: '1em',
    },
    bottomWrapper: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: '1.4em',
      marginBottom: '0.8em',
    },
    bottomBtns: {
      padding: '0 0.5em',
    },
    commentWrapper: {
      padding: '0.5em 0.2em',
    },
    commentBtns: {
      padding: '0 0.1em',
      minWidth: '3em',
    },
    commentForm: {
      marginTop: '1em',
    },
    addCommentBtns: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '0.3em',
    },
    answersWrapper: {
      marginTop: '1em',
    },
    answerHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5em',
      padding: '0 0.5em',
    },
    acceptIcon: {
      color: '#aa9aaa',
      fontSize: 32,
    },
    checkedAcceptIcon: {
      color: '#2e8b57',
      fontSize: 32,
    },
    answerWrapper: {
      marginBottom: '0.5em',
    },
    answerForm: {
      marginTop: '2em',
    },
    footerText: {
      marginTop: '1em',
      marginBottom: '1em',
      display: 'flex',
      alignItems: 'flex-start',
    },
    footerTag: {
      backgroundColor: '#f7ebff',
      marginRight: '0.5em',
    },
  }),
  { index: 1 }
);

export const useAskQuesPageStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100%',
      marginTop: '1em',
      padding: '0.4em 1em',
    },
    quesForm: {
      paddingTop: '2em',
    },
    inputWrapper: {
      marginBottom: '2em',
    },
    inputField: {
      marginTop: '0.4em',
    },
    submitBtn: {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
    tag: {
      backgroundColor: '#f7ebff',
      marginRight: '0.5em',
    },
  }),
  { index: 1 }
);

export const useVoteBtnsStyles = makeStyles(
  (theme) => ({
    icon: {
      color: '#aa9aaa',
      fontSize: 32,
    },
    checkedIcon: {
      color: '#964ec2',
      fontSize: 32,
    },
  }),
  { index: 1 }
);
