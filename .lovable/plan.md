

## Plan: Adăugare favicon-uri pentru diferite dispozitive

### Rezumat
Voi adăuga suport complet pentru favicon-uri pe toate dispozitivele (iPhone, iPad, Android, Windows) prin crearea unui web manifest și adăugarea tag-urilor necesare în HTML.

---

### Ce voi face:

**1. Creez fișierul `public/site.webmanifest`**
   - Manifest JSON pentru Progressive Web App
   - Include pictogramele pentru Android/Chrome
   - Definește culori și nume aplicație

**2. Copiez favicon.png în multiple dimensiuni**
   - `apple-touch-icon.png` (180x180) - pentru iPhone/iPad
   - `favicon-32x32.png` (32x32) - pentru browsere desktop
   - `favicon-16x16.png` (16x16) - pentru tab-uri mici
   - `android-chrome-192x192.png` (192x192) - pentru Android
   - `android-chrome-512x512.png` (512x512) - pentru splash screen Android

**3. Actualizez `index.html`**
   - Adaug link pentru `apple-touch-icon`
   - Adaug link-uri pentru favicon-uri de diferite dimensiuni
   - Adaug link pentru web manifest
   - Adaug meta tag pentru culoarea temei (theme-color)
   - Adaug meta tag pentru tile color (Windows)

---

### Detalii tehnice

**Fișier nou: `public/site.webmanifest`**
```json
{
  "name": "Rentéa Aesthetic Clinique",
  "short_name": "Rentéa",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#d4af37",
  "background_color": "#1a1a1a",
  "display": "standalone"
}
```

**Tag-uri noi în `index.html` (după linia 6):**
```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#d4af37" />
<meta name="msapplication-TileColor" content="#1a1a1a" />
```

---

### Notă importantă despre cache
După implementare, pentru a vedea noul favicon:
- Desktop: Ctrl+Shift+R (sau Cmd+Shift+R pe Mac)
- Sau: deschide site-ul într-o fereastră Incognito
- iPhone/iPad: Șterge cache Safari din Settings → Safari → Clear History

