# MockMate — Değişiklik ve Hata Günlüğü

Bu dosya projenin inşa sürecinde yapılan tüm değişiklikleri, bulunan hataları ve güvenlik kontrollerini belgelemektedir.
Başka bir geliştirici bu projeyi incelediğinde aynı sorunlarla karşılaşmaması için tutulmuştur.

---

## Güvenlik Kontrolleri

### Yapılan Kontroller
- Tüm kaynak dosyalar tarandı: **API key, token, şifre, hesap bilgisi bulunmadı.**
- `sampleEndpoints.ts` içindeki veriler tamamen kurgusal: gerçek kişi adı, IP adresi, e-posta yok.
- `.env` dosyası oluşturulmadı.
- `.gitignore` içinde `.env` ve `.env.*` kalıpları var.
- `localStorage`'da saklanan veri: yalnızca mock endpoint tanımları (hassas bilgi yok).
- `useMockRequest.ts` doğrulandı: `fetch`, `axios` veya herhangi bir gerçek ağ isteği kullanılmıyor; yalnızca `setTimeout`.
- `importData()` fonksiyonu: gelen JSON'daki her endpoint kaydı `isValidEndpoint()` ile doğrulanıyor, eksik alan varsa kayıt ignore ediliyor.

---

## Kurulum Hatası ve Çözümü

### Hata: `create-vite` Node.js 18 ile Uyumsuz
**Sebep:** `npm create vite@latest` (v6.x), `node:util`'den `styleText` export'unu kullanıyor. Bu export Node.js v20'de eklendi; proje ortamında Node.js v18.12.0 yüklü.

**Hata mesajı:**
```
SyntaxError: The requested module 'node:util' does not provide an export named 'styleText'
```

**Çözüm:** `npm create vite@5` denendi fakat interactive prompt (terminal input pipe) sorunları nedeniyle yanıt verilemedi.
Projenin tüm yapılandırma dosyaları (`package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`) elle oluşturuldu.

**Öğrenilen ders:** Node.js < 20 ortamlarında `create-vite@6+` çalışmaz. Vite 5 kullanın veya dosyaları manuel oluşturun.

---

## TypeScript Derleme Hataları ve Çözümleri

### Hata 1: Kullanılmayan Import (`vi`)
**Dosya:** `src/tests/storage.test.ts`
**Hata:** `'vi' is declared but its value is never read.` (TS6133)
**Çözüm:** `vi` import'u kaldırıldı.

```ts
// Hatalı
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Düzeltilmiş
import { describe, it, expect, beforeEach } from 'vitest'
```

---

## Mimari Kararlar

### Neden Pure Functions?
`src/utils/endpointFilters.ts` ve `src/utils/endpointStats.ts` içindeki tüm fonksiyonlar pure function olarak yazıldı. React state veya side effect içermiyorlar. Bu sayede:
- Vitest ile kolayca test edilebilir (DOM veya component gerekmez)
- `useMemo` ile memoize edilebilir
- Herhangi bir component içinden import edilebilir

### Neden `useLocalStorage` Hook?
`App.tsx` içinde doğrudan `loadData/saveData` çağrılabilirdi. Ancak hook kullanmak:
- State başlatma ve effect bağlantısını tek yerde tutar
- Test edilmesi kolaylaşır
- İleride farklı storage backend'lerine geçişi kolaylaştırır

### Neden Form Overlay (Modal)?
Endpoint formu ayrı bir sayfa yerine overlay olarak gösterildi çünkü:
- Listeden uzaklaşmadan ekleme/düzenleme yapılabilir
- State yönetimi daha basit (routing kütüphanesi gerekmez)
- Mobil deneyim daha iyi

### Mock Request Simulator
`useMockRequest.ts` içinde `fetch` veya `axios` kullanılmıyor. Sadece `setTimeout` ile delay simüle ediliyor. Bu brief'teki kuralla birebir uyumlu.

---

## Dosya Yapısı Kararları

| Klasör | Karar | Gerekçe |
|--------|-------|---------|
| `src/utils/` | Pure functions | Test edilebilirlik |
| `src/hooks/` | React hooks | State + side effect yönetimi |
| `src/components/` | UI bileşenleri | Tek sorumluluk |
| `src/types/index.ts` | Merkezi tipler | Tek kaynak |
| `src/data/` | Sample veriler | İlk yüklemede gösterim |
| `src/tests/` | Test dosyaları | Utility test coverage |

---

## Test Sonuçları (Final)

```
Test Files  4 passed (4)
     Tests  57 passed (57)
   Duration  2.14s
```

Kapsanan alanlar:
- JSON utility (safeParseJson, isValidJson, formatJson, normalizeJsonBody)
- Endpoint filtreler (search, filterByMethod, filterByStatusGroup, filterByTag, sort)
- Dashboard istatistikler (total, method count, success, error, most used tag)
- Storage (loadData, saveData, exportData, importData) — invalid data fallback dahil

---

## Build Sonuçları (Final)

```
vite v5.4.21 building for production...
✓ 50 modules transformed.
dist/index.html                 0.59 kB │ gzip:  0.37 kB
dist/assets/index-y7_HS_ME.css 13.05 kB │ gzip:  2.89 kB
dist/assets/index-CY5GEHoU.js  166.89 kB │ gzip: 52.62 kB
✓ built in 751ms
```

TypeScript hataları: **0**
Build hatası: **0**

---

## Scope Dışı Tutulan Özellikler

Aşağıdakiler brief'e uygun olarak kasıtlı olarak **eklenmedi:**
- Gerçek backend / API server
- Gerçek network isteği (fetch/axios)
- Login / authentication
- Database
- Swagger / OpenAPI import
- Postman collection import
- Cloud sync

---

## Gelecek Geliştirmeler (İlk Sürüm Dışında)

- Dark/Light mode toggle
- OpenAPI export
- Mock endpoint klasörleri
- Response header editörü
- GitHub Pages deploy
- PWA offline destek
- Monaco / CodeMirror entegrasyonu
