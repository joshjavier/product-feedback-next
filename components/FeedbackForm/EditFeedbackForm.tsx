'use client';

import { valibotResolver } from 'mantine-form-valibot-resolver';
import { Button, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import IconEditFeedback from '@/icons/icon-edit-feedback.svg';
import { EditFeedbackFormData, editFeedbackSchema } from '@/lib/schema';
import { FormField } from './FormField';
import classes from './FeedbackForm.module.css';

interface EditFeedbackFormProps {
  categories: string[];
  statuses: string[];
  feedback: {
    id: number;
    title: string;
    description: string;
    category: { name: string };
    status: { name: string };
  };
}

export function EditFeedbackForm({ categories, statuses, feedback }: EditFeedbackFormProps) {
  const form = useForm<EditFeedbackFormData>({
    mode: 'uncontrolled',
    initialValues: {
      title: feedback.title,
      category: feedback.category.name,
      status: feedback.status.name,
      description: feedback.description,
    },
    validate: valibotResolver(editFeedbackSchema),
  });

  return (
    <form
      aria-labelledby="form-label"
      className={classes.container}
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <IconEditFeedback className={classes.icon} aria-hidden="true" />
      <h1 id="form-label" className={classes.title}>
        Editing &lsquo;{feedback.title}&rsquo;
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
          kind="select"
          label="Update Status"
          description="Change feature state"
          options={statuses}
          key={form.key('status')}
          {...form.getInputProps('status')}
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
          Save Changes
        </Button>
        <Button type="button" variant="neutral">
          Cancel
        </Button>
        <Button type="button" variant="danger">
          Delete
        </Button>
      </div>
    </form>
  );
}
