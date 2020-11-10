import {
  BottomNavigation as MuiBottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  fade,
  withStyles,
} from '@material-ui/core';

export const BottomNavigation = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
}))(MuiBottomNavigation);

export const BottomNavigationAction = withStyles((theme) => ({
  root: {
    color: fade('#ffffff', 0.54),
    '&$selected': {
      color: 'white',
    },
  },
  selected: {},
}))(MuiBottomNavigationAction);
