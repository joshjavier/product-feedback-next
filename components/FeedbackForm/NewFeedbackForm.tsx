'use client';

import { startTransition, useActionState, useEffect } from 'react';
import Link from 'next/link';
import { valibotResolver } from 'mantine-form-valibot-resolver';
import { Button, Stack } from '@mantine/core';
import { FormErrors, useForm } from '@mantine/form';
import IconNewFeedback from '@/icons/icon-new-feedback.svg';
import { createFeedback } from '@/lib/actions';
import { NewFeedbackFormData, newFeedbackSchema } from '@/lib/schema';
import { FormField } from './FormField';
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

  const [formErrors, formAction, isPending] = useActionState<FormErrors, NewFeedbackFormData>(
    createFeedback,
    form.errors
  );

  useEffect(() => {
    form.setErrors(formErrors);
  }, [formErrors]);

  const handleSubmit = (values: NewFeedbackFormData) => {
    startTransition(() => {
      formAction(values);
    });
  };

  return (
    <form
      aria-labelledby="form-label"
      className={classes.container}
      onSubmit={form.onSubmit(handleSubmit)}
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
        <Button type="submit" variant="primary" loading={isPending} loaderProps={{ type: 'dots' }}>
          Add Feedback
        </Button>
        <Button component={Link} href="/" variant="neutral">
          Cancel
        </Button>
      </div>
    </form>
  );
}
