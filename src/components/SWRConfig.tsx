import React from 'react';
import { SWRConfig } from 'swr';

import { absFetch } from '../utils/absoluteFetch';

export async function fetcher<JSON = any>(info: RequestInfo, init?: RequestInit): Promise<JSON> {
  return absFetch(info, init);
}

export function SWRConfigProvider({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}
