import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';

import { theme } from './theme';

export type ThemeProviderProps = {
  children?: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
