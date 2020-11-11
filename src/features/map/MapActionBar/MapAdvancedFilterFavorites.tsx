import React from 'react';
import { MdStar } from 'react-icons/md';

import { SelectionListItem } from '../../../components/SelectionListItem';
import { iconize } from '../../../utils/iconize';

import { StoneMapFilter, useStoneMapFilters } from '../context';

const FilterId = 'stone-map-filter-by-favorite';
const Filter: StoneMapFilter = (marker) => marker.favorite;

export type MapAdvancedFilterFavoritesProps = {};

export function MapAdvancedFilterFavorites(props: MapAdvancedFilterFavoritesProps) {
  const { pushFilter, removeFilter, isFilterActive } = useStoneMapFilters();
  const isActive = isFilterActive(FilterId);

  return (
    <SelectionListItem
      onClick={() => (isActive ? removeFilter(FilterId) : pushFilter(FilterId, Filter))}
      icon={iconize(<MdStar />)}
      selected={isActive}
      title="Somente Favoritos"
    />
  );
}
