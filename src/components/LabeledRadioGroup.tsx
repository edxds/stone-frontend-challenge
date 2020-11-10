import React from 'react';
import {
  Box,
  FormControl,
  FormControlProps,
  FormLabel,
  FormLabelProps,
  RadioGroup,
  RadioGroupProps,
} from '@material-ui/core';

export type LabeledRadioGroupProps = {
  label: string;
  children: React.ReactNode;
  labelProps?: FormLabelProps;
  controlProps?: FormControlProps;
} & RadioGroupProps;

export function LabeledRadioGroup({
  label,
  children,
  labelProps,
  controlProps,
  ...props
}: LabeledRadioGroupProps) {
  return (
    <FormControl {...controlProps}>
      <Box mb={1} clone>
        <FormLabel {...labelProps}>{label}</FormLabel>
      </Box>
      <RadioGroup {...props}>{children}</RadioGroup>
    </FormControl>
  );
}
