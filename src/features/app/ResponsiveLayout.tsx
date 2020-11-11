import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';

import { WideLayout } from './WideLayout';
import { MinimumLayout } from './MinimumLayout';

export type ResponsiveLayoutProps = {
  children: React.ReactNode;
};

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const Layout = isDesktop ? WideLayout : MinimumLayout;

  return <Layout>{children}</Layout>;
}
