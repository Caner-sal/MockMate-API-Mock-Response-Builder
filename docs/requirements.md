# MockMate — Requirements

## Feature Summary

MockMate is a frontend-only API mock response builder. It lets developers define, preview, and manage mock API endpoints without a real backend.

---

## User Stories

- As a frontend developer, I want to create mock API endpoints so that I can test UI flows before backend is ready.
- As a frontend developer, I want to validate JSON responses so that my mock data does not break the preview.
- As a frontend developer, I want to export mock endpoints so that I can reuse them across projects.
- As a frontend developer, I want to import previously exported endpoints so that I can restore my workspace quickly.
- As a frontend developer, I want to search and filter endpoints so that I can find what I need in a large list.
- As a frontend developer, I want to preview a simulated HTTP response so that I can validate my mock before using it.
- As a frontend developer, I want to duplicate an endpoint so that I can create variations without starting from scratch.
- As a frontend developer, I want my data to survive page refresh so that I don't lose my work.
- As a frontend developer, I want to see dashboard statistics so that I get an overview of my mock API collection.

---

## Acceptance Criteria

### Create Endpoint
- User can fill name, method, path, status code, delay, description, tags, and response body.
- Path must start with `/`.
- Status code must be between 100 and 599.
- Delay must be >= 0.
- Response body must be valid JSON or empty (defaults to `{}`).
- `createdAt` and `updatedAt` are auto-generated.
- Invalid JSON blocks saving and shows a friendly error.

### Edit Endpoint
- User can click Edit on a card to open the form pre-filled.
- Saving updates `updatedAt` to current time.
- Invalid JSON blocks saving.

### Duplicate Endpoint
- Creates a new endpoint with a new ID.
- Appends `(Copy)` to the name.
- New `createdAt` and `updatedAt` timestamps.

### Delete Endpoint
- Removes the endpoint from state and localStorage.
- If the deleted endpoint was selected, the preview clears.

### Search
- Case-insensitive.
- Searches name, path, description, tags, and method fields.

### Filter
- By HTTP method (All, GET, POST, PUT, PATCH, DELETE).
- By status group (All, 2xx, 4xx, 5xx).
- By tag.

### Sort
- Newest first, Oldest first, Path A–Z, Method order, Status code ascending.

### Preview
- Shows method, path, status code, delay, and pretty-printed JSON.
- Copy response button works.

### Mock Request Simulator
- No real network requests.
- Shows loading indicator for the configured delay duration.
- Displays response after delay.

### Dashboard
- Counts: Total, GET, POST, Success, Error, Most Used Tag.
- Updates in real time as endpoints change.

### LocalStorage
- Key: `mockmate-data-v1`.
- Persists endpoints and preferences.
- Falls back to defaults on corrupt data.

### Export
- Downloads valid JSON file named `mockmate-export.json`.

### Import
- Accepts valid JSON.
- Rejects invalid JSON with friendly error.
- Ignores invalid endpoint records.

### Empty State
- Shows when no endpoints exist.
- Shows different message when filters return no results.

---

## Out-of-Scope Features

- Real backend server
- Real network requests
- User authentication or accounts
- Database persistence
- Swagger / OpenAPI import
- Postman collection import
- Cloud sync
- Team collaboration
- Dark/light mode toggle (future improvement)
- PWA or offline support (future improvement)

---

## Risks & Notes

- Node.js v18 is not compatible with `create-vite` latest version — project files were created manually.
- localStorage quota limits apply on some browsers in private mode.
- Clipboard API may be unavailable without HTTPS in some browsers — copy button may silently fail.
