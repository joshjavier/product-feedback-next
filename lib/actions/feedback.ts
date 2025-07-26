'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import * as v from 'valibot';
import { FormErrors } from '@mantine/form';
import { getDb } from '../db';
import {
  EditFeedbackFormData,
  editFeedbackSchema,
  NewFeedbackFormData,
  newFeedbackSchema,
} from '../schema';
import { FeedbackMutationFailure, FeedbackMutationResult, FeedbackMutationSuccess } from '../types';

export async function createFeedback(formErrors: FormErrors, values: NewFeedbackFormData) {
  let newFeedbackUrl: string;

  try {
    const output = v.parse(newFeedbackSchema, values);

    const db = getDb();
    const feedback = await db.feedbackRequest.create({
      data: {
        title: output.title,
        description: output.description,
        category: { connect: { name: output.category } },
        status: { connect: { name: 'Suggestion' } }, // new feedback requests have a Suggestion status
        user: { connect: { username: 'velvetround' } }, // TODO: Get this from cookie/session once auth has been set up
      },
    });

    newFeedbackUrl = `/feedback/${feedback.id}`;
  } catch (error) {
    if (v.isValiError(error)) {
      error.issues.forEach((issue) => {
        formErrors[v.getDotPath(issue)!] = issue.message;
      });
    } else {
      console.log(error);
    }

    return { ...formErrors };
  }

  redirect(newFeedbackUrl);
}

export async function editFeedback(
  id: number,
  result: FeedbackMutationResult,
  values: EditFeedbackFormData
) {
  try {
    const output = v.parse(editFeedbackSchema, values);

    const db = getDb();
    await db.feedbackRequest.update({
      where: { id },
      data: {
        title: output.title,
        description: output.description,
        status: { connect: { name: output.status } },
        category: { connect: { name: output.category } },
      },
    });

    revalidatePath('/roadmap');

    return {
      ...result,
      success: true,
      message: 'Changes to the feedback have been saved.',
    } satisfies FeedbackMutationSuccess;
  } catch (error) {
    if (v.isValiError(error)) {
      const formErrors: Record<string, string> = {};
      error.issues.forEach((issue) => {
        formErrors[v.getDotPath(issue)!] = issue.message;
      });

      return {
        ...result,
        errors: formErrors,
        success: false,
        title: 'Validation failed',
        message: 'Please fix validation errors in the form to proceed.',
      } satisfies FeedbackMutationFailure;
    }

    console.log(error);

    return {
      success: false,
    } satisfies FeedbackMutationFailure;
  }
}

export async function deleteFeedback(id: number, result: FeedbackMutationResult) {
  try {
    const db = getDb();
    await db.feedbackRequest.delete({ where: { id } });

    revalidatePath('/roadmap');

    return {
      ...result,
      success: true,
      message: 'Feedback deleted.',
    } satisfies FeedbackMutationSuccess;
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: 'Something went wrong while deleting the feedback.',
    } satisfies FeedbackMutationFailure;
  }
}
