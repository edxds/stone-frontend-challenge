import React from 'react';
import { Box } from '@material-ui/core';

import { StoneMap } from '../map';
import { ThemeProvider } from '../theme';
import { SWRConfigProvider } from '../../components/SWRConfig';

import { AppContainer } from './AppContainer';
import { ResponsiveLayout } from './ResponsiveLayout';

export function App() {
  return (
    <SWRConfigProvider>
      <ThemeProvider>
        <AppContainer>
          <ResponsiveLayout>
            <Box width="100%" height="100%" clone>
              <StoneMap />
            </Box>
          </ResponsiveLayout>
        </AppContainer>
      </ThemeProvider>
    </SWRConfigProvider>
  );
}
