import React from 'react';
import { Paper, styled } from '@material-ui/core';
import { MdAdd } from 'react-icons/md';

import { iconize } from '../../../utils/iconize';

import { MapActionBarButton } from './MapActionBarButton';
import { MapMarkerFilterButton } from './MapMarkerFilterButton';
import { MapLocationButton } from './MapLocationButton';

export type MapActionBarProps = {
  onNewLeadClick(): void;
};

export function MapActionBar({ onNewLeadClick }: MapActionBarProps) {
  return (
    <MapActionBarContainer elevation={2}>
      <MapLocationButton />
      <MapMarkerFilterButton />
      <MapActionBarButton onClick={onNewLeadClick}>
        {iconize(<MdAdd />)}
        Novo Lead
      </MapActionBarButton>
    </MapActionBarContainer>
  );
}

export const MapActionBarContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  margin: theme.spacing(1),
  width: `calc(100% - ${theme.spacing(2)}px)`,
  maxWidth: theme.breakpoints.width('sm') - theme.spacing(3),
  height: 56,

  zIndex: 1,
  backgroundColor: 'white',

  borderRadius: theme.shape.borderRadius,

  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(2),
    marginLeft: -68, // Compensate for side navigation bar
  },
}));
