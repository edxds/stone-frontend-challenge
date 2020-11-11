export type StoneMapMarkerType = 'CLIENT' | 'PROPOSAL' | 'QUALIFICATION';

export type StoneMapMarkerInfo = {
  address: string;
  shopName: string;
  shopType: string;
  merchantName: string;
  averageCardRevenue: number;
};

export type StoneMapMarker = {
  id: number;
  type: StoneMapMarkerType;
  position: google.maps.ReadonlyLatLngLiteral;
  info: StoneMapMarkerInfo;
};
