import React, { useCallback, useContext, useState } from 'react';

export type StoneMapLocationContextState = {
  regionId?: string;
  setRegionId(id?: string): void;
  subregionId?: string;
  setSubregionId(id?: string): void;
};

export const StoneMapLocationContext = React.createContext<StoneMapLocationContextState>({
  setRegionId: () => void 0,
  setSubregionId: () => void 0,
});

export const useStoneMapLocation = () => useContext(StoneMapLocationContext);

export function StoneMapLocationContextProvider({ children }: { children: React.ReactNode }) {
  const [regionId, _setRegionId] = useState<string | undefined>();
  const [subregionId, setSubregionId] = useState<string | undefined>();

  const setRegionId = useCallback((rid?: string) => {
    _setRegionId(rid);
    setSubregionId(undefined);
  }, []);

  return (
    <StoneMapLocationContext.Provider
      value={{ regionId, setRegionId, subregionId, setSubregionId }}
    >
      {children}
    </StoneMapLocationContext.Provider>
  );
}
