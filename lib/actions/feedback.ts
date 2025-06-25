'use server';

import { redirect } from 'next/navigation';
import * as v from 'valibot';
import { FormErrors } from '@mantine/form';
import { getDb } from '../db';
import { NewFeedbackFormData, newFeedbackSchema } from '../schema';

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
