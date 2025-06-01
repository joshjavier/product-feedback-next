import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDb } from '@/lib/db';

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
    <>
      <div>
        <Link href="/">Go Back</Link>
        <Link href={`/feedback/${feedback.id}/edit`}>Edit Feedback</Link>
      </div>
      <div>
        <p>{feedback.title}</p>
        <p>{feedback.description}</p>
        <p>{feedback.category.name}</p>
        <p>{feedback._count.upvotes}</p>
        <p>{feedback._count.comments}</p>
      </div>
      <div>
        <h2>{feedback._count.comments} Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.author.name}</p>
              <p>@{comment.author.username}</p>
              <p>{comment.content}</p>
              {comment.replies.length > 0 && (
                <ul>
                  {comment.replies.map((reply) => (
                    <li key={reply.id}>
                      <p>{reply.author.name}</p>
                      <p>@{reply.author.username}</p>
                      <p>
                        @{reply.replyToUser?.username} {reply.content}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add Comment</h2>
        <textarea name="comment" id="comment" />
        <p>250 characters left</p>
        <button type="submit">Post Comment</button>
      </div>
    </>
  );
}
