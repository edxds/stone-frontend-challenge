import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';

import { MapActionBarContainer } from './MapActionBar';

export type MapActionBarTemporaryActionProps = {
  title: string;
  onCancel(): void;
};

export function MapActionBarTemporaryAction({ title, onCancel }: MapActionBarTemporaryActionProps) {
  return (
    <Box py={1} px={2} clone>
      <MapActionBarContainer>
        <Box flex={1} mr={1} clone>
          <Typography variant="body2">{title}</Typography>
        </Box>
        <Button variant="text" color="primary" size="small" onClick={onCancel}>
          Cancelar
        </Button>
      </MapActionBarContainer>
    </Box>
  );
}
