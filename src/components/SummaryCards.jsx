import React from 'react';

const SummaryCards = ({ summary }) => {
  const cards = [
    { label: 'Total', value: summary.total },
    { label: 'Completed', value: summary.completed },
    { label: 'In Progress', value: summary.inProgress },
    { label: 'Overdue', value: summary.overdue },
    { label: 'High Priority', value: summary.highPriority },
  ];

  return (
    <section className="summary-grid" aria-label="Dashboard summary">
      {cards.map((card) => (
        <article key={card.label} className="summary-card">
          <p className="summary-label">{card.label}</p>
          <p className="summary-value">{card.value}</p>
        </article>
      ))}
    </section>
  );
};

export default SummaryCards;
