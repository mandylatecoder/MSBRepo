import React from 'react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../utils/constants';

const FilterBar = ({ filters, onChange, onReset }) => {
  return (
    <section className="filter-bar" aria-label="Action filters">
      <input
        type="text"
        placeholder="Search by title"
        value={filters.search}
        onChange={(event) => onChange('search', event.target.value)}
      />
      <select
        value={filters.category}
        onChange={(event) => onChange('category', event.target.value)}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={filters.priority}
        onChange={(event) => onChange('priority', event.target.value)}
      >
        <option value="">All priorities</option>
        {PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      <select
        value={filters.status}
        onChange={(event) => onChange('status', event.target.value)}
      >
        <option value="">All statuses</option>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button type="button" className="secondary-btn" onClick={onReset}>
        Clear
      </button>
    </section>
  );
};

export default FilterBar;
