"use strict";

(function initializeAlmanac() {
  const data = window.WarSpawnAlmanacData;
  const craftingCatalog = window.WarSpawnCraftingCatalog;
  const foodCatalog = window.WarSpawnCatalog;
  const root = document.querySelector("#almanac-explorer");
  const grid = document.querySelector("#almanac-grid");
  const search = document.querySelector("#almanac-search");
  const typeFilter = document.querySelector("#almanac-type");
  const familyFilter = document.querySelector("#almanac-family");
  const statusFilter = document.querySelector("#almanac-status");
  const sort = document.querySelector("#almanac-sort");
  const count = document.querySelector("#almanac-count");
  const empty = document.querySelector("#almanac-empty");
  const detail = document.querySelector("#almanac-detail");
  const detailContent = document.querySelector("#almanac-detail-content");
  const showcase = document.querySelector("#hero-almanac-showcase");
  if (!data || !craftingCatalog || !foodCatalog || !root || !grid || !search || !detail) return;

  const copy = {
    pt: {
      kicker: "05 — ITENS / BLOCOS",
      title: "Almanaque geral do WarSpawn",
      lead: "Explore equipamentos, materiais, comidas, componentes e blocos conhecidos pelo projeto em um único índice.",
      searchLabel: "Pesquisar",
      typeLabel: "Tipo",
      familyLabel: "Família",
      statusLabel: "Status",
      sortLabel: "Ordenar",
      legendComplete: "Menu e receita",
      legendPartial: "Documentação parcial",
      legendUndocumented: "Ainda não documentado",
      search: "Buscar por nome, ID, família ou tag...",
      all: "Todos",
      allFamilies: "Todas as famílias",
      types: { all: "Todos", item: "Itens", block: "Blocos" },
      statuses: { all: "Todos", complete: "Completo", partial: "Parcial", undocumented: "Sem documentação" },
      sorts: { family: "Padrão / Famílias", az: "A–Z", za: "Z–A", complete: "Completos primeiro", pending: "Pendentes primeiro" },
      results: (value) => `${value} ${value === 1 ? "entrada" : "entradas"}`,
      noResults: "Nenhum item ou bloco corresponde aos filtros.",
      open: "Abrir ficha de",
      item: "Item",
      block: "Bloco",
      related: "Itens relacionados",
      recipe: "Receita",
      usedIn: "Usado em",
      close: "Fechar ficha",
      back: "Voltar",
      source: "Almanaque WarSpawn",
      status: { complete: "Menu e receita disponíveis", partial: "Documentação parcial", undocumented: "Ainda não documentado" },
      showcase: "Abrir o Almanaque de Itens e Blocos",
      filtersLabel: "Filtros do Almanaque",
      legendLabel: "Legenda do status de documentação",
      dialogLabel: "Ficha do Almanaque",
      homeKicker: "05 — ITENS / BLOCOS", homeTitle: "Explore o Almanaque WarSpawn", homeLead: "Materiais, equipamentos, comidas e blocos em um índice vivo do projeto.", homeCta: "Clique para abrir o Almanaque completo →", explorerClose: "Fechar Almanaque",
    },
    en: {
      kicker: "05 — ITEMS / BLOCKS",
      title: "The complete WarSpawn almanac",
      lead: "Explore equipment, materials, food, components and blocks known to the project in one index.",
      searchLabel: "Search",
      typeLabel: "Type",
      familyLabel: "Family",
      statusLabel: "Status",
      sortLabel: "Sort",
      legendComplete: "Menu and recipe",
      legendPartial: "Partial documentation",
      legendUndocumented: "Not documented yet",
      search: "Search by name, ID, family or tag...",
      all: "All",
      allFamilies: "All families",
      types: { all: "All", item: "Items", block: "Blocks" },
      statuses: { all: "All", complete: "Complete", partial: "Partial", undocumented: "Undocumented" },
      sorts: { family: "Default / Families", az: "A–Z", za: "Z–A", complete: "Complete first", pending: "Pending first" },
      results: (value) => `${value} ${value === 1 ? "entry" : "entries"}`,
      noResults: "No item or block matches the filters.",
      open: "Open file for",
      item: "Item",
      block: "Block",
      related: "Related items",
      recipe: "Recipe",
      usedIn: "Used in",
      close: "Close file",
      back: "Back",
      source: "WarSpawn Almanac",
      status: { complete: "Menu and recipe available", partial: "Partial documentation", undocumented: "Not documented yet" },
      showcase: "Open the Items and Blocks Almanac",
      filtersLabel: "Almanac filters",
      legendLabel: "Documentation status legend",
      dialogLabel: "Almanac item file",
      homeKicker: "05 — ITEMS / BLOCKS", homeTitle: "Explore the WarSpawn Almanac", homeLead: "Materials, equipment, food and blocks in a living project index.", homeCta: "Click to open the complete Almanac →", explorerClose: "Close Almanac",
    },
  };
  const state = {
    language: document.documentElement.lang.startsWith("en") ? "en" : "pt",
    query: "",
    type: "all",
    family: "all",
    status: "all",
    sort: "family",
    detailItemId: null,
    previousFocus: null,
    history: [{ view: "catalog", scroll: 0 }],
  };
  const foodById = new Map(foodCatalog.items.map((item) => [item.id, item]));
  const statusRank = { complete: 0, partial: 1, undocumented: 2 };

  function t() {
    return copy[state.language];
  }

  function local(value) {
    return value?.[state.language] || value?.pt || value?.en || "";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase(state.language === "pt" ? "pt-BR" : "en-US")
      .trim();
  }

  function imageFor(item) {
    return window.WarSpawnFoodAssets?.[item?.image] || item?.image || "";
  }

  function family(entry) {
    return data.familyById.get(entry.family);
  }

  function searchable(entry) {
    return normalize([
      entry.id,
      local(entry.item.name),
      entry.item.name?.pt,
      entry.item.name?.en,
      local(family(entry)?.name),
      ...entry.tags,
    ].join(" "));
  }

  function visibleEntries() {
    const query = normalize(state.query);
    const result = data.entries.filter((entry) =>
      (!query || searchable(entry).includes(query))
      && (state.type === "all" || entry.type === state.type)
      && (state.family === "all" || entry.family === state.family)
      && (state.status === "all" || entry.status === state.status));
    const name = (entry) => local(entry.item.name) || entry.id;
    const familyOrder = (entry) => family(entry)?.order ?? 999;
    result.sort((a, b) => {
      if (state.sort === "az") return name(a).localeCompare(name(b), state.language);
      if (state.sort === "za") return name(b).localeCompare(name(a), state.language);
      if (state.sort === "complete") return statusRank[a.status] - statusRank[b.status] || name(a).localeCompare(name(b), state.language);
      if (state.sort === "pending") return statusRank[b.status] - statusRank[a.status] || name(a).localeCompare(name(b), state.language);
      return (a.type === b.type ? 0 : a.type === "item" ? -1 : 1)
        || familyOrder(a) - familyOrder(b)
        || name(a).localeCompare(name(b), state.language);
    });
    return result;
  }

  function cardMarkup(entry) {
    const name = local(entry.item.name) || entry.id;
    return `
      <button class="almanac-card" type="button" data-almanac-id="${escapeHtml(entry.id)}" data-status="${entry.status}" aria-label="${escapeHtml(`${t().open} ${name}. ${t().status[entry.status]}`)}">
        <span class="almanac-card-art"><img src="${escapeHtml(entry.image)}" alt="" loading="lazy" decoding="async"></span>
        <span class="almanac-card-copy">
          <strong>${escapeHtml(name)}</strong>
          <small>${escapeHtml(local(family(entry)?.name))}</small>
        </span>
        <i class="almanac-card-status" aria-hidden="true"></i>
      </button>`;
  }

  function renderGrid() {
    const entries = visibleEntries();
    grid.innerHTML = entries.map(cardMarkup).join("");
    count.textContent = t().results(entries.length);
    empty.textContent = t().noResults;
    empty.hidden = entries.length > 0;
  }

  function updateControls() {
    document.querySelectorAll("[data-almanac-copy]").forEach((element) => {
      const key = element.dataset.almanacCopy;
      if (t()[key]) element.textContent = t()[key];
    });
    search.placeholder = t().search;
    search.setAttribute("aria-label", t().search);
    [...typeFilter.options].forEach((option) => { option.textContent = t().types[option.value]; });
    [...statusFilter.options].forEach((option) => { option.textContent = t().statuses[option.value]; });
    [...sort.options].forEach((option) => { option.textContent = t().sorts[option.value]; });
    const selected = familyFilter.value || "all";
    const usedFamilies = [...new Set(data.entries.map((entry) => entry.family))]
      .map((id) => data.familyById.get(id))
      .filter(Boolean)
      .sort((a, b) => a.order - b.order);
    familyFilter.innerHTML = `<option value="all">${escapeHtml(t().allFamilies)}</option>${usedFamilies.map((entry) => `<option value="${entry.id}">${escapeHtml(local(entry.name))}</option>`).join("")}`;
    familyFilter.value = usedFamilies.some((entry) => entry.id === selected) ? selected : "all";
    state.family = familyFilter.value;
    if (showcase) showcase.setAttribute("aria-label", t().showcase);
    root.querySelector("[data-almanac-explorer-close]")?.setAttribute("aria-label", t().explorerClose);
    root.querySelector(".almanac-toolbar")?.setAttribute("aria-label", t().filtersLabel);
    root.querySelector(".almanac-legend")?.setAttribute("aria-label", t().legendLabel);
    detail.setAttribute("aria-label", t().dialogLabel);
    detail.querySelector("[data-almanac-close]")?.setAttribute("aria-label", t().close);
    detail.querySelector("[data-almanac-back]")?.setAttribute("aria-label", t().back);
  }

  function lookupItem(itemId) {
    return data.getEntry(itemId)?.item
      || craftingCatalog.registry.getItem(itemId)
      || foodById.get(itemId)
      || null;
  }

  function itemContext(itemId) {
    const entry = data.getEntry(itemId);
    const item = entry?.item || lookupItem(itemId);
    if (!item) return null;
    const armorEntry = window.WarSpawnArmorCatalog?.sets
      .flatMap((set) => [...set.pieces, ...set.relatedItems])
      .find((candidate) => candidate.id === itemId);
    const foodEntry = foodById.get(itemId);
    return { item, entry, armorEntry, foodEntry };
  }

  function recipeMarkup(recipe) {
    const cells = recipe.station === "furnace"
      ? [recipe.ingredient, null, null, null, null, null, null, null, null]
      : Array.from({ length: 9 }, (_, index) => recipe.grid?.[index] ?? null);
    const slots = cells.map((itemId) => {
      if (!itemId) return `<span class="almanac-recipe-slot" aria-hidden="true"></span>`;
      const item = lookupItem(itemId);
      if (!item) return `<span class="almanac-recipe-slot"></span>`;
      const name = local(item.name) || itemId;
      return `<button class="almanac-recipe-slot" type="button" data-almanac-open="${escapeHtml(itemId)}" aria-label="${escapeHtml(name)}"><img src="${escapeHtml(imageFor(item))}" alt="" loading="lazy" decoding="async"></button>`;
    }).join("");
    const output = lookupItem(recipe.result.item);
    const outputName = local(output?.name) || recipe.result.item;
    return `<article class="almanac-recipe-card"><div class="almanac-recipe-grid">${slots}</div><span class="almanac-recipe-arrow" aria-hidden="true">→</span><button class="almanac-recipe-output" type="button" data-almanac-open="${escapeHtml(recipe.result.item)}"><img src="${escapeHtml(imageFor(output))}" alt="" loading="lazy" decoding="async"><strong>${escapeHtml(outputName)}</strong>${recipe.result.count > 1 ? `<small>×${recipe.result.count}</small>` : ""}</button></article>`;
  }

  function relatedMarkup(entries) {
    if (!entries.length) return "";
    return `<section class="almanac-detail-section"><h3>${escapeHtml(t().related)}</h3><div class="almanac-related-grid">${entries.map((entry) => `<button type="button" data-almanac-open="${escapeHtml(entry.id)}"><img src="${escapeHtml(entry.image)}" alt="" loading="lazy" decoding="async"><span>${escapeHtml(local(entry.item.name))}</span></button>`).join("")}</div></section>`;
  }

  function recipeSection(title, recipes) {
    if (!recipes.length) return "";
    return `<section class="almanac-detail-section"><h3>${escapeHtml(title)}</h3><div class="almanac-recipe-list">${recipes.map(recipeMarkup).join("")}</div></section>`;
  }

  function propertiesMarkup(context) {
    const { item, entry, armorEntry, foodEntry } = context;
    const values = [];
    if (entry) values.push([t().item, entry.type === "block" ? t().block : t().item]);
    if (entry?.family) values.push([t().familyLabel, local(family(entry)?.name)]);
    if (item.description) values.push(["Descrição", local(item.description)]);
    if (foodEntry?.food) {
      values.push(["Nutrição", String(foodEntry.food.nutrition)]);
      if (foodEntry.food.saturationModifier != null) values.push(["Saturação", String(foodEntry.food.saturationModifier)]);
      (foodEntry.food.effects ?? []).forEach((effect) => values.push(["Efeito", `${effect.id}${effect.level ? ` ${effect.level}` : ""}`]));
    }
    (armorEntry?.enchantments ?? []).forEach((effect) => values.push(["Encantamento", `${local(effect.name) || effect.id}${effect.level ? ` ${effect.level}` : ""}`]));
    if (!values.length) return "";
    return `<section class="almanac-detail-section almanac-properties"><h3>Identidade / propriedades</h3><dl>${values.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl></section>`;
  }

  function showAlmanacDetail(itemId, { pushHistory = true } = {}) {
    const context = itemContext(itemId);
    if (!context) return;
    const { item, entry } = context;
    if (detail.hidden) {
      state.previousFocus = document.activeElement;
      state.history[0].scroll = root.scrollTop;
    }
    state.detailItemId = itemId;
    const itemName = local(item.name) || item.id;
    const related = entry ? data.getRelated(itemId, 10) : [];
    const obtaining = data.getRecipesFor(itemId);
    const uses = data.getPublicUses(itemId);
    const status = entry?.status || "partial";
    const kind = entry?.type || (item.category === "block" ? "block" : "item");
    detailContent.innerHTML = `
      <header class="almanac-detail-hero" data-status="${status}">
        <div class="almanac-detail-art"><img src="${escapeHtml(imageFor(item))}" alt="${escapeHtml(itemName)}" decoding="async"></div>
        <div><span class="kicker">${escapeHtml(t().source)} • ${escapeHtml(kind === "block" ? t().block : t().item)}</span><h2>${escapeHtml(itemName)}</h2><p>${escapeHtml(entry ? local(family(entry)?.name) : item.id)}</p><span class="almanac-detail-status">${escapeHtml(entry ? t().status[status] : t().status.partial)}</span></div>
      </header>
      ${propertiesMarkup(context)}
      ${relatedMarkup(related)}
      ${recipeSection(t().recipe, obtaining)}
      ${recipeSection(t().usedIn, uses)}
    `;
    detail.hidden = false;
    document.body.classList.add("almanac-detail-open");
    if (pushHistory) state.history.push({ view: "item", itemId });
    requestAnimationFrame(() => detail.querySelector(".almanac-detail-close")?.focus({ preventScroll: true }));
  }

  function closeGenericDetail({ fromHistory = false } = {}) {
    if (detail.hidden) return;
    detail.hidden = true;
    document.body.classList.remove("almanac-detail-open");
    state.detailItemId = null;
    if (!fromHistory) { state.history = [{ view: "catalog", scroll: root.scrollTop }]; }
    state.previousFocus?.focus?.({ preventScroll: true });
  }

  function openItem(itemId) {
    showAlmanacDetail(itemId);
  }

  function goBackInAlmanac() {
    if (state.history.length <= 1) return;
    state.history.pop();
    const previous = state.history.at(-1);
    if (previous.view === "catalog") {
      detail.hidden = true;
      document.body.classList.remove("almanac-detail-open");
      requestAnimationFrame(() => { root.scrollTop = previous.scroll || 0; search.focus({ preventScroll: true }); });
      return;
    }
    showAlmanacDetail(previous.itemId, { pushHistory: false });
  }

  function openExplorer({ pushHistory = true } = {}) {
    if (root.hidden) {
      state.previousFocus = document.activeElement;
      root.hidden = false;
      document.body.classList.add("almanac-explorer-open");
      if (pushHistory) history.pushState({ kind: "almanac-explorer" }, "", "#itens-blocos");
      requestAnimationFrame(() => search.focus({ preventScroll: true }));
    }
  }

  function closeExplorer({ fromHistory = false } = {}) {
    if (root.hidden) return;
    if (!detail.hidden) closeGenericDetail({ fromHistory: true });
    root.hidden = true;
    document.body.classList.remove("almanac-explorer-open");
    state.previousFocus?.focus?.({ preventScroll: true });
    if (!fromHistory && history.state?.kind === "almanac-explorer") history.back();
  }

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  }

  function renderShowcase() {
    if (!showcase) return;
    const columns = Array.from({ length: 8 }, () => []);
    const directions = shuffle(["up", "down", "up", "down", "up", "down", "up", "down"]);
    shuffle(data.entries).forEach((entry, index) => columns[index % columns.length].push(entry));
    showcase.innerHTML = columns.map((column, index) => {
      const direction = directions[index];
      const duration = 30 + Math.random() * 12;
      const sequence = column.map((entry) => `<span class="hero-almanac-item"><img src="${escapeHtml(entry.image)}" alt="" loading="lazy" decoding="async"></span>`).join("");
      return `<span class="hero-almanac-column" data-direction="${direction}" style="--column-duration:${duration.toFixed(2)}s;--column-delay:-${(Math.random() * duration).toFixed(2)}s" data-column="${index + 1}"><span class="hero-almanac-track"><span class="hero-almanac-sequence">${sequence}</span><span class="hero-almanac-sequence" aria-hidden="true">${sequence}</span></span></span>`;
    }).join("");
  }

  grid.addEventListener("click", (event) => {
    const control = event.target.closest("[data-almanac-id]");
    if (control) openItem(control.dataset.almanacId);
  });
  showcase?.addEventListener("click", (event) => { event.preventDefault(); openExplorer(); });
  document.querySelector('a[href="#itens-blocos"]:not(#hero-almanac-showcase)')?.addEventListener("click", (event) => { event.preventDefault(); openExplorer(); });
  root.querySelector("[data-almanac-explorer-close]")?.addEventListener("click", () => closeExplorer());
  root.addEventListener("input", (event) => {
    if (event.target === search) { state.query = search.value; renderGrid(); }
  });
  [typeFilter, familyFilter, statusFilter, sort].forEach((control) => {
    control.addEventListener("change", () => {
      state.type = typeFilter.value;
      state.family = familyFilter.value;
      state.status = statusFilter.value;
      state.sort = sort.value;
      renderGrid();
    });
  });
  detail.addEventListener("click", (event) => {
    if (event.target.closest("[data-almanac-back]")) { goBackInAlmanac(); return; }
    if (event.target === detail || event.target.closest("[data-almanac-close]")) { closeGenericDetail(); return; }
    const control = event.target.closest("[data-almanac-open]");
    if (control) openItem(control.dataset.almanacOpen);
  });
  detail.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      goBackInAlmanac();
    }
  });
  window.addEventListener("popstate", (event) => {
    if (!detail.hidden) closeGenericDetail({ fromHistory: true });
    if (event.state?.kind === "almanac-explorer") { openExplorer({ pushHistory: false }); return; }
    closeExplorer({ fromHistory: true });
  });
  document.addEventListener("warspawn:languagechange", (event) => {
    state.language = event.detail.language;
    updateControls();
    renderGrid();
    if (!detail.hidden && state.detailItemId) showAlmanacDetail(state.detailItemId, { pushHistory: false });
  });

  updateControls();
  renderGrid();
  renderShowcase();
  if (location.hash === "#itens-blocos") openExplorer({ pushHistory: false });
  window.WarSpawnAlmanacUI = Object.freeze({ openItem, openExplorer, render: renderGrid });
})();
