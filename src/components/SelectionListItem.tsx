import React from 'react';
import { MdCheck } from 'react-icons/md';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  useTheme,
} from '@material-ui/core';

import { iconize } from '../utils/iconize';

export type SelectionListItemProps = {
  icon?: React.ReactNode;
  title: string;
  selected?: boolean;
  onClick?(): void;
};

export function SelectionListItem(props: SelectionListItemProps) {
  const theme = useTheme();

  return (
    <ListItem button onClick={props.onClick} selected={props.selected}>
      {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
      <ListItemText primary={props.title} />
      {props.selected && (
        <ListItemSecondaryAction>
          {iconize(<MdCheck color={theme.palette.primary.main} />)}
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
}
