# Sito Vincenzo Izzi · Messa online su GitHub e Netlify

Il sito è statico: le opere, le foto e i testi stanno nei file di questa cartella.
Il pannello **Gestione** (indirizzo-del-sito/admin) modifica quei file su GitHub, e Netlify ripubblica il sito da solo in circa un minuto.
Gli ordini delle stampe arrivano su **Netlify Forms** e, se attivi la notifica, anche per email.

## Cosa c'è nella cartella

| File o cartella | A cosa serve |
|---|---|
| `index.html` | Il sito |
| `admin/` | Il pannello di gestione. In `admin/config.yml` va il nome del repository |
| `content/works/` | Un file per ogni opera o stampa |
| `content/settings.json` | Contatti, PayPal, spedizioni, copertina, avviso, testi |
| `images/uploads/` | Le foto (quelle nuove si caricano dal pannello) |
| `assets/` | Logo e firma |
| `build.mjs`, `netlify.toml` | Istruzioni per Netlify, non vanno toccati |

## 1. Metti i file su GitHub

1. Entra su github.com (crea un account se non lo hai).
2. In alto a destra **+** → **New repository**.
3. Nome: `vincenzo-izzi-sito`. Lascialo **Public** (o Private, funzionano entrambi). Non aggiungere README. **Create repository**.
4. Nella pagina che si apre clicca **uploading an existing file**.
5. Apri la cartella `vincenzo-izzi-sito` sul computer, seleziona **tutto quello che c'è dentro** (non la cartella stessa) e trascinalo nella pagina. Usa Chrome o Edge, che caricano anche le sottocartelle.
6. Controlla che in elenco compaiano `index.html`, `netlify.toml`, `admin`, `content`, ecc. **Commit changes**.

## 2. Nome del repository

È già scritto in `admin/config.yml`: `alexpiccolocf22-boop/vincenzo-izzi-sito`.
Il repository va chiamato **esattamente** `vincenzo-izzi-sito`. Se gli dai un altro nome, cambia la riga `repo:` di quel file.

## 3. Collega Netlify

1. Entra su app.netlify.com con **Sign up with GitHub**.
2. **Add new project** → **Import an existing project** → **GitHub** → autorizza → scegli `vincenzo-izzi-sito`.
3. Le impostazioni si compilano da sole (Build command `node build.mjs`, Publish directory `.`). Clicca **Deploy**.
4. Dopo un minuto hai un indirizzo tipo `nome-a-caso.netlify.app`. Da **Project configuration → General → Project details → Change project name** puoi chiamarlo per esempio `vincenzoizzi` → `vincenzoizzi.netlify.app`.

## 4. Attiva il login del pannello (una volta sola)

**Su GitHub**
1. Vai su github.com/settings/developers → **OAuth Apps** → **New OAuth App**.
2. Application name: `Gestione Vincenzo Izzi`.
3. Homepage URL: l'indirizzo del sito, es. `https://vincenzoizzi.netlify.app`.
4. Authorization callback URL: `https://api.netlify.com/auth/done` (esattamente così).
5. **Register application**. Copia il **Client ID**, poi **Generate a new client secret** e copia anche quello (GitHub lo mostra una sola volta).

**Su Netlify**
1. **Project configuration → Security → OAuth** (Access & security).
2. **Install provider** → **GitHub** → incolla Client ID e Client Secret → **Install**.

## 5. Attiva gli ordini

1. Su Netlify apri **Forms** → **Enable form detection**.
2. Vai su **Deploys** → **Trigger deploy** → **Deploy project** (serve un nuovo deploy perché Netlify trovi il modulo `ordine`).
3. Per ricevere gli ordini per email: **Project configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**, scegli il modulo `ordine` e la tua email.

## 6. Prova tutto

1. Apri `https://tuo-sito.netlify.app/admin`, clicca **Accedi con GitHub** e autorizza.
2. Modifica un prezzo, premi **Pubblica → Pubblica ora**. Dopo circa un minuto ricarica il sito: il prezzo è cambiato.
3. Fai un ordine di prova di una stampa fino alla pagina **Ordine ricevuto**. Su Netlify, in **Forms → ordine**, lo trovi con tutti i dati.

## 7. Accesso per Vincenzo (link + email e password, senza GitHub)

Vincenzo riceve un invito via email, sceglie la sua password e da quel momento entra da **tuo-sito/admin** con email e password.
Il servizio che gestisce questi accessi si chiama **DecapBridge**: il piano gratuito basta (fino a 3 siti e 10 persone per sito).

**Prepara la chiave per GitHub**
1. Su GitHub: foto profilo → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Nome: `DecapBridge Vincenzo Izzi`. Scadenza: la più lunga disponibile (segnati la data: quando scade va rinnovata).
3. **Repository access → Only select repositories** → `vincenzo-izzi-sito`.
4. **Permissions → Repository permissions → Contents: Read and write**.
5. **Generate token** e copialo (si vede una sola volta).

**Crea il sito su DecapBridge**
1. Vai su decapbridge.com, crea un account e clicca **Add site**.
2. Git provider: **GitHub**. Repository: `alexpiccolocf22-boop/vincenzo-izzi-sito`. Git access token: quello appena creato.
3. Decap CMS login URL: `https://tuo-sito.netlify.app/admin/index.html` (con il tuo indirizzo vero).
4. Auth type: **Classic** (email e password).
5. **Create site**: DecapBridge ti mostra un `config.yml` di esempio.

**Collega il pannello**
1. Dal `config.yml` di DecapBridge copia **solo il blocco `backend:`** (le righe che iniziano con `backend:` e quelle rientrate sotto).
2. Su GitHub apri `admin/config.yml` → matita → sostituisci il blocco `backend:` esistente con quello copiato. Tutto il resto del file resta com'è.
3. **Commit changes**. Netlify ripubblica in un minuto.

**Invita Vincenzo**
1. Su DecapBridge apri il sito → **Manage collaborators** → scrivi l'email di Vincenzo → invia.
2. Vincenzo riceve l'email con il link, sceglie la password (se non la trova, controlli lo spam).
3. Da allora entra da `https://tuo-sito.netlify.app/admin` con email e password. Anche tu entri da lì, con il tuo account DecapBridge.

Vincenzo può modificare opere, foto, prezzi e testi, ma non può aggiungere o togliere altre persone.
Se lo vuoi togliere, lo rimuovi da Manage collaborators.

## Uso di tutti i giorni

- **Nuova opera o stampa**: Gestione → Opere e stampe → **+ opera**. Compila, carica le foto, **Pubblica**.
- **Drop**: metti una data e ora futura in "Data e ora del drop". Il sito mostra "In uscita il…" e la apre da solo all'ora giusta.
- **Opera venduta / stampa pagata**: apri l'opera e abbassa "Copie disponibili". A zero compare Venduta o Esaurita. (Il sito non scala le copie da solo: lo fai tu quando confermi il pagamento su PayPal.)
- **Contatti, PayPal, spedizioni, copertina, avviso, testi**: Gestione → Impostazioni del sito.
- **Sito definitivo**: togli la spunta "Mostra la scritta di anteprima".
- **Ordini**: Netlify → Forms → ordine (e la tua email). Il cliente paga con PayPal.me e ti manda l'ordine anche su WhatsApp.

## Dominio proprio (facoltativo)

Netlify → **Domain management → Add a domain**, scrivi es. `vincenzoizzi.it` e segui le istruzioni per i DNS del provider dove l'hai comprato. Il certificato HTTPS si attiva da solo.
Dopo aver cambiato indirizzo, aggiorna la **Homepage URL** nella OAuth App di GitHub (la callback resta uguale).

## Se qualcosa non va

- **Il pannello dice "No auth provider found"**: manca il passo 4 su Netlify, o il Client Secret è sbagliato.
- **Il pannello dice "Not Found" dopo il login**: il nome in `admin/config.yml` (passo 2) non corrisponde al repository.
- **Gli ordini non compaiono in Forms**: manca il passo 5 (form detection + nuovo deploy).
- **Una modifica non si vede**: aspetta un minuto, poi su Netlify → Deploys controlla che l'ultimo sia "Published".
