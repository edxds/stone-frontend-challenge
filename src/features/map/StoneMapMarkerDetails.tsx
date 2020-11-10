import React from 'react';
import { Box, SvgIcon, Typography } from '@material-ui/core';
import { MdPerson, MdPayment } from 'react-icons/md';

import { ReactComponent as ClientLIcon } from '../../assets/client-l-icon.svg';
import { ReactComponent as ProposalLIcon } from '../../assets/proposal-l-icon.svg';
import { ReactComponent as QualificationLIcon } from '../../assets/qualification-l-icon.svg';

import { StoneMapMarker, StoneMapMarkerType } from './markers';

export type StoneMapMarkerDetailsProps = {
  marker: StoneMapMarker;
} & React.HTMLAttributes<HTMLPreElement>;

const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

const AccentColorMap: { [key in StoneMapMarkerType]: string } = {
  CLIENT: '#24AE4B',
  PROPOSAL: '#87AE24',
  QUALIFICATION: '#115551',
};

const IconMap: { [key in StoneMapMarkerType]: React.ElementType } = {
  CLIENT: ClientLIcon,
  PROPOSAL: ProposalLIcon,
  QUALIFICATION: QualificationLIcon,
};

export function StoneMapMarkerDetails({ marker, ...props }: StoneMapMarkerDetailsProps) {
  const IconElement = IconMap[marker.type];

  return (
    <Box px={2} py={3} borderLeft={`4px solid ${AccentColorMap[marker.type]}`}>
      <Box mb={1}>
        <Typography variant="overline">{marker.info.shopType}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Box flex={1} mr={2} clone>
          <Typography variant="h2">{marker.info.shopName}</Typography>
        </Box>
        <Box fontSize="2.5rem" mx={-1} my={-2} clone>
          <SvgIcon>
            <IconElement />
          </SvgIcon>
        </Box>
      </Box>
      <Box display="flex" mt={1}>
        <Typography variant="body2" color="textPrimary">
          {marker.info.address}
        </Typography>
      </Box>
      <Box display="flex" mt={2}>
        <Box display="flex" mr={1} alignItems="center" color="text.secondary">
          <Box mr={1} mt={0.5}>
            <MdPerson color="inherit" fontSize="1.5rem" />
          </Box>
          <Typography variant="body2">{marker.info.merchantName}</Typography>
        </Box>
        <Box display="flex" flex={1} ml={1} alignItems="center" color="text.secondary">
          <Box mr={1} mt={0.5}>
            <MdPayment color="inherit" fontSize="1.5rem" />
          </Box>
          <Typography variant="body2">
            {currencyFormatter.format(marker.info.averageCardRevenue)}/Mês
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
