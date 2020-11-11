import clientMarker from '../../../assets/client-marker.svg';
import proposalMarker from '../../../assets/proposal-marker.svg';
import qualificationMarker from '../../../assets/qualification-marker.svg';

import { StoneMapMarkerType } from './types';

export const MARKER_URLS: { [key in StoneMapMarkerType]: string } = {
  CLIENT: clientMarker,
  PROPOSAL: proposalMarker,
  QUALIFICATION: qualificationMarker,
};
