import React from 'react';
import { STATUSES } from '../utils/constants';
import ActionCard from './ActionCard';

const KanbanBoard = ({ actions, onEdit, onDelete, onStatusChange }) => {
  return (
    <section className="board" aria-label="Kanban board">
      {STATUSES.map((status) => {
        const inColumn = actions.filter((action) => action.status === status);
        return (
          <div key={status} className="board-column">
            <header className="board-column-header">
              <h2>{status}</h2>
              <span>{inColumn.length}</span>
            </header>

            <div className="board-cards">
              {inColumn.length === 0 && <p className="empty-column">No actions yet.</p>}
              {inColumn.map((action) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStatusChange={onStatusChange}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default KanbanBoard;
