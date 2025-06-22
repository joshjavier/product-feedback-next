import { notFound } from 'next/navigation';
import { Container } from '@mantine/core';
import { BackButton } from '@/components/BackButton';
import { EditFeedbackForm } from '@/components/FeedbackForm';
import { getDb } from '@/lib/db';
import classes from './page.module.css';

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
    <Container size={540} className={classes.container}>
      <div className={classes.layout}>
        <BackButton href={`/feedback/${feedback.id}`} />
        <EditFeedbackForm
          categories={categoryOptions}
          statuses={statusOptions}
          feedback={feedback}
        />
      </div>
    </Container>
  );
}
