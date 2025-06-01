import Link from 'next/link';
import { Group, Select, Textarea, TextInput } from '@mantine/core';
import { getDb } from '@/lib/db';

export default async function NewFeedbackPage() {
  const db = getDb();
  const categories = await db.category.findMany();
  const options = categories.map((c) => c.name);

  return (
    <>
      <div>
        <Link href="/">Go Back</Link>
      </div>
      <div>
        <form>
          <h1>Create New Feedback</h1>
          <TextInput label="Feedback Title" description="Add a short, descriptive headline" />
          <Select
            label="Category"
            description="Choose a category for your feedback"
            data={options}
            defaultValue={options[0]}
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
      </div>
    </>
  );
}
