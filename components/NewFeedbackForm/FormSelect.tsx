'use client';

import React from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import IconArrowDown from '@/icons/icon-arrow-down.svg';
import IconCheck from '@/icons/icon-check.svg';
import classes from './FormField.module.css';

interface FormSelectProps {
  label?: string;
  description?: string;
  options: string[];

  // Props for integrating `getInputProps` with custom inputs
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  error?: string;
}

export function FormSelect({
  label,
  description,
  options,
  value,
  defaultValue,
  onChange,
  ...inputProps
}: FormSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: options[0],
    onChange,
  });

  return (
    <Combobox
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(val) => {
        handleChange(val);
        combobox.closeDropdown();
      }}
      classNames={{ dropdown: classes.dropdown, option: classes.option }}
      offset={16}
      transitionProps={{ transition: 'fade-down' }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          variant="filled"
          pointer
          rightSection={<IconArrowDown aria-hidden="true" />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          label={label}
          description={description}
          classNames={{
            root: classes.fieldRoot,
            label: classes.label,
            description: classes.description,
            wrapper: classes.inputWrapper,
            input: classes.input,
            error: classes.error,
          }}
          {...inputProps}
        >
          {_value}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.map((item) => (
            <Combobox.Option
              value={item}
              key={item}
              active={item === _value}
              aria-selected={item === _value}
            >
              {item}
              {item === _value && <IconCheck aria-hidden="true" />}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
