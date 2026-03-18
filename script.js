const infoPanel = document.getElementById("infoPanel");
const projectsGrid = document.getElementById("projectsGrid");

const categoryConfig = {
  academic: {
    label: "Academic",
    color: "#3b82f6"
  },
  research: {
    label: "Research",
    color: "#10b981"
  },
  startup: {
    label: "Startup",
    color: "#f59e0b"
  },
  publication: {
    label: "Publication",
    color: "#8b5cf6"
  },
  future: {
    label: "Future Vision",
    color: "#ef4444"
  }
};

const map = L.map("map", {
  zoomControl: true,
  scrollWheelZoom: true
}).setView([27, 10], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

function createMarkerIcon(color) {
  return L.divIcon({
    className: "",
    html: `<div class="custom-marker" style="background:${color};"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9]
  });
}

function renderInfoPanel(item) {
  const category = categoryConfig[item.category];

  infoPanel.innerHTML = `
    <div>
      <span class="info-category" style="background:${category.color}">
        ${category.label}
      </span>

      <h3>${item.title}</h3>

      <div class="info-meta">
        <strong>${item.location}</strong> &nbsp;•&nbsp; ${item.year}
      </div>

      <p>${item.description}</p>

      <div class="info-tools">
        ${item.tools.map(tool => `<span>${tool}</span>`).join("")}
      </div>

      <a class="info-link" href="${item.link}" target="_blank" rel="noopener">
        Explore more →
      </a>
    </div>
  `;
}

journeyData.forEach((item, index) => {
  const category = categoryConfig[item.category];

  const marker = L.marker([item.lat, item.lng], {
    icon: createMarkerIcon(category.color)
  }).addTo(map);

  marker.bindPopup(`
    <strong>${item.title}</strong><br/>
    ${item.location}
  `);

  marker.on("click", () => {
    renderInfoPanel(item);
  });

  if (index === 0) {
    renderInfoPanel(item);
  }
});

function renderProjects() {
  const featuredItems = journeyData.filter(item => item.featured);

  projectsGrid.innerHTML = featuredItems
    .map(item => {
      const category = categoryConfig[item.category];

      return `
        <article class="project-card">
          <span class="project-tag">${category.label}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `;
    })
    .join("");
}

renderProjects();
