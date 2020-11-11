import React, { useContext, useState } from 'react';

import { StoneMapMarkerType } from '../data';

export type StoneMapFilterContextValue = StoneMapMarkerType | 'ALL';

export type StoneMapFilterContextState = {
  filter: StoneMapFilterContextValue;
  setFilter(value: StoneMapFilterContextValue): void;
};

export const StoneMapFilterValues: StoneMapFilterContextValue[] = [
  'CLIENT',
  'PROPOSAL',
  'QUALIFICATION',
  'ALL',
];

export const StoneMapFilterContext = React.createContext<StoneMapFilterContextState>({
  filter: 'ALL',
  setFilter: () => void 0,
});

export const useStoneMapFilter = () => useContext(StoneMapFilterContext);

export function StoneMapFilterContextProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<StoneMapFilterContextValue>('ALL');

  return (
    <StoneMapFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </StoneMapFilterContext.Provider>
  );
}
