import React, { useCallback, useContext, useMemo, useState } from 'react';

import { StoneMapMarker } from '../data';

export type StoneMapFilter = (marker: StoneMapMarker) => boolean;
export type StoneMapFilterMap = { [key: string]: StoneMapFilter };

export type StoneMapFilterContextState = {
  filters?: StoneMapFilter[];
  removeFilter(id: string): void;
  pushFilter(id: string, filter: StoneMapFilter): void;
  isFilterActive(id: string): boolean;
};

export const StoneMapFilterContext = React.createContext<StoneMapFilterContextState>({
  filters: [],
  isFilterActive: () => false,
  removeFilter: () => void 0,
  pushFilter: () => void 0,
});

export const useStoneMapFilters = () => useContext(StoneMapFilterContext);

export function StoneMapFilterContextProvider({ children }: { children: React.ReactNode }) {
  const [filterMap, setFilterMap] = useState<StoneMapFilterMap>({});
  const filterArray = useMemo(() => Object.keys(filterMap).map((key) => filterMap[key]), [
    filterMap,
  ]);

  const isFilterActive = useCallback((id: string) => filterMap[id] !== undefined, [filterMap]);

  const removeFilter = useCallback(
    (id: string) =>
      setFilterMap((map) => {
        const newMap = { ...map };
        delete newMap[id];

        return newMap;
      }),
    [],
  );

  const pushFilter = useCallback(
    (id: string, filter: StoneMapFilter) => setFilterMap((map) => ({ ...map, [id]: filter })),
    [],
  );

  return (
    <StoneMapFilterContext.Provider
      value={{ filters: filterArray, isFilterActive, pushFilter, removeFilter }}
    >
      {children}
    </StoneMapFilterContext.Provider>
  );
}
