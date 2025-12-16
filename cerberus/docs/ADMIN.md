Admin page e variabili d'ambiente
================================

Protezione admin
----------------

La pagina `/admin` è protetta tramite una password letta da variabile d'ambiente.

- In locale puoi usare `ADMIN_PASSWORD` oppure `ADDMIN_PASSWORD` (con due "D").
- Su Vercel imposta la variabile `ADDMIN_PASSWORD` come richiesto.

Esempio `.env.local`:

```
ADDMIN_PASSWORD=la-tua-password
```

Persistenza dei post LinkedIn (Blob-only)
----------------------------------------

Il progetto usa **Vercel Blob** in modo esclusivo per salvare e leggere l'elenco dei post.

- I post sono salvati nel blob `cerberus/linkedin-posts.json`.
- Se il blob non esiste, la lista risulta vuota fino al primo salvataggio.

Token opzionale:

- Puoi impostare `BLOB_READ_WRITE_TOKEN` nelle Environment Variables su Vercel, utile in alcuni setup. In molti casi, su Vercel non è necessario.

Non è previsto alcun fallback su filesystem in produzione.

Avvio locale
------------

1. Crea `.env.local` con la password.
2. Avvia con `npm run dev`.
3. Vai su `/admin`, inserisci la password e aggiungi/rimuovi post LinkedIn.
4. Anche in locale si usa Vercel Blob per leggere/salvare i post.
	- Se in locale il client Blob richiede un token, imposta `BLOB_READ_WRITE_TOKEN` in `.env.local`.
	- Il blob usato dall’app è `cerberus/linkedin-posts.json` e viene creato al primo salvataggio.
