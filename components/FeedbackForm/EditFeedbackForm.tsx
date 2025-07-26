'use client';

import { startTransition, useActionState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { IconCheck, IconX } from '@tabler/icons-react';
import { valibotResolver } from 'mantine-form-valibot-resolver';
import useSWR from 'swr';
import { Button, LoadingOverlay, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import IconEditFeedback from '@/icons/icon-edit-feedback.svg';
import { deleteFeedback, editFeedback } from '@/lib/actions';
import { fetcher, FetcherError } from '@/lib/fetcher';
import { EditFeedbackFormData, editFeedbackSchema } from '@/lib/schema';
import { FeedbackForEditForm, FeedbackMutationResult } from '@/lib/types';
import { BackButton } from '../BackButton';
import { DeleteButtonWithModal } from '../DeleteButtonWithModal';
import { FormField } from './FormField';
import classes from './FeedbackForm.module.css';

interface EditFeedbackFormContainerProps {
  categories: string[];
  statuses: string[];
}

interface EditFeedbackFormProps {
  categories: string[];
  statuses: string[];
  feedback: FeedbackForEditForm;
  isLoading?: boolean;
}

export function EditFeedbackFormContainer({
  categories,
  statuses,
}: EditFeedbackFormContainerProps) {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useSWR(`/api/feedback/${id}`, fetcher<FeedbackForEditForm>, {
    fallbackData: {
      id: Number(id),
      title: '',
      description: '',
      category: { name: 'Feature' },
      status: { name: 'Suggestion' },
    },
    revalidateOnFocus: false,
  });

  if (error) {
    if (error instanceof FetcherError && error.status === 404) {
      notFound();
    }
    return <div>failed to load</div>;
  }

  return (
    <>
      <BackButton href={`/feedback/${id}`} />
      <EditFeedbackForm
        categories={categories}
        statuses={statuses}
        feedback={data}
        isLoading={isLoading}
      />
      ;
    </>
  );
}

export function EditFeedbackForm({
  categories,
  statuses,
  feedback,
  isLoading,
}: EditFeedbackFormProps) {
  const form = useForm<EditFeedbackFormData>({
    mode: 'uncontrolled',
    initialValues: {
      title: feedback.title,
      category: feedback.category.name,
      status: feedback.status.name,
      description: feedback.description,
    },
    validate: valibotResolver(editFeedbackSchema),
  });

  const [editResult, editAction, isEditPending] = useActionState<
    FeedbackMutationResult,
    EditFeedbackFormData
  >(editFeedback.bind(null, feedback.id), { success: false });

  const [deleteResult, deleteAction, isDeletePending] = useActionState<FeedbackMutationResult>(
    deleteFeedback.bind(null, feedback.id),
    { success: false }
  );

  useEffect(() => {
    form.setValues({
      title: feedback.title,
      description: feedback.description,
      category: feedback.category.name,
      status: feedback.status.name,
    });
  }, [feedback]);

  useEffect(() => {
    if (!form.isTouched()) {
      return;
    }

    if (editResult.success) {
      notifications.show({
        title: editResult.title ?? 'All good!',
        message: editResult.message,
        icon: <IconCheck />,
        color: 'teal',
      });
      form.resetDirty();
    } else {
      if (editResult.errors) {
        form.setErrors(editResult.errors);
      }
      notifications.show({
        title: editResult.title ?? 'Bummer!',
        message: editResult.message ?? 'Something went wrong.',
        icon: <IconX />,
        color: 'red',
      });
    }
  }, [editResult]);

  useEffect(() => {
    if (!deleteResult.success && deleteResult.message) {
      notifications.show({
        title: 'Bummer!',
        message: deleteResult.message,
        icon: <IconX />,
        color: 'red',
      });
    }
  }, [deleteResult]);

  const handleSubmit = (values: EditFeedbackFormData) => {
    if (!form.isDirty()) {
      notifications.show({
        message: 'No changes to save.',
        color: 'gray',
      });
      return;
    }

    startTransition(() => {
      editAction(values);
    });
  };

  return (
    <form
      aria-labelledby="form-label"
      className={classes.container}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <LoadingOverlay visible={isLoading} zIndex={100} overlayProps={{ radius: 10, blur: 2 }} />
      <IconEditFeedback className={classes.icon} aria-hidden="true" />
      <h1 id="form-label" className={classes.title}>
        Editing &lsquo;{feedback.title}&rsquo;
      </h1>
      <Stack gap={24} className={classes.fields}>
        <FormField
          kind="text"
          label="Feedback Title"
          description="Add a short, descriptive headline"
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        <FormField
          kind="select"
          label="Category"
          description="Choose a category for your feedback"
          options={categories}
          key={form.key('category')}
          {...form.getInputProps('category')}
        />
        <FormField
          kind="select"
          label="Update Status"
          description="Change feature state"
          options={statuses}
          key={form.key('status')}
          {...form.getInputProps('status')}
        />
        <FormField
          kind="textarea"
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
          key={form.key('description')}
          {...form.getInputProps('description')}
        />
      </Stack>
      <div className={classes.actions}>
        <Button
          type="submit"
          variant="primary"
          loading={isEditPending}
          loaderProps={{ type: 'dots' }}
        >
          Save Changes
        </Button>
        <Button component={Link} href={`/feedback/${feedback.id}`} variant="neutral">
          Cancel
        </Button>
        <DeleteButtonWithModal
          deleteAction={deleteAction}
          confirmModalProps={{
            title: 'Delete this feedback?',
            description: 'All comments and replies of this feedback will be permanently deleted.',
          }}
          successModalProps={{ message: deleteResult.message }}
          isPending={isDeletePending}
          isSuccess={deleteResult.success}
        />
      </div>
    </form>
  );
}
