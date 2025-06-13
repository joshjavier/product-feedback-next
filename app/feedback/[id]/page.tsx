import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Box, Button, Container } from '@mantine/core';
import { AddCommentForm } from '@/components/AddCommentForm';
import { BackButton } from '@/components/BackButton';
import { FeedbackComments } from '@/components/FeedbackComments';
import { SuggestionCard } from '@/components/SuggestionCard';
import { getDb } from '@/lib/db';
import classes from './page.module.css';

export default async function FeedbackDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const feedback = await db.feedbackRequest.findFirst({
    where: { id: Number(id) || 0 },
    include: { category: true, _count: { select: { upvotes: true, comments: true } } },
  });

  if (!feedback) {
    notFound();
  }

  const comments = await db.comment.findMany({
    where: { feedbackRequestId: Number(id), parentCommentId: null },
    include: {
      author: { select: { name: true, username: true, avatarUrl: true } },
      replies: {
        include: {
          author: { select: { name: true, username: true, avatarUrl: true } },
          replyToUser: { select: { username: true } },
        },
      },
    },
  });

  return (
    <Container size={730} className={classes.container}>
      <div className={classes.layout}>
        <div className={classes.header}>
          <BackButton />
          <Button
            component={Link}
            href={`/feedback/${feedback.id}/edit`}
            className={classes.editBtn}
            color="blue"
          >
            Edit Feedback
          </Button>
        </div>
        <Box component="article" display="contents">
          <SuggestionCard suggestion={feedback} />
          <FeedbackComments count={feedback._count.comments} comments={comments} />
        </Box>
        <AddCommentForm />
      </div>
    </Container>
  );
}
