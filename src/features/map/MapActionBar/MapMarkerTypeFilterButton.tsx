import React, { useEffect, useState } from 'react';
import { List, ListSubheader } from '@material-ui/core';

import { ReactComponent as ClientIcon } from '../../../assets/client-icon.svg';
import { ReactComponent as ProposalIcon } from '../../../assets/proposal-icon.svg';
import { ReactComponent as QualificationIcon } from '../../../assets/qualification-icon.svg';
import { ReactComponent as EverythingIcon } from '../../../assets/everything-icon.svg';

import { iconize } from '../../../utils/iconize';
import { SelectionListItem } from '../../../components/SelectionListItem';
import { ResponsiveBottomDrawer } from '../../../components/ResponsiveBottomDrawer';

import { StoneMapMarkerType } from '../data';
import { useStoneMapFilters } from '../context';

import { MapActionBarButton } from './MapActionBarButton';

type MarkerTypeFilterValue = StoneMapMarkerType | 'ALL';

const FilterId = 'stone-map-filter-marker-type';

const FilterValues: MarkerTypeFilterValue[] = ['CLIENT', 'PROPOSAL', 'QUALIFICATION', 'ALL'];

const TypeIconMap: { [key in MarkerTypeFilterValue]: React.ElementType } = {
  CLIENT: ClientIcon,
  PROPOSAL: ProposalIcon,
  QUALIFICATION: QualificationIcon,
  ALL: EverythingIcon,
};

const TitleMap: { [key in MarkerTypeFilterValue]: string } = {
  CLIENT: 'Clientes',
  PROPOSAL: 'Propostas',
  QUALIFICATION: 'Qualificações',
  ALL: 'Todos',
};

export type MapMarkerTypeFilterButtonProps = {};

export function MapMarkerTypeFilterButton(props: MapMarkerTypeFilterButtonProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [typeToFilter, setTypeToFilter] = useState<MarkerTypeFilterValue>('ALL');
  const { pushFilter } = useStoneMapFilters();

  const Icon = TypeIconMap[typeToFilter];

  const handleListItemClick = (type: MarkerTypeFilterValue) => {
    setTypeToFilter(type);
    setDrawerOpen(false);
  };

  useEffect(() => {
    pushFilter(FilterId, (marker) =>
      typeToFilter === 'ALL' ? true : marker.type === typeToFilter,
    );
  }, [pushFilter, typeToFilter]);

  return (
    <>
      <MapActionBarButton onClick={() => setDrawerOpen(true)}>
        {iconize(<Icon />)}
        {TitleMap[typeToFilter]}
      </MapActionBarButton>
      <ResponsiveBottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List subheader={<ListSubheader>Mostrar...</ListSubheader>} style={{ width: '100%' }}>
          {FilterValues.map((type) => {
            const TypeIcon = TypeIconMap[type];
            const selected = type === typeToFilter;

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
