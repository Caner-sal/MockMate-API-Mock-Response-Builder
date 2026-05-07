# MockMate — API Mock Response Builder

A simple React + TypeScript API mock response builder for frontend development practice.

Build, preview, and manage mock API endpoints — no backend required.

---

## Features

- **Create & Edit Endpoints** — Define method, path, status code, delay, tags, and JSON response body
- **JSON Validation & Formatting** — Invalid JSON is blocked; Format JSON button auto-prettifies
- **Search** — Case-insensitive search across name, path, description, tags, and method
- **Filter** — Filter by HTTP method, status code group (2xx/4xx/5xx), and tag
- **Sort** — Newest, oldest, path A–Z, method order, status code ascending
- **Preview Panel** — View pretty-printed response with one click
- **Mock Request Simulator** — Simulates network delay without making real requests
- **Duplicate & Delete** — Clone endpoints (adds "(Copy)") or remove them
- **Dashboard** — Live stats: total endpoints, method counts, success/error counts, most used tag
- **LocalStorage Persistence** — Data survives page refresh automatically
- **Export / Import** — Download all endpoints as JSON or load from a previous export
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI components |
| TypeScript | Type safety |
| Vite 5 | Build tool & dev server |
| Vitest | Unit testing |
| React Testing Library | Component testing |
| Plain CSS | Styling (no UI framework) |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Caner-sal/MockMate-API-Mock-Response-Builder.git
cd MockMate-API-Mock-Response-Builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

### Add an Endpoint
1. Click **+ New Endpoint**
2. Fill in the name, method, path, status code, delay, and JSON body
3. Click **Create Endpoint**

### Edit an Endpoint
1. Click the ✏️ icon on any card
2. Modify fields and click **Save Changes**

### Preview & Simulate
1. Click any endpoint card to open the Preview Panel
2. Click **Send Mock Request** to simulate the response with the configured delay

### Export / Import
- Click **⬇ Export JSON** to download all endpoints
- Click **⬆ Import JSON** and paste previously exported JSON to restore

---

## Project Structure

```
src/
├── components/       # React UI components
│   ├── Dashboard.tsx
│   ├── EndpointCard.tsx
│   ├── EndpointForm.tsx
│   ├── EndpointList.tsx
│   ├── EmptyState.tsx
│   ├── FilterPanel.tsx
│   ├── ImportExportPanel.tsx
│   ├── PreviewPanel.tsx
│   ├── SearchBar.tsx
│   └── SortSelect.tsx
├── data/
│   └── sampleEndpoints.ts    # 9 pre-loaded sample endpoints
├── hooks/
│   ├── useEndpointFilters.ts  # Memoized filter/sort logic
│   ├── useLocalStorage.ts     # Persistence hook
│   └── useMockRequest.ts      # Simulator hook
├── types/
│   └── index.ts              # All TypeScript interfaces and types
├── utils/
│   ├── date.ts               # Date formatting helpers
│   ├── endpointFilters.ts    # Pure search/filter/sort functions
│   ├── endpointStats.ts      # Dashboard statistics functions
│   ├── json.ts               # JSON validation and formatting
│   └── storage.ts            # localStorage read/write/export/import
└── tests/
    ├── endpointFilters.test.ts
    ├── endpointStats.test.ts
    ├── json.test.ts
    └── storage.test.ts
```

---

## Running Tests

```bash
npm test
```

```bash
npm run build
```

---

## Screenshots

> _Screenshots coming soon._

### Dashboard
![Dashboard](public/screenshots/dashboard.png)

### Endpoint List
![Endpoint List](public/screenshots/endpoint-list.png)

### Response Preview
![Response Preview](public/screenshots/response-preview.png)

---

## Future Improvements

- Dark / Light mode toggle
- OpenAPI / Swagger export
- Postman collection export
- Mock endpoint folders / groups
- Response header editor
- Multiple response examples per endpoint
- GitHub Pages deployment
- PWA offline support
- CSV export
- Code editor library (Monaco, CodeMirror)

---

## Author

**Caner Sal**
GitHub: [@Caner-sal](https://github.com/Caner-sal)

---

## License

MIT License — free to use, modify, and distribute.
