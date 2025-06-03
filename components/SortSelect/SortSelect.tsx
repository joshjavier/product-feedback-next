'use client';

import { useState } from 'react';
import { Button, Combobox, useCombobox } from '@mantine/core';
import IconArrowDown from '@/icons/icon-arrow-down.svg';
import IconCheck from '@/icons/icon-check.svg';
import classes from './SortSelect.module.css';

export function SortSelect() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>('Most Upvotes');

  const options = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'].map(
    (item) => (
      <Combobox.Option value={item} key={item} active={item === value}>
        {item}
        {item === value && <IconCheck aria-hidden="true" />}
      </Combobox.Option>
    )
  );

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
      classNames={{ dropdown: classes.dropdown, option: classes.option }}
      offset={42}
      position="bottom-start"
      transitionProps={{ transition: 'fade-down' }}
    >
      <Combobox.Target>
        <Button
          classNames={{ root: classes.toggle, label: classes.label }}
          onClick={() => combobox.toggleDropdown()}
          rightSection={<IconArrowDown aria-hidden="true" />}
        >
          Sort by :&nbsp;<strong>{value}</strong>
        </Button>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
