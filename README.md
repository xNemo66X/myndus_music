# AnnoZzero — Sito Web

## Struttura

```
annozzero-github/
├── index.html              Pagina principale
├── style.css               Stili
├── app.js                  Motore del sito
├── site-data.json          ✏️ MODIFICA QUESTO PER AGGIORNARE I CONTENUTI
├── README.md               Istruzioni
└── images/
    ├── logo.webp           Logo AnnoZzero orizzontale
    ├── myndus-logo.png     Logo Myndus (footer credit)
    ├── band/
    │   ├── gruppo.jpg       Foto hero (B&W campo)
    │   └── gruppo-scritta.png  Foto + logo sovrapposto (bio)
    └── covers/
        ├── sono.jpg
        ├── inconsapevoli-remix.jpg
        ├── inconsciente.jpg
        ├── inconscio.jpg
        ├── college-80.jpg
        └── ora.jpg
```

## Deploy su GitHub Pages

1. Crea un nuovo repository su GitHub (es. `annozzero-sito`)
2. Carica **tutti** i file e cartelle di questa directory nel repository
3. Vai in **Settings → Pages**
4. Sotto "Source" seleziona **Deploy from a branch**
5. Branch: **main**, cartella: **/ (root)**
6. Clicca Save
7. Dopo 1-2 minuti il sito sarà online su `https://tuousername.github.io/annozzero-sito/`

## Spostamento su Aruba

1. Accedi al pannello Aruba (cPanel o File Manager)
2. Vai nella cartella `htdocs/` o root del dominio
3. Carica **tutti** i file e cartelle
4. Il sito sarà su `https://www.annozzero.it`

Non serve database, PHP, Node.js o configurazione server. È un sito completamente statico.

## Come aggiornare i contenuti

Modifica **solo** `site-data.json`. Poi carica il file aggiornato su GitHub/Aruba.

### Aggiungere una data live
```json
{ "venue": "NOME LOCALE", "city": "CITTÀ (PROVINCIA)", "date": "2026-06-15" }
```
Aggiungi nell'array `live.events`.

### Aggiungere un'uscita musicale
```json
{
  "title": "Nome Brano",
  "type": "SINGOLO",
  "cover": "images/covers/nome-file.jpg",
  "link": "https://ko-fi.com/s/..."
}
```
Aggiungi in `musica.releases` e carica la copertina (500×500 JPEG) in `images/covers/`.

### Aggiungere un video YouTube
```json
{ "title": "Titolo Video", "youtube_id": "ID_VIDEO" }
```
L'ID è la parte dopo `v=` nell'URL. Es: `youtube.com/watch?v=AdR6xYj_hLw` → ID: `AdR6xYj_hLw`

### Aggiungere un articolo stampa
```json
{ "date": "2026-03-15", "title": "Titolo Articolo", "link": "https://..." }
```
Per articoli senza link: `"link": null`

## Note tecniche

- **Video YouTube**: su GitHub Pages/Aruba si vedono come player embed. In locale (file://) si vedono come thumbnail cliccabili.
- **Form contatti**: al momento mostra un messaggio di conferma. Per ricevere email, collegare a [Formspree.io](https://formspree.io) (gratuito).
- **Immagini copertine**: ottimizzate 500×500px JPEG.
- **Peso totale del sito**: ~1 MB — si carica velocemente.
