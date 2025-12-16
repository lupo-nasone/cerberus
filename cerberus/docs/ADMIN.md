Admin page e variabili d'ambiente
================================

Per la pagina protetta admin usa la variabile di ambiente `ADMIN_PASSWORD`.

Crea un file `.env.local` nella radice del progetto e aggiungi:

```
ADMIN_PASSWORD=la-tua-password
```

Poi avvia il progetto con `npm run dev` e vai su `/admin` per inserire la password e aggiungere link LinkedIn che verranno salvati in `content/linkedin-posts.json`.
