"use strict";

const mobs = [
  {
    slug: "t-rex",
    name: { pt: "T-Rex", en: "T-Rex" },
    image: "assets/bestiary-trex.png",
    type: "hostile",
    stats: ["HP 100", "ATK 15", "DEF 20"],
    description: {
      pt: "Um predador territorial das florestas antigas. Seu rugido anuncia uma investida rápida e destrutiva.",
      en: "A territorial predator of ancient forests. Its roar announces a fast and devastating charge.",
    },
    drops: {
      pt: ["Dente de T-Rex", "Carne de dinossauro", "Couro resistente"],
      en: ["T-Rex Tooth", "Dinosaur Meat", "Tough Leather"],
    },
  },
  {
    slug: "allosaurus",
    name: { pt: "Allosaurus", en: "Allosaurus" },
    image: "assets/bestiary-allosaurus.png",
    type: "hostile",
    stats: ["HP 90", "ATK 8", "DEF 5"],
    description: {
      pt: "Caçador veloz que persegue suas presas em grupo. Menor que o T-Rex, porém muito mais ágil.",
      en: "A fast pack hunter. Smaller than the T-Rex, but considerably more agile.",
    },
    drops: {
      pt: ["Dente serrilhado", "Carne de dinossauro", "Osso antigo"],
      en: ["Serrated Tooth", "Dinosaur Meat", "Ancient Bone"],
    },
  },
  {
    slug: "emperor-scorpion",
    name: { pt: "Emperor Scorpion", en: "Emperor Scorpion" },
    image: "assets/bestiary-emperor.png",
    type: "boss",
    stats: ["HP 350", "ATK 20", "DEF 20"],
    description: {
      pt: "Chefe colossal encontrado nos desertos. Seu ferrão venenoso atravessa armaduras despreparadas.",
      en: "A colossal desert boss. Its venomous stinger tears through unprepared armor.",
    },
    drops: {
      pt: ["Escama do Imperador", "Ferrão venenoso", "Fragmento de titânio"],
      en: ["Emperor Scale", "Venomous Stinger", "Titanium Fragment"],
    },
  },
  {
    slug: "hercules",
    name: { pt: "Hercules", en: "Hercules" },
    image: "assets/bestiary-hercules.png",
    type: "boss",
    stats: ["HP 250", "ATK 30", "DEF 20"],
    description: {
      pt: "Besouro real de força absurda. Pode levantar criaturas e arremessá-las para longe.",
      en: "A royal beetle of absurd strength. It can lift creatures and throw them far away.",
    },
    drops: {
      pt: ["Casco de Hércules", "Asa reforçada", "Fragmento real"],
      en: ["Hercules Shell", "Reinforced Wing", "Royal Fragment"],
    },
  },
  {
    slug: "golden-cow",
    name: { pt: "Vaca Dourada", en: "Golden Cow" },
    image: "assets/bestiary-golden-cow.png",
    type: "peaceful",
    stats: ["HP 20", "ATK 0", "RARE"],
    description: {
      pt: "Uma criatura rara e pacífica. Alimentá-la corretamente pode render recursos preciosos.",
      en: "A rare peaceful creature. Feeding it correctly may yield precious resources.",
    },
    drops: {
      pt: ["Maçã encantada", "Pepita de ouro", "Couro dourado"],
      en: ["Enchanted Apple", "Gold Nugget", "Golden Leather"],
    },
  },
];

const translations = {
  pt: {
    navHome: "Início",
    navBestiary: "Bestiário",
    navDimensions: "Dimensões",
    navArsenal: "Arsenal",
    navGallery: "Galeria",
    eyebrow: "O LEGADO RENASCE",
    title: "Uma nova era de criaturas impossíveis.",
    intro:
      "WarSpawn recria a aventura caótica de OreSpawn para o Minecraft moderno, preservando a nostalgia e reconstruindo o mundo com mais conteúdo, estabilidade e identidade.",
    explore: "Explorar o bestiário",
    progress: "Em desenvolvimento para NeoForge 26.1.2",
    bestiaryKicker: "01 — ARQUIVO DE CRIATURAS",
    featured: "Bestiário em destaque",
    archive: "Abrir arquivo",
    all: "Todos",
    boss: "Chefes",
    hostile: "Hostis",
    peaceful: "Pacíficos",
    search: "Buscar criatura...",
    noResults: "Nenhuma criatura encontrada.",
    dimensionsKicker: "02 — GUIA DE EXPEDIÇÃO",
    dimensions: "Mundos além do portal",
    dimensionsLead:
      "Encontre o formigueiro certo, interaja com a formiga e atravesse para ecossistemas inteiros.",
    redAnt: "Portal: Formiga vermelha",
    brownAnt: "Portal: Formiga marrom",
    mining: "Dimensão da Mineração",
    miningText:
      "Uma inundação de minérios, dezenas de masmorras e chefes escondidos por todos os lados.",
    utopia: "Utopia",
    utopiaText:
      "Florestas exuberantes, árvores gigantes e criaturas fantásticas em um mundo de escala colossal.",
    arsenalKicker: "03 — EQUIPAMENTOS",
    arsenal: "Relíquias capazes de mudar uma guerra",
    arsenalText:
      "Espadas lendárias, cajados, projéteis em 3D e armaduras reconstruídas para o combate moderno.",
    galleryKicker: "04 — GALERIA",
    gallery: "Arquivos do WarSpawn",
    galleryProjectiles: "Projéteis 3D",
    galleryWeapons: "Armas destruidoras",
    galleryStaff: "Cajado de Raios",
    galleryLegacy: "Antigo e novo",
    close: "Fechar dossiê",
    drops: "Drops e itens associados",
    footer:
      "Projeto comunitário inspirado no OreSpawn original. OreSpawn pertence aos seus respectivos autores, incluindo TheyCallMeDanger.",
    license: "Licença",
    typeBoss: "Chefe",
    typeHostile: "Hostil",
    typePeaceful: "Pacífico",
    switchLanguage: "Mudar idioma para inglês",
    closeLabel: "Fechar dossiê",
    dossierAlt: "Dossiê de",
  },
  en: {
    navHome: "Home",
    navBestiary: "Bestiary",
    navDimensions: "Dimensions",
    navArsenal: "Arsenal",
    navGallery: "Gallery",
    eyebrow: "THE LEGACY RISES AGAIN",
    title: "A new age of impossible creatures.",
    intro:
      "WarSpawn rebuilds OreSpawn's chaotic adventure for modern Minecraft, preserving its nostalgia while expanding the world with more content, stability and identity.",
    explore: "Explore the bestiary",
    progress: "In development for NeoForge 26.1.2",
    bestiaryKicker: "01 — CREATURE ARCHIVE",
    featured: "Featured bestiary",
    archive: "Open file",
    all: "All",
    boss: "Bosses",
    hostile: "Hostile",
    peaceful: "Peaceful",
    search: "Search creature...",
    noResults: "No creatures found.",
    dimensionsKicker: "02 — EXPEDITION GUIDE",
    dimensions: "Worlds beyond the portal",
    dimensionsLead:
      "Find the right nest, interact with its ant and cross into complete ecosystems.",
    redAnt: "Portal: Red Ant",
    brownAnt: "Portal: Brown Ant",
    mining: "Mining Dimension",
    miningText:
      "A flood of ores, dozens of dungeons and hidden bosses in every direction.",
    utopia: "Utopia",
    utopiaText:
      "Lush forests, giant trees and fantastic creatures in a world built at colossal scale.",
    arsenalKicker: "03 — EQUIPMENT",
    arsenal: "Relics powerful enough to change a war",
    arsenalText:
      "Legendary swords, staves, 3D projectiles and rebuilt armor for modern combat.",
    galleryKicker: "04 — GALLERY",
    gallery: "WarSpawn archives",
    galleryProjectiles: "3D projectiles",
    galleryWeapons: "Destructive weapons",
    galleryStaff: "Thunder Staff",
    galleryLegacy: "Legacy and remake",
    close: "Close dossier",
    drops: "Drops and related items",
    footer:
      "A community project inspired by the original OreSpawn. OreSpawn belongs to its respective authors, including TheyCallMeDanger.",
    license: "License",
    typeBoss: "Boss",
    typeHostile: "Hostile",
    typePeaceful: "Peaceful",
    switchLanguage: "Mudar idioma para português",
    closeLabel: "Close dossier",
    dossierAlt: "Dossier for",
  },
};

const state = {
  language: localStorage.getItem("warspawn-language") === "en" ? "en" : "pt",
  filter: "all",
  query: "",
  selected: null,
  lastTrigger: null,
};

const elements = {
  grid: document.querySelector("#bestiary-grid"),
  search: document.querySelector("#mob-search"),
  filterButtons: [...document.querySelectorAll("[data-filter]")],
  languageButton: document.querySelector("#language-toggle"),
  noResults: document.querySelector("#no-results"),
  modal: document.querySelector("#modal"),
  modalClose: document.querySelector("#modal-close"),
  modalCloseButton: document.querySelector("#modal-close-button"),
  dossierArt: document.querySelector("#dossier-art"),
  dossierName: document.querySelector("#dossier-name"),
  dossierStats: document.querySelector("#dossier-stats"),
  dossierDescription: document.querySelector("#dossier-description"),
  dossierDrops: document.querySelector("#dossier-drops"),
};

function typeLabel(type) {
  const key = `type${type[0].toUpperCase()}${type.slice(1)}`;
  return translations[state.language][key];
}

function renderBestiary() {
  const normalizedQuery = state.query.trim().toLocaleLowerCase(state.language);
  const filtered = mobs.filter((mob) => {
    const matchesType = state.filter === "all" || mob.type === state.filter;
    const names = `${mob.name.pt} ${mob.name.en}`.toLocaleLowerCase(state.language);
    return matchesType && names.includes(normalizedQuery);
  });

  elements.grid.replaceChildren(
    ...filtered.map((mob) => {
      const originalIndex = mobs.findIndex((entry) => entry.slug === mob.slug);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mob-card";
      button.dataset.slug = mob.slug;
      button.innerHTML = `
        <span class="file-no">#${String(originalIndex + 1).padStart(3, "0")}</span>
        <img src="${mob.image}" alt="${translations[state.language].dossierAlt} ${mob.name[state.language]}" loading="lazy" decoding="async">
        <span class="mob-meta">
          <b>${mob.name[state.language]}</b>
          <small>${typeLabel(mob.type)}</small>
        </span>
        <span class="open">${translations[state.language].archive} ↗</span>
      `;
      button.addEventListener("click", () => openDossier(mob, button));
      return button;
    }),
  );

  elements.noResults.hidden = filtered.length !== 0;
}

function updateLanguage() {
  const t = translations[state.language];
  document.documentElement.lang = state.language === "pt" ? "pt-BR" : "en";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (t[key]) element.textContent = t[key];
  });
  elements.search.placeholder = t.search;
  elements.search.setAttribute("aria-label", t.search);
  elements.languageButton.textContent = state.language === "pt" ? "EN" : "PT";
  elements.languageButton.setAttribute("aria-label", t.switchLanguage);
  elements.modalClose.setAttribute("aria-label", t.closeLabel);
  localStorage.setItem("warspawn-language", state.language);
  renderBestiary();
  if (state.selected) populateDossier(state.selected);
}

function populateDossier(mob) {
  const t = translations[state.language];
  elements.dossierArt.src = mob.image;
  elements.dossierArt.alt = `${t.dossierAlt} ${mob.name[state.language]}`;
  elements.dossierName.textContent = mob.name[state.language];
  elements.dossierDescription.textContent = mob.description[state.language];
  elements.dossierStats.replaceChildren(
    ...mob.stats.map((stat) => {
      const span = document.createElement("span");
      span.textContent = stat;
      return span;
    }),
  );
  elements.dossierDrops.replaceChildren(
    ...mob.drops[state.language].map((drop) => {
      const item = document.createElement("li");
      item.textContent = drop;
      return item;
    }),
  );
}

function openDossier(mob, trigger) {
  state.selected = mob;
  state.lastTrigger = trigger;
  populateDossier(mob);
  elements.modal.hidden = false;
  document.body.classList.add("modal-open");
  elements.modalClose.focus();
}

function closeDossier() {
  if (elements.modal.hidden) return;
  elements.modal.hidden = true;
  document.body.classList.remove("modal-open");
  state.selected = null;
  state.lastTrigger?.focus();
}

elements.search.addEventListener("input", (event) => {
  state.query = event.currentTarget.value;
  renderBestiary();
});

elements.filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.filter = button.dataset.filter;
    elements.filterButtons.forEach((entry) => {
      const active = entry === button;
      entry.classList.toggle("active", active);
      entry.setAttribute("aria-pressed", String(active));
    });
    renderBestiary();
  });
});

elements.languageButton.addEventListener("click", () => {
  state.language = state.language === "pt" ? "en" : "pt";
  updateLanguage();
});

elements.modalClose.addEventListener("click", closeDossier);
elements.modalCloseButton.addEventListener("click", closeDossier);
elements.modal.addEventListener("click", (event) => {
  if (event.target === elements.modal) closeDossier();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDossier();
});

elements.filterButtons[0].setAttribute("aria-pressed", "true");
updateLanguage();
