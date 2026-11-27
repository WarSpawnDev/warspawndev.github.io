"use strict";

(function initializeSiteNavigation() {
  const searchToggle = document.querySelector("#site-search-toggle");
  const generalToggle = document.querySelector("#general-toggle");
  const search = document.querySelector("#site-search");
  const general = document.querySelector("#general-links");
  const input = document.querySelector("#site-search-input");
  const results = document.querySelector("#site-search-results");
  const status = document.querySelector("#site-search-status");
  const more = document.querySelector("#site-search-more");
  const pageSize = 8;
  let index;
  let ranked = [];
  let rendered = 0;

  const copy = {
    pt: { search: "Pesquisar no WarSpawn", placeholder: "Buscar itens, criaturas e seções…", empty: "Nenhum resultado.", count: (n) => `${n} ${n === 1 ? "resultado" : "resultados"}`, more: "Mostrar mais", restart: "Voltar ao início", section: "Seção", item: "Item", block: "Bloco", food: "Comida", weapon: "Arma", armor: "Armadura", recipe: "Receita", mob: "Criatura", dimension: "Dimensão", gallery: "Galeria", download: "Download", related: "Relacionado" },
    en: { search: "Search WarSpawn", placeholder: "Find items, creatures and sections…", empty: "No results.", count: (n) => `${n} ${n === 1 ? "result" : "results"}`, more: "Show more", restart: "Back to first results", section: "Section", item: "Item", block: "Block", food: "Food", weapon: "Weapon", armor: "Armor", recipe: "Recipe", mob: "Creature", dimension: "Dimension", gallery: "Gallery", download: "Download", related: "Related" },
  };
  const language = () => document.documentElement.lang === "en" ? "en" : "pt";
  const label = (value) => typeof value === "string" ? value : value?.[language()] || value?.pt || value?.en || "";
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim();
  const variants = (value) => typeof value === "string" ? [value] : [value?.pt, value?.en].filter(Boolean);

  function translationsForNavigation(key) {
    return { pt: translations.pt[key], en: translations.en[key] };
  }

  function buildIndex() {
    const entries = new Map();
    const graph = new Map();
    const almanac = window.WarSpawnAlmanacData;
    const crafting = window.WarSpawnCraftingCatalog?.registry;
    const itemKey = (id) => `item:${id}`;
    const add = (key, name, kind, target, { aliases = [], image } = {}) => {
      const titles = [...new Set(variants(name).map(normalize).filter(Boolean))];
      const terms = [...new Set(aliases.flatMap(variants).map(normalize).filter(Boolean))];
      entries.set(key, { key, name, kind, target, titles, terms, image });
    };
    function relate(left, right) {
      if (left === right || !entries.has(left) || !entries.has(right)) return;
      for (const [key, neighbor] of [[left, right], [right, left]]) {
        if (!graph.has(key)) graph.set(key, new Set());
        graph.get(key).add(neighbor);
      }
    }

    document.querySelectorAll(".site-header nav a[data-i18n]").forEach((link) => {
      const href = link.getAttribute("href");
      const name = translationsForNavigation(link.dataset.i18n);
      const heading = document.querySelector(`${href} h1, ${href} h2`);
      const headingName = heading?.dataset.i18n ? translationsForNavigation(heading.dataset.i18n) : heading?.textContent.trim();
      add(`section:${href}`, name, "section", href === "#itens-blocos" ? { almanac: true } : { href }, {
        aliases: [href.slice(1), headingName, ...variants(name).map((text) => text.replaceAll("/", ""))],
      });
    });
    add("section:downloads", "Download", "download", { href: "/downloads/" },
      { aliases: ["Downloads", "Baixar", "Versões", "Versions"] });
    add("section:social", translationsForNavigation("navSocial"), "section", { href: "#redes" });
    document.querySelectorAll("#galeria figure[id]").forEach((figure) => {
      const caption = figure.querySelector("figcaption");
      const name = caption.dataset.i18n ? translationsForNavigation(caption.dataset.i18n) : caption.textContent.trim();
      add(figure.id, name, "gallery", { href: `#${figure.id}` });
    });

    const armorSets = window.WarSpawnArmorCatalog?.sets ?? [];
    const armorPieces = new Set(armorSets.flatMap((set) => set.pieces.map((item) => item.id)));
    const foodIds = new Set((window.WarSpawnCatalog?.items ?? []).filter((item) => item.catalog).map((item) => item.id));
    for (const entry of almanac?.entries ?? []) {
      const item = entry.item;
      if (item.hidden) continue;
      const kind = entry.type === "block" ? "block" : foodIds.has(entry.id) ? "food" :
        armorPieces.has(entry.id) ? "armor" : /^(sword|axe|bow|crossbow|weapon)$/.test(item.category) || /squidzooka|ray-gun|launcher|chainsaw|big-bertha|big-hammer/.test(entry.id) ? "weapon" : "item";
      add(itemKey(entry.id), item.name, kind, { item: entry.id, food: kind === "food" }, {
        image: entry.image,
        aliases: [entry.id.replace(/^[^:]+:/, ""), almanac.familyById.get(entry.family)?.name, ...entry.tags],
      });
    }
    for (const id of crafting?.reachable ?? []) {
      const item = crafting.getItem(id);
      if (item?.source === "vanilla" && !entries.has(itemKey(id))) {
        add(itemKey(id), item.name, "item", { craft: id }, { image: item.image });
      }
    }
    for (const set of armorSets) {
      const key = `armor:${set.id}`;
      add(key, set.fullName || set.name, "armor", { armor: set.id }, { aliases: [set.name, set.id] });
      for (const item of [...set.pieces, ...set.relatedItems]) relate(key, itemKey(item.id));
    }
    for (const entry of almanac?.entries ?? []) {
      const key = itemKey(entry.id);
      if (!entries.has(key)) continue;
      const recipes = almanac.getRecipesFor(entry.id);
      if (!recipes.length) continue;
      const name = { pt: `Receita: ${entry.item.name.pt}`, en: `Recipe: ${entry.item.name.en || entry.item.name.pt}` };
      const recipeKey = `recipe:${entry.id}`;
      add(recipeKey, name, "recipe", { recipe: entry.id }, {
        image: entry.image,
        aliases: [`Receita de ${entry.item.name.pt}`, `${entry.item.name.en || entry.item.name.pt} recipe`],
      });
      relate(key, recipeKey);
      for (const recipe of recipes) {
        for (const ingredient of crafting.ingredientIds(recipe)) {
          relate(recipeKey, itemKey(ingredient));
          relate(key, itemKey(ingredient));
        }
      }
    }
    const itemsByTitle = new Map();
    for (const entry of entries.values()) {
      if (!entry.target.item && !entry.target.craft) continue;
      for (const title of entry.titles) {
        if (!itemsByTitle.has(title)) itemsByTitle.set(title, []);
        itemsByTitle.get(title).push(entry.key);
      }
    }
    for (const mob of window.WarSpawnBestiaryUI?.entries ?? []) {
      const key = `mob:${mob.slug}`;
      const drops = [...(mob.drops.pt ?? []), ...(mob.drops.en ?? [])];
      add(key, mob.name, "mob", { mob: mob.slug }, { aliases: [mob.slug, ...drops] });
      for (const drop of drops) {
        for (const item of itemsByTitle.get(normalize(drop)) ?? []) relate(key, item);
      }
    }
    for (const dimension of window.WarSpawnDimensions?.entries ?? []) {
      const key = `dimension:${dimension.slug}`;
      add(key, dimension.name, "dimension", { dimension: dimension.slug }, { aliases: [dimension.slug, dimension.portal?.name] });
      const content = dimension.content;
      for (const id of [...content.items, ...content.crafts]) relate(key, itemKey(id));
      for (const slug of [...content.mobs, ...content.bosses]) relate(key, `mob:${slug}`);
      for (const id of content.recipes) {
        const item = crafting.getRecipe(id)?.result.item ?? id;
        relate(key, `recipe:${item}`);
      }
    }
    return { entries, graph };
  }

  function textScore(query, value, alias) {
    if (query === value) return alias ? 780 : 1000;
    if (value.startsWith(query)) return (alias ? 660 : 850) - Math.min(value.length - query.length, 40);
    if (value.includes(query)) return (alias ? 590 : 760) - Math.min(value.length - query.length, 40);
    if (query.length < 4) return 0;
    const maxDistance = query.length < 7 ? 1 : 2;
    let best = 0;
    for (const word of new Set([value, ...value.split(" ")])) {
      if (Math.abs(word.length - query.length) > maxDistance) continue;
      const distance = window.WarSpawnArmorUI.editDistance(query, word);
      if (distance <= maxDistance) best = Math.max(best, (alias ? 505 : 695) - 35 * distance);
    }
    return best;
  }

  function match(query) {
    const { entries, graph } = index ??= buildIndex();
    const scores = new Map();
    for (const entry of entries.values()) {
      const score = Math.max(0, ...entry.titles.map((v) => textScore(query, v, false)),
        ...entry.terms.map((v) => textScore(query, v, true)));
      if (score) scores.set(entry.key, score);
    }
    for (const [key, score] of [...scores]) {
      if (score < 650) continue;
      for (const neighbor of graph.get(key) ?? []) {
        scores.set(neighbor, Math.max(scores.get(neighbor) ?? 0, 300 + score / 10));
      }
    }
    return [...scores].map(([key, score]) => ({ ...entries.get(key), score }))
      .sort((a, b) => b.score - a.score || label(a.name).localeCompare(label(b.name), language()));
  }

  function navigate(target) {
    searchToggle.focus({ preventScroll: true });
    setSearch(false);
    if (target.almanac) window.WarSpawnAlmanacUI?.openExplorer();
    else if (target.recipe) window.WarSpawnAlmanacUI?.openRecipe(target.recipe);
    else if (target.mob) window.WarSpawnBestiaryUI?.open(target.mob, searchToggle);
    else if (target.dimension) window.WarSpawnDimensionUI?.open(target.dimension);
    else if (target.armor) window.WarSpawnArmorUI?.openSet(target.armor);
    else if (target.craft) window.WarSpawnArmorUI?.openCraftItem(target.craft);
    else if (target.food) window.WarSpawnFoodUI?.openItem(target.item);
    else if (!window.WarSpawnArmorUI?.openItem(target.item)) window.WarSpawnAlmanacUI?.openItem(target.item);
  }

  function makeResult(entry) {
    const t = copy[language()];
    const li = document.createElement("li");
    const control = document.createElement(entry.target.href ? "a" : "button");
    control.className = "site-search-result";
    if (entry.target.href) {
      control.href = entry.target.href;
      control.addEventListener("click", () => setSearch(false, true));
    } else {
      control.type = "button";
      control.addEventListener("click", () => navigate(entry.target));
    }
    if (entry.image) {
      const image = document.createElement("img");
      image.src = entry.image;
      image.alt = "";
      image.width = image.height = 32;
      image.decoding = "async";
      image.addEventListener("error", () => image.remove(), { once: true });
      control.append(image);
    }
    const caption = document.createElement("span");
    caption.textContent = label(entry.name);
    const kind = document.createElement("small");
    kind.textContent = t[entry.kind] + (entry.score < 500 ? ` · ${t.related}` : "");
    caption.append(kind);
    control.append(caption);
    li.append(control);
    return li;
  }

  function showNextPage() {
    const next = ranked.slice(rendered, rendered + pageSize);
    const nodes = next.map(makeResult);
    results.replaceChildren(...nodes);
    const start = rendered + 1;
    rendered += next.length;
    status.textContent = next.length ? `${start}–${rendered} · ${copy[language()].count(ranked.length)}` : status.textContent;
    more.hidden = ranked.length <= pageSize;
    more.textContent = copy[language()][rendered >= ranked.length ? "restart" : "more"];
  }

  function refresh() {
    const t = copy[language()];
    input.placeholder = t.placeholder;
    input.setAttribute("aria-label", t.search);
    const query = normalize(input.value);
    ranked = query ? match(query) : [];
    rendered = 0;
    status.textContent = query && !ranked.length ? t.empty : "";
    showNextPage();
  }

  function setGeneral(open) {
    general.hidden = !open;
    generalToggle.setAttribute("aria-expanded", String(open));
  }

  function setSearch(open, restoreFocus = false) {
    search.hidden = !open;
    searchToggle.setAttribute("aria-expanded", String(open));
    if (open) {
      refresh();
      input.focus();
    } else if (restoreFocus) {
      searchToggle.focus({ preventScroll: true });
    }
  }

  searchToggle.addEventListener("click", () => {
    setGeneral(false);
    setSearch(search.hidden, true);
  });
  generalToggle.addEventListener("click", () => {
    setSearch(false);
    setGeneral(general.hidden);
  });
  general.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setGeneral(false);
      generalToggle.focus({ preventScroll: true });
    }
  });
  input.addEventListener("input", refresh);
  more.addEventListener("click", () => {
    if (rendered >= ranked.length) rendered = 0;
    showNextPage();
    results.querySelector("a, button")?.focus();
  });

  document.addEventListener("pointerdown", (event) => {
    if (!search.hidden && !event.target.closest("#site-search, #site-search-toggle")) setSearch(false);
    if (!general.hidden && !event.target.closest(".nav-general")) setGeneral(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || (search.hidden && general.hidden)) return;
    event.preventDefault();
    event.stopPropagation();
    if (!search.hidden) setSearch(false, true);
    if (!general.hidden) {
      setGeneral(false);
      generalToggle.focus({ preventScroll: true });
    }
  }, true);
  search.addEventListener("keydown", (event) => {
    const controls = [input, ...results.querySelectorAll("a, button"), ...(!more.hidden ? [more] : [])];
    const current = controls.indexOf(document.activeElement);
    if (event.target === input && event.key === "Enter" && ranked.length) {
      event.preventDefault();
      controls[1].click();
    } else if (["ArrowDown", "ArrowUp"].includes(event.key) && current >= 0) {
      event.preventDefault();
      controls[(current + (event.key === "ArrowDown" ? 1 : controls.length - 1)) % controls.length].focus();
    }
  });
  document.addEventListener("warspawn:languagechange", () => { if (!search.hidden) refresh(); });
})();
