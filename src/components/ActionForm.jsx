import React, { useEffect, useState } from 'react';
import { CATEGORIES, PRIORITIES, STATUSES } from '../utils/constants';

const emptyForm = {
  title: '',
  description: '',
  category: 'Work',
  priority: 'Medium',
  status: 'Backlog',
  dueDate: '',
  tags: '',
};

const ActionForm = ({ onSubmit, onCancel, editingAction }) => {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingAction) {
      setForm({
        title: editingAction.title,
        description: editingAction.description,
        category: editingAction.category,
        priority: editingAction.priority,
        status: editingAction.status,
        dueDate: editingAction.dueDate,
        tags: editingAction.tags.join(', '),
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingAction]);

  const handleChange = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (!payload.title) return;
    onSubmit(payload);
  };

  return (
    <section className="form-modal">
      <div className="form-shell">
        <div className="form-header">
          <h2>{editingAction ? 'Edit Action' : 'New Action'}</h2>
          <button type="button" onClick={onCancel} className="secondary-btn">
            Close
          </button>
        </div>
        <form className="action-form" onSubmit={handleSubmit}>
          <label>
            Title*
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              rows="3"
              value={form.description}
              onChange={(event) => handleChange('description', event.target.value)}
            />
          </label>

          <div className="form-row">
            <label>
              Category
              <select
                value={form.category}
                onChange={(event) => handleChange('category', event.target.value)}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Priority
              <select
                value={form.priority}
                onChange={(event) => handleChange('priority', event.target.value)}
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Status
              <select
                value={form.status}
                onChange={(event) => handleChange('status', event.target.value)}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Due Date
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => handleChange('dueDate', event.target.value)}
              />
            </label>

            <label>
              Tags (comma separated)
              <input
                type="text"
                placeholder="frontend,urgent"
                value={form.tags}
                onChange={(event) => handleChange('tags', event.target.value)}
              />
            </label>
          </div>

          <button className="primary-btn" type="submit">
            {editingAction ? 'Update Action' : 'Add Action'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ActionForm;
