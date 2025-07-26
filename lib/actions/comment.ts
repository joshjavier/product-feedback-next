'use server';

import { redirect } from 'next/navigation';
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
