import React, { useMemo, useState } from 'react';
import { Collapse, List, ListSubheader } from '@material-ui/core';
import { MdGpsFixed } from 'react-icons/md';

import regions from '../../../assets/regions.json';
import { iconize } from '../../../utils/iconize';
import { SelectionListItem } from '../../../components/SelectionListItem';
import { ResponsiveBottomDrawer } from '../../../components/ResponsiveBottomDrawer';

import { useStoneMapLocation } from '../context';

import { MapActionBarButton } from './MapActionBarButton';

export type MapLocationButtonProps = {};

export function MapLocationButton(props: MapLocationButtonProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { regionId, subregionId, setRegionId, setSubregionId } = useStoneMapLocation();

  const region = useMemo(() => regions.find((r) => r.id === regionId), [regionId]);
  const subregions = region?.subregions;

  const handleSubregionClick = (id?: string) => {
    setSubregionId(id);
    setDrawerOpen(false);
  };

  return (
    <>
      <MapActionBarButton onClick={() => setDrawerOpen(true)}>
        {iconize(<MdGpsFixed />)}
        Localidade
      </MapActionBarButton>
      <ResponsiveBottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List style={{ width: '100%' }}>
          <ListSubheader>Região</ListSubheader>
          {regions.map((region) => (
            <SelectionListItem
              key={region.id}
              title={region.title}
              selected={regionId === region.id}
              onClick={() => setRegionId(region.id)}
            />
          ))}
          <Collapse in={!!subregions}>
            <ListSubheader>Polo</ListSubheader>
            <SelectionListItem
              title="Todos"
              selected={!subregionId}
              onClick={() => handleSubregionClick(undefined)}
            />
            {subregions?.map((subregion) => (
              <SelectionListItem
                key={subregion.id}
                title={subregion.title}
                selected={subregionId === subregion.id}
                onClick={() => handleSubregionClick(subregion.id)}
              />
            ))}
          </Collapse>
        </List>
      </ResponsiveBottomDrawer>
    </>
  );
}
