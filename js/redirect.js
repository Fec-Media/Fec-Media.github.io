// Mapping der unterstützten Sprachen und ihrer Startseiten
const langMapping = {
    'de': 'index-de.html', // Deutsche Startseite
    'en': 'index-en.html', // Englische Startseite
};

// Fallback-Seite, falls die Sprache nicht unterstützt wird
const fallback = 'index-en.html'; // Standard: Englisch

// Browsersprache ermitteln
const userLang = navigator.language || navigator.userLanguage;

// Erste zwei Buchstaben der Sprache extrahieren (z. B. "de" aus "de-DE")
const lang = userLang.slice(0, 2).toLowerCase();

// Aktuellen Dateinamen aus der URL ermitteln
const currentPage = window.location.pathname.split('/').pop();

// Weiterleitung, falls die aktuelle Seite nicht der bevorzugten Sprache entspricht
if (langMapping[lang] && currentPage !== langMapping[lang]) {
    window.location.href = langMapping[lang];
} else if (!langMapping[lang] && currentPage !== fallback) {
    // Weiterleitung zur Fallback-Seite für nicht unterstützte Sprachen
    window.location.href = fallback;
}
