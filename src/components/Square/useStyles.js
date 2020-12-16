import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  square: {
    width: '30px',
    height: '30px',
    border: 'none',
    margin: '5px',
    borderRadius: '3px',
    backgroundColor: theme.palette.background.paper,

    '&:focus': {
      outline: 'none'
    }
  },
  currSquare: {
    border: '1px solid yellow',
  },
  winningSquare: {
    backgroundColor: 'yellow'
  }
  
}));
