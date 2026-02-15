import React, { useEffect, useMemo, useState } from 'react';
import ActionForm from './components/ActionForm';
import FilterBar from './components/FilterBar';
import KanbanBoard from './components/KanbanBoard';
import SummaryCards from './components/SummaryCards';
import { isOverdue } from './utils/dateUtils';
import { loadActions, saveActions } from './utils/storage';

const initialFilters = {
  search: '',
  category: '',
  priority: '',
  status: '',
};

const App = () => {
  // App state keeps all persisted actions and UI state.
  const [actions, setActions] = useState(() => loadActions());
  const [filters, setFilters] = useState(initialFilters);
  const [showForm, setShowForm] = useState(false);
  const [editingAction, setEditingAction] = useState(null);

  // Synchronize to localStorage every time actions change.
  useEffect(() => {
    saveActions(actions);
  }, [actions]);

  const summary = useMemo(() => {
    return {
      total: actions.length,
      completed: actions.filter((item) => item.status === 'Completed').length,
      inProgress: actions.filter((item) => item.status === 'In Progress').length,
      overdue: actions.filter((item) => isOverdue(item)).length,
      highPriority: actions.filter((item) => item.priority === 'High').length,
    };
  }, [actions]);

  const filteredActions = useMemo(() => {
    return actions.filter((action) => {
      const matchesSearch = action.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || action.category === filters.category;
      const matchesPriority = !filters.priority || action.priority === filters.priority;
      const matchesStatus = !filters.status || action.status === filters.status;

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [actions, filters]);

  const closeForm = () => {
    setShowForm(false);
    setEditingAction(null);
  };

  const handleSubmit = (payload) => {
    const now = new Date().toISOString();

    if (editingAction) {
      setActions((current) =>
        current.map((action) =>
          action.id === editingAction.id
            ? {
                ...action,
                ...payload,
                updatedAt: now,
              }
            : action
        )
      );
      closeForm();
      return;
    }

    const newAction = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: now,
      updatedAt: now,
    };

    setActions((current) => [newAction, ...current]);
    closeForm();
  };

  const handleDelete = (id) => {
    setActions((current) => current.filter((action) => action.id !== id));
  };

  const handleStatusChange = (id, status) => {
    const now = new Date().toISOString();
    setActions((current) =>
      current.map((action) =>
        action.id === id ? { ...action, status, updatedAt: now } : action
      )
    );
  };

  return (
    <div className="app-shell">
      <header className="top-bar">
        <h1>Action Tracker</h1>
        <button className="primary-btn" onClick={() => setShowForm(true)} type="button">
          Add Action
        </button>
      </header>

      <SummaryCards summary={summary} />

      <FilterBar
        filters={filters}
        onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
        onReset={() => setFilters(initialFilters)}
      />

      <KanbanBoard
        actions={filteredActions}
        onEdit={(action) => {
          setEditingAction(action);
          setShowForm(true);
        }}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />

      {showForm && (
        <ActionForm
          editingAction={editingAction}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}
    </div>
  );
};

export default App;
