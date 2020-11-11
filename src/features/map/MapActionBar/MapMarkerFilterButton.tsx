import React, { useState } from 'react';
import { List, ListSubheader } from '@material-ui/core';

import { ReactComponent as ClientIcon } from '../../../assets/client-icon.svg';
import { ReactComponent as ProposalIcon } from '../../../assets/proposal-icon.svg';
import { ReactComponent as QualificationIcon } from '../../../assets/qualification-icon.svg';
import { ReactComponent as EverythingIcon } from '../../../assets/everything-icon.svg';

import { iconize } from '../../../utils/iconize';
import { SelectionListItem } from '../../../components/SelectionListItem';
import { ResponsiveBottomDrawer } from '../../../components/ResponsiveBottomDrawer';

import { StoneMapFilterContextValue, StoneMapFilterValues, useStoneMapFilter } from '../context';

import { MapActionBarButton } from './MapActionBarButton';

const TypeIconMap: { [key in StoneMapFilterContextValue]: React.ElementType } = {
  CLIENT: ClientIcon,
  PROPOSAL: ProposalIcon,
  QUALIFICATION: QualificationIcon,
  ALL: EverythingIcon,
};

const TitleMap: { [key in StoneMapFilterContextValue]: string } = {
  CLIENT: 'Clientes',
  PROPOSAL: 'Propostas',
  QUALIFICATION: 'Qualificações',
  ALL: 'Todos',
};

export type MapMarkerFilterButtonProps = {};

export function MapMarkerFilterButton(props: MapMarkerFilterButtonProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { filter, setFilter } = useStoneMapFilter();

  const Icon = TypeIconMap[filter];

  const handleListItemClick = (type: StoneMapFilterContextValue) => {
    setFilter(type);
    setDrawerOpen(false);
  };

  return (
    <>
      <MapActionBarButton onClick={() => setDrawerOpen(true)}>
        {iconize(<Icon />)}
        {TitleMap[filter]}
      </MapActionBarButton>
      <ResponsiveBottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List subheader={<ListSubheader>Mostrar...</ListSubheader>} style={{ width: '100%' }}>
          {StoneMapFilterValues.map((type) => {
            const TypeIcon = TypeIconMap[type];
            const selected = type === filter;

            return (
              <SelectionListItem
                key={type}
                onClick={() => handleListItemClick(type)}
                icon={<TypeIcon />}
                title={TitleMap[type]}
                selected={selected}
              />
            );
          })}
        </List>
      </ResponsiveBottomDrawer>
    </>
  );
}
