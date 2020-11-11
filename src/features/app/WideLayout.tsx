import React from 'react';
import { Box } from '@material-ui/core';
import { MdDashboard, MdEvent, MdMap } from 'react-icons/md';

import { SideNavigation, SideNavigationAction } from '../../components/SideNavigation';
import { iconize } from '../../utils/iconize';

export type WideLayoutProps = {
  children: React.ReactNode;
};

export function WideLayout({ children }: WideLayoutProps) {
  return (
    <Box display="flex" alignItems="stretch" overflow="hidden" flex={1}>
      <SideNavigation zIndex={1}>
        <SideNavigationAction label="Lista" icon={iconize(<MdDashboard />)} disabled />
        <SideNavigationAction label="Mapa" icon={iconize(<MdMap />)} selected />
        <SideNavigationAction label="Roteiro" icon={iconize(<MdEvent />)} disabled />
      </SideNavigation>
      <Box flex={1}>{children}</Box>
    </Box>
  );
}
