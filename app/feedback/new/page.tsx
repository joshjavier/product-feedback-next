import { Container } from '@mantine/core';
import { BackButton } from '@/components/BackButton';
import { NewFeedbackForm } from '@/components/NewFeedbackForm';
import { getDb } from '@/lib/db';
import classes from './page.module.css';

export default async function NewFeedbackPage() {
  const db = getDb();
  const categories = await db.category.findMany();
  const options = categories.map((c) => c.name);

  return (
    <Container size={540} className={classes.container}>
      <div className={classes.layout}>
        <BackButton />
        <NewFeedbackForm categories={options} />
      </div>
    </Container>
  );
}
