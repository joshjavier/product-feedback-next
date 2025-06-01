import Link from 'next/link';
import { getDb } from '@/lib/db';

export default async function RoadmapPage() {
  const db = getDb();
  const frInRoadmap = await db.feedbackRequest.findMany({
    where: { NOT: { status: { name: 'Suggestion' } } },
    include: {
      status: { select: { name: true } },
      category: { select: { name: true } },
      _count: { select: { upvotes: true, comments: true } },
    },
  });

  const plannedRequests = frInRoadmap.filter(({ status }) => status.name === 'Planned');
  const inProgressRequests = frInRoadmap.filter(({ status }) => status.name === 'In-Progress');
  const liveRequests = frInRoadmap.filter(({ status }) => status.name === 'Live');

  return (
    <>
      <div>
        <Link href="/">Go Back</Link>
        <h1>Roadmap</h1>
        <button type="button">Add Feedback</button>
      </div>

      {/* PLANNED */}
      <div>
        <h2>Planned ({plannedRequests.length})</h2>
        <p>Ideas prioritized for research</p>
        <ul>
          {plannedRequests.map((item) => (
            <li key={item.id}>
              <p>{item.status.name}</p>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.category.name}</p>
              <p>{item._count.upvotes}</p>
              <p>{item._count.comments}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* IN-PROGRESS */}
      <div>
        <h2>In-Progress ({inProgressRequests.length})</h2>
        <p>Currently being developed</p>
        <ul>
          {inProgressRequests.map((item) => (
            <li key={item.id}>
              <p>{item.status.name}</p>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.category.name}</p>
              <p>{item._count.upvotes}</p>
              <p>{item._count.comments}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* LIVE */}
      <div>
        <h2>Live ({liveRequests.length})</h2>
        <p>Released features</p>
        <ul>
          {liveRequests.map((item) => (
            <li key={item.id}>
              <p>{item.status.name}</p>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.category.name}</p>
              <p>{item._count.upvotes}</p>
              <p>{item._count.comments}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
