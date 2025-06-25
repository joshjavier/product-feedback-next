import { IconCheck } from '@tabler/icons-react';
import { Modal, Stack, Text, ThemeIcon } from '@mantine/core';
import { BackButton } from '../BackButton';
import classes from './DeleteButtonWithModal.module.css';

interface DeleteSuccessModalProps {
  opened: boolean;
  message?: string;
}

export function DeleteSuccessModal({ opened, message = 'All good!' }: DeleteSuccessModalProps) {
  return (
    <Modal
      aria-label="Success"
      opened={opened}
      onClose={() => {}}
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      classNames={{
        title: classes.title,
        body: classes.body,
        root: classes.root,
        content: classes.content,
      }}
      centered
    >
      <Stack align="center" my="sm">
        <ThemeIcon size="xl" radius="xl" color="teal">
          <IconCheck aria-hidden="true" />
        </ThemeIcon>
        <Text>{message}</Text>
        <BackButton label="Back to Home" data-autofocus />
      </Stack>
    </Modal>
  );
}
