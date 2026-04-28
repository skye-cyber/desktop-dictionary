# Desktop Dictionary

A lightweight desktop dictionary built with Electron and SQLite.

## Features

- ⚡ Fast full-text search with debouncing
- 🌙 Auto dark/light mode
- ⌨️ Global shortcut: `Cmd/Ctrl + Shift + D`
- 🔒 Context isolation for security
- 📦 Small bundle size (~50MB)

## Project Structure

```
dictionary-electron/
├── assets
├── index.html
├── package.json
├── README.md
├── scripts
└── src
    ├── core
    ├── main
    │   └── main.ts
    ├── preload
    │   └── preload.ts
    ├── services
    │   └── dictionaryService.js
    └── ui
        ├── App.js
        ├── components
        ├── pages
        ├── services
        └── styles
            └── config.css

```

## Quick Start

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Build for production
npm run build
```

## Adding Dictionary Data

Place your SQLite database at `assets/dictionary.db` with this schema:

```sql
CREATE TABLE entries (
  id INTEGER PRIMARY KEY,
  word TEXT NOT NULL,
  phonetic TEXT,
  part_of_speech TEXT,
  definition TEXT NOT NULL,
  example TEXT
);
```

The app copies this to the user's data directory on first launch.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + Shift + D` | Show/hide app |
| `Cmd/Ctrl + K` | Focus search |
| `Escape` | Clear search |
