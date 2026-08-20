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
    navFood: "Comidas",
    navGallery: "Galeria",
    navSocial: "Redes sociais",
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
      "WarSpawn adiciona seis novas dimensões ao jogo. Cada uma possui identidade própria e uma progressão conectada aos itens, criaturas e chefes do mod.",
    redAnt: "Portal: Formiga vermelha",
    brownAnt: "Portal: Formiga marrom",
    mining: "Dimensão da Mineração",
    miningText:
      "Uma inundação de minérios, dezenas de masmorras e chefes escondidos por todos os lados.",
    utopia: "Utopia",
    utopiaText:
      "Florestas exuberantes, árvores gigantes e criaturas fantásticas em um mundo de escala colossal.",
    arsenalKicker: "03 — ARSENAL",
    arsenal: "Quatorze caminhos para sobreviver ao impossível",
    arsenalText:
      "Entre no arsenal completo, percorra a roda de conjuntos e abra a ficha de cada armadura, peça e equipamento relacionado.",
    armorShowcaseAlt: "As quatorze armaduras do WarSpawn reunidas",
    armorShowcaseEyebrow: "14 CONJUNTOS • SELETOR CIRCULAR",
    armorShowcaseAction: "Abrir arquivo de armaduras",
    foodKicker: "04 — COMIDAS & EFEITOS",
    foods: "Um banquete para cada expedição",
    foodsLead:
      "Explore alimentos, ingredientes, receitas interativas, restauração de fome, saturação e efeitos especiais em um único catálogo.",
    foodStatus: "CATÁLOGO EM PREPARAÇÃO",
    foodIngredients: "Ingredientes",
    foodIngredientsText:
      "Descubra onde encontrar cada ingrediente e quais criaturas ou dimensões fazem parte da receita.",
    foodRecipes: "Receitas",
    foodRecipesText:
      "Consulte combinações, estações de criação e o caminho completo até cada prato.",
    foodEffects: "Efeitos",
    foodEffectsText:
      "Compare fome, saturação e bônus temporários antes de partir para a próxima batalha.",
    galleryKicker: "05 — GALERIA",
    gallery: "Arquivos do WarSpawn",
    galleryProjectiles: "Projéteis 3D",
    galleryWeapons: "Armas destruidoras",
    galleryStaff: "Cajado de Raios",
    galleryLegacy: "Antigo e novo",
    gallerySwords: "Big Bertha, Slice e Royal Guardian",
    socialKicker: "06 — COMUNIDADE",
    socialTitle: "Acompanhe o despertar do WarSpawn.",
    socialLead:
      "Novidades, bastidores, vídeos e conversas da comunidade em todos os canais oficiais. Escolha sua rede e entre no universo WarSpawn.",
    socialOpen: "Visitar perfil",
    socialJoin: "Entrar no servidor",
    socialDiscordCommunity: "Comunidade WarSpawn",
    socialQrKicker: "ACESSO RÁPIDO",
    socialQrTitle: "Leve o Instagram para o celular.",
    socialQrText:
      "Escaneie o código ou toque nele para abrir o perfil oficial do WarSpawn.",
    openInstagram: "Abrir o perfil do WarSpawn no Instagram",
    openYouTube: "Abrir o canal do WarSpawn no YouTube",
    openTikTok: "Abrir o perfil do WarSpawn no TikTok",
    openReddit: "Abrir a comunidade do WarSpawn no Reddit",
    openDiscord: "Entrar no servidor do WarSpawn no Discord",
    openFacebook: "Abrir a página do WarSpawn no Facebook",
    openX: "Abrir o perfil do WarSpawn no X",
    openInstagramQr: "Abrir o Instagram do WarSpawn pelo QR code",
    footerSocialsLabel: "Principais redes sociais do WarSpawn",
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
    navFood: "Food",
    navGallery: "Gallery",
    navSocial: "Social",
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
      "WarSpawn adds six new dimensions to the game. Each has its own identity and progression connected to the mod's items, creatures and bosses.",
    redAnt: "Portal: Red Ant",
    brownAnt: "Portal: Brown Ant",
    mining: "Mining Dimension",
    miningText:
      "A flood of ores, dozens of dungeons and hidden bosses in every direction.",
    utopia: "Utopia",
    utopiaText:
      "Lush forests, giant trees and fantastic creatures in a world built at colossal scale.",
    arsenalKicker: "03 — ARSENAL",
    arsenal: "Fourteen ways to survive the impossible",
    arsenalText:
      "Enter the complete arsenal, move through the set wheel and open the dossier for every armor, piece and related item.",
    armorShowcaseAlt: "All fourteen WarSpawn armor sets gathered together",
    armorShowcaseEyebrow: "14 SETS • CIRCULAR SELECTOR",
    armorShowcaseAction: "Open armor archive",
    foodKicker: "04 — FOOD & EFFECTS",
    foods: "A feast for every expedition",
    foodsLead:
      "Explore food, ingredients, interactive recipes, hunger restoration, saturation and special effects in one catalog.",
    foodStatus: "CATALOG IN PREPARATION",
    foodIngredients: "Ingredients",
    foodIngredientsText:
      "Discover where to find each ingredient and which creatures or dimensions are part of the recipe.",
    foodRecipes: "Recipes",
    foodRecipesText:
      "Check combinations, crafting stations and the complete path to every dish.",
    foodEffects: "Effects",
    foodEffectsText:
      "Compare hunger, saturation and temporary bonuses before heading into the next battle.",
    galleryKicker: "05 — GALLERY",
    gallery: "WarSpawn archives",
    galleryProjectiles: "3D projectiles",
    galleryWeapons: "Destructive weapons",
    galleryStaff: "Thunder Staff",
    galleryLegacy: "Legacy and remake",
    gallerySwords: "Big Bertha, Slice and Royal Guardian",
    socialKicker: "06 — COMMUNITY",
    socialTitle: "Follow the awakening of WarSpawn.",
    socialLead:
      "News, behind-the-scenes updates, videos and community conversations across every official channel. Choose your network and enter the WarSpawn universe.",
    socialOpen: "Visit profile",
    socialJoin: "Join the server",
    socialDiscordCommunity: "WarSpawn Community",
    socialQrKicker: "QUICK ACCESS",
    socialQrTitle: "Take Instagram to your phone.",
    socialQrText:
      "Scan the code or tap it to open WarSpawn's official profile.",
    openInstagram: "Open WarSpawn's Instagram profile",
    openYouTube: "Open WarSpawn's YouTube channel",
    openTikTok: "Open WarSpawn's TikTok profile",
    openReddit: "Open the WarSpawn Reddit community",
    openDiscord: "Join the WarSpawn Discord server",
    openFacebook: "Open WarSpawn's Facebook page",
    openX: "Open WarSpawn's X profile",
    openInstagramQr: "Open WarSpawn's Instagram through the QR code",
    footerSocialsLabel: "WarSpawn's main social networks",
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
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (t[key]) element.setAttribute("aria-label", t[key]);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const key = element.dataset.i18nAlt;
    if (t[key]) element.setAttribute("alt", t[key]);
  });
  elements.search.placeholder = t.search;
  elements.search.setAttribute("aria-label", t.search);
  elements.languageButton.textContent = state.language === "pt" ? "EN" : "PT";
  elements.languageButton.setAttribute("aria-label", t.switchLanguage);
  elements.modalClose.setAttribute("aria-label", t.closeLabel);
  localStorage.setItem("warspawn-language", state.language);
  document.dispatchEvent(
    new CustomEvent("warspawn:languagechange", {
      detail: { language: state.language },
    }),
  );
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
