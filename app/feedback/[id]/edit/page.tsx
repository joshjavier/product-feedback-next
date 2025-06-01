import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Group, Select, Textarea, TextInput } from '@mantine/core';
import { getDb } from '@/lib/db';

export default async function EditFeedbackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const feedback = await db.feedbackRequest.findFirst({
    where: { id: Number(id) || 0 },
    include: { category: { select: { name: true } }, status: { select: { name: true } } },
  });

  if (!feedback) {
    notFound();
  }

  const categories = await db.category.findMany();
  const statuses = await db.status.findMany();
  const categoryOptions = categories.map((c) => c.name);
  const statusOptions = statuses.map((s) => s.name);

  return (
    <>
      <div>
        <Link href={`/feedback/${feedback.id}`}>Go Back</Link>
      </div>
      <div>
        <form>
          <h1>Editing ‘{feedback.title}’</h1>
          <TextInput
            label="Feedback Title"
            description="Add a short, descriptive headline"
            defaultValue={feedback.title}
          />
          <Select
            label="Category"
            description="Choose a category for your feedback"
            data={categoryOptions}
            defaultValue={feedback.category.name}
            checkIconPosition="right"
            allowDeselect={false}
          />
          <Select
            label="Update Status"
            description="Change feedback state"
            data={statusOptions}
            defaultValue={feedback.status.name}
            checkIconPosition="right"
            allowDeselect={false}
          />
          <Textarea
            label="Feedback Detail"
            description="Include any specific comments on what should be improved, added, etc."
            defaultValue={feedback.description}
          />
          <Group justify="flex-end">
            <button type="button">Delete</button>
            <button type="button">Cancel</button>
            <button type="submit">Add Feedback</button>
          </Group>
        </form>
      </div>
    </>
  );
}
