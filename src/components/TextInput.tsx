import React from 'react';
import {
  Box,
  fade,
  FormControl,
  FormLabel,
  InputBase,
  InputBaseProps,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';

export type TextInputProps = {
  id: string;
  label: string;
  fullWidth?: boolean;
} & Omit<InputBaseProps, 'fullWidth'>;

export function TextInput({
  classes,
  className,
  style,
  label,
  id,
  fullWidth = true,
  ...props
}: TextInputProps) {
  const _classes = useStyles();
  const _className = clsx([{ [_classes.fullWidth]: fullWidth }, className]);

  return (
    <FormControl classes={classes} className={_className} style={style}>
      <Box clone mb={1}>
        <FormLabel htmlFor={id}>{label}</FormLabel>
      </Box>
      <TextInputBase id={id} {...props} />
    </FormControl>
  );
}

const useStyles = makeStyles({
  fullWidth: {
    width: '100%',
  },
});

const TextInputBase = withStyles((theme) => ({
  input: {
    position: 'relative',

    fontSize: '1rem',
    padding: theme.spacing(1),

    border: '1px solid #ced4da',
    borderRadius: theme.shape.borderRadius,

    transition: theme.transitions.create(['box-shadow', 'border-color']),

    '-webkit-appearance': 'none',

    '&:focus': {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.125rem`,
      borderColor: theme.palette.primary.main,
    },

    '&:disabled': {
      backgroundColor: '#ececec',
    },
  },
  multiline: {
    padding: 0,
  },
}))(InputBase);
