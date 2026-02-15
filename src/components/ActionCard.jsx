import React from 'react';
import { STATUSES } from '../utils/constants';
import { formatDate, isOverdue } from '../utils/dateUtils';

const ActionCard = ({ action, onEdit, onDelete, onStatusChange }) => {
  const overdue = isOverdue(action);

  return (
    <article className="action-card">
      <div className="action-card-header">
        <h3>{action.title}</h3>
        <span className={`priority-badge priority-${action.priority.toLowerCase()}`}>
          {action.priority}
        </span>
      </div>
      <p className="action-meta">{action.category}</p>
      {action.description && <p className="action-description">{action.description}</p>}
      <p className={`due-date ${overdue ? 'due-overdue' : ''}`}>
        Due: {formatDate(action.dueDate)}
      </p>
      <div className="tags-row">
        {action.tags.map((tag) => (
          <span key={tag} className="tag-pill">
            #{tag}
          </span>
        ))}
      </div>
      <select
        className="status-select"
        value={action.status}
        onChange={(event) => onStatusChange(action.id, event.target.value)}
      >
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <div className="card-actions">
        <button className="secondary-btn" type="button" onClick={() => onEdit(action)}>
          Edit
        </button>
        <button className="danger-btn" type="button" onClick={() => onDelete(action.id)}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default ActionCard;
