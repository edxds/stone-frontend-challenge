import { useState, useMemo } from 'react';

export function useField<T = string>(initialValue: T, args?: { type: 'text' | 'checkbox' }) {
  const [value, setValue] = useState<T>(initialValue);

  const field = useMemo(
    () => ({
      reset: () => setValue(initialValue),
      set: (value: T) => setValue(value),
    }),
    [initialValue],
  );

  const bind = useMemo(
    () => ({
      value,
      onChange: (eventOrValue: any) => {
        if (typeof eventOrValue === 'string' || typeof eventOrValue === 'number') {
          return setValue((eventOrValue as unknown) as T);
        }

        return setValue(
          ((args?.type === 'checkbox'
            ? eventOrValue.target.checked
            : eventOrValue.target.value) as unknown) as T,
        );
      },
    }),
    [args?.type, value],
  );

  return [value, bind, field] as const;
}
