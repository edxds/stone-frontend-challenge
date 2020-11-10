import clientMarker from '../../assets/client-marker.svg';
import proposalMarker from '../../assets/proposal-marker.svg';
import qualificationMarker from '../../assets/qualification-marker.svg';

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

export const MARKER_URLS: { [key in StoneMapMarkerType]: string } = {
  CLIENT: clientMarker,
  PROPOSAL: proposalMarker,
  QUALIFICATION: qualificationMarker,
};
