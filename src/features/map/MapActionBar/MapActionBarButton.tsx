import { ButtonBase, styled } from '@material-ui/core';

export const MapActionBarButton = styled(ButtonBase)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  flex: 1,
  padding: theme.spacing(1),

  fontSize: '0.75rem',
  color: 'rgba(0, 0, 0, 0.54)',

  '& > * + *': {
    marginTop: theme.spacing(0.5),
  },
}));
