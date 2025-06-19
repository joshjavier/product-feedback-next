'use client';

import { useState } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import IconArrowDown from '@/icons/icon-arrow-down.svg';
import IconCheck from '@/icons/icon-check.svg';
import classes from './NewFeedbackForm.module.css';

interface FormSelectProps {
  label?: string;
  description?: string;
  options: string[];
}

export function FormSelect({ label, description, options }: FormSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState(options[0]);

  return (
    <Combobox
      store={combobox}
      resetSelectionOnOptionHover
      onOptionSubmit={(val) => {
        setValue(val);
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
            label: classes.label,
            description: classes.description,
            wrapper: classes.inputWrapper,
            input: classes.input,
          }}
        >
          {value}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.map((item) => (
            <Combobox.Option
              value={item}
              key={item}
              active={item === value}
              aria-selected={item === value}
            >
              {item}
              {item === value && <IconCheck aria-hidden="true" />}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
