import { FeedbackForCard } from './KanbanBoard.types';
import { KanbanBoardWithTabs } from './KanbanBoardWithTabs';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  feedbackRequests: FeedbackForCard[];
}

export function KanbanBoard({ feedbackRequests }: KanbanBoardProps) {
  const plannedRequests = feedbackRequests.filter(({ status }) => status.name === 'Planned');
  const inProgressRequests = feedbackRequests.filter(({ status }) => status.name === 'In-Progress');
  const liveRequests = feedbackRequests.filter(({ status }) => status.name === 'Live');

  const tabs = [
    { value: 'planned', label: `Planned (${plannedRequests.length})`, color: 'orange.3' },
    { value: 'in-progress', label: `In-Progress (${inProgressRequests.length})`, color: 'grape.6' },
    { value: 'live', label: `Live (${liveRequests.length})`, color: 'blue.3' },
  ];

  return (
    <KanbanBoardWithTabs tabs={tabs}>
      <KanbanColumn
        title="Planned"
        description="Ideas prioritized for research"
        feedbackRequests={plannedRequests}
      />
      <KanbanColumn
        title="In-Progress"
        description="Currently being developed"
        feedbackRequests={inProgressRequests}
      />
      <KanbanColumn title="Live" description="Released features" feedbackRequests={liveRequests} />
    </KanbanBoardWithTabs>
  );
}
