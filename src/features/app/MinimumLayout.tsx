import React, { useState } from 'react';
import { MdDashboard, MdMap, MdEvent } from 'react-icons/md';
import { Box } from '@material-ui/core';

import { BottomNavigation, BottomNavigationAction } from '../../components/BottomNavigation';
import { iconize } from '../../utils/iconize';

export type MinimumLayoutProps = {
  children?: React.ReactNode;
};

export function MinimumLayout({ children }: MinimumLayoutProps) {
  const [activeTab, setActiveTab] = useState('map');
  return (
    <Box display="flex" flexDirection="column" overflow="hidden" flex={1}>
      <Box display="flex" flexDirection="column" flex={1}>
        {children}
      </Box>
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        style={{ zIndex: 1 }}
      >
        <BottomNavigationAction
          label="Lista"
          value="list"
          icon={iconize(<MdDashboard />)}
          disabled
        />
        <BottomNavigationAction label="Mapa" value="map" icon={iconize(<MdMap />)} />
        <BottomNavigationAction
          label="Roteiro"
          value="schedule"
          icon={iconize(<MdEvent />)}
          disabled
        />
      </BottomNavigation>
    </Box>
  );
}
