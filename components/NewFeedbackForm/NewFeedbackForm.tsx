import { Group, Select, Textarea, TextInput } from '@mantine/core';
import IconNewFeedback from '@/icons/icon-new-feedback.svg';
import classes from './NewFeedbackForm.module.css';

interface NewFeedbackFormProps {
  categories: string[];
}

export function NewFeedbackForm({ categories }: NewFeedbackFormProps) {
  return (
    <form aria-labelledby="form-label" className={classes.container}>
      <IconNewFeedback className={classes.icon} />
      <h1 id="form-label" className={classes.title}>
        Create New Feedback
      </h1>
      <TextInput label="Feedback Title" description="Add a short, descriptive headline" />
      <Select
        label="Category"
        description="Choose a category for your feedback"
        data={categories}
        defaultValue={categories[0]}
        checkIconPosition="right"
        allowDeselect={false}
      />
      <Textarea
        label="Feedback Detail"
        description="Include any specific comments on what should be improved, added, etc."
      />
      <Group justify="flex-end">
        <button type="button">Cancel</button>
        <button type="submit">Add Feedback</button>
      </Group>
    </form>
  );
}
