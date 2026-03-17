
function getLang() {
  return localStorage.getItem("lumina_lang") || "fr";
}

const I18N = {
  fr: {
    titleHome: "Lumina — Recommandation intelligente de films",
    titleSearch: "Lumina — Recherche",
    titleAbout: "Lumina — À propos / Contact",

    "brand.tag": "Prototype",

    "nav.home": "Accueil",
    "nav.search": "Recherche",
    "nav.about": "À propos / Contact",
    "nav.account": "Compte",

    "splash.tag": "Recommandations personnalisées",
    "splash.text": "Découvre des films similaires à ceux que tu aimes, et aide l’algorithme avec tes retours.",
    "splash.enter": "Entrer",
    "splash.hint": "Projet CSC 317 • Prototype UI",

    "hero.kicker": "Recommandations personnalisées",
    "hero.title": "Découvre des films similaires à ceux que tu aimes.",
    "hero.lead": "Tout commence par une simple recherche...",
    "hero.cta.search": "Chercher...",
    "hero.cta.about": "À propos / Contact",

    "stats.interactions.title": "Interactions",
    "stats.interactions.value": "Recherche • Notes • Commentaires",
    "stats.data.title": "Données",
    "stats.data.value": "Films • Utilisateurs • Historique",
    "stats.goal.title": "But",
    "stats.goal.value": "Découverte + pertinence",

    "example.title": "Exemple",
    "example.subtitle": "Aperçu d’une recommandation",
    "example.liked": "Film aimé :",
    "example.movieSub": "Science-fiction • Thriller • Nolan",
    "example.favTitle": "Ajouter aux favoris",
    "example.text": "Ensuite l’utilisateur peut noter le film, évaluer la recommandation et laisser un commentaire.",

    "home.noteTitle": "Prêt à tester ?",
    "home.noteBody": "Va sur la page Recherche pour voir l’interface et les résultats mock.",
    "home.noteCta": "Ouvrir Recherche",

    "demo.title": "Recherche",
    "demo.subtitle": "Recherche fonctionnelle",

    "search.title": "Recherche",
    "search.subtitle": "Titre",

    "form.liked.label": "Film que tu as aimé",
    "form.liked.ph": "Ex : Inception, The Notebook, The Dark Knight...",
    "form.genre.label": "Genre",
    "form.genre.opt0": "(optionnel)",
    "form.keyword.label": "Keyword",
    "form.keyword.ph": "Ex : emotional, horror, superhero...",
    "form.person.label": "Acteur / Réalisateur",
    "form.person.ph": "Ex : Nolan, DiCaprio...",
    "form.search": "Rechercher",
    "form.reset": "Reset",

    "results.title": "Résultats",
    "results.subtitle": "Cartes + score de similarité",
    "results.emptyTitle": "Lance une recherche",
    "results.emptyText": "Tu verras ici des films recommandés.",

    "about.title": "À propos",
    "about.subtitle": "Le coeur du projet, et ses avancées prévues",

    "about.data.title": "Données",
    "about.data.li1": "Films (genres, keywords, cast/crew)",
    "about.data.li2": "Utilisateurs (profil + préférences)",
    "about.data.li3": "Notes & commentaires",
    "about.data.li4": "Historique de recommandations",

    "about.algo.title": "Algorithme",
    "about.algo.li1": "Genre (pondération forte)",
    "about.algo.li2": "Keywords",
    "about.algo.li3": "Acteurs / réalisateur",
    "about.algo.li4": "Ajustement par feedback",

    "about.next.title": "Next steps",
    "about.next.li1": "Brancher une API de films",
    "about.next.li2": "Ajouter un backend + DB",
    "about.next.li3": "Authentification (optionnel)",
    "about.next.li4": "Améliorer le scoring",

    "contact.title": "Me contacter",
    "contact.subtitle": "Envoie un message (UI)",
    "contact.name": "Nom",
    "contact.namePh": "Ton nom",
    "contact.email": "Email",
    "contact.emailPh": "tonmail@email.com",
    "contact.msg": "Message",
    "contact.msgPh": "Ton message...",
    "contact.send": "Envoyer",
    "contact.note": "(Pour l’instant, ça ne fait pas d’envoi réel — on pourra le brancher plus tard.)",

    "site.summary.title": "Résumé du site",
    "site.summary.text": "Lumina est une plateforme de recommandation de films intelligente. Entrez le nom d'un film que vous avez aimé, et découvrez des films similaires basés sur des données réelles de The Movie Database (TMDB). Explorez les détails des films, regardez les trailers, et trouvez où les regarder en streaming.",
    "site.summary.text2": "Ce prototype a été développé dans le cadre du cours CSC 317, utilisant des technologies web modernes pour offrir une expérience utilisateur fluide.",

    "contact.title": "Contact",
    "contact.text": "Pour toute question, suggestion ou retour, contactez-moi :",
    "contact.email": "Email :",
    "contact.open": "Je suis ouvert aux commentaires pour améliorer Lumina !",

    "auth.title": "Connexion / Inscription",
    "auth.subtitle": "Prototype client-side auth (no backend)",
    "titleLogin": "Lumina — Connexion",
    "auth.email": "Email",
    "auth.emailPh": "tonmail@email.com",
    "auth.name": "Nom",
    "auth.namePh": "Ton nom",
    "auth.password": "Mot de passe",
    "auth.login": "Se connecter",
    "auth.signup": "S'inscrire",
    "auth.switchToSignup": "S'inscrire",
    "auth.switchToLogin": "Déjà inscrit ? Se connecter",
    "account.title": "Mon compte",
    "account.subtitle": "Gérer votre profil",
    "titleAccount": "Lumina — Mon compte",
    "account.logout": "Se déconnecter",
    "account.save": "Enregistrer",

    "footer.brand": "Lumina",
    "footer.right": "French creator",
  },

  en: {
    titleHome: "Lumina — Smart movie recommendations",
    titleSearch: "Lumina — Search",
    titleAbout: "Lumina — About / Contact",

    "brand.tag": "Prototype",

    "nav.home": "Home",
    "nav.search": "Search",
    "nav.about": "About / Contact",
    "nav.account": "Account",

    "splash.tag": "Personalized recommendations",
    "splash.text": "Discover movies similar to the ones you love, and improve the algorithm with your feedback.",
    "splash.enter": "Enter",
    "splash.hint": "CSC 317 Project • UI Prototype",

    "hero.kicker": "Personalized recommendations",
    "hero.title": "Discover movies similar to the ones you love.",
    "hero.lead": "It all starts with a simple search...",
    "hero.cta.search": "Search...",
    "hero.cta.about": "About / Contact",

    "stats.interactions.title": "Interactions",
    "stats.interactions.value": "Search • Ratings • Comments",
    "stats.data.title": "Data",
    "stats.data.value": "Movies • Users • History",
    "stats.goal.title": "Goal",
    "stats.goal.value": "Discovery + relevance",

    "example.title": "Example",
    "example.subtitle": "Recommendation preview",
    "example.liked": "Liked movie:",
    "example.movieSub": "Sci-Fi • Thriller • Nolan",
    "example.favTitle": "Add to favorites",
    "example.text": "Then the user can rate the movie, evaluate the recommendation, and leave a comment.",

    "home.noteTitle": "Ready to try?",
    "home.noteBody": "Go to the Search page to see the UI and mock results.",
    "home.noteCta": "Open Search",

    "demo.title": "Search",
    "demo.subtitle": "Search is now live; results come from an API.",

    "search.title": "Search",
    "search.subtitle": "Title + filters",

    "form.liked.label": "A movie you liked",
    "form.liked.ph": "e.g., Inception, The Notebook, The Dark Knight...",
    "form.genre.label": "Genre",
    "form.genre.opt0": "(optional)",
    "form.keyword.label": "Keyword",
    "form.keyword.ph": "e.g., emotional, horror, superhero...",
    "form.person.label": "Actor / Director",
    "form.person.ph": "e.g., Nolan, DiCaprio...",
    "form.search": "Search",
    "form.reset": "Reset",

    "results.title": "Results",
    "results.subtitle": "Cards + similarity score",
    "results.emptyTitle": "Run a search",
    "results.emptyText": "Recommended movies will appear here.",

    "about.title": "About",
    "about.subtitle": "Project core and planned improvements",

    "about.data.title": "Data",
    "about.data.li1": "Movies (genres, keywords, cast/crew)",
    "about.data.li2": "Users (profile + preferences)",
    "about.data.li3": "Ratings & comments",
    "about.data.li4": "Recommendation history",

    "about.algo.title": "Algorithm",
    "about.algo.li1": "Genre (high weight)",
    "about.algo.li2": "Keywords",
    "about.algo.li3": "Actors / director",
    "about.algo.li4": "Adjusted via feedback",

    "about.next.title": "Next steps",
    "about.next.li1": "Connect a movie API",
    "about.next.li2": "Add a backend + DB",
    "about.next.li3": "Authentication (optional)",
    "about.next.li4": "Improve the scoring",

    "contact.title": "Contact me",
    "contact.subtitle": "Send a message (UI)",
    "contact.name": "Name",
    "contact.namePh": "Your name",
    "contact.email": "Email",
    "contact.emailPh": "you@email.com",
    "contact.msg": "Message",
    "contact.msgPh": "Your message...",
    "contact.send": "Send",
    "contact.note": "(For now, this doesn’t actually send — we can wire it later.)",

    "site.summary.title": "Site Summary",
    "site.summary.text": "Lumina is an intelligent movie recommendation platform. Enter the name of a movie you loved, and discover similar movies based on real data from The Movie Database (TMDB). Explore movie details, watch trailers, and find where to watch them on streaming.",
    "site.summary.text2": "This prototype was developed as part of the CSC 317 course, using modern web technologies to provide a smooth user experience.",

    "contact.title": "Contact",
    "contact.text": "For any questions, suggestions, or feedback, contact me:",
    "contact.email": "Email:",
    "contact.open": "I am open to comments to improve Lumina!",

    "auth.title": "Sign in / Sign up",
    "auth.subtitle": "Prototype client-side auth (no backend)",
    "titleLogin": "Lumina — Sign in",
    "auth.email": "Email",
    "auth.emailPh": "you@email.com",
    "auth.name": "Name",
    "auth.namePh": "Your name",
    "auth.password": "Password",
    "auth.login": "Sign in",
    "auth.signup": "Sign up",
    "auth.switchToSignup": "Sign up",
    "auth.switchToLogin": "Already registered? Sign in",
    "account.title": "My account",
    "account.subtitle": "Manage your profile",
    "titleAccount": "Lumina — My account",
    "account.logout": "Sign out",
    "account.save": "Save",

    "footer.brand": "Lumina",
    "footer.right": "French creator",
  }
};
function applyLang(lang) {
  const dict = I18N[lang] || I18N.fr;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-titleattr]").forEach(el => {
    const key = el.getAttribute("data-i18n-titleattr");
    if (dict[key]) el.setAttribute("title", dict[key]);
  });

  document.documentElement.lang = lang;
  localStorage.setItem("lumina_lang", lang);

  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.textContent = lang.toUpperCase();

  // Set title depending on page
  const isHome = document.body.classList.contains("page-home");
  const isSearch = document.body.classList.contains("page-search");
  const isAbout = document.body.classList.contains("page-about");
  const isLogin = document.body.classList.contains("page-login");
  const isAccount = document.body.classList.contains("page-account");

  if (isHome) document.title = dict.titleHome;
  else if (isSearch) document.title = dict.titleSearch;
  else if (isAbout) document.title = dict.titleAbout;
  else if (isLogin) document.title = dict.titleLogin || dict.titleHome;
  else if (isAccount) document.title = dict.titleAccount || dict.titleHome;
}

function toggleLang() {
  const next = getLang() === "fr" ? "en" : "fr";
  applyLang(next);

  // update mock results language if on search page
  const q = document.getElementById("q");
  if (q) renderResults(q.value);
}

// ==========================
// Splash screen (only home)
// ==========================
function initSplash() {
  if (!document.body.classList.contains("page-home")) return;

  const splash = document.getElementById("splash");
  const enterBtn = document.getElementById("enterBtn");
  if (!splash || !enterBtn) return;

  const alreadyEntered = sessionStorage.getItem("lumina_entered") === "1";
  if (alreadyEntered) {
    splash.classList.add("splash--hidden");
    return;
  }

  const hide = () => {
    splash.classList.add("splash--hidden");
    sessionStorage.setItem("lumina_entered", "1");
  };

  enterBtn.addEventListener("click", hide);
  document.addEventListener("keydown", (e) => {
    if (splash.classList.contains("splash--hidden")) return;
    if (e.key === "Enter" || e.key === "Escape") hide();
  });
}

// ==========================
// Search rendering helpers
// ==========================

function renderEmptyResults() {
  const results = document.getElementById("results");
  if (!results) return;

  results.innerHTML = `
    <div class="empty">
      <div class="empty__icon">🔎</div>
      <div class="empty__title" data-i18n="results.emptyTitle">Lance une recherche</div>
      <div class="muted small" data-i18n="results.emptyText">Tu verras ici des films recommandés.</div>
    </div>
  `;

  applyLang(getLang());
}

async function renderResults(query) {
  const results = document.getElementById("results");
  if (!results) return;

  if (!query.trim()) {
    renderEmptyResults();
    return;
  }

  results.innerHTML = '<div class="empty">…</div>'; // show loading indicator

  try {
    const url = `http://localhost:8001/api/search?q=${encodeURIComponent(query)}` +
                `&lang=${getLang()}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('search failed');
    const movies = await res.json();

    if (movies.length === 0) {
      renderEmptyResults();
      return;
    }

    results.innerHTML = '';
    const lang = getLang();

    movies.forEach(m => {
      const row = document.createElement("div");
      row.className = "movie";
     row.innerHTML = `
  <div class="movie__meta">
    <a href="movie.html?id=${m.id}" class="movie__title">${m.title}</a>
    <div class="movie__sub">${m.overview || ''}</div>
    <div class="movie__genres">${m.genres ? m.genres.join(', ') : ''}</div>
  </div>
  <div class="movie__poster">
    ${m.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${m.poster_path}" alt="${m.title}" crossorigin="anonymous">` : ''}
  </div>
`;
      results.appendChild(row);
    });

    // attach rating handlers as before
    document.querySelectorAll('.rateBtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const movieEl = e.target.closest('.movie');
        const title = movieEl.querySelector('.movie__title').textContent;
        rateMovie(title);
      });
    });
  } catch (err) {
    console.error(err);
    results.innerHTML = '<p class="error">' + (getLang()==='fr' ? 'Erreur de recherche' : 'Search error') + '</p>';
  }
}

async function rateMovie(title) {
  const scoreStr = prompt(getLang() === 'fr' ? 'Donne une note de 1 à 5 (étoiles)' : 'Give a rating 1-5 (stars)');
  if (!scoreStr) return;
  const score = parseInt(scoreStr, 10);
  if (!score || score < 1 || score > 5) { alert(getLang() === 'fr' ? 'Note invalide (1-5)' : 'Invalid rating (1-5)'); return; }
  const comment = prompt(getLang() === 'fr' ? 'Commentaire (optionnel)' : 'Comment (optional)') || '';
  try {
    const res = await fetch('http://localhost:8001/api/ratings', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({movie_title: title, score, comment})});
    if (!res.ok) {
      const j = await res.json().catch(()=>({detail:'error'}));
      alert(j.detail || (getLang()==='fr' ? 'Erreur lors de l\'enregistrement' : 'Save error'));
      return;
    }
    const j = await res.json();
    const status = document.getElementById('status');
    if (status) status.textContent = getLang() === 'fr' ? 'Note enregistrée.' : 'Rating saved.';
    setTimeout(() => { if (status) status.textContent = ''; }, 1800);
  } catch (err) {
    alert(getLang() === 'fr' ? 'Erreur réseau' : 'Network error');
  }
}

// ==========================
// Contact UI (about page)
// ==========================
function initContact() {
  const btn = document.getElementById("contactBtn");
  const status = document.getElementById("contactStatus");
  if (!btn || !status) return;

  btn.addEventListener("click", () => {
    status.textContent = getLang() === "fr" ? "Message enregistré (UI)." : "Message saved (UI).";
    setTimeout(() => (status.textContent = ""), 1800);
  });
}

// ==========================
// Simple client-side auth (mock)
// ==========================

function _getUsers() {
  try { return JSON.parse(localStorage.getItem('lumina_users') || '[]'); }
  catch (e) { return []; }
}

function _saveUsers(users) {
  localStorage.setItem('lumina_users', JSON.stringify(users));
}

function _currentUser() {
  try { return JSON.parse(localStorage.getItem('lumina_user') || 'null'); }
  catch (e) { return null; }
}

function _setCurrentUser(u) {
  if (!u) localStorage.removeItem('lumina_user');
  else localStorage.setItem('lumina_user', JSON.stringify(u));
}

async function _hash(pwd) {
  // Prefer real digest when available; falls back to btoa for compatibility.
  const s = String(pwd || '');
  if (window.crypto && window.crypto.subtle && window.TextEncoder) {
    const enc = new TextEncoder();
    const data = enc.encode(s);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    // convert to hex
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
  }
  return btoa(s);
}

async function signupUser(email, name, pwd) {
  email = String(email || '').trim().toLowerCase();
  name = String(name || '').trim();
  const users = _getUsers();
  if (users.find(u => u.email === email)) return { ok: false, msg: 'exists' };
  const hpwd = await _hash(pwd);
  const u = { email, name, pwd: hpwd };
  users.push(u);
  _saveUsers(users);
  _setCurrentUser({ email, name });
  return { ok: true };
}

async function loginUser(email, pwd) {
  email = String(email || '').trim().toLowerCase();
  const users = _getUsers();
  const h = await _hash(pwd);
  const found = users.find(u => u.email === email && u.pwd === h);
  if (!found) return { ok: false };
  _setCurrentUser({ email: found.email, name: found.name });
  return { ok: true };
}

function logoutUser() {
  _setCurrentUser(null);
  updateHeaderAuthUI();
}

function updateProfile(name) {
  const cur = _currentUser();
  if (!cur) return false;
  const users = _getUsers();
  const u = users.find(x => x.email === cur.email);
  if (!u) return false;
  u.name = name;
  _saveUsers(users);
  _setCurrentUser({ email: u.email, name: u.name });
  return true;
}

function updateHeaderAuthUI() {
  const a = document.getElementById('accountLink');
  if (!a) return;
  const cur = _currentUser();
  if (cur) {
    a.setAttribute('data-i18n','account.title');
    a.href = 'account.html';
  } else {
    a.setAttribute('data-i18n','auth.login');
    a.href = 'login.html';
  }
  if (typeof applyLang === 'function') applyLang(getLang());
}

// ==========================
// Init
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());

  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.addEventListener("click", toggleLang);

  initSplash();
  initContact();
  updateHeaderAuthUI();

  // Auth page / account wiring
  const authForm = document.getElementById('authForm');
  if (authForm && authForm.getAttribute('data-backend') !== 'true') {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const emailEl = document.getElementById('authEmail') || {};
      const pwdEl = document.getElementById('authPassword') || {};
      const nameEl = document.getElementById('authName') || {};
      const email = String(emailEl.value || '').trim();
      const pwd = String(pwdEl.value || '');
      const name = String(nameEl.value || '').trim();
      const mode = authForm.getAttribute('data-mode') || 'login';
      if (mode === 'signup') {
        const res = await signupUser(email, name, pwd);
        if (res.ok) location.href = 'account.html';
        else alert(getLang() === 'fr' ? 'Utilisateur existant' : 'User already exists');
      } else {
        const res = await loginUser(email, pwd);
        if (res.ok) location.href = 'account.html';
        else alert(getLang() === 'fr' ? 'Email ou mot de passe incorrect' : 'Bad credentials');
      }
    });
  }

  // Try to get current user from server (cookie-based session).
  fetch('http://localhost:8001/api/me')
    .then(r => r.ok ? r.json() : Promise.reject(r))
    .then(u => {
      if (u && u.email) {
        localStorage.setItem('lumina_user', JSON.stringify({email: u.email, name: u.name}));
      }
      updateHeaderAuthUI();
    })
    .catch(()=>{
      // no valid session
      localStorage.removeItem('lumina_user');
      updateHeaderAuthUI();
    });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      location.href = 'index.html';
    });
  }

  // Account page: populate profile
  if (document.body.classList.contains('page-account')) {
    const cur = _currentUser();
    const nameEl = document.getElementById('profileName');
    const emailEl = document.getElementById('profileEmail');
    if (cur && nameEl) nameEl.value = cur.name || '';
    if (cur && emailEl) emailEl.textContent = cur.email || '';
    const saveBtn = document.getElementById('saveProfile');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const newName = (document.getElementById('profileName') || {}).value || '';
        if (updateProfile(newName)) alert(getLang() === 'fr' ? 'Profil mis à jour' : 'Profile updated');
        updateHeaderAuthUI();
      });
    }
  }

  // Search page controls
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const status = document.getElementById("status");
  const q = document.getElementById("q");

  if (searchBtn && q) {
  renderEmptyResults();

  searchBtn.addEventListener("click", async () => {
    await renderResults(q.value);
    if (status) {
      status.textContent = getLang() === "fr" ? "Résultats mis à jour." : "Results updated.";
      setTimeout(() => (status.textContent = ""), 1800);
    }
  });

  q.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });
}
});