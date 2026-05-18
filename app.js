function getLang() {
  return localStorage.getItem("lumina_lang") || "fr";
}

const I18N = {
  fr: {
    titleHome: "Lumina — Recommandation intelligente de films",
    titleSearch: "Lumina — Recherche",
    titleAbout: "Lumina — À propos / Contact",

    "nav.home": "Accueil",
    "nav.search": "Recherche",
    "nav.about": "À propos / Contact",
    "auth.login": "Se connecter",

    "hero.title": "Découvre des films similaires à ceux que tu aimes.",
    "hero.lead": "Tout commence par une simple recherche...",
    "hero.cta.search": "Chercher...",

    "form.search": "Rechercher",

    "results.emptyTitle": "Lance une recherche",
    "results.emptyText": "Tu verras ici des films recommandés.",
    "results.title": "Résultats",
    "results.error": "Erreur de recherche",

    "home.recent.title": "Films récents",
    "home.recent.subtitle": "Les sorties les plus récentes à découvrir.",
    "home.recent.error": "Erreur de chargement",
    "home.recent.empty": "Aucun film récent trouvé.",
    
    "home.trending.title": "Tendances du moment",
    "home.trending.subtitle": "Les films populaires actuellement.",
    "home.trending.error": "Erreur de chargement",

    "home.classics.title": "Classiques incontournables",
    "home.classics.subtitle": "Les films cultes à voir absolument.",

    "form.liked.label": "Film que tu as aimé",
    "form.liked.ph": "Ex : Inception, The Notebook, The Dark Knight...",

    "auth.title": "Connexion / Inscription",
    "auth.subtitle": "Prototype client-side auth (no backend)",
    "auth.email": "Email",
    "auth.emailPh": "votre@email.com",
    "auth.name": "Nom",
    "auth.namePh": "Votre nom",
    "auth.password": "Mot de passe",
    "auth.switchToSignup": "S'inscrire",
    "auth.switchToLogin": "Se connecter",
    "auth.signup": "S'inscrire",
    "auth.googleSignin": "Se connecter avec Google",

    "demo.title": "Recherche",
    "search.title": "Recherche",

    "about.title": "À propos",
    "about.subtitle": "Le coeur du projet, et ses avancées prévues",
    "site.summary.title": "Résumé du site",
    "site.summary.text": "Lumina est une plateforme de recommandation de films intelligente. Entrez le nom d'un film que vous avez aimé, et découvrez des films similaires. Explorez les détails des films, regardez les trailers, et trouvez où les regarder en streaming.",
    "contact.title": "Contact",
    "contact.text": "Pour toute question, suggestion ou retour, contactez-moi :",
    "contact.email": "Email :",
    "contact.open": "Je suis ouvert aux commentaires pour améliorer Lumina Film !",
    "about.next.title": "Prochaines étapes",
    "about.next.li1": "Brancher une API de films",
    "about.next.li2": "Ajouter un backend + DB",
    "about.next.li3": "Authentification (optionnel)",
    "about.next.li4": "Améliorer le scoring",

    "footer.brand": "Lumina",
    "footer.right": "Créateur français",

    "button.langChange": "Changer la langue",
    "button.toggleMenu": "Ouvrir le menu",

    "account.title": "Mon compte",
    "account.subtitle": "Gérer votre profil",
    "account.logout": "Se déconnecter",
    "account.save": "Enregistrer",

    "movie.loading": "Chargement...",
    "movie.notFound": "Film non trouvé.",
    "movie.loadError": "Erreur de chargement",
    "movie.noPoster": "Aucune affiche",
    "movie.unknownTitle": "Titre inconnu",
    "movie.release": "Sortie :",
    "movie.rating": "Note :",
    "movie.genres": "Genres :",
    "movie.noDescription": "Pas de description disponible.",
    "movie.cast": "Acteurs principaux",
    "movie.director": "Réalisateur",
    "movie.watchProviders": "Où regarder",
    "movie.actions": "Actions",
    "movie.noInfo": "Information non disponible.",
    "movie.noProviders": "Aucune plateforme indiquée.",
    "movie.trailer": "▶ Voir le trailer",
    "movie.backSearch": "🔍 Retour à la recherche"
  },

  en: {
    titleHome: "Lumina — Smart movie recommendations",
    titleSearch: "Lumina — Search",
    titleAbout: "Lumina — About / Contact",

    "nav.home": "Home",
    "nav.search": "Search",
    "nav.about": "About / Contact",
    "auth.login": "Sign in",

    "hero.title": "Discover movies similar to the ones you love.",
    "hero.lead": "It all starts with a simple search...",
    "hero.cta.search": "Search...",

    "form.search": "Search",

    "results.emptyTitle": "Run a search",
    "results.emptyText": "Recommended movies will appear here.",
    "results.title": "Results",
    "results.error": "Search error",

    "home.recent.title": "Recent Movies",
    "home.recent.subtitle": "Latest releases",
    "home.recent.error": "Loading error",
    "home.recent.empty": "No movies found",

    "home.trending.title": "Trending Now",
    "home.trending.subtitle": "Popular movies right now.",
    "home.trending.error": "Loading error",

    "home.classics.title": "Must-Watch Classics",
    "home.classics.subtitle": "Iconic films you must see.",

    "form.liked.label": "Movie you liked",
    "form.liked.ph": "E.g.: Inception, The Notebook, The Dark Knight...",

    "auth.title": "Sign In / Sign Up",
    "auth.subtitle": "Prototype client-side auth (no backend)",
    "auth.email": "Email",
    "auth.emailPh": "your@email.com",
    "auth.name": "Name",
    "auth.namePh": "Your name",
    "auth.password": "Password",
    "auth.switchToSignup": "Sign Up",
    "auth.switchToLogin": "Sign In",
    "auth.signup": "Sign Up",
    "auth.googleSignin": "Sign in with Google",

    "demo.title": "Search",
    "search.title": "Search",

    "about.title": "About",
    "about.subtitle": "The heart of the project and planned improvements",
    "site.summary.title": "Website Summary",
    "site.summary.text": "Lumina is an intelligent movie recommendation platform. Enter the name of a movie you liked, and discover similar movies. Explore movie details, watch trailers, and find where to stream them.",
    "contact.title": "Contact",
    "contact.text": "For any questions, suggestions or feedback, contact me:",
    "contact.email": "Email:",
    "contact.open": "I'm open to feedback to improve Lumina Film!",
    "about.next.title": "Next Steps",
    "about.next.li1": "Connect a movie API",
    "about.next.li2": "Add backend + DB",
    "about.next.li3": "Authentication (optional)",
    "about.next.li4": "Improve scoring algorithm",

    "footer.brand": "Lumina",
    "footer.right": "French creator",

    "button.langChange": "Change language",
    "button.toggleMenu": "Open menu",

    "account.title": "My Account",
    "account.subtitle": "Manage your profile",
    "account.logout": "Sign Out",
    "account.save": "Save",

    "movie.loading": "Loading...",
    "movie.notFound": "Movie not found.",
    "movie.loadError": "Loading error",
    "movie.noPoster": "No poster",
    "movie.unknownTitle": "Unknown title",
    "movie.release": "Release:",
    "movie.rating": "Rating:",
    "movie.genres": "Genres:",
    "movie.noDescription": "No description available.",
    "movie.cast": "Main Cast",
    "movie.director": "Director",
    "movie.watchProviders": "Where to Watch",
    "movie.actions": "Actions",
    "movie.noInfo": "Information not available.",
    "movie.noProviders": "No streaming platforms available.",
    "movie.trailer": "▶ Watch Trailer",
    "movie.backSearch": "🔍 Back to Search"
  }
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.fr;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Handle placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  // Handle aria-label
  document.querySelectorAll("[data-i18n-aria-label]").forEach(el => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
  });

  // Update page title based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === 'index.html' || currentPage === '') {
    document.title = dict["titleHome"] || "Lumina";
  } else if (currentPage === 'search.html') {
    document.title = dict["titleSearch"] || "Lumina";
  } else if (currentPage === 'about.html') {
    document.title = dict["titleAbout"] || "Lumina";
  } else if (currentPage === 'login.html') {
    document.title = lang === 'en' ? "Lumina — Sign In" : "Lumina — Connexion";
  } else if (currentPage === 'account.html') {
    document.title = dict["account.title"] ? `Lumina — ${dict["account.title"]}` : "Lumina";
  } else if (currentPage === 'movie.html') {
    document.title = lang === 'en' ? "Lumina — Movie Details" : "Lumina — Détails du film";
  }

  document.documentElement.lang = lang;
  localStorage.setItem("lumina_lang", lang);

  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.textContent = lang.toUpperCase();
}

function toggleLang() {
  const next = getLang() === "fr" ? "en" : "fr";
  applyLang(next);

  const q = document.getElementById("q");
  if (q) renderResults(q.value);

  loadRecentMovies();
  loadTrendingMovies(); 
}

// ==========================
// 🎬 FILMS RECENTS
// ==========================
async function loadRecentMovies() {
  const container = document.getElementById("recentMovies");
  if (!container) return;

  const dict = I18N[getLang()] || I18N.fr;
  container.innerHTML = `<p>${dict["home.recent.error"]}...</p>`;

  try {
    const res = await fetch(`http://localhost:8001/api/recent?lang=${getLang()}`);
    if (!res.ok) throw new Error();

    const movies = await res.json();
    container.innerHTML = "";

    movies.slice(0, 6).forEach(m => {
      const card = document.createElement("a");
      card.className = "card movie-card";
      card.href = `movie.html?id=${m.id}`;

      card.innerHTML = `
        <img class="movie-card__img"
          src="https://image.tmdb.org/t/p/w500${m.poster_path || ''}">
        <div class="card__body">
          <div class="card__title">${m.title}</div>
          <div class="card__subtitle">${m.release_date}</div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch {
    container.innerHTML = `<p>${dict["home.recent.error"]}</p>`;
  }
}

// recherche
function renderEmptyResults() {
  const results = document.getElementById("results");
  if (!results) return;

  const dict = I18N[getLang()] || I18N.fr;
  results.innerHTML = `<div class="empty"><div class="empty__title" data-i18n="results.emptyTitle">${dict["results.emptyTitle"]}</div><div class="muted small" data-i18n="results.emptyText">${dict["results.emptyText"]}</div></div>`;
}

async function renderResults(query) {
  const results = document.getElementById("results");
  if (!results) return;

  if (!query.trim()) {
    renderEmptyResults();
    return;
  }

  try {
    const res = await fetch(`http://localhost:8001/api/search?q=${encodeURIComponent(query)}&lang=${getLang()}`);
    if (!res.ok) throw new Error();

    const movies = await res.json();
    results.innerHTML = "";

    movies.forEach(m => {
      const row = document.createElement("div");
      row.className = "movie";

     row.innerHTML = `
  <div class="movie__meta">
    <a href="movie.html?id=${m.id}" class="movie__title">${m.title}</a>
    <div class="movie__sub">${m.overview || ""}</div>
    <div class="movie__genres">${m.genres ? m.genres.join(", ") : ""}</div>
  </div>

  <div class="movie__poster">
    ${m.poster_path ? `<img src="https://image.tmdb.org/t/p/w200${m.poster_path}" alt="${m.title}" crossorigin="anonymous">` : ""}
  </div>
`;

      results.appendChild(row);
    });

  } catch {
    const dict = I18N[getLang()] || I18N.fr;
    results.innerHTML = `<p>${dict["results.error"]}</p>`;
  }
}

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  applyLang(getLang());

  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.addEventListener("click", toggleLang);

  loadRecentMovies();
  loadTrendingMovies(); 

  const searchBtn = document.getElementById("searchBtn");
  const q = document.getElementById("q");

  if (searchBtn && q) {
    renderEmptyResults();

    searchBtn.addEventListener("click", () => {
      renderResults(q.value);
    });

    q.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchBtn.click();
      }
    });
  }
});
async function loadTrendingMovies() {
  const container = document.getElementById("trendingMovies");
  if (!container) return;

  const dict = I18N[getLang()] || I18N.fr;
  container.innerHTML = `<div class="empty">…</div>`;

  try {
    const res = await fetch(`http://localhost:8001/api/trending?lang=${getLang()}`);
    if (!res.ok) throw new Error("trending failed");

    const movies = await res.json();
    container.innerHTML = "";

    movies.slice(0, 6).forEach(m => {
      const card = document.createElement("a");
      card.className = "card movie-card";
      card.href = `movie.html?id=${m.id}`;
      card.style.textDecoration = "none";
      card.style.color = "inherit";

      card.innerHTML = `
        ${m.poster_path ? `<img class="movie-card__img" src="https://image.tmdb.org/t/p/w500${m.poster_path}" alt="${m.title}">` : ""}
        <div class="card__body">
          <div class="card__title">${m.title || ""}</div>
          <div class="card__subtitle">${m.release_date || ""}</div>
          <div class="movie__genres">${Array.isArray(m.genres) ? m.genres.join(", ") : ""}</div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error("loadTrendingMovies error:", err);
    container.innerHTML = `<div class="empty">${dict["home.trending.error"]}</div>`;
  }
}