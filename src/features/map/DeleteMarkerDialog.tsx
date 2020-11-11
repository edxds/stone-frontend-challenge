import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

export type DeleteMarkerDialogProps = {
  open: boolean;
  onClose(): void;
  onDelete(): void;
};

export function DeleteMarkerDialog({ open, onClose, onDelete }: DeleteMarkerDialogProps) {
  return (
    <Dialog {...{ open, onClose }}>
      <DialogContent>
        <DialogContentText variant="body1" color="textPrimary">
          Tem certeza que deseja apagar esse lead?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="text" onClick={onDelete}>
          Apagar
        </Button>
        <Button variant="text" onClick={onClose}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
