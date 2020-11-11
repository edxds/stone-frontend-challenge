import { Checkbox, CheckboxProps } from '@material-ui/core';
import React from 'react';
import { MdStar, MdStarBorder } from 'react-icons/md';

import { iconize } from '../utils/iconize';

export type FavoriteButtonProps = {} & CheckboxProps;

export function FavoriteButton(props: FavoriteButtonProps) {
  return <Checkbox icon={iconize(<MdStarBorder />)} checkedIcon={iconize(<MdStar />)} {...props} />;
}
