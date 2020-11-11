import React, { useState } from 'react';
import { MdFilterList } from 'react-icons/md';
import { List, ListSubheader } from '@material-ui/core';

import { iconize } from '../../../utils/iconize';
import { ResponsiveBottomDrawer } from '../../../components/ResponsiveBottomDrawer';

import { MapActionBarButton } from './MapActionBarButton';
import { MapAdvancedFilterFavorites } from './MapAdvancedFilterFavorites';
import { MapAdvancedFilterRevenue } from './MapAdvancedFilterRevenue';

export type MapAdvancedFiltersButtonProps = {};

export function MapAdvancedFiltersButton(props: MapAdvancedFiltersButtonProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <MapActionBarButton onClick={() => setDrawerOpen(true)}>
        {iconize(<MdFilterList />)}
        Filtrar
      </MapActionBarButton>
      <ResponsiveBottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List style={{ width: '100%' }}>
          <ListSubheader>Filtros Avançados</ListSubheader>
          <MapAdvancedFilterRevenue />
          <MapAdvancedFilterFavorites />
        </List>
      </ResponsiveBottomDrawer>
    </>
  );
}
