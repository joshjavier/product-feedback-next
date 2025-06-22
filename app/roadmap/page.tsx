import { Container } from '@mantine/core';
import { AddFeedbackButton } from '@/components/AddFeedbackButton';
import { BackButton } from '@/components/BackButton';
import { KanbanBoard } from '@/components/KanbanBoard';
import { getDb } from '@/lib/db';
import classes from './page.module.css';

export default async function RoadmapPage() {
  const db = getDb();
  const frInRoadmap = await db.feedbackRequest.findMany({
    where: { NOT: { status: { name: 'Suggestion' } } },
    select: {
      id: true,
      title: true,
      description: true,
      status: { select: { name: true } },
      category: { select: { name: true } },
      _count: { select: { comments: true, upvotes: true } },
    },
  });

  return (
    <Container size={1110} className={classes.container}>
      <div className={classes.layout}>
        <div className={classes.header}>
          <div>
            <BackButton variant="white" />
            <h1 className={classes.title}>Roadmap</h1>
          </div>
          <AddFeedbackButton />
        </div>
        <KanbanBoard feedbackRequests={frInRoadmap} />
      </div>
    </Container>
  );
}
