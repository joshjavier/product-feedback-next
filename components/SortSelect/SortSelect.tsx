'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Combobox, useCombobox } from '@mantine/core';
import { useSearchParamsForNavigation } from '@/hooks';
import IconArrowDown from '@/icons/icon-arrow-down.svg';
import IconCheck from '@/icons/icon-check.svg';
import classes from './SortSelect.module.css';

const sortMapping: Record<string, string> = {
  lu: 'Least Upvotes',
  mc: 'Most Comments',
  lc: 'Least Comments',
};

export function SortSelect() {
  const router = useRouter();
  const [searchParams, createQueryString] = useSearchParamsForNavigation();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(
    sortMapping[searchParams.get('sort') as string] ?? 'Most Upvotes'
  );

  const options = ['Most Upvotes', 'Least Upvotes', 'Most Comments', 'Least Comments'].map(
    (item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={item === value}
        aria-selected={item === value}
      >
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

        let sort;
        if (val === 'Least Upvotes') {
          sort = 'lu';
        } else if (val === 'Most Comments') {
          sort = 'mc';
        } else if (val === 'Least Comments') {
          sort = 'lc';
        }
        router.replace(`/?${createQueryString('sort', sort)}`);
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
