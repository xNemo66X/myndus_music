/**
 * AnnoZzero — Site Engine
 * ========================
 * Carica i contenuti da site-data.json e renderizza il sito.
 *
 * PER AGGIORNARE IL SITO:
 *   Modifica solo il file site-data.json
 *   - Aggiungi date live, uscite musicali, articoli stampa
 *   - Cambia testi, link, immagini
 *   - Non serve toccare questo file né l'HTML
 */

(function () {
  'use strict';

  // ── Helpers ──

  const MONTHS = ['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];

  function fmtDate(str) {
    const d = new Date(str);
    return { day: d.getDate(), month: MONTHS[d.getMonth()], year: d.getFullYear() };
  }

  function fmtPressDate(str) {
    const d = new Date(str);
    return d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function $(id) { return document.getElementById(id); }

  function isLocal() { return location.protocol === 'file:'; }

  // ── Renderers ──

  function renderNav(data) {
    // Logo
    $('navLogo').innerHTML = '<img src="' + data.site.logo + '" alt="' + data.site.name + '">';

    // Links
    var items = [
      ['bio','BIO'],['musica','MUSICA'],['live','LIVE'],
      ['video','VIDEO'],['press','PRESS'],['shop','SHOP'],['contatti','CONTATTI']
    ];
    var nl = $('navLinks'), ml = $('mobileNavLinks');
    items.forEach(function(item) {
      nl.innerHTML += '<li><a href="#' + item[0] + '">' + item[1] + '</a></li>';
      ml.innerHTML += '<li><a href="#' + item[0] + '" onclick="closeMobile()">' + item[1] + '</a></li>';
    });
  }

  function renderHero(data) {
    var h = data.hero, s = data.site;
    $('heroPhoto').innerHTML = '<img src="' + h.background + '" alt="' + s.name + '">';
    $('heroContent').innerHTML =
      '<img class="hero-logo" src="' + s.logo + '" alt="' + s.name + '">' +
      '<p class="hero-tagline"><em>' + h.tagline_highlight + '</em> — ' + h.tagline_rest + '</p>' +
      '<p class="hero-sub">' + h.subtitle + '</p>' +
      '<a href="' + h.cta_link + '" class="hero-cta">' + h.cta_text + '</a>';
  }

  function renderBio(data) {
    var b = data.bio;
    $('bioTitle').textContent = b.title;
    $('bioImage').innerHTML = '<img src="' + b.image + '" alt="AnnoZzero">';
    $('bioText').innerHTML = b.paragraphs.map(function(p) { return '<p>' + p + '</p>'; }).join('');
  }

  function renderMusica(data) {
    var m = data.musica;
    $('musicaTitle').textContent = m.title;
    $('releaseGrid').innerHTML = m.releases.map(function(r) {
      var coverHTML = r.cover
        ? '<img src="' + r.cover + '" alt="' + r.title + '">'
        : '<div class="release-placeholder">' + r.title + '<small>' + r.type + '</small></div>';
      return '<div class="release-card' + (r.featured ? ' featured' : '') + '">' +
        '<div class="release-cover">' + coverHTML +
        '<div class="release-overlay"><a href="' + r.link + '" target="_blank" rel="noopener">ACQUISTA</a></div></div>' +
        '<div class="release-info">' +
        '<div class="release-type">' + r.type + '</div>' +
        '<div class="release-title">' + r.title + '</div>' +
        (r.description ? '<div class="release-desc">' + r.description + '</div>' : '') +
        '</div></div>';
    }).join('');
  }

  function renderLive(data) {
    var l = data.live;
    $('liveTitle').textContent = l.title;
    $('eventList').innerHTML = l.events.map(function(e) {
      var d = fmtDate(e.date);
      return '<div class="event-item">' +
        '<div class="event-date">' + d.day + '<small>' + d.month + ' ' + d.year + '</small></div>' +
        '<div><div class="event-venue">' + e.venue + '</div><div class="event-city">' + e.city + '</div></div>' +
        '</div>';
    }).join('');
  }

  function renderVideo(data) {
    var v = data.video;
    $('videoTitle').textContent = v.title;

    $('videoGrid').innerHTML = v.items.map(function(item) {
      if (!item.youtube_id) return '';

      if (isLocal()) {
        // Locale: thumbnail + link a YouTube
        var thumb = 'https://img.youtube.com/vi/' + item.youtube_id + '/hqdefault.jpg';
        var link = 'https://www.youtube.com/watch?v=' + item.youtube_id;
        return '<a href="' + link + '" target="_blank" rel="noopener" class="video-card video-card--linked" style="text-decoration:none;color:inherit">' +
          '<img src="' + thumb + '" alt="' + item.title + '" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;filter:brightness(.7);transition:filter .3s">' +
          '<div class="video-play"></div>' +
          '<div class="video-label">' + item.title + '</div>' +
          '<div class="video-note">▶ Apri su YouTube</div></a>';
      } else {
        // Server: iframe embed
        return '<div class="video-card video-card--embed">' +
          '<iframe src="https://www.youtube.com/embed/' + item.youtube_id + '" title="' + item.title + '" ' +
          'frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture;web-share" ' +
          'allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%"></iframe></div>';
      }
    }).join('');
  }

  function renderPress(data) {
    var p = data.press;
    $('pressTitle').textContent = p.title;
    $('pressList').innerHTML = p.articles.map(function(a) {
      var tag = a.link ? 'a' : 'div';
      var href = a.link ? ' href="' + a.link + '" target="_blank" rel="noopener"' : '';
      return '<' + tag + ' class="press-item"' + href + '>' +
        '<div class="press-date">' + fmtPressDate(a.date) + '</div>' +
        '<div class="press-title">' + a.title + '</div>' +
        (a.link ? '<div class="press-arrow">→</div>' : '') +
        '</' + tag + '>';
    }).join('');
  }

  function renderShop(data) {
    var s = data.shop;
    $('shopTitle').textContent = s.title;
    $('shopGrid').innerHTML = s.products.map(function(p) {
      return '<div class="shop-card">' +
        '<div class="shop-img"><span class="shop-icon">' + p.icon + '</span></div>' +
        '<div class="shop-info">' +
        '<div class="shop-name">' + p.name + '</div>' +
        '<div class="shop-desc">' + p.description + '</div>' +
        '<div class="shop-bottom">' +
        '<span class="shop-price">' + p.price + '</span>' +
        '<a href="' + p.link + '" class="shop-btn" target="_blank" rel="noopener">ACQUISTA</a>' +
        '</div></div></div>';
    }).join('');
  }

  function renderContatti(data) {
    var c = data.contatti;
    $('contactTitle').textContent = c.title;
    $('contactInfo').innerHTML = c.items.map(function(i) {
      var val = i.href ? '<a href="' + i.href + '">' + i.value + '</a>' : i.value;
      return '<div class="contact-info-item">' +
        '<div class="contact-icon">' + i.icon + '</div>' +
        '<div><div class="contact-info-label">' + i.label + '</div>' +
        '<div class="contact-info-value">' + val + '</div></div></div>';
    }).join('');
  }

  function renderFooter(data) {
    var s = data.site;
    $('footer').innerHTML =
      '<div class="footer-grid">' +
      '<div><div class="footer-logo"><img src="' + s.logo + '" alt="' + s.name + '"></div>' +
      '<p class="footer-tagline">' + s.tagline + '</p></div>' +
      '<div><div class="footer-label">Seguici</div><div class="footer-social">' +
      '<a href="' + s.social.instagram + '" title="Instagram">IG</a>' +
      '<a href="' + s.social.facebook + '" title="Facebook">FB</a>' +
      '<a href="' + s.social.spotify + '" title="Spotify">SP</a>' +
      '<a href="' + s.social.youtube + '" title="YouTube">YT</a>' +
      '<a href="' + s.social.tiktok + '" title="TikTok">TK</a>' +
      '</div></div>' +
      '<div><div class="footer-label">Contatti</div>' +
      '<div class="footer-contact"><a href="mailto:' + s.email + '">' + s.email + '</a></div></div>' +
      '</div>' +
      '<div class="footer-bottom">© ' + new Date().getFullYear() + ' Tutti i diritti riservati — ' + s.manager +
      '<div class="footer-credit">Sito realizzato da <a href="https://myndus.it" target="_blank" rel="noopener"><img src="images/myndus-logo.png" alt="Myndus"> Myndus</a></div>' +
      '</div>';
  }

  // ── Interactions ──

  function setupInteractions() {
    // Hamburger menu
    var hb = $('hamburger'), mm = $('mobileMenu');
    hb.addEventListener('click', function() {
      hb.classList.toggle('active');
      mm.classList.toggle('active');
      document.body.style.overflow = mm.classList.contains('active') ? 'hidden' : '';
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
      $('navbar').classList.toggle('scrolled', window.scrollY > 80);
    });

    // Contact form
    $('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      // TODO: collegare a Formspree, Netlify Forms o endpoint PHP
      this.style.display = 'none';
      $('formSuccess').classList.add('visible');
    });

    // Scroll reveal
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
  }

  // ── Mobile menu close (global, called from onclick) ──

  window.closeMobile = function() {
    $('hamburger').classList.remove('active');
    $('mobileMenu').classList.remove('active');
    document.body.style.overflow = '';
  };

  // ── Init ──

  function renderAll(data) {
    renderNav(data);
    renderHero(data);
    renderBio(data);
    renderMusica(data);
    renderLive(data);
    renderVideo(data);
    renderPress(data);
    renderShop(data);
    renderContatti(data);
    renderFooter(data);
    setupInteractions();
  }

  document.addEventListener('DOMContentLoaded', function() {
    fetch('site-data.json')
      .then(function(r) { return r.json(); })
      .then(renderAll)
      .catch(function(err) {
        console.error('Errore caricamento site-data.json:', err);
        document.body.innerHTML =
          '<div style="padding:4rem;text-align:center;color:#9e2a4a;font-family:sans-serif">' +
          '<h1>AnnoZzero</h1>' +
          '<p style="margin-top:1rem;color:#999">Errore nel caricamento dei dati.<br>' +
          'Assicurati che <code>site-data.json</code> sia nella stessa cartella di <code>index.html</code>.<br><br>' +
          '<small>Se stai aprendo il file in locale, usa un server locale:<br>' +
          '<code>npx serve .</code> oppure <code>python -m http.server</code></small></p></div>';
      });
  });

})();
