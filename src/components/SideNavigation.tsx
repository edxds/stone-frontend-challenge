import React from 'react';
import { Box, BoxProps, Button, fade, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

export type SideNavigationProps = {
  children: React.ReactNode;
} & BoxProps;

export function SideNavigation({ children, className, ...props }: SideNavigationProps) {
  const classes = useStyles();

  return (
    <Box p={1} className={clsx([classes.sideNavContainer, className])} {...props}>
      {children}
    </Box>
  );
}

export type SideNavigationActionProps = {
  icon: React.ReactNode;
  label: string;
  selected?: boolean;
  disabled?: boolean;
};

export function SideNavigationAction({
  icon,
  label,
  selected,
  disabled,
}: SideNavigationActionProps) {
  const classes = useButtonStyles();

  return (
    <Button
      variant="text"
      disabled={disabled}
      classes={{
        root: clsx([classes.root, { [classes.selected]: selected }]),
        label: classes.label,
      }}
    >
      {icon}
      <span className={classes.text}>{label}</span>
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
  sideNavContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
  },
  contentContainer: {
    flex: 1,
  },
}));

const useButtonStyles = makeStyles((theme) => ({
  root: {
    width: 68,
    height: 68,
    padding: theme.spacing(1),

    color: fade('#ffffff', 0.56),
    backgroundColor: 'transparent',
    borderRadius: theme.shape.borderRadius,

    transition: theme.transitions.create(['transform', 'background-color', 'color']),

    '& + &': {
      marginTop: theme.spacing(0.5),
    },

    '&.Mui-disabled': {
      color: fade('#ffffff', 0.36),
      backgroundColor: 'transparent',
    },

    '&:hover': {
      backgroundColor: fade('#ffffff', 0.44),
      transform: 'scale(1.05)',
    },
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: theme.spacing(0.5),
  },
  text: {
    fontSize: '0.875rem',
  },
  selected: {
    color: 'white',
    backgroundColor: fade('#ffffff', 0.24),
  },
}));
