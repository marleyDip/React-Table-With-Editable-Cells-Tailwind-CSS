# 🧩 React Editable Table — Pure React & Tailwind
## Build a fully editable data table with React & Tailwind CSS — no heavy table libraries. Features include inline cell editing, search, filtering, adding and deleting rows, and undo.

### ✨ Features
- ✏️ Editable cells (click to edit, Enter to save, Esc to cancel)
- 🔎 Search across rows
- 🧰 Column filters
- ➕ Add row / 🗑️ Delete row
- ↩️ Undo recent actions (edit/add/delete)
- ♿ Keyboard-friendly and responsive UI
- 🪶 Zero table libs — React hooks & Tailwind

### 🛠️ Tech Stack
- React (hooks, controlled inputs)
- Tailwind CSS
- Optional state helpers: useReducer for history/undo
  
### 🧪 How It Works
- State: rows stored in React state (or useReducer with a history stack for undo).
- Edit: each cell is a controlled input when “active”.
- Search/Filter: derived view over the same base rows.
- Undo: push actions to a history stack; pop to revert.

### Project Overview
