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

Persistenza dei post LinkedIn (Vercel Blob)
------------------------------------------

Su Vercel la scrittura su filesystem non è persistente. Il progetto usa **Vercel Blob** per salvare e leggere l'elenco dei post. Non richiede configurazioni aggiuntive su Vercel.

- I post sono salvati nel blob `cerberus/linkedin-posts.json`.
- In sviluppo locale, se Blob non è disponibile, il progetto va in fallback al file `content/linkedin-posts.json`.

Nota: Se vuoi usare Blob anche in locale, puoi configurare un token di scrittura (`BLOB_READ_WRITE_TOKEN`) seguendo la documentazione Vercel. Non è obbligatorio; il fallback su file locale è già previsto.

Avvio locale
------------

1. Crea `.env.local` con la password.
2. Avvia con `npm run dev`.
3. Vai su `/admin`, inserisci la password e aggiungi/rimuovi post LinkedIn.
4. In locale i post sono in `content/linkedin-posts.json`.
