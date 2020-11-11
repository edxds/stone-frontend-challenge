import React from 'react';
import { Drawer, DrawerProps, withStyles } from '@material-ui/core';

export type ResponsiveBottomDrawerProps = {} & Omit<DrawerProps, 'anchor'>;

export function ResponsiveBottomDrawer(props: ResponsiveBottomDrawerProps) {
  return <InternalDrawer anchor="bottom" {...props} />;
}

const InternalDrawer = withStyles((theme) => ({
  paperAnchorBottom: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 600,
      margin: '0 auto',
      marginBottom: theme.spacing(4),
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(Drawer);
