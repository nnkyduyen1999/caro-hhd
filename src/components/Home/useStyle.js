import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(7)
    },
    paper: {
      marginBottom: theme.spacing(3),
      textAlign: 'center',
    },
    userName: {
        marginVertical: theme.spacing(2),
        textAlign: 'center',
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
  }));

export {useStyles}