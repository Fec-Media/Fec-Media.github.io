document.addEventListener('DOMContentLoaded', function () {
  var ctx = document.getElementById('studychart').getContext('2d');

  const initialValue = 50;  // Startwert (z.B. 50 Besucher/Follower)

  // Exponentielles Wachstum mit digitaler Präsenz
  const fastGrowthFactor = 1.1;  // Schnelles Wachstum (10% pro Monat)

  // Exponentielles Wachstum ohne digitale Präsenz (langsames Wachstum)
  const slowGrowthFactor = 1.01;  // Sehr langsames Wachstum (1% pro Monat)

  // Erzeuge exponentielle Werte für das Wachstum mit und ohne digitale Präsenz über 12 Monate
  let fastGrowthValues = [];
  let slowGrowthValues = [];
  let currentFastValue = initialValue;
  let currentSlowValue = initialValue;

  for (let i = 0; i < 12; i++) {
    fastGrowthValues.push(currentFastValue.toFixed(0));
    currentFastValue *= fastGrowthFactor;
    slowGrowthValues.push(currentSlowValue.toFixed(0));
    currentSlowValue *= slowGrowthFactor;
  }

  var studyChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Monat 1', 'Monat 2', 'Monat 3', 'Monat 4', 'Monat 5', 'Monat 6', 'Monat 7', 'Monat 8', 'Monat 9', 'Monat 10', 'Monat 11', 'Monat 12'],
      datasets: [{
        label: 'Wachstum ohne digitale Präsenz',
        data: slowGrowthValues,
        backgroundColor: '#EF8217',
        borderColor: '#FF5733',
        borderWidth: 2,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value) { return value.toFixed(0); }
          }
        }
      },
      plugins: {
        legend: {
          display: true,
        }
      },
      layout: {
        padding: 20
      },
      elements: {
        line: {
          tension: 0.4
        }
      },
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 15,
    }
  });

  var toggleButton = document.getElementById('tooglebutton');
  
  // Zustand, ob der Chart auf schnelles Wachstum umgestellt wurde
  var isOptimized = false;

  toggleButton.addEventListener('click', function () {
    var chartData = studyChart.data.datasets[0];

    if (isOptimized) {
      // Wechsel zurück zum langsamen Wachstum
      chartData.data = slowGrowthValues;
    } else {
      // Wechsel zum schnellen Wachstum
      chartData.data = fastGrowthValues;
    }

    // Zustand aktualisieren
    isOptimized = !isOptimized;

    studyChart.update(); // Diagramm aktualisieren
  });
});

document.getElementById('tooglebutton').addEventListener('click', function() {
  let button = document.getElementById('tooglebutton');

  // Überprüfen, ob der Text bereits geändert wurde
  if (document.getElementById('problem-title').textContent === 'Starke Digitale Präsenz') {
      // Zurücksetzen auf "Fehlende Digitale Präsenz"
      document.getElementById('situation-title').textContent = 'Ausgangssituation:';
      document.getElementById('problem-title').textContent = 'Fehlende Digitale Präsenz';

      document.getElementById('challenges-title').textContent = 'Herausforderungen:';
      document.getElementById('challenges-list').innerHTML = `
          <li>Keine Website, nur lokale Laufkundschaft</li>
          <li>Keine Online-Werbung, Abhängigkeit von Mundpropaganda</li>
          <li>Eingeschränkte Kundenreichweite</li>
      `;
      document.getElementById('problems-title').textContent = 'Probleme:';
      document.getElementById('problems-list').innerHTML = `
          <li>Geringe Sichtbarkeit in der digitalen Welt</li>
          <li>Kunden konnten keine aktuellen Angebote oder Öffnungszeiten online finden</li>
          <li>Fehlende Möglichkeit, neue Kunden zu gewinnen</li>
      `;

      // Button-Text ändern
      button.textContent = 'Wechseln zu Optimiert';
  } else {
      // Ändern der Texte auf die Optimierungswerte
      document.getElementById('situation-title').textContent = 'Ausgangssituation:';
      document.getElementById('problem-title').textContent = 'Starke Digitale Präsenz';

      document.getElementById('challenges-title').textContent = 'Stärken:';
      document.getElementById('challenges-list').innerHTML = `
          <li>Optimierte Website mit ansprechendem Design und klarer Benutzerführung</li>
          <li>Gezielte Online-Werbung zur Reichweitensteigerung</li>
          <li>Erweiterung der Kundenreichweite durch digitale Kanäle</li>
      `;
      document.getElementById('problems-title').textContent = 'Vorteile:';
      document.getElementById('problems-list').innerHTML = `
          <li>Hohe Sichtbarkeit in der digitalen Welt, sowohl lokal als auch überregional</li>
          <li>Kunden können jederzeit aktuelle Angebote, Öffnungszeiten und Informationen einsehen</li>
          <li>Erhöhte Möglichkeit, neue Kunden durch gezielte Marketingstrategien zu gewinnen</li>
      `;

      // Button-Text ändern
      button.textContent = 'Wechseln zu Unoptimiert';
  }
});




document.addEventListener("DOMContentLoaded", function () {
  let slides = document.querySelectorAll(".slider-slide");
  let currentIndex = 0;

  function showSlide(index) {
      slides.forEach((slide, i) => {
          slide.style.display = i === index ? "block" : "none";
      });
  }

  document.querySelector(".slider-btn.left").addEventListener("click", function () {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
      showSlide(currentIndex);
  });

  document.querySelector(".slider-btn.right").addEventListener("click", function () {
      currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
      showSlide(currentIndex);
  });

  showSlide(currentIndex);
});
