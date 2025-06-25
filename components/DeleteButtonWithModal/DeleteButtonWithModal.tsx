import { startTransition } from 'react';
import { Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { DeleteSuccessModal } from './DeleteSuccessModal';

interface DeleteButtonWithModalProps {
  deleteAction?: () => void;
  confirmModalProps: {
    title: string;
    description?: string;
  };
  successModalProps?: {
    message?: string;
  };
  isPending?: boolean;
  isSuccess: boolean;
}

export function DeleteButtonWithModal({
  deleteAction,
  confirmModalProps,
  successModalProps,
  isPending,
  isSuccess,
}: DeleteButtonWithModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = () => {
    if (deleteAction == null) {
      return;
    }

    startTransition(() => {
      deleteAction();
    });
  };

  return (
    <>
      <DeleteConfirmationModal
        opened={!isSuccess && opened}
        onClose={close}
        title={confirmModalProps.title}
        description={confirmModalProps.description}
        handleDelete={handleDelete}
        isDeletePending={isPending}
      />

      <DeleteSuccessModal opened={isSuccess} message={successModalProps?.message} />

      <Button type="button" variant="danger" onClick={open}>
        Delete
      </Button>
    </>
  );
}
