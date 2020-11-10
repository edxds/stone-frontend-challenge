import React from 'react';
import { FormControlLabel, FormControlLabelProps, Radio, RadioProps } from '@material-ui/core';

export type LabeledRadioProps = {
  color?: RadioProps['color'];
} & Omit<FormControlLabelProps, 'control'>;

export function LabeledRadio({ color, ...props }: LabeledRadioProps) {
  return <FormControlLabel control={<Radio color={color ?? 'primary'} />} {...props} />;
}
