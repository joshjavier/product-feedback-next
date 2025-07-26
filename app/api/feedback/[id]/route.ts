import { NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import { getDb } from '@/lib/db';
import { feedbackForEditForm } from '@/lib/types';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();

  try {
    const feedbackId = Number(id);
    if (Number.isNaN(feedbackId)) {
      throw new Error('Invalid id');
    }

    const feedback = await db.feedbackRequest.findFirstOrThrow({
      where: { id: feedbackId },
      select: feedbackForEditForm,
    });

    return Response.json(feedback);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Invalid id') {
        return Response.json({ error: err.message }, { status: 400 });
      }
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        return Response.json({ error: 'Feedback not found' }, { status: 404 });
      }
    }

    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
