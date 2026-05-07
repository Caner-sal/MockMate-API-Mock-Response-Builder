# MockMate — Claude Code / Antigravity Agent Project Brief

> Bu dosya Claude Code veya Google Antigravity içine verilecek ana proje talimatıdır.  
> Amaç: Sıfırdan başlanacak, agent kullanımıyla geliştirilecek, GitHub’da paylaşılabilecek basit ama güzel görünen bir frontend projesi yapmak.

---

## 1. Proje Fikri

**Proje Adı:** MockMate  
**Alt Başlık:** API Mock Response Builder  
**Proje Türü:** Frontend web uygulaması  
**Zorluk:** Başlangıç - orta seviye  
**Hedef:** Kullanıcının sahte API endpointleri oluşturabildiği, bu endpointlere ait mock response JSON verilerini düzenleyebildiği, response preview alıp export/import yapabildiği küçük bir developer tool geliştirmek.

Bu proje özellikle Claude Code / Antigravity denemesi için uygundur çünkü:

- Backend gerektirmez.
- Gerçek yazılım geliştirme mantığı içerir.
- API, endpoint, HTTP method, response body gibi kavramları öğretir.
- Component yapısı agent’lara rahat bölünür.
- JSON validation, search/filter, preview, localStorage ve test yazımı için uygundur.
- GitHub portfolyosunda sıradan todo uygulamasından daha teknik görünür.
- Antigravity Browser ile kullanıcı akışı rahat test edilir.

---

## 2. Kullanılacak Teknolojiler

Ana teknoloji:

```bash
React + TypeScript + Vite + CSS
```

Test araçları:

```bash
Vitest
React Testing Library
@testing-library/jest-dom
```

Ek notlar:

- Backend kullanılmayacak.
- Gerçek API isteği atılmayacak.
- Uygulama sadece mock endpoint tanımları oluşturacak.
- Veriler `localStorage` içinde saklanacak.
- JSON alanları textarea içinde düzenlenecek.
- İlk sürümde code editor library kullanılmayacak.
- Gereksiz büyük kütüphane eklenmeyecek.

---

## 3. Ana Özellikler

### 3.1 Mock Endpoint Oluşturma

Kullanıcı yeni mock API endpoint oluşturabilmeli.

Her endpoint şu alanlara sahip olacak:

- Endpoint name
- HTTP method
- Path
- Status code
- Response delay
- Response body
- Tags
- Description
- Created date
- Updated date

HTTP method seçenekleri:

```txt
GET
POST
PUT
PATCH
DELETE
```

Status code örnekleri:

```txt
200
201
400
401
403
404
500
```

Örnek endpoint:

```txt
Name: Get User Profile
Method: GET
Path: /api/users/1
Status: 200
Delay: 300ms
Tags: user, profile
Response:
{
  "id": 1,
  "name": "Caner",
  "role": "student"
}
```

---

### 3.2 Endpoint Listeleme

Mock endpointler kartlar halinde listelenmeli.

Kart üzerinde şunlar görünmeli:

- Endpoint name
- HTTP method badge
- Path
- Status code badge
- Delay
- Tags
- Kısa açıklama
- Preview butonu
- Edit butonu
- Duplicate butonu
- Delete butonu

---

### 3.3 JSON Response Editor

Kullanıcı response body alanını JSON olarak girebilmeli.

Kurallar:

- JSON geçerli değilse kullanıcıya hata mesajı gösterilmeli.
- Geçersiz JSON ile endpoint kaydedilmemeli.
- JSON formatla butonu olmalı.
- Boş JSON body için `{}` default olabilir.

Örnek hata mesajı:

```txt
Invalid JSON. Please check brackets, commas, or quotes.
```

---

### 3.4 Search

Kullanıcı endpointleri arayabilmeli.

Arama şu alanlarda çalışmalı:

- Endpoint name
- Path
- Description
- Tags
- HTTP method

Arama case-insensitive olmalı.

---

### 3.5 Filter

Kullanıcı endpointleri filtreleyebilmeli.

Filtre seçenekleri:

- HTTP method
- Status code group
- Tag

Status code group seçenekleri:

```txt
All
2xx Success
4xx Client Error
5xx Server Error
```

---

### 3.6 Sort

Kullanıcı endpointleri sıralayabilmeli.

Sıralama seçenekleri:

- Newest first
- Oldest first
- Path A-Z
- Method order
- Status code ascending

Method order:

```txt
GET > POST > PUT > PATCH > DELETE
```

---

### 3.7 Response Preview

Kullanıcı endpoint response’unu preview olarak görebilmeli.

Preview panelinde:

- Request line
- Simulated status code
- Simulated delay
- Pretty printed JSON response
- Copy response button

Örnek:

```txt
GET /api/users/1
Status: 200 OK
Delay: 300ms
```

---

### 3.8 Mock Request Simulator

Kullanıcı seçili endpoint için basit bir “Send Mock Request” butonuna basabilmeli.

Davranış:

- Gerçek network isteği atılmayacak.
- Butona basınca delay kadar bekliyormuş gibi loading state gösterilecek.
- Sonra response preview gösterilecek.
- Bu sadece frontend simülasyonu olacak.

---

### 3.9 Duplicate Endpoint

Kullanıcı bir endpointi kopyalayabilmeli.

Kurallar:

- Duplicate endpoint yeni ID almalı.
- Name sonuna `(Copy)` eklenmeli.
- Created date ve updated date yeniden oluşturulmalı.
- Diğer alanlar aynı kalmalı.

---

### 3.10 Dashboard

Ana ekranda kısa bir özet paneli olmalı.

Gösterilecek değerler:

- Total endpoints
- GET endpoint count
- POST endpoint count
- Success responses
- Error responses
- Most used tag

---

### 3.11 LocalStorage

Sayfa yenilendiğinde endpointler kaybolmamalı.

Saklanacak veriler:

- Endpoint listesi
- Search/filter/sort preferences
- Selected endpoint id, opsiyonel

Storage key:

```txt
mockmate-data-v1
```

---

### 3.12 Export / Import

Kullanıcı mock endpointlerini JSON olarak dışa aktarabilmeli ve tekrar içe aktarabilmeli.

Export:

- Tüm endpoint listesi
- Preferences

Import:

- Geçerli JSON ise veriyi yükle
- Geçersiz JSON ise hata göster
- Eksik alan varsa güvenli fallback kullan
- Geçersiz endpoint kayıtlarını ignore et
- Uygulama çökmemeli

---

### 3.13 Empty State

Hiç endpoint yoksa veya filtre sonucunda kayıt bulunamazsa kullanıcıya boş durum gösterilmeli.

Örnek:

```txt
No mock endpoints found.
Create your first mock endpoint or change your filters.
```

---

### 3.14 Responsive Tasarım

Uygulama şu ekranlarda düzgün çalışmalı:

- Desktop
- Tablet
- Mobile

Minimum hedef:

- Desktop’ta dashboard üstte, endpoint listesi ve preview paneli grid yapıda görünmeli.
- Mobile’da kartlar tek sütun olmalı.
- Form alanları alt alta dizilmeli.
- Preview panel mobile’da okunaklı olmalı.
- Yatay taşma olmamalı.

---

## 4. Hedef Kullanıcı

```txt
Yazılım mühendisliği öğrencisi.
Frontend geliştirirken örnek API response verisiyle çalışmak istiyor.
Backend hazır olmadan UI tasarlamak veya veri akışını test etmek istiyor.
Basit ama gerçekçi bir developer tool projesi yapmak istiyor.
```

---

## 5. İlk Sürüm Kapsamı

### Yapılacaklar

- React + TypeScript + Vite kurulumu
- Component tabanlı yapı
- Mock endpoint ekleme
- Endpoint listeleme
- JSON validation
- JSON formatlama
- Search
- Filter
- Sort
- Preview panel
- Mock request simulator
- Duplicate endpoint
- Delete endpoint
- Dashboard
- LocalStorage
- Export/import
- Basit testler
- README
- GitHub hazırlığı

### Yapılmayacaklar

- Gerçek backend
- Gerçek API server
- Gerçek network request
- Login/register
- Database
- Swagger/OpenAPI import
- Postman collection import
- Cloud sync
- Team collaboration
- Payment
- Authentication

---

## 6. Beklenen Dosya Yapısı

```txt
mockmate/
├── .claude/
│   └── agents/
│       ├── product-planner.md
│       ├── data-modeler.md
│       ├── frontend-architect.md
│       ├── feature-builder.md
│       ├── json-validator-agent.md
│       ├── ui-designer.md
│       ├── storage-agent.md
│       ├── qa-tester.md
│       └── docs-github-agent.md
├── public/
├── src/
│   ├── components/
│   │   ├── EndpointForm.tsx
│   │   ├── EndpointCard.tsx
│   │   ├── EndpointList.tsx
│   │   ├── PreviewPanel.tsx
│   │   ├── Dashboard.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SortSelect.tsx
│   │   ├── EmptyState.tsx
│   │   └── ImportExportPanel.tsx
│   ├── data/
│   │   └── sampleEndpoints.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useEndpointFilters.ts
│   │   └── useMockRequest.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── endpointFilters.ts
│   │   ├── endpointStats.ts
│   │   ├── json.ts
│   │   ├── storage.ts
│   │   └── date.ts
│   ├── tests/
│   │   ├── endpointFilters.test.ts
│   │   ├── endpointStats.test.ts
│   │   ├── json.test.ts
│   │   └── storage.test.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── setupTests.ts
├── docs/
│   └── requirements.md
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
└── PROJECT_BRIEF.md
```

---

## 7. Claude Code Ana Prompt’u

Claude Code’a verilecek ana prompt:

```txt
You are building a beginner-friendly React + TypeScript project called "MockMate".

Read PROJECT_BRIEF.md completely before editing code.

Use the custom subagents inside .claude/agents when appropriate.

Project goals:
1. Build a Vite + React + TypeScript app.
2. Create a frontend-only API mock response builder.
3. Allow users to create, view, search, filter, sort, duplicate, edit, preview, and delete mock endpoints.
4. Add JSON response validation and formatting.
5. Add a mock request simulator without real network requests.
6. Add dashboard statistics.
7. Persist data with localStorage.
8. Add JSON export/import.
9. Add basic tests.
10. Prepare the project for GitHub with a clean README.

Important rules:
- Work only inside this project folder.
- Do not delete files outside the workspace.
- Do not use destructive terminal commands.
- Ask for review before major file deletion or dependency changes.
- Keep the app simple and understandable.
- Do not add a real backend.
- Do not send real network requests.
- Prefer small commits or clear checkpoints.
- After each major phase, run build or tests and summarize what changed.
```

---

## 8. Agent Tanımları

Aşağıdaki agent dosyaları `.claude/agents/` klasörüne oluşturulmalıdır.

---

### 8.1 `product-planner.md`

```md
---
name: product-planner
description: Use this agent to clarify requirements, write user stories, define acceptance criteria, and protect project scope.
tools: Read, Write, Edit
---

You are the Product Planner Agent for the MockMate project.

Responsibilities:
- Read PROJECT_BRIEF.md.
- Convert the project idea into clear user stories.
- Define acceptance criteria for each feature.
- Keep the project beginner-friendly.
- Prevent scope creep.
- Make sure no backend, auth, Postman import, Swagger import, or real API calls are added.
- Create or update docs/requirements.md.

Output format:
1. Feature summary
2. User stories
3. Acceptance criteria
4. Out-of-scope items
5. Risks or unclear points

Do not implement UI code unless explicitly requested.
```

---

### 8.2 `data-modeler.md`

```md
---
name: data-modeler
description: Use this agent to design TypeScript models, sample endpoint data, validation rules, and controlled enum values.
tools: Read, Write, Edit
---

You are the Data Modeler Agent.

Responsibilities:
- Define TypeScript types for mock endpoints.
- Create src/data/sampleEndpoints.ts.
- Add at least 8 realistic sample endpoints.
- Keep sample data fictional and safe.
- Make method, status code, tags, and paths consistent.
- Make examples useful for search/filter testing.

Required fields:
- id
- name
- method
- path
- statusCode
- delayMs
- description
- responseBody
- tags
- createdAt
- updatedAt

Output:
- Type definitions
- Sample endpoint data
- Short notes about assumptions
```

---

### 8.3 `frontend-architect.md`

```md
---
name: frontend-architect
description: Use this agent to design React component structure, TypeScript types, state flow, hooks, and project architecture.
tools: Read, Write, Edit, Bash
---

You are the Frontend Architect Agent.

Responsibilities:
- Create a clean React + TypeScript structure.
- Create reusable types in src/types/index.ts.
- Decide component responsibilities.
- Decide state flow.
- Create hooks and utility placeholders.
- Keep search/filter/sort logic testable through pure functions.
- Keep JSON validation isolated inside utility functions.
- Avoid overengineering.
- Make sure the project builds with Vite.

Output:
1. Folder structure
2. Component responsibility list
3. TypeScript interfaces
4. State flow notes
5. Architecture notes

You may edit files when implementing structure.
Run build when relevant.
```

---

### 8.4 `feature-builder.md`

```md
---
name: feature-builder
description: Use this agent to implement mock endpoint features such as create, list, edit, duplicate, delete, search, filter, sort, preview, dashboard, and simulator wiring.
tools: Read, Write, Edit, Bash
---

You are the Feature Builder Agent.

Responsibilities:
- Implement endpoint creation.
- Implement endpoint listing.
- Implement endpoint editing.
- Implement endpoint duplication.
- Implement endpoint deletion.
- Implement search.
- Implement filters.
- Implement sorting.
- Implement preview panel.
- Implement mock request simulator.
- Wire dashboard to real state.
- Keep code readable and beginner-friendly.
- Avoid unnecessary dependencies.

Feature rules:
- An endpoint must have id, name, method, path, statusCode, delayMs, description, responseBody, tags, createdAt, updatedAt.
- Search must be case-insensitive.
- Editing an endpoint must update updatedAt.
- Duplicating an endpoint must create a new ID and add "(Copy)" to the name.
- Deleting an endpoint removes it from state and persisted storage.
- Empty state must appear when no results match.
- Mock request simulator must not send real network requests.

After implementation:
- Run npm run build.
- Fix TypeScript errors.
- Summarize changed files.
```

---

### 8.5 `json-validator-agent.md`

```md
---
name: json-validator-agent
description: Use this agent to implement JSON validation, formatting, safe parsing, error messages, and related tests.
tools: Read, Write, Edit, Bash
---

You are the JSON Validator Agent.

Responsibilities:
- Implement src/utils/json.ts.
- Add safe JSON parse function.
- Add JSON validation function.
- Add JSON pretty formatting function.
- Make sure invalid JSON never crashes the app.
- Provide friendly error messages.
- Add tests for JSON utilities.

Rules:
- Empty response body can become "{}".
- Invalid JSON must return a structured error result.
- Formatting should use JSON.stringify(parsed, null, 2).
- Do not use external JSON editor libraries in the first version.

Output:
- JSON utility functions
- Related tests
- Notes about edge cases
```

---

### 8.6 `ui-designer.md`

```md
---
name: ui-designer
description: Use this agent to create clean responsive CSS, layout, cards, badges, preview panel, form styling, empty states, and beginner-friendly visual polish.
tools: Read, Write, Edit, Bash
---

You are the UI Designer Agent.

Responsibilities:
- Create a clean and modern developer tool interface.
- Use plain CSS in src/index.css.
- Add dashboard cards.
- Add endpoint cards.
- Add method and status badges.
- Add responsive layout.
- Add empty state styling.
- Add preview panel styling.
- Add JSON textarea styling.
- Keep colors readable and not excessive.
- Make the UI work on mobile and desktop.

Visual style:
- Lightweight developer tool
- Clean dashboard
- Rounded cards
- Soft shadows
- Good spacing
- Clear contrast
- Monospace blocks for JSON preview
- No heavy animations

You may edit JSX and CSS.
After changes, run build if possible.
```

---

### 8.7 `storage-agent.md`

```md
---
name: storage-agent
description: Use this agent to implement localStorage persistence, import/export JSON, data validation, and storage utilities.
tools: Read, Write, Edit, Bash
---

You are the Storage Agent.

Responsibilities:
- Implement localStorage helpers.
- Make sure endpoint records survive refresh.
- Save filter and sort preferences if implemented.
- Add JSON export.
- Add JSON import.
- Validate imported JSON before replacing current data.
- Avoid crashing the app on invalid localStorage data.
- Add tests for storage helpers.

Rules:
- Use stable key: mockmate-data-v1.
- If localStorage parsing fails, return safe default data.
- Export should produce valid JSON.
- Import should reject invalid JSON with a friendly error.
- Invalid endpoint records should be ignored or safely repaired.
- Do not store sensitive data.

After implementation:
- Add or update tests for storage functions.
- Run tests.
```

---

### 8.8 `qa-tester.md`

```md
---
name: qa-tester
description: Use this agent to write tests, run build/test commands, inspect likely bugs, and produce a QA checklist.
tools: Read, Write, Edit, Bash
---

You are the QA Tester Agent.

Responsibilities:
- Add tests for pure utility functions.
- Test search/filter/sort behavior.
- Test dashboard stats calculation.
- Test JSON validation.
- Test storage fallback.
- Check TypeScript build.
- Check for common UI bugs.
- Verify main user flow manually.

Minimum tests:
- search by endpoint name
- search by tag
- filter by method
- filter by status group
- sort by path A-Z
- count total endpoints
- count GET endpoints
- count success responses
- count error responses
- find most used tag
- invalid JSON validation fails safely
- valid JSON formatting works
- invalid localStorage fallback
- valid import data check

Commands:
- npm run build
- npm test

Output:
1. What was tested
2. Passing/failing status
3. Bugs found
4. Bugs fixed
5. Remaining manual checks
```

---

### 8.9 `docs-github-agent.md`

```md
---
name: docs-github-agent
description: Use this agent to prepare README, GitHub project description, screenshots checklist, commit messages, and repository publishing steps.
tools: Read, Write, Edit, Bash
---

You are the Docs and GitHub Agent.

Responsibilities:
- Create a professional README.md.
- Explain project features clearly.
- Add installation steps.
- Add usage instructions.
- Add screenshots section placeholder.
- Add tech stack.
- Add future improvements.
- Add license recommendation.
- Prepare GitHub publishing checklist.

README must include:
- Project title
- Short description
- Features
- Tech stack
- Getting started
- Usage
- Project structure
- Screenshots placeholder
- Future improvements
- Author
- License

Keep it suitable for a beginner GitHub portfolio.
```

---

## 9. Proje Aşamaları

Claude Code veya Antigravity bu sırayı takip etmeli.

---

### Phase 0 — Güvenli Başlangıç

Amaç: Proje klasörünü ve temel Vite kurulumunu oluşturmak.

```bash
mkdir mockmate
cd mockmate
git init
npm create vite@latest . -- --template react-ts
npm install
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm run build
git add .
git commit -m "chore: initialize react vite project"
```

Kabul kriteri:

- Proje klasörü oluşmuş olmalı.
- Vite React TypeScript kurulmuş olmalı.
- `npm run build` hata vermemeli.
- İlk commit atılmış olmalı.

---

### Phase 1 — Requirements

Kullanılacak agent:

```txt
product-planner
```

Yapılacaklar:

1. PROJECT_BRIEF.md oku.
2. User story listesi oluştur.
3. Acceptance criteria yaz.
4. Scope dışı özellikleri listele.
5. `docs/requirements.md` dosyasını oluştur.

Örnek user story:

```txt
As a frontend developer, I want to create mock API endpoints so that I can test UI flows before backend is ready.
As a frontend developer, I want to validate JSON responses so that my mock data does not break the preview.
As a frontend developer, I want to export mock endpoints so that I can reuse them later.
```

Commit:

```bash
git add .
git commit -m "docs: define mockmate requirements"
```

---

### Phase 2 — Data Model ve Sample Data

Kullanılacak agent:

```txt
data-modeler
```

Yapılacaklar:

1. `src/types/index.ts` oluştur.
2. Endpoint type ve enum/type değerlerini yaz.
3. `src/data/sampleEndpoints.ts` oluştur.
4. En az 8 sample endpoint ekle.

Örnek type:

```ts
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type StatusGroup = "All" | "2xx" | "4xx" | "5xx";

export type EndpointSortOption =
  | "newest"
  | "oldest"
  | "path-asc"
  | "method-order"
  | "status-asc";

export interface MockEndpoint {
  id: string;
  name: string;
  method: HttpMethod;
  path: string;
  statusCode: number;
  delayMs: number;
  description: string;
  responseBody: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MockMateData {
  endpoints: MockEndpoint[];
  preferences: MockMatePreferences;
}

export interface MockMatePreferences {
  searchQuery: string;
  selectedMethod: HttpMethod | "All";
  selectedStatusGroup: StatusGroup;
  selectedTag: string | "All";
  sortOption: EndpointSortOption;
}
```

Commit:

```bash
git add .
git commit -m "chore: add endpoint data model and sample records"
```

---

### Phase 3 — Architecture

Kullanılacak agent:

```txt
frontend-architect
```

Yapılacaklar:

1. Component klasörlerini oluştur.
2. Hook ve utility dosyalarını oluştur.
3. State flow planla.
4. Component sorumluluklarını yaz.
5. Boş component iskeletlerini oluştur.

Kabul kriteri:

- Dosya yapısı düzenli olmalı.
- TypeScript path ve importlar düzgün olmalı.
- Utility fonksiyonları test edilebilir olmalı.
- JSON logic ayrı utility dosyasında olmalı.

Commit:

```bash
git add .
git commit -m "chore: add frontend architecture"
```

---

### Phase 4 — JSON Utility

Kullanılacak agent:

```txt
json-validator-agent
```

Yapılacaklar:

1. `src/utils/json.ts` oluştur.
2. Safe parse fonksiyonu yaz.
3. Validate JSON fonksiyonu yaz.
4. Pretty format fonksiyonu yaz.
5. Basit testleri ekle.

Örnek fonksiyon isimleri:

```ts
safeParseJson
isValidJson
formatJson
normalizeJsonBody
```

Kabul kriteri:

- Geçerli JSON kabul edilmeli.
- Geçersiz JSON app’i çökertmemeli.
- JSON formatlama düzgün çalışmalı.
- Boş body güvenli şekilde `{}` olmalı.

Commit:

```bash
git add .
git commit -m "feat: add json validation utilities"
```

---

### Phase 5 — Endpoint Listeleme

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `EndpointCard.tsx` oluştur.
2. `EndpointList.tsx` oluştur.
3. `EmptyState.tsx` oluştur.
4. Sample endpoint verilerini App’e bağla.
5. Kartlarda temel bilgileri göster.

Kabul kriteri:

- Sample endpointler görünmeli.
- Method ve status badge görünmeli.
- Kartlar okunaklı olmalı.
- Empty state component hazır olmalı.

Commit:

```bash
git add .
git commit -m "feat: add endpoint listing"
```

---

### Phase 6 — Endpoint Formu

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `EndpointForm.tsx` oluştur.
2. Form alanlarını ekle.
3. JSON validation bağla.
4. JSON formatla butonu ekle.
5. Yeni endpointi state’e ekle.
6. Edit mode desteği için hazırlık yap.

Validation:

- Name boş olamaz.
- Path `/` ile başlamalı.
- Status code 100-599 arası olmalı.
- Delay 0’dan küçük olamaz.
- Response body geçerli JSON olmalı.

Kabul kriteri:

- Kullanıcı yeni endpoint ekleyebilmeli.
- Geçersiz JSON ile kayıt eklenmemeli.
- Format JSON butonu çalışmalı.
- CreatedAt ve updatedAt otomatik oluşturulmalı.

Commit:

```bash
git add .
git commit -m "feat: add endpoint creation form"
```

---

### Phase 7 — Search, Filter ve Sort

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `SearchBar.tsx` oluştur.
2. `FilterPanel.tsx` oluştur.
3. `SortSelect.tsx` oluştur.
4. `src/utils/endpointFilters.ts` içine pure functions yaz.
5. `useEndpointFilters.ts` hook oluştur.
6. UI kontrollerini gerçek state’e bağla.

Kabul kriteri:

- Search çalışmalı.
- Method filter çalışmalı.
- Status group filter çalışmalı.
- Tag filter çalışmalı.
- Sort seçenekleri doğru çalışmalı.
- Sonuç yoksa empty state görünmeli.

Commit:

```bash
git add .
git commit -m "feat: add endpoint search filters and sorting"
```

---

### Phase 8 — Edit, Duplicate ve Delete

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. Endpoint edit modunu ekle.
2. Karttaki edit butonu formu doldurmalı.
3. Save edit endpointi güncellemeli.
4. Duplicate butonu ekle.
5. Delete fonksiyonu ekle.
6. UpdatedAt edit sonrası güncellenmeli.

Kabul kriteri:

- Endpoint düzenlenebilmeli.
- Duplicate endpoint yeni ID almalı.
- Delete endpointi listeden kaldırmalı.
- Edit sırasında invalid JSON engellenmeli.

Commit:

```bash
git add .
git commit -m "feat: add endpoint edit duplicate and delete"
```

---

### Phase 9 — Preview Panel ve Mock Request Simulator

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `PreviewPanel.tsx` oluştur.
2. Seçili endpoint preview olarak gösterilmeli.
3. Pretty JSON response gösterilmeli.
4. Copy response butonu ekle.
5. `useMockRequest.ts` oluştur.
6. Send Mock Request butonu loading state göstermeli.
7. Gerçek network request atılmamalı.

Kabul kriteri:

- Preview doğru endpointi göstermeli.
- JSON okunaklı formatta görünmeli.
- Copy button çalışmalı.
- Send Mock Request simülasyon yapmalı.
- Delay bilgisi UI’da görünmeli.

Commit:

```bash
git add .
git commit -m "feat: add response preview and mock request simulator"
```

---

### Phase 10 — Dashboard

Kullanılacak agent:

```txt
feature-builder
```

Yapılacaklar:

1. `Dashboard.tsx` oluştur.
2. `src/utils/endpointStats.ts` içine pure stats functions yaz.
3. Dashboard kartlarını oluştur.
4. State ile dashboard’u bağla.

Gösterilecek değerler:

- Total Endpoints
- GET Count
- POST Count
- Success Responses
- Error Responses
- Most Used Tag

Kabul kriteri:

- Değerler gerçek endpoint verisinden hesaplanmalı.
- Boş liste durumunda bozulmamalı.
- Stats fonksiyonları test edilebilir olmalı.

Commit:

```bash
git add .
git commit -m "feat: add endpoint dashboard"
```

---

### Phase 11 — LocalStorage

Kullanılacak agent:

```txt
storage-agent
```

Yapılacaklar:

1. `useLocalStorage.ts` oluştur.
2. `src/utils/storage.ts` oluştur.
3. App state’i localStorage ile bağla.
4. Bozuk storage verisi için fallback ekle.
5. Sayfa yenilenince data kalsın.

Kabul kriteri:

- Endpointler refresh sonrası kaybolmamalı.
- Filter/sort tercihleri kaybolmamalı.
- Invalid JSON app’i çökertmemeli.

Commit:

```bash
git add .
git commit -m "feat: persist mock endpoints with localStorage"
```

---

### Phase 12 — Export / Import

Kullanılacak agent:

```txt
storage-agent
```

Yapılacaklar:

1. `ImportExportPanel.tsx` oluştur.
2. Export JSON butonu ekle.
3. Import textarea veya file input ekle.
4. JSON validation yaz.
5. Başarılı/hatalı mesaj göster.
6. Invalid endpoint kayıtlarını güvenli şekilde ignore et.

Kabul kriteri:

- Export geçerli JSON üretmeli.
- Import geçerli JSON ile çalışmalı.
- Hatalı JSON app’i çökertmemeli.
- Kullanıcı hata mesajını görmeli.

Commit:

```bash
git add .
git commit -m "feat: add mock endpoint import and export"
```

---

### Phase 13 — UI Polish

Kullanılacak agent:

```txt
ui-designer
```

Yapılacaklar:

1. `src/index.css` düzenle.
2. Responsive layout ekle.
3. Dashboard card tasarımı ekle.
4. Endpoint card tasarımı ekle.
5. Method badge renklerini ayır.
6. Status badge renklerini ayır.
7. Preview panel tasarımını düzelt.
8. JSON textarea ve code block tasarımını iyileştir.
9. Mobile görünümü iyileştir.

Kabul kriteri:

- UI temiz görünmeli.
- Mobile’da yatay taşma olmamalı.
- Badge’ler anlaşılır olmalı.
- Form ve filtre alanları kullanışlı olmalı.
- JSON preview okunaklı olmalı.

Commit:

```bash
git add .
git commit -m "style: polish mockmate interface"
```

---

### Phase 14 — Testler

Kullanılacak agent:

```txt
qa-tester
```

Yapılacaklar:

1. Vitest config kontrol et.
2. `setupTests.ts` oluştur.
3. JSON utility testleri yaz.
4. Filter testleri yaz.
5. Stats testleri yaz.
6. Storage testleri yaz.
7. Build ve test çalıştır.

Minimum testler:

- Valid JSON doğru kabul ediliyor.
- Invalid JSON güvenli hata veriyor.
- JSON formatlama çalışıyor.
- Endpoint name search doğru çalışıyor.
- Tag search doğru çalışıyor.
- Method filter doğru çalışıyor.
- Status group filter doğru çalışıyor.
- Path A-Z sort doğru çalışıyor.
- Total endpoint count doğru.
- GET count doğru.
- Success response count doğru.
- Most used tag doğru.
- Invalid storage fallback çalışıyor.
- Valid import data kabul ediliyor.

Komutlar:

```bash
npm run build
npm test
```

Commit:

```bash
git add .
git commit -m "test: add mockmate utility tests"
```

---

### Phase 15 — README ve GitHub Hazırlığı

Kullanılacak agent:

```txt
docs-github-agent
```

Yapılacaklar:

1. README.md oluştur.
2. Projeyi açıkla.
3. Özellikleri listele.
4. Kurulum adımlarını yaz.
5. Kullanım rehberi ekle.
6. Screenshot placeholder ekle.
7. Future improvements yaz.
8. GitHub açıklaması ve topics öner.

README başlıkları:

```md
# MockMate

A simple React + TypeScript API mock response builder for frontend development practice.

## Features

## Tech Stack

## Getting Started

## Usage

## Project Structure

## Screenshots

## Future Improvements

## Author

## License
```

GitHub repo açıklaması:

```txt
A simple React + TypeScript API mock response builder with JSON validation, preview, localStorage persistence, and import/export.
```

GitHub topics:

```txt
react
typescript
vite
api-mock
mock-api
developer-tools
localstorage
student-project
portfolio
```

Commit:

```bash
git add .
git commit -m "docs: prepare mockmate for GitHub"
```

---

## 10. Antigravity Kullanım Akışı

### 10.1 Workspace

1. Antigravity aç.
2. Yeni workspace olarak `mockmate` klasörünü seç.
3. Agent ayarlarında güvenli mod tercih et:
   - Terminal commands: Request Review
   - Review policy: Request Review veya Agent Decides
   - Browser JS execution: Request Review
   - Terminal Sandbox: Açık

### 10.2 İlk Görev

Antigravity agent’a şu prompt’u ver:

```txt
Read PROJECT_BRIEF.md. Create the required .claude/agents files first. Then follow the project phases in order. Start with Phase 0 and stop after the first successful build so I can review.
```

### 10.3 Phase Phase İlerleme

Her phase için ayrı görev aç:

```txt
Continue with Phase 7 from PROJECT_BRIEF.md. Use the correct subagent. Implement only this phase, run build, and summarize changed files.
```

### 10.4 Browser ile Test

UI bittikten sonra Antigravity Browser’a şu test akışını yaptır:

```txt
Open the local Vite app in the browser and test this main flow:
1. View sample endpoint cards.
2. Add a new GET endpoint.
3. Try invalid JSON and confirm the app shows an error.
4. Format valid JSON.
5. Search for the new endpoint.
6. Filter by method.
7. Filter by status group.
8. Sort by path.
9. Open/select endpoint preview.
10. Click Send Mock Request and confirm loading state appears.
11. Copy response JSON.
12. Duplicate an endpoint.
13. Delete an endpoint.
14. Refresh the page.
15. Confirm data is still there.
16. Export data.
17. Try importing invalid JSON and confirm the app shows an error.

Create an artifact with screenshots and a short QA summary.
```

---

## 11. Claude Code Kullanım Akışı

Terminal içinde önerilen akış:

```bash
cd mockmate
claude
```

İlk prompt:

```txt
Read PROJECT_BRIEF.md carefully. Create the custom subagents in .claude/agents. Then start from Phase 0 and proceed phase by phase. After each phase, run build or tests where relevant and ask for review before continuing.
```

Belirli agent çağırma örnekleri:

```txt
Use the data-modeler agent to create the MockEndpoint types and at least 8 sample endpoint records.
```

```txt
Use the json-validator-agent to implement JSON validation, formatting, safe parsing, and tests.
```

```txt
Use the feature-builder agent to implement search, filter, sort, and empty state behavior for the endpoint list.
```

```txt
Use the qa-tester agent to run npm run build and npm test, fix any failures, and create a short QA report.
```

```txt
Use the docs-github-agent to create a beginner-friendly README and GitHub publishing checklist.
```

---

## 12. Güvenlik ve Kontrol Kuralları

Agent’lar şu kurallara uymalı:

- Sadece proje klasörü içinde çalış.
- Başka repo veya sistem klasörlerine dokunma.
- Gerçek network request ekleme.
- Gerçek backend oluşturma.
- Şu komutları izinsiz kullanma:

```bash
rm -rf
del /s
rmdir /s
git reset --hard
git clean -fd
```

- Yeni dependency eklemeden önce neden gerektiğini açıkla.
- Secret, token veya API key isteme.
- Büyük refactor öncesi çalışan hali commit’le.
- Her phase sonunda şunları özetle:
  - Ne yapıldı?
  - Hangi dosyalar değişti?
  - Build/test sonucu ne?
  - Sıradaki phase ne?

---

## 13. Definition of Done

Proje bitmiş sayılması için:

- Uygulama açılıyor.
- Sample endpoint kayıtları görünüyor.
- Yeni endpoint eklenebiliyor.
- JSON validation çalışıyor.
- JSON formatlama çalışıyor.
- Endpoint düzenlenebiliyor.
- Endpoint duplicate edilebiliyor.
- Endpoint silinebiliyor.
- Search çalışıyor.
- Filter çalışıyor.
- Sort çalışıyor.
- Preview panel çalışıyor.
- Mock request simulator çalışıyor.
- Dashboard gerçek verilerle güncelleniyor.
- LocalStorage çalışıyor.
- Export/import çalışıyor.
- Build başarılı.
- Testler başarılı.
- README hazır.
- GitHub’a yüklenecek hale gelmiş.

Kontrol komutları:

```bash
npm run build
npm test
```

Beklenen sonuç:

```txt
No TypeScript errors.
No failing tests.
Production build generated successfully.
```

---

## 14. GitHub’a Yükleme Adımları

```bash
git status
git add .
git commit -m "chore: finalize mockmate"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Not:

- `YOUR_REPOSITORY_URL` kısmını kendi GitHub repo linkinle değiştir.
- README içindeki author kısmını kendi adına göre düzenle.
- Screenshot eklemek için `public/screenshots/` klasörü oluşturabilirsin.

---

## 15. README Screenshot Checklist

GitHub’a atmadan önce şu ekran görüntülerini al:

- Dashboard
- Endpoint listesi
- Endpoint ekleme formu
- JSON validation hatası
- Search/filter kullanılmış hali
- Preview panel
- Mock request loading state
- Export/import paneli
- Mobile görünüm

README içinde örnek:

```md
## Screenshots

### Dashboard

![Dashboard](public/screenshots/dashboard.png)

### Response Preview

![Response Preview](public/screenshots/response-preview.png)
```

---

## 16. Future Improvements

İlk sürüm bittikten sonra eklenebilecek ama şu an zorunlu olmayan özellikler:

- Dark mode
- OpenAPI export
- Postman collection export
- Mock endpoint folders
- Response header editor
- Multiple response examples per endpoint
- CSV export
- GitHub Pages deploy
- PWA offline support
- Mock server version with Node.js
- Code editor library integration
- Request body schema preview

---

## 17. Son Kontrol Prompt’u

Proje bittiğinde Claude Code / Antigravity’ye şu prompt ver:

```txt
Review the entire project as if it will be published on GitHub.

Check:
1. Does npm run build pass?
2. Do tests pass?
3. Is README clear?
4. Are there unused files?
5. Are there unnecessary dependencies?
6. Is the UI understandable?
7. Does JSON validation work correctly?
8. Does search/filter/sort work correctly?
9. Does mock request simulator avoid real network requests?
10. Does localStorage work after refresh?
11. Are there console errors?
12. Is the project suitable for a beginner portfolio?

Fix small issues only. Do not add new major features.
Create a final summary.
```

---

## 18. Tavsiye Edilen Çalışma Şekli

Bu projeyi tek seferde yaptırmak yerine phase phase yaptır.

En iyi sıra:

```txt
1. Setup
2. Requirements
3. Data model
4. Architecture
5. JSON utilities
6. Endpoint listing
7. Endpoint creation
8. Search/filter/sort
9. Edit/duplicate/delete
10. Preview/simulator
11. Dashboard
12. LocalStorage
13. Import/export
14. UI polish
15. Tests
16. README
17. GitHub publish
```

Böyle yaparsan agent çıktıları daha kontrollü olur ve hata ayıklamak kolaylaşır.

---

## 19. Kısa Özet

Bu proje küçük ama GitHub için teknik görünen bir portfolyo projesidir.

Öğreneceğin şeyler:

- React component yapısı
- TypeScript type/interface kullanımı
- Mock API mantığı
- JSON validation
- Search/filter/sort mantığı
- Preview panel yönetimi
- LocalStorage persistence
- JSON import/export
- Utility testleri
- README hazırlama
- GitHub repo düzeni
- Claude Code subagent kullanımı
- Antigravity Browser ile UI doğrulama

Final hedef:

```txt
Temiz çalışan, README’si düzgün, GitHub’a konulabilir bir MockMate API Mock Response Builder uygulaması.
```
