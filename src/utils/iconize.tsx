import React from 'react';
import { SvgIcon } from '@material-ui/core';

/// Used to bridge react-icons and @material-ui/core
export function iconize(element: React.ReactNode) {
  return <SvgIcon>{element}</SvgIcon>;
}
