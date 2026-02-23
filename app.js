// ==========================
// Mock results (demo UI)
// ==========================
const mockResults = [
  { title: "Interstellar", metaFR: "Science-fiction • Thriller • Nolan", metaEN: "Sci-Fi • Thriller • Nolan", score: 88 },
  { title: "The Prestige", metaFR: "Thriller • Drame • Nolan", metaEN: "Thriller • Drama • Nolan", score: 81 },
  { title: "Shutter Island", metaFR: "Thriller • Mystère • Psychologique", metaEN: "Thriller • Mystery • Psychological", score: 76 },
];

function getLang() {
  return localStorage.getItem("lumina_lang") || "fr";
}

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

  // Re-apply language after injecting HTML
  applyLang(getLang());
}

function renderResults(query) {
  const results = document.getElementById("results");
  if (!results) return;

  if (!query.trim()) {
    renderEmptyResults();
    return;
  }

  const lang = getLang();
  results.innerHTML = "";

  mockResults.forEach((m) => {
    const row = document.createElement("div");
    row.className = "movie";
    row.innerHTML = `
      <div class="movie__meta">
        <div class="movie__title">${m.title}</div>
        <div class="movie__sub">${lang === "fr" ? m.metaFR : m.metaEN}</div>
      </div>
      <span class="badge">${m.score}%</span>
    `;
    results.appendChild(row);
  });
}

// ==========================
// i18n FR/EN (Lumina Film)
// ==========================
const I18N = {
  fr: {
    title: "Lumina Film — Recommandation intelligente de films",
    "brand.tag": "Prototype",

    "nav.home": "Accueil",
    "nav.demo": "Démo",
    "nav.about": "À propos",

    "hero.kicker": "Recommandations personnalisées",
    "hero.title": "Découvre des films similaires à ceux que tu aimes.",
    "hero.lead": "Tout commence par une simple recherche...",
    "hero.cta.demo": "Voir l’interface",
    "hero.cta.about": "Comprendre le projet",

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

    "demo.title": "Démo (interface)",
    "demo.subtitle": "Pour l’instant, c’est un exemple, rien n'est réellement fonctionnel",

    "search.title": "Recherche",
    "search.subtitle": "Titre + filtres",

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

    "footer.brand": "Lumina Film",
    "footer.right": "French creator",

    // Splash
    "splash.tag": "Recommandations personnalisées",
    "splash.text": "Découvre des films similaires à ceux que tu aimes, et aide l’algorithme avec tes retours.",
    "splash.enter": "Entrer",
    "splash.skip": "Ne plus afficher",
    "splash.hint": "Projet CSC 317 • Prototype UI",
  },

  en: {
    title: "Lumina Film — Smart movie recommendations",
    "brand.tag": "Prototype",

    "nav.home": "Home",
    "nav.demo": "Demo",
    "nav.about": "About",

    "hero.kicker": "Personalized recommendations",
    "hero.title": "Discover movies similar to the ones you love.",
    "hero.lead": "It all starts with a simple search...",
    "hero.cta.demo": "See the interface",
    "hero.cta.about": "Understand the project",

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

    "demo.title": "Demo (UI)",
    "demo.subtitle": "For now, this is a showcase—nothing is fully functional yet.",

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

    "footer.brand": "Lumina Film",
    "footer.right": "French creator",

    // Splash
    "splash.tag": "Personalized recommendations",
    "splash.text": "Discover movies similar to the ones you love, and improve the algorithm with your feedback.",
    "splash.enter": "Enter",
    "splash.skip": "Don't show again",
    "splash.hint": "CSC 317 Project • UI Prototype",
  }
};

function applyLang(lang) {
  const dict = I18N[lang] || I18N.fr;

  // Text content
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  // Title tooltips
  document.querySelectorAll("[data-i18n-titleattr]").forEach(el => {
    const key = el.getAttribute("data-i18n-titleattr");
    if (dict[key]) el.setAttribute("title", dict[key]);
  });

  // Document title
  if (dict.title) document.title = dict.title;

  // html lang + save
  document.documentElement.lang = lang;
  localStorage.setItem("lumina_lang", lang);

  // Button label
  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.textContent = lang.toUpperCase();
}

function toggleLang() {
  const current = getLang();
  const next = current === "fr" ? "en" : "fr";
  applyLang(next);

  // si l'utilisateur est sur la démo, on met à jour aussi les résultats mock
  const q = document.getElementById("q");
  if (q) renderResults(q.value);

  // re-inject empty translations if empty state is shown
  const results = document.getElementById("results");
  if (results && results.querySelector(".empty")) applyLang(next);
}

// ==========================
// Splash screen (Accueil)
// ==========================
function initSplash() {
  const splash = document.getElementById("splash");
  const enterBtn = document.getElementById("enterBtn");

  if (!splash) return;

  const disabled = localStorage.getItem("lumina_splash_disabled") === "1";
  const alreadyEntered = sessionStorage.getItem("lumina_entered") === "1";

  if (disabled || alreadyEntered) {
    splash.classList.add("splash--hidden");
    return;
  }

  const hideSplash = () => {
    splash.classList.add("splash--hidden");
    sessionStorage.setItem("lumina_entered", "1");
  };

  //enterBtn?.addEventListener("click", hideSplash);
  

  document.addEventListener("keydown", (e) => {
    if (splash.classList.contains("splash--hidden")) return;
    if (e.key === "Enter") hideSplash();
    if (e.key === "Escape") hideSplash();
  });
}

// ==========================
// Main init
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // init lang
  applyLang(getLang());

  // bind lang button
  const langBtn = document.getElementById("langBtn");
  langBtn?.addEventListener("click", toggleLang);

  // splash
  initSplash();

  // demo buttons
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");
  const status = document.getElementById("status");
  const q = document.getElementById("q");

  searchBtn?.addEventListener("click", () => {
    renderResults(q?.value || "");
    if (status) {
      status.textContent = getLang() === "fr" ? "Résultats mis à jour (mock)." : "Results updated (mock).";
      setTimeout(() => (status.textContent = ""), 1800);
    }
  });

  resetBtn?.addEventListener("click", () => {
    if (q) q.value = "";
    const genre = document.getElementById("genre");
    const mood = document.getElementById("mood");
    const person = document.getElementById("person");
    if (genre) genre.value = "";
    if (mood) mood.value = "";
    if (person) person.value = "";

    renderEmptyResults();

    if (status) {
      status.textContent = getLang() === "fr" ? "Formulaire réinitialisé." : "Form reset.";
      setTimeout(() => (status.textContent = ""), 1800);
    }
  });

  // Enter in input triggers search
  q?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn?.click();
  });

  // initial empty results
  renderEmptyResults();
});