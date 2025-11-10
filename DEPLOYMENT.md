# Aggiornare il sito statico

Per rendere visibili online le modifiche effettuate al file `index.html` hai due possibilità.

## 1. Pubblicare tramite Git
1. Aggiungi il repository remoto di GitHub se non è già presente:
   ```bash
   git remote add origin https://github.com/<tuo-utente>/<tuo-repo>.git
   ```
2. Verifica la configurazione:
   ```bash
   git remote -v
   ```
3. Esegui il push della branch corrente (es. `work`):
   ```bash
   git push -u origin work
   ```
4. Controlla il repository su GitHub per assicurarti che i file aggiornati siano visibili.

## 2. Copiare il file manualmente
Se preferisci, puoi anche copiare manualmente l'`index.html` aggiornato nella directory pubblica del server o dell'hosting:
1. Scarica dal repository locale il file `index.html` aggiornato.
2. Con un client FTP, SFTP oppure tramite pannello di controllo dell'hosting, sovrascrivi il file `index.html` esistente con la versione aggiornata.
3. Svuota la cache del browser (e di eventuali CDN) per vedere subito le modifiche.

Entrambi i metodi porteranno il sito a mostrare il nuovo slogan e gli altri aggiornamenti presenti nel file.

## Dove trovare il file aggiornato
Il file completo con tutte le modifiche si trova alla radice del repository con il nome `index.html`. Se stai consultando GitHub:

1. Vai alla pagina principale del repository e apri `index.html` dalla lista dei file.
2. Per scaricare il contenuto integrale, fai clic su **Raw** e salva la pagina (tasto destro → “Salva con nome…”) oppure usa il pulsante **Download raw file**.
3. In locale puoi verificare la versione attuale con il comando:
   ```bash
   git show HEAD:index.html > index-aggiornato.html
   ```
   Il file `index-aggiornato.html` conterrà esattamente l'ultima versione committata.
