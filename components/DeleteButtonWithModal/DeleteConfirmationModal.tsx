import { Button, Group, Modal, Text } from '@mantine/core';
import classes from './DeleteButtonWithModal.module.css';

interface DeleteConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  handleDelete: () => void;
  isDeletePending?: boolean;
}

export function DeleteConfirmationModal({
  opened,
  onClose,
  title,
  description,
  handleDelete,
  isDeletePending,
}: DeleteConfirmationModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      closeButtonProps={{ 'aria-label': 'Close modal' }}
      classNames={{
        title: classes.title,
        body: classes.body,
        root: classes.root,
        content: classes.content,
      }}
      centered
    >
      {description && <Text>{description}</Text>}
      <Group justify="flex-end" mt="xl">
        <Button type="button" variant="neutral" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
          data-autofocus
          loading={isDeletePending}
          loaderProps={{ type: 'dots' }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
}
