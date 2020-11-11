import React from 'react';
import { Box, BoxProps } from '@material-ui/core';

export type ShiftByProps = {
  x?: number;
  y?: number;
} & BoxProps;

export function ShiftBy({ x = 0, y = 0, ...props }: ShiftByProps) {
  return <Box style={{ transform: `translate(${x}px, ${y}px)` }} {...props} />;
}
