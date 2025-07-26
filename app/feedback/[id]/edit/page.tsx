import { Container } from '@mantine/core';
import { EditFeedbackFormContainer } from '@/components/FeedbackForm';
import { getDb } from '@/lib/db';
import classes from './page.module.css';

export async function generateStaticParams() {
  const db = getDb();
  const feedbackRequests = await db.feedbackRequest.findMany({ select: { id: true } });

  return feedbackRequests.map((f) => ({ id: f.id.toString() }));
}

export default async function EditFeedbackPage() {
  const db = getDb();
  const categories = await db.category.findMany();
  const statuses = await db.status.findMany();
  const categoryOptions = categories.map((c) => c.name);
  const statusOptions = statuses.map((s) => s.name);

  return (
    <Container size={540} className={classes.container}>
      <div className={classes.layout}>
        <EditFeedbackFormContainer categories={categoryOptions} statuses={statusOptions} />
      </div>
    </Container>
  );
}
