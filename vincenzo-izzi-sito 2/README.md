# Sito Vincenzo Izzi · Guida

Sito: **https://vincenzoizzi.netlify.app**
Gestione: **https://vincenzoizzi.netlify.app/gestione** (si entra con la password)

## Come funziona

- Il sito è su GitHub (repository `vincenzo-izzi-sito`) e Netlify lo pubblica.
- La pagina **Gestione** salva opere, foto, testi e impostazioni direttamente su Netlify: le modifiche si vedono sul sito appena si preme Salva, senza toccare GitHub.
- Gli ordini delle stampe arrivano in Netlify → **Forms → ordine** e per email.

## Attivare la gestione (una volta sola)

1. Netlify → progetto **vincenzoizzi** → **Project configuration → Environment variables → Add a variable → Add a single variable**.
2. Key: `ADMIN_PASSWORD` · Value: la password che userà Vincenzo (almeno 10 caratteri, non semplice da indovinare).
3. **Create variable**.
4. **Deploys → Trigger deploy → Deploy project**.
5. Apri vincenzoizzi.netlify.app/gestione, scrivi la password, **Entra**.

## Dare l'accesso a Vincenzo

Mandagli il link **vincenzoizzi.netlify.app/gestione** e la password. Fine.
Per cambiare la password: modifica la variabile `ADMIN_PASSWORD` su Netlify e rifai il deploy (punto 4). Chi usava la vecchia viene fatto uscire.

## Cosa si fa dalla Gestione

- **Opere**: nuova opera, modifica, foto (fino a 8, anche dal telefono), misure, prezzi, copie disponibili, drop con data e ora, nascondi, elimina, ordine con le frecce ↑.
- **Foto**: foto dell'artista e copertina della home.
- **Testi**: biografia, dichiarazione d'artista, testi delle sale, imballaggio e certificato, in italiano e inglese.
- **Impostazioni**: avviso in alto, WhatsApp, email, Instagram, PayPal, spedizioni, scritta di anteprima.

Quando una stampa viene pagata o un originale venduto, si abbassa "Disponibili" nell'opera. A zero compare Venduta o Esaurita.

## Dominio proprio

Netlify → **Domain management → Add a domain**. Puoi comprarlo lì (si configura da solo) oppure collegarne uno comprato altrove seguendo le istruzioni DNS. La gestione sarà su tuodominio/gestione.

## Se qualcosa non va

- **"La password non è ancora stata impostata su Netlify"**: manca la variabile `ADMIN_PASSWORD` o il deploy dopo averla creata.
- **"Password sbagliata"**: controlla maiuscole e spazi della variabile su Netlify.
- **Una modifica non si vede**: ricarica il sito (Cmd+Shift+R) o aprilo in incognito.
