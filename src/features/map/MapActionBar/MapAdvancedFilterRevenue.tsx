import React, { useEffect, useMemo } from 'react';
import { MdPayment, MdClear } from 'react-icons/md';
import {
  Box,
  ButtonBase,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  fade,
  styled,
  withStyles,
} from '@material-ui/core';

import { iconize } from '../../../utils/iconize';
import { CurrencyInput } from '../../../components/CurrencyInput';
import { ShiftBy } from '../../../components/ShiftBy';
import { useField } from '../../../hooks/useField';

import { useStoneMapFilters } from '../context';

const FilterId = 'stone-map-revenue-filter';

export type MapAdvancedFilterRevenueProps = {};

export function MapAdvancedFilterRevenue(props: MapAdvancedFilterRevenueProps) {
  const { pushFilter, removeFilter } = useStoneMapFilters();

  const [revenueMin, bindRevenueMin, revenueMinField] = useField<number>(0);
  const [revenueMax, bindRevenueMax, revenueMaxField] = useField<number>(0);

  const shouldFilterBeActive = useMemo(() => revenueMin || revenueMax, [revenueMax, revenueMin]);

  const resetFields = () => [revenueMinField, revenueMaxField].forEach(($0) => $0.reset());

  useEffect(() => {
    if (shouldFilterBeActive) {
      pushFilter(FilterId, (marker) => {
        const passesRevenueMin = revenueMin ? marker.info.averageCardRevenue >= revenueMin : true;
        const passesRevenueMax = revenueMax ? marker.info.averageCardRevenue <= revenueMax : true;
        return passesRevenueMax && passesRevenueMin;
      });

      return;
    }

    removeFilter(FilterId);
  }, [pushFilter, removeFilter, revenueMax, revenueMin, shouldFilterBeActive]);

  return (
    <ListItem>
      <ListItemIcon>{iconize(<MdPayment />)}</ListItemIcon>
      <Box flex={1}>
        <ListItemText primary="Média Mensal" />
        <Box display="flex" alignItems="center" mt={1}>
          <Box mr={1} flex={1}>
            <FadedLabelCurrencyInput
              id="adv-filter-revenue-min"
              label="Mínimo"
              {...bindRevenueMin}
            />
          </Box>
          <Box mr={1} flex={1}>
            <FadedLabelCurrencyInput
              id="adv-filter-revenue-max"
              label="Máximo"
              {...bindRevenueMax}
            />
          </Box>
          <ShiftBy y={10}>
            <DiscreetIconButton onClick={resetFields}>
              <SvgIcon fontSize="inherit">
                <MdClear />
              </SvgIcon>
            </DiscreetIconButton>
          </ShiftBy>
        </Box>
      </Box>
    </ListItem>
  );
}

const FadedLabelCurrencyInput = styled(CurrencyInput)({
  '& label': {
    color: fade('#000000', 0.68),
  },
});

const DiscreetIconButton = withStyles((theme) => ({
  root: {
    borderRadius: '100%',
    padding: theme.spacing(0.5),

    width: `calc(${theme.spacing(1)}px + 1.5rem)`,
    height: `calc(${theme.spacing(1)}px + 1.5rem)`,
    fontSize: '1.5rem',

    color: fade('#000000', 0.64),
  },
}))(ButtonBase);
