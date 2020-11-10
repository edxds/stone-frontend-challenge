// Thanks to https://github.com/larkintuckerllc/react-currency-input!
import React, { useCallback } from 'react';

import { currencyFormatter } from '../utils/currencyFormatter';

import { TextInput, TextInputProps } from './TextInput';

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 'Backspace';

export type CurrencyInputProps = {
  value: number;
  onChange(value: number): void;
} & Omit<TextInputProps, 'value' | 'onChange'>;

export function CurrencyInput({ value, onChange, ...props }: CurrencyInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (
      (value === 0 && !VALID_FIRST.test(key)) ||
      (value !== 0 && !VALID_NEXT.test(key) && key !== DELETE_KEY_CODE)
    ) {
      return;
    }

    const valueString = value.toString();
    let newValue: number;

    if (key !== DELETE_KEY_CODE) {
      // New character in number
      const newValueString = value === 0 ? key : `${valueString}${key}`;
      newValue = Number.parseInt(newValueString, 10);
    } else {
      // Delete character in number
      const newValueString = valueString.slice(0, -1);
      newValue = newValueString === '' ? 0 : Number.parseInt(newValueString, 10);
    }

    onChange(newValue);
  };

  // To prevent React warnings
  const handleChange = useCallback(() => void 0, []);

  const displayValue = currencyFormatter.format(value / 100);

  return (
    <TextInput
      value={displayValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      inputProps={{ inputMode: 'numeric' }}
      {...props}
    />
  );
}
