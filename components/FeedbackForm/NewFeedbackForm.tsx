'use client';

import Link from 'next/link';
import { valibotResolver } from 'mantine-form-valibot-resolver';
import { Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import IconNewFeedback from '@/icons/icon-new-feedback.svg';
import { FormField } from './FormField';
import { NewFeedbackFormData, newFeedbackSchema } from './schema';
import classes from './FeedbackForm.module.css';

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
      <Stack gap={24} className={classes.fields}>
        <FormField
          kind="text"
          label="Feedback Title"
          description="Add a short, descriptive headline"
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        <FormField
          kind="select"
          label="Category"
          description="Choose a category for your feedback"
          options={categories}
          key={form.key('category')}
          {...form.getInputProps('category')}
        />
        <FormField
          kind="textarea"
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
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
