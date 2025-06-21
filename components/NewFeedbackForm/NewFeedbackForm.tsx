'use client';

import Link from 'next/link';
import { valibotResolver } from 'mantine-form-valibot-resolver';
import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import IconNewFeedback from '@/icons/icon-new-feedback.svg';
import { FormSelect } from './FormSelect';
import { NewFeedbackFormData, newFeedbackSchema } from './schema';
import classes from './NewFeedbackForm.module.css';

interface NewFeedbackFormProps {
  categories: string[];
}

export function NewFeedbackForm({ categories }: NewFeedbackFormProps) {
  const form = useForm<NewFeedbackFormData>({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      category: categories[0],
      description: '',
    },
    validate: valibotResolver(newFeedbackSchema),
  });

  return (
    <form
      aria-labelledby="form-label"
      className={classes.container}
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <IconNewFeedback className={classes.icon} aria-hidden="true" />
      <h1 id="form-label" className={classes.title}>
        Create New Feedback
      </h1>
      <Stack gap={24} className={classes.controls}>
        <TextInput
          variant="filled"
          label="Feedback Title"
          description="Add a short, descriptive headline"
          classNames={{
            root: classes.fieldRoot,
            label: classes.label,
            description: classes.description,
            wrapper: classes.inputWrapper,
            input: classes.input,
            error: classes.error,
          }}
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        <FormSelect
          label="Category"
          description="Choose a category for your feedback"
          options={categories}
          key={form.key('category')}
          {...form.getInputProps('category')}
        />
        <Textarea
          variant="filled"
          autosize
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
          classNames={{
            root: classes.fieldRoot,
            label: classes.label,
            description: classes.description,
            wrapper: classes.inputWrapper,
            input: classes.input,
            error: classes.error,
          }}
          key={form.key('description')}
          {...form.getInputProps('description')}
        />
      </Stack>
      <div className={classes.actions}>
        <Button type="submit" variant="primary">
          Add Feedback
        </Button>
        <Button component={Link} href="/" variant="neutral">
          Cancel
        </Button>
      </div>
    </form>
  );
}
