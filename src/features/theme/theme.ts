import { createMuiTheme, darken, fade } from '@material-ui/core';

const COLOR_PRIMARY = '#24ae4b';

const baseTheme = createMuiTheme();

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2rem',
      color: 'black',
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.5rem',
      color: 'black',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: 'black',
    },
    body1: {
      fontSize: '1rem',
      color: fade('#000', 0.87),
    },
    body2: {
      fontSize: '0.875rem',
      color: fade('#000', 0.6),
    },
    button: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    overline: {
      fontWeight: 600,
      fontSize: '0.75rem',
      lineHeight: '1.18rem',
      letterSpacing: '0.05rem',
      textTransform: 'uppercase',
      color: fade('#000', 0.64),
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
    MuiFormLabel: {
      root: {
        fontSize: '0.875rem',
        transition: baseTheme.transitions.create('color'),
        '&$focused': {
          color: darken(COLOR_PRIMARY, 0.2),
        },
      },
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      variant: 'contained',
    },
  },
});
