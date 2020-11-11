import React, { useState } from 'react';
import { Box, Button, SvgIcon, Typography } from '@material-ui/core';
import { MdPerson, MdPayment } from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';

import { ShiftBy } from '../../components/ShiftBy';
import { FavoriteButton } from '../../components/FavoriteButton';
import { ReactComponent as ClientLIcon } from '../../assets/client-l-icon.svg';
import { ReactComponent as ProposalLIcon } from '../../assets/proposal-l-icon.svg';
import { ReactComponent as QualificationLIcon } from '../../assets/qualification-l-icon.svg';
import { currencyFormatter } from '../../utils/currencyFormatter';

import {
  deleteMapMarker,
  StoneMapMarker,
  StoneMapMarkerType,
  switchFavoriteMapMarker,
} from './data';
import { DeleteMarkerDialog } from './DeleteMarkerDialog';

export type StoneMapMarkerDetailsProps = {
  marker: StoneMapMarker;
} & React.HTMLAttributes<HTMLPreElement>;

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const IconElement = IconMap[marker.type];

  const handleDelete = () => {
    deleteMapMarker(marker.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <DeleteMarkerDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
      <Box px={2} py={3} borderLeft={`4px solid ${AccentColorMap[marker.type]}`}>
        {/* The icon's padding is enough to separate the overline from the title */}
        <Typography variant="overline">{marker.info.shopType}</Typography>
        <Box display="flex" alignItems="center">
          <Box flex={1} mr={2} clone>
            <Typography variant="h2">{marker.info.shopName}</Typography>
          </Box>
          <ShiftBy y={4} fontSize="2.5rem">
            <SvgIcon fontSize="inherit">
              <IconElement />
            </SvgIcon>
          </ShiftBy>
          <Box ml={1} clone>
            <FavoriteButton
              color="primary"
              checked={marker.favorite}
              onClick={() => switchFavoriteMapMarker(marker.id)}
            />
          </Box>
        </Box>
        {/* The same here */}
        <Box display="flex">
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
              {currencyFormatter.format(marker.info.averageCardRevenue / 100)}/Mês
            </Typography>
          </Box>
        </Box>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            color="secondary"
            variant="text"
            startIcon={
              <ShiftBy y={1} clone>
                <SvgIcon>
                  <FiTrash2 />
                </SvgIcon>
              </ShiftBy>
            }
            onClick={() => setDeleteDialogOpen(true)}
          >
            Apagar
          </Button>
        </Box>
      </Box>
    </>
  );
}
