import React from 'react';
import { Textarea, TextInput } from '@mantine/core';
import { FormSelect } from './FormSelect';
import classes from './FormField.module.css';

interface BaseFieldProps<T = Element> {
  label: string;
  description: string;
  // Props for integrating `getInputProps` with custom inputs
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | React.ChangeEvent<T>) => void;
  onFocus?: (event: React.FocusEvent<T>) => void;
  onBlur?: (event: React.FocusEvent<T>) => void;
  error?: string;
}

interface TextFieldProps extends BaseFieldProps<HTMLInputElement> {
  kind: 'text';
}

interface TextareaFieldProps extends BaseFieldProps<HTMLTextAreaElement> {
  kind: 'textarea';
}

interface SelectFieldProps extends BaseFieldProps<HTMLButtonElement> {
  kind: 'select';
  options: string[];
}

type FormFieldProps = TextFieldProps | TextareaFieldProps | SelectFieldProps;

export function FormField(props: FormFieldProps) {
  const assertUnreachable = (value: never): never => {
    throw new Error(`Missed a case! ${value}`);
  };

  switch (props.kind) {
    case 'text': {
      const { kind, label, description, ...inputProps } = props;
      return (
        <TextInput
          variant="filled"
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
        />
      );
    }
    case 'textarea': {
      const { kind, label, description, ...inputProps } = props;
      return (
        <Textarea
          variant="filled"
          autosize
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
        />
      );
    }
    case 'select': {
      const { kind, label, description, options, ...inputProps } = props;
      return (
        <FormSelect label={label} description={description} options={options} {...inputProps} />
      );
    }
    default:
      assertUnreachable(props);
  }
}
