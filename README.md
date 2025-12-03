# 💻 Cerberus | Codice Sorgente del Sito Web

Il codice sorgente di questo repository alimenta il sito web istituzionale di **Cerberus**, che presenta il sistema di gestione della conformità **Verifica Zero Rischi®**.

---

## 🛠️ Stack Tecnologico

Questo progetto web è stato sviluppato utilizzando tecnologie moderne e scalabili, tipiche di un'applicazione basata su Vercel:

* **Framework:** Next.js
* **Libreria UI:** React
* **Linguaggio:** JavaScript / TypeScript
* **Deployment:** Vercel (Hosting + Continuous Deployment)

---

## 🚀 Avvio del Progetto in Locale (Local Development)

Segui questi passaggi per clonare il repository e avviare l'applicazione Next.js sul tuo computer locale.

### 1. Prerequisiti

Assicurati di avere installato:

* **Node.js** (versione consigliata 18.x o superiore)
* **npm**, Yarn o pnpm come gestore di pacchetti

### 2. Clonazione e Installazione

Apri il terminale ed esegui i seguenti comandi:

```bash
# Clona il repository
git clone https://github.com/lupo-nasone/cerberus.git

# Entra nella directory del progetto
cd cerberus

# Installa tutte le dipendenze (utilizzando npm)
npm install
```

### 3. Configurazione delle Variabili d'Ambiente

Crea un file chiamato **.env.local** nella directory principale per configurare le variabili d'ambiente necessarie (es. API keys, credenziali, ecc.).

Esempio:

```bash
# .env.local (Esempio)
# Se non ci sono variabili specifiche, il file può essere lasciato vuoto o omesso.
# NEXT_PUBLIC_API_URL=https://api.iltuoservizio.it
```

### 4. Avvio del Server

Avvia l'applicazione in modalità sviluppo:

```bash
npm run dev
```

L'applicazione sarà accessibile all'indirizzo: **[http://localhost:3000](http://localhost:3000)**.

---

## 🏗️ Comandi Utili (Scripts)

Gli script principali disponibili nel file **package.json**:

| Comando         | Descrizione                                                          |
| --------------- | -------------------------------------------------------------------- |
| `npm run dev`   | Avvia l'applicazione in modalità sviluppo con HMR.                   |
| `npm run build` | Compila l'applicazione per la produzione.                            |
| `npm run start` | Avvia il server di produzione (richiede `npm run build`).            |
| `npm run lint`  | Esegue il linter (ESLint) per il controllo della qualità del codice. |

---

## 🤝 Contribuire

I contributi sono benvenuti! Se trovi un bug o hai suggerimenti per miglioramenti, puoi aprire una **Issue**.

### Come contribuire:

1. Fai il **Fork** del repository.
2. Crea un nuovo branch:

   ```bash
   git checkout -b feature/nome-funzionalita
   ```
3. Effettua il commit delle modifiche.
4. Esegui il push del branch:

   ```bash
   git push origin feature/nome-funzionalita
   ```
5. Apri una **Pull Request (PR)**.

---

## 📄 Licenza

Questo progetto è rilasciato sotto la licenza **[INSERIRE IL NOME DELLA LICENZA QUI]**.

---

Se vuoi, posso generarti automaticamente una **Licenza MIT** o un'altra licenza da includere nel repository.
