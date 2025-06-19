import { Select } from '@mantine/core';
import classes from './NewFeedbackForm.module.css';

interface FormSelectProps {
  options: string[];
}

export function FormSelect({ options }: FormSelectProps) {
  return (
    <Select
      variant="filled"
      label="Category"
      description="Choose a category for your feedback"
      data={options}
      defaultValue={options[0]}
      checkIconPosition="right"
      allowDeselect={false}
      classNames={{
        label: classes.label,
        description: classes.description,
        wrapper: classes.inputWrapper,
        input: classes.input,
      }}
    />
  );
}
