export type StoneMapMarkerType = 'CLIENT' | 'PROPOSAL' | 'QUALIFICATION';

export type StoneMapMarkerInfo = {
  address: string;
  shopName: string;
  shopType: string;
  merchantName: string;
  averageCardRevenue: number;
};

export type StoneMapMarker = {
  id: string;
  type: StoneMapMarkerType;
  favorite: boolean;
  position: google.maps.ReadonlyLatLngLiteral;
  info: StoneMapMarkerInfo;
};
