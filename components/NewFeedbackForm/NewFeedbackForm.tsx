import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import IconNewFeedback from '@/icons/icon-new-feedback.svg';
import { FormSelect } from './FormSelect';
import classes from './NewFeedbackForm.module.css';

interface NewFeedbackFormProps {
  categories: string[];
}

export function NewFeedbackForm({ categories }: NewFeedbackFormProps) {
  return (
    <form aria-labelledby="form-label" className={classes.container}>
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
            label: classes.label,
            description: classes.description,
            wrapper: classes.inputWrapper,
            input: classes.input,
          }}
        />
        <FormSelect
          label="Category"
          description="Choose a category for your feedback"
          options={categories}
        />
        <Textarea
          variant="filled"
          autosize
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
          classNames={{
            label: classes.label,
            description: classes.description,
            wrapper: classes.inputWrapper,
            input: classes.input,
          }}
        />
      </Stack>
      <div className={classes.actions}>
        <Button type="submit" variant="primary">
          Add Feedback
        </Button>
        <Button type="button" variant="neutral">
          Cancel
        </Button>
      </div>
    </form>
  );
}
