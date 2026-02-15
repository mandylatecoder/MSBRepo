# Action Tracker App

A React + Vite action tracker with dashboard summary, filter controls, and a Kanban-like board. Data is persisted in `localStorage`.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

## Features

- Create, edit, and delete actions with fields:
  - `id`, `title`, `description`, `category`, `priority`, `status`, `dueDate`, `createdAt`, `updatedAt`, `tags`
- Predefined categories: Work, Personal, Health, Finance, Learning
- Status workflow: Backlog, In Progress, Completed
- Dashboard cards for Total, Completed, In Progress, Overdue, High Priority
- Kanban board grouped by status
- Filters: category, priority, status, and title search
- Responsive UI with plain CSS
- Local persistence with `localStorage`
