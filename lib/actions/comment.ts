'use server';

import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import * as v from 'valibot';
import { commentBase } from '@/components/FeedbackComments/types';
import { getDb } from '../db';
import { commentSchema } from '../schema';
import { CommentMutationResult } from '../types';

export async function createComment(
  feedbackId: number,
  result: CommentMutationResult,
  value: string
) {
  try {
    const output = v.parse(commentSchema, value);

    const db = getDb();
    const comment = await db.comment.create({
      data: {
        content: output,
        feedbackRequest: { connect: { id: feedbackId } },
        author: { connect: { username: 'velvetround' } }, // TODO: Get this from cookie/session once auth has been set up
      },
      select: commentBase,
    });

    console.log('Created comment:');
    console.log(comment);
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (v.isValiError(error)) {
      errorMessage = error.message;
    }
    console.log(error);

    return {
      ...result,
      success: false,
      message: errorMessage,
    } satisfies CommentMutationResult;
  }

  redirect(`/feedback/${feedbackId}`);
}

export async function createReply(commentId: number, result: CommentMutationResult, value: string) {
  let feedbackUrl: string;
  try {
    const output = v.parse(commentSchema, value);

    const db = getDb();
    const comment = await db.comment.findFirstOrThrow({
      where: { id: commentId },
      select: { userId: true, parentCommentId: true, feedbackRequestId: true },
    });
    const reply = await db.comment.create({
      data: {
        content: output,
        feedbackRequest: { connect: { id: comment.feedbackRequestId } },
        author: { connect: { username: 'velvetround' } }, // TODO: Get this from cookie/session once auth has been set up
        replyToUser: { connect: { id: comment.userId } },
        parentComment: { connect: { id: comment.parentCommentId ?? commentId } },
      },
    });
    feedbackUrl = `/feedback/${reply.feedbackRequestId}`;

    console.log('Created reply:');
    console.log(reply);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (v.isValiError(error)) {
      errorMessage = error.message;
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        errorMessage = 'Cannot find comment to reply to.';
      }
    }
    console.log(error);

    return {
      ...result,
      success: false,
      message: errorMessage,
    } satisfies CommentMutationResult;
  }

  redirect(feedbackUrl);
}
