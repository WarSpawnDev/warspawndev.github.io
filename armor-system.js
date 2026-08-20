"use strict";

(function initializeArmorSystem() {
  const catalog = window.WarSpawnArmorCatalog;
  const explorer = document.querySelector("#armor-explorer");
  const openButton = document.querySelector("#armor-explorer-open");
  const closeButton = document.querySelector("#armor-explorer-close");
  const selectorView = document.querySelector("#armor-selector-view");
  const detailView = document.querySelector("#armor-detail-view");
  const carousel = document.querySelector("#armor-carousel");
  const stage = document.querySelector("#armor-carousel-stage");
  const previousButton = document.querySelector("#armor-carousel-prev");
  const nextButton = document.querySelector("#armor-carousel-next");
  const openDetailButton = document.querySelector("#armor-open-detail");
  const detailBackButton = document.querySelector("#armor-detail-back");
  const detailIndex = document.querySelector("#armor-detail-index");
  const detailContent = document.querySelector("#armor-detail-content");

  if (
    !catalog?.sets?.length ||
    !explorer ||
    !openButton ||
    !closeButton ||
    !selectorView ||
    !detailView ||
    !carousel ||
    !stage ||
    !previousButton ||
    !nextButton ||
    !openDetailButton ||
    !detailBackButton ||
    !detailIndex ||
    !detailContent
  ) {
    return;
  }

  const setsById = new Map(catalog.sets.map((armorSet) => [armorSet.id, armorSet]));
  const sets = catalog.order.map((id) => setsById.get(id)).filter(Boolean);
  const visibleRadius = 3;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const text = {
    pt: {
      selectorKicker: "ARSENAL WARSPAWN",
      selectorTitle: "Escolha sua armadura",
      selectorHelp:
        "Deslize, use a roda do mouse ou selecione uma silhueta para percorrer os quatorze conjuntos.",
      openDossier: "Abrir ficha completa",
      backToSelector: "Voltar às armaduras",
      close: "Fechar arquivo de armaduras",
      previous: "Armadura anterior",
      next: "Próxima armadura",
      carousel: "Seletor circular de armaduras",
      select: (name) => `Selecionar ${name}`,
      open: (name) => `Abrir ficha de ${name}`,
      setIndex: (position, total) => `Conjunto ${String(position).padStart(2, "0")} de ${total}`,
      gameVersion: "VERSÃO NO JOGO",
      gameAlt: (name) => `${name} em sua versão do Minecraft`,
      totalDefense: "Defesa total",
      catalogOrder: "Ordem do catálogo",
      defensePoints: (value) => `${value} pontos`,
      orderValue: (value) => `Nº ${String(value).padStart(2, "0")}`,
      acquisition: "Obtenção",
      armorPieces: "Peças da armadura",
      historicStats: "ESTATÍSTICAS DE REFERÊNCIA",
      historicalSource: "Abrir fonte histórica ↗",
      defense: "Defesa",
      abilities: "Características do conjunto",
      abilitiesKicker: "IDENTIDADE E HABILIDADES",
      related: "Itens e ferramentas relacionados",
      relatedKicker: "MESMO MATERIAL OU FAMÍLIA",
      noRelated: "Nenhum item adicional foi fornecido para este conjunto.",
      attack: "Ataque",
      utility: "Uso",
      enchantments: "Encantamentos",
      enchantmentsFuture:
        "Estrutura pronta para receber ícones, níveis e descrições dos encantamentos da versão WarSpawn.",
      recipes: "Receitas",
      recipesFuture:
        "O sistema já aceita grades, ingredientes, estações e resultados. As receitas serão conectadas nesta área.",
      futureKicker: "EXTENSÕES PREPARADAS",
      detailLabel: (name) => `Ficha completa de ${name}`,
      category: {
        sword: "Espada",
        axe: "Machado",
        pickaxe: "Picareta",
        shovel: "Pá",
        hoe: "Enxada",
        bow: "Arco",
        arrow: "Projétil",
        rod: "Utilidade",
        staff: "Cajado",
      },
    },
    en: {
      selectorKicker: "WARSPAWN ARSENAL",
      selectorTitle: "Choose your armor",
      selectorHelp:
        "Swipe, use the mouse wheel or select a silhouette to move through all fourteen sets.",
      openDossier: "Open full dossier",
      backToSelector: "Back to armor",
      close: "Close armor archive",
      previous: "Previous armor",
      next: "Next armor",
      carousel: "Circular armor selector",
      select: (name) => `Select ${name}`,
      open: (name) => `Open ${name} dossier`,
      setIndex: (position, total) => `Set ${String(position).padStart(2, "0")} of ${total}`,
      gameVersion: "IN-GAME VERSION",
      gameAlt: (name) => `${name} in its Minecraft version`,
      totalDefense: "Total defense",
      catalogOrder: "Catalog order",
      defensePoints: (value) => `${value} points`,
      orderValue: (value) => `No. ${String(value).padStart(2, "0")}`,
      acquisition: "Acquisition",
      armorPieces: "Armor pieces",
      historicStats: "REFERENCE STATISTICS",
      historicalSource: "Open historical source ↗",
      defense: "Defense",
      abilities: "Set characteristics",
      abilitiesKicker: "IDENTITY AND ABILITIES",
      related: "Related items and tools",
      relatedKicker: "SAME MATERIAL OR FAMILY",
      noRelated: "No additional item was provided for this set.",
      attack: "Attack",
      utility: "Use",
      enchantments: "Enchantments",
      enchantmentsFuture:
        "Ready to receive icons, levels and descriptions for the WarSpawn version's enchantments.",
      recipes: "Recipes",
      recipesFuture:
        "The system already supports grids, ingredients, stations and results. Recipes will be connected here.",
      futureKicker: "EXTENSIONS READY",
      detailLabel: (name) => `Full dossier for ${name}`,
      category: {
        sword: "Sword",
        axe: "Axe",
        pickaxe: "Pickaxe",
        shovel: "Shovel",
        hoe: "Hoe",
        bow: "Bow",
        arrow: "Projectile",
        rod: "Utility",
        staff: "Staff",
      },
    },
  };

  const state = {
    language: localStorage.getItem("warspawn-language") === "en" ? "en" : "pt",
    selectedIndex: 0,
    selectionPosition: 0,
    position: 0,
    targetPosition: 0,
    open: false,
    view: "selector",
    optionElements: [],
    geometryFrame: 0,
    historyFrame: 0,
    motionFrame: 0,
    motionKind: "idle",
    motionTimestamp: 0,
    inertiaVelocity: 0,
    wheelAccumulator: 0,
    pointerId: null,
    pointerStartX: 0,
    pointerStartY: 0,
    pointerLastX: 0,
    pointerLastY: 0,
    pointerLastTime: 0,
    pointerVelocity: 0,
    pointerDragging: false,
    suppressClickUntil: 0,
    previousFocus: null,
    preloaded: false,
  };

  function t() {
    return text[state.language];
  }

  function local(value) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value[state.language] ?? value.pt ?? value.en ?? "";
    }
    return value ?? "";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function wrappedIndex(index) {
    return (index % sets.length + sets.length) % sets.length;
  }

  function selectedSet() {
    return sets[state.selectedIndex];
  }

  function signedOffset(index) {
    let offset = index - state.selectedIndex;
    const half = sets.length / 2;
    if (offset > half) offset -= sets.length;
    if (offset < -half) offset += sets.length;
    return offset;
  }

  function slotClass(offset) {
    if (offset === 0) return "armor-slot-0";
    if (offset < -visibleRadius) return "armor-slot-n4";
    if (offset > visibleRadius) return "armor-slot-p4";
    return `armor-slot-${offset < 0 ? "n" : "p"}${Math.abs(offset)}`;
  }

  function setAccent(armorSet) {
    explorer.style.setProperty("--armor-accent", armorSet.accent);
  }

  function updateStaticText() {
    explorer.querySelectorAll("[data-armor-i18n]").forEach((element) => {
      const key = element.getAttribute("data-armor-i18n");
      const value = t()[key];
      if (typeof value === "string") element.textContent = value;
    });
    closeButton.setAttribute("aria-label", t().close);
    previousButton.setAttribute("aria-label", t().previous);
    nextButton.setAttribute("aria-label", t().next);
    carousel.setAttribute("aria-label", t().carousel);
  }

  function optionMarkup(armorSet, index) {
    const offset = signedOffset(index);
    const name = local(armorSet.name);
    const isCurrent = offset === 0;
    const fallbackClass = armorSet.conceptFallback ? " is-pixel-fallback" : "";
    const isVisible = Math.abs(offset) <= visibleRadius;
    return `
      <button
        class="armor-option ${slotClass(offset)}${fallbackClass}"
        type="button"
        data-armor-offset="${offset}"
        data-armor-index="${index}"
        data-armor-id="${escapeHtml(armorSet.id)}"
        style="--option-accent: ${escapeHtml(armorSet.accent)}"
        aria-label="${escapeHtml(isCurrent ? t().open(name) : t().select(name))}"
        aria-posinset="${armorSet.order}"
        aria-setsize="${sets.length}"
        ${isVisible ? "" : 'aria-hidden="true" tabindex="-1"'}
        ${isCurrent ? 'aria-current="true"' : ""}
      >
        <img
          src="${escapeHtml(armorSet.concept)}"
          alt=""
          aria-hidden="true"
          width="576"
          height="768"
          loading="${isVisible ? "eager" : "lazy"}"
          decoding="async"
          draggable="false"
        >
        <span class="armor-option-label">
          <small>${String(armorSet.order).padStart(2, "0")}</small>
          <strong>${escapeHtml(name)}</strong>
        </span>
      </button>
    `;
  }

  function ensureOptions() {
    if (stage.childElementCount !== sets.length) {
      stage.innerHTML = sets.map(optionMarkup).join("");
    }
    state.optionElements = [...stage.querySelectorAll(".armor-option")];
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function interpolate(from, to, progress) {
    return from + (to - from) * progress;
  }

  function carouselMetrics() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mobile = width <= 820;
    const compact = width <= 520;
    let x;

    if (compact) {
      x = [0, 88, 146, 190, 235];
    } else if (mobile) {
      x = [0, 105, 185, 245, 310];
    } else if (width <= 1100) {
      x = [0, 155, 270, 350, 430];
    } else {
      x = [
        0,
        clamp(width * 0.15, 145, 205),
        clamp(width * 0.27, 255, 350),
        clamp(width * 0.38, 345, 455),
        clamp(width * 0.47, 450, 570),
      ];
    }

    const y = mobile
      ? [
          3,
          clamp(height * 0.027, 14, 24),
          clamp(height * 0.082, 52, 80),
          clamp(height * 0.165, 105, 150),
          clamp(height * 0.23, 150, 205),
        ]
      : [
          clamp(height * 0.008, 2, 8),
          clamp(height * 0.034, 18, 32),
          clamp(height * 0.115, 68, 112),
          clamp(height * 0.235, 138, 220),
          clamp(height * 0.31, 205, 300),
        ];

    return {
      x,
      y,
      scale: mobile ? [0.9, 0.62, 0.43, 0.3, 0.2] : [1, 0.77, 0.57, 0.4, 0.27],
      opacity: [1, 0.84, 0.62, 0.46, 0],
      brightness: [1, 0.72, 0.38, 0.12, 0],
      saturation: [1, 0.76, 0.52, 0.18, 0],
      rotation: mobile ? [0, 0, 0, 0, 0] : [0, 5, 9, 13, 18],
    };
  }

  function geometryForOffset(offset, metrics) {
    const absolute = Math.min(4, Math.abs(offset));
    const lower = Math.floor(absolute);
    const upper = Math.min(4, lower + 1);
    const progress = absolute - lower;
    const direction = Math.sign(offset);

    return {
      x: direction * interpolate(metrics.x[lower], metrics.x[upper], progress),
      y: interpolate(metrics.y[lower], metrics.y[upper], progress),
      scale: interpolate(metrics.scale[lower], metrics.scale[upper], progress),
      opacity: interpolate(metrics.opacity[lower], metrics.opacity[upper], progress),
      brightness: interpolate(metrics.brightness[lower], metrics.brightness[upper], progress),
      saturation: interpolate(metrics.saturation[lower], metrics.saturation[upper], progress),
      rotation: -direction * interpolate(metrics.rotation[lower], metrics.rotation[upper], progress),
      absolute,
    };
  }

  function renderGeometry() {
    state.geometryFrame = 0;
    if (!state.optionElements.length) return;
    const metrics = carouselMetrics();

    state.optionElements.forEach((option) => {
      const index = Number(option.dataset.armorIndex);
      let offset = index - state.position;
      offset -= Math.round(offset / sets.length) * sets.length;
      const geometry = geometryForOffset(offset, metrics);

      option.style.setProperty("--slot-x", `${geometry.x.toFixed(2)}px`);
      option.style.setProperty("--slot-y", `${geometry.y.toFixed(2)}px`);
      option.style.setProperty("--slot-scale", geometry.scale.toFixed(4));
      option.style.setProperty("--slot-opacity", geometry.opacity.toFixed(4));
      option.style.setProperty("--slot-brightness", geometry.brightness.toFixed(4));
      option.style.setProperty("--slot-saturation", geometry.saturation.toFixed(4));
      option.style.setProperty("--slot-rotate-y", `${geometry.rotation.toFixed(2)}deg`);
      option.style.zIndex = String(Math.max(1, 20 - Math.round(geometry.absolute * 4)));
      option.style.pointerEvents = geometry.absolute <= visibleRadius + 0.35 ? "" : "none";
      option.dataset.armorVisualOffset = offset.toFixed(3);
    });
  }

  function requestGeometry() {
    if (state.geometryFrame) return;
    state.geometryFrame = requestAnimationFrame(renderGeometry);
  }

  function commitSelectorHistoryState() {
    state.historyFrame = 0;
    const overlay = history.state?.warspawnOverlay;
    if (!state.open || state.view !== "selector" || overlay?.kind !== "armor") return;
    history.replaceState(
      {
        ...(history.state || {}),
        warspawnOverlay: {
          kind: "armor",
          view: "selector",
          id: selectedSet().id,
        },
      },
      "",
    );
  }

  function replaceSelectorHistoryState({ immediate = false } = {}) {
    if (immediate) {
      if (state.historyFrame) cancelAnimationFrame(state.historyFrame);
      commitSelectorHistoryState();
      return;
    }
    if (state.historyFrame) return;
    state.historyFrame = requestAnimationFrame(commitSelectorHistoryState);
  }

  function renderSelector({ focusCurrent = false } = {}) {
    const current = selectedSet();
    setAccent(current);
    ensureOptions();

    state.optionElements.forEach((option) => {
      const index = Number(option.dataset.armorIndex);
      const armorSet = sets[index];
      const offset = signedOffset(index);
      const isCurrent = offset === 0;
      const isVisible = Math.abs(offset) <= visibleRadius;
      const name = local(armorSet.name);
      option.className = `armor-option ${slotClass(offset)}${armorSet.conceptFallback ? " is-pixel-fallback" : ""}`;
      option.dataset.armorOffset = String(offset);
      option.setAttribute("aria-label", isCurrent ? t().open(name) : t().select(name));
      if (isCurrent) option.setAttribute("aria-current", "true");
      else option.removeAttribute("aria-current");
      if (isVisible) option.removeAttribute("aria-hidden");
      else option.setAttribute("aria-hidden", "true");
      option.tabIndex = isVisible ? 0 : -1;
      option.querySelector(".armor-option-label small").textContent = String(armorSet.order).padStart(2, "0");
      option.querySelector(".armor-option-label strong").textContent = name;
    });

    replaceSelectorHistoryState();
    requestGeometry();

    if (focusCurrent) {
      stage.querySelector('[data-armor-offset="0"]')?.focus({ preventScroll: true });
    }
  }

  function dispatchArmorSelection(armorSet, direction) {
    document.dispatchEvent(new CustomEvent("warspawn:armorchange", {
      detail: {
        id: armorSet.id,
        index: armorSet.order - 1,
        order: armorSet.order,
        direction,
        element: state.optionElements.find((option) => option.dataset.armorId === armorSet.id) || null,
      },
    }));
  }

  function moveSelectionTo(selectionPosition, { focusCurrent = false, sound = true } = {}) {
    const destination = Math.trunc(selectionPosition);
    if (destination === state.selectionPosition) return;
    const direction = destination > state.selectionPosition ? 1 : -1;
    const changes = [];

    while (state.selectionPosition !== destination) {
      state.selectionPosition += direction;
      state.selectedIndex = wrappedIndex(state.selectionPosition);
      changes.push(selectedSet());
    }

    renderSelector({ focusCurrent });
    if (sound) changes.forEach((armorSet) => dispatchArmorSelection(armorSet, direction));
  }

  function finishMotion() {
    state.motionFrame = 0;
    state.motionKind = "idle";
    state.motionTimestamp = 0;
    state.inertiaVelocity = 0;
    carousel.classList.remove("is-moving", "is-inertia");
  }

  function cancelMotion() {
    if (state.motionFrame) cancelAnimationFrame(state.motionFrame);
    finishMotion();
  }

  function runTargetMotion(timestamp) {
    if (state.motionKind !== "target") return;
    const elapsed = state.motionTimestamp
      ? clamp(timestamp - state.motionTimestamp, 1, 48)
      : 16;
    state.motionTimestamp = timestamp;
    const difference = state.targetPosition - state.position;

    if (Math.abs(difference) < 0.0015) {
      state.position = state.targetPosition;
      renderGeometry();
      finishMotion();
      return;
    }

    const progress = 1 - Math.exp(-elapsed / 62);
    state.position += difference * progress;
    renderGeometry();
    state.motionFrame = requestAnimationFrame(runTargetMotion);
  }

  function startTargetMotion() {
    if (reduceMotion.matches) {
      cancelMotion();
      state.position = state.targetPosition;
      renderGeometry();
      return;
    }
    if (state.motionKind === "inertia") cancelMotion();
    state.motionKind = "target";
    carousel.classList.add("is-moving");
    carousel.classList.remove("is-inertia");
    if (!state.motionFrame) {
      state.motionTimestamp = 0;
      state.motionFrame = requestAnimationFrame(runTargetMotion);
    }
  }

  function settleToNearest() {
    state.targetPosition = Math.round(state.position);
    moveSelectionTo(state.targetPosition);
    startTargetMotion();
  }

  function runInertia(timestamp) {
    if (state.motionKind !== "inertia") return;
    const elapsed = state.motionTimestamp
      ? clamp(timestamp - state.motionTimestamp, 1, 32)
      : 16;
    state.motionTimestamp = timestamp;
    state.inertiaVelocity *= Math.exp(-0.0042 * elapsed);
    state.position += state.inertiaVelocity * elapsed;
    state.targetPosition = state.position;
    moveSelectionTo(Math.round(state.position));
    renderGeometry();

    if (Math.abs(state.inertiaVelocity) < 0.00035) {
      state.motionFrame = 0;
      state.motionKind = "idle";
      state.motionTimestamp = 0;
      state.inertiaVelocity = 0;
      carousel.classList.remove("is-inertia");
      settleToNearest();
      return;
    }

    state.motionFrame = requestAnimationFrame(runInertia);
  }

  function startInertia(velocity) {
    cancelMotion();
    if (reduceMotion.matches || Math.abs(velocity) < 0.0007) {
      settleToNearest();
      return;
    }
    state.motionKind = "inertia";
    state.inertiaVelocity = clamp(velocity, -0.045, 0.045);
    state.motionTimestamp = 0;
    carousel.classList.add("is-moving", "is-inertia");
    state.motionFrame = requestAnimationFrame(runInertia);
  }

  function navigate(delta, { focusCurrent = false } = {}) {
    const steps = Math.trunc(delta);
    if (!steps || state.view !== "selector" || !state.open) return;
    if (state.motionKind === "inertia") cancelMotion();
    state.targetPosition = Math.round(state.targetPosition) + steps;
    moveSelectionTo(state.targetPosition, { focusCurrent, sound: true });
    startTargetMotion();
  }

  function itemStat(itemEntry) {
    if (Object.hasOwn(itemEntry.stats, "attack")) {
      const value = state.language === "en" && itemEntry.stats.attackEn
        ? itemEntry.stats.attackEn
        : itemEntry.stats.attack;
      return `${t().attack}: ${value}`;
    }
    if (itemEntry.stats.utility) {
      return `${t().utility}: ${local(itemEntry.stats.utility)}`;
    }
    return t().category[itemEntry.category] ?? itemEntry.category;
  }

  function pieceMarkup(piece) {
    const defense = piece.stats.defense;
    const width = Math.min(100, defense / 16 * 100);
    return `
      <article class="armor-piece-card" data-armor-item-id="${escapeHtml(piece.id)}">
        <img
          src="${escapeHtml(piece.image)}"
          alt="${escapeHtml(local(piece.name))}"
          loading="lazy"
          decoding="async"
        >
        <div class="armor-piece-meta">
          <strong title="${escapeHtml(local(piece.name))}">${escapeHtml(local(piece.name))}</strong>
          <span>${escapeHtml(t().defense)}: ${defense}</span>
          <span class="armor-defense-track" aria-hidden="true">
            <i style="--defense-width: ${width}%"></i>
          </span>
        </div>
      </article>
    `;
  }

  function relatedMarkup(itemEntry) {
    return `
      <article class="armor-related-card" data-armor-item-id="${escapeHtml(itemEntry.id)}">
        <img
          src="${escapeHtml(itemEntry.image)}"
          alt="${escapeHtml(local(itemEntry.name))}"
          loading="lazy"
          decoding="async"
        >
        <div class="armor-related-copy">
          <strong title="${escapeHtml(local(itemEntry.name))}">${escapeHtml(local(itemEntry.name))}</strong>
          <span>${escapeHtml(itemStat(itemEntry))}</span>
        </div>
      </article>
    `;
  }

  function renderDetail() {
    const armorSet = selectedSet();
    const name = local(armorSet.fullName);
    setAccent(armorSet);
    detailIndex.textContent = t().setIndex(armorSet.order, sets.length);
    detailContent.setAttribute("aria-label", t().detailLabel(name));

    const abilities = armorSet.abilities.map((ability) => `
      <li>
        <i aria-hidden="true">✦</i>
        <span>${escapeHtml(local(ability))}</span>
      </li>
    `).join("");

    const related = armorSet.relatedItems.length
      ? `<div class="armor-related-grid">${armorSet.relatedItems.map(relatedMarkup).join("")}</div>`
      : `<p class="armor-empty-related">${escapeHtml(t().noRelated)}</p>`;

    detailContent.innerHTML = `
      <section class="armor-detail-hero">
        <figure class="armor-game-art">
          <img
            src="${escapeHtml(armorSet.game)}"
            alt="${escapeHtml(t().gameAlt(name))}"
            decoding="async"
          >
          <figcaption>${escapeHtml(t().gameVersion)}</figcaption>
        </figure>
        <div class="armor-detail-copy">
          <span class="kicker">${escapeHtml(local(armorSet.name))} • WARSPAWN</span>
          <h2>${escapeHtml(name)}</h2>
          <p class="armor-detail-description">${escapeHtml(local(armorSet.description))}</p>
          <div class="armor-summary-stats">
            <div class="armor-summary-stat">
              <small>${escapeHtml(t().totalDefense)}</small>
              <strong>${escapeHtml(t().defensePoints(armorSet.totalDefense))}</strong>
            </div>
            <div class="armor-summary-stat">
              <small>${escapeHtml(t().catalogOrder)}</small>
              <strong>${escapeHtml(t().orderValue(armorSet.order))}</strong>
            </div>
          </div>
          <p class="armor-acquisition"><strong>${escapeHtml(t().acquisition)}:</strong> ${escapeHtml(local(armorSet.acquisition))}</p>
        </div>
      </section>

      <section class="armor-detail-block">
        <header class="armor-block-head">
          <div>
            <span class="kicker">${escapeHtml(t().historicStats)}</span>
            <h3>${escapeHtml(t().armorPieces)}</h3>
          </div>
          <a href="${escapeHtml(armorSet.source)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(t().historicalSource)}
          </a>
        </header>
        <div class="armor-piece-grid">
          ${armorSet.pieces.map(pieceMarkup).join("")}
        </div>
      </section>

      <section class="armor-detail-block">
        <header class="armor-block-head">
          <div>
            <span class="kicker">${escapeHtml(t().abilitiesKicker)}</span>
            <h3>${escapeHtml(t().abilities)}</h3>
          </div>
        </header>
        <ul class="armor-ability-list">${abilities}</ul>
      </section>

      <section class="armor-detail-block">
        <header class="armor-block-head">
          <div>
            <span class="kicker">${escapeHtml(t().relatedKicker)}</span>
            <h3>${escapeHtml(t().related)}</h3>
          </div>
          <span>${armorSet.relatedItems.length}</span>
        </header>
        ${related}
      </section>

      <section class="armor-detail-block">
        <header class="armor-block-head">
          <div>
            <span class="kicker">${escapeHtml(t().futureKicker)}</span>
            <h3>${escapeHtml(t().enchantments)} &amp; ${escapeHtml(t().recipes)}</h3>
          </div>
        </header>
        <div class="armor-future-grid">
          <article class="armor-future-panel">
            <h4>${escapeHtml(t().enchantments)}</h4>
            <p>${escapeHtml(t().enchantmentsFuture)}</p>
            <div class="armor-enchantment-slots" aria-hidden="true">
              <span class="armor-enchantment-slot">✦</span>
              <span class="armor-enchantment-slot">◇</span>
              <span class="armor-enchantment-slot">✧</span>
              <span class="armor-enchantment-slot">✦</span>
            </div>
          </article>
          <article class="armor-future-panel">
            <h4>${escapeHtml(t().recipes)}</h4>
            <p>${escapeHtml(t().recipesFuture)}</p>
            <span class="armor-recipe-placeholder" aria-hidden="true">
              ${Array.from({ length: 9 }, () => "<i></i>").join("")}
            </span>
          </article>
        </div>
      </section>
    `;
  }

  function preloadConcepts() {
    if (state.preloaded) return;
    state.preloaded = true;
    const preload = () => sets.forEach((armorSet) => {
      const image = new Image();
      image.decoding = "async";
      image.src = armorSet.concept;
    });
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(preload, { timeout: 1800 });
    } else {
      window.setTimeout(preload, 300);
    }
  }

  function restoreSelection(armorId = sets[0].id) {
    const index = Math.max(0, sets.findIndex((armorSet) => armorSet.id === armorId));
    cancelMotion();
    state.selectedIndex = index;
    state.selectionPosition = index;
    state.position = index;
    state.targetPosition = index;
  }

  function armorHistoryState(view) {
    return {
      ...(history.state || {}),
      warspawnOverlay: {
        kind: "armor",
        view,
        id: selectedSet().id,
      },
    };
  }

  function pushArmorHistory(view) {
    history.pushState(armorHistoryState(view), "");
  }

  function showSelector({ focus = true, armorId = null } = {}) {
    if (armorId) restoreSelection(armorId);
    state.view = "selector";
    explorer.dataset.armorView = "selector";
    detailView.hidden = true;
    selectorView.hidden = false;
    renderSelector();
    explorer.scrollTo({ top: 0, behavior: "auto" });
    if (focus) {
      requestAnimationFrame(() => carousel.focus({ preventScroll: true }));
    }
  }

  function showDetail({ pushHistory = false, armorId = null } = {}) {
    if (armorId) restoreSelection(armorId);
    if (pushHistory) replaceSelectorHistoryState({ immediate: true });
    state.view = "detail";
    explorer.dataset.armorView = "detail";
    if (pushHistory) pushArmorHistory("detail");
    renderDetail();
    selectorView.hidden = true;
    detailView.hidden = false;
    explorer.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => detailContent.focus({ preventScroll: true }));
  }

  function openExplorer({ fromHistory = false, armorId = sets[0].id, view = "selector" } = {}) {
    state.previousFocus = document.activeElement;
    restoreSelection(armorId);
    state.open = true;
    explorer.hidden = false;
    document.body.classList.add("armor-explorer-open");
    updateStaticText();
    if (!fromHistory) pushArmorHistory("selector");
    if (view === "detail") showDetail({ armorId });
    else showSelector({ armorId });
    preloadConcepts();
  }

  function closeExplorer() {
    if (!state.open) return;
    cancelMotion();
    if (state.historyFrame) cancelAnimationFrame(state.historyFrame);
    state.historyFrame = 0;
    state.open = false;
    explorer.hidden = true;
    document.body.classList.remove("armor-explorer-open");
    carousel.classList.remove("is-dragging");
    state.pointerId = null;
    state.pointerDragging = false;
    state.previousFocus?.focus?.({ preventScroll: true });
  }

  function requestCloseExplorer() {
    const overlay = history.state?.warspawnOverlay;
    if (overlay?.kind !== "armor") {
      closeExplorer();
      return;
    }
    history.go(state.view === "detail" ? -2 : -1);
  }

  function requestPreviousOverlayView() {
    const overlay = history.state?.warspawnOverlay;
    if (overlay?.kind === "armor") {
      history.back();
      return;
    }
    if (state.view === "detail") showSelector();
    else closeExplorer();
  }

  function handleHistoryChange(event) {
    const overlay = event.state?.warspawnOverlay;
    if (overlay?.kind !== "armor") {
      if (state.open) closeExplorer();
      return;
    }

    const armorId = setsById.has(overlay.id) ? overlay.id : sets[0].id;
    if (!state.open) {
      openExplorer({
        fromHistory: true,
        armorId,
        view: overlay.view === "detail" ? "detail" : "selector",
      });
      return;
    }

    if (overlay.view === "detail") showDetail({ armorId });
    else showSelector({ armorId });
  }

  function visibleFocusableElements() {
    return [...explorer.querySelectorAll(
      'button:not([hidden]):not([disabled]), a[href]:not([hidden]), [tabindex]:not([tabindex="-1"]):not([hidden])',
    )].filter((element) => element.offsetParent !== null);
  }

  function trapFocus(event) {
    if (event.key !== "Tab") return;
    const focusable = visibleFocusableElements();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  openButton.addEventListener("click", () => openExplorer());
  closeButton.addEventListener("click", requestCloseExplorer);
  previousButton.addEventListener("click", () => navigate(-1, { focusCurrent: false }));
  nextButton.addEventListener("click", () => navigate(1, { focusCurrent: false }));
  openDetailButton.addEventListener("click", () => showDetail({ pushHistory: true }));
  detailBackButton.addEventListener("click", requestPreviousOverlayView);

  stage.addEventListener("click", (event) => {
    if (performance.now() < state.suppressClickUntil) return;
    const option = event.target.closest("[data-armor-offset]");
    if (!option) return;
    const offset = Number(option.dataset.armorOffset);
    if (offset === 0) {
      showDetail({ pushHistory: true });
    } else {
      navigate(offset);
    }
  });

  selectorView.addEventListener("wheel", (event) => {
    if (state.view !== "selector") return;
    const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
    if (!movement) return;
    event.preventDefault();
    const contribution = event.deltaMode === WheelEvent.DOM_DELTA_PIXEL
      ? movement / 64
      : event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? movement / 3
        : Math.sign(movement);
    if (
      state.wheelAccumulator &&
      Math.sign(state.wheelAccumulator) !== Math.sign(contribution)
    ) {
      state.wheelAccumulator = 0;
    }
    state.wheelAccumulator += contribution;
    const steps = state.wheelAccumulator > 0
      ? Math.floor(state.wheelAccumulator)
      : Math.ceil(state.wheelAccumulator);
    if (!steps) return;
    state.wheelAccumulator -= steps;
    navigate(steps);
  }, { passive: false });

  carousel.addEventListener("pointerdown", (event) => {
    if (state.view !== "selector") return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    state.pointerId = event.pointerId;
    state.pointerStartX = event.clientX;
    state.pointerStartY = event.clientY;
    state.pointerLastX = event.clientX;
    state.pointerLastY = event.clientY;
    state.pointerLastTime = event.timeStamp || performance.now();
    state.pointerVelocity = 0;
    state.pointerDragging = false;
  });

  carousel.addEventListener("pointermove", (event) => {
    if (event.pointerId !== state.pointerId) return;
    const totalX = event.clientX - state.pointerStartX;
    const totalY = event.clientY - state.pointerStartY;
    if (!state.pointerDragging) {
      if (Math.abs(totalX) < 3) return;
      if (Math.abs(totalX) <= Math.abs(totalY) * 0.78) return;
      cancelMotion();
      state.targetPosition = state.position;
      moveSelectionTo(Math.round(state.position), { sound: false });
      renderGeometry();
      state.pointerDragging = true;
      carousel.classList.add("is-dragging", "is-moving");
      try {
        carousel.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is an enhancement; dragging still works without it.
      }
    }

    if (event.cancelable) event.preventDefault();
    const now = event.timeStamp || performance.now();
    const elapsed = clamp(now - state.pointerLastTime, 1, 64);
    const distance = event.clientX - state.pointerLastX;
    const pixelsPerStep = Math.max(72, carouselMetrics().x[1]);
    const movement = -distance / pixelsPerStep;
    const instantaneousVelocity = movement / elapsed;
    state.pointerVelocity = state.pointerVelocity * 0.62 + instantaneousVelocity * 0.38;
    state.position += movement;
    state.targetPosition = state.position;
    moveSelectionTo(Math.round(state.position));
    requestGeometry();
    state.pointerLastX = event.clientX;
    state.pointerLastY = event.clientY;
    state.pointerLastTime = now;
  });

  carousel.addEventListener("pointerup", (event) => {
    if (event.pointerId !== state.pointerId) return;
    const wasDragging = state.pointerDragging;
    const velocity = state.pointerVelocity;
    state.pointerId = null;
    state.pointerDragging = false;
    carousel.classList.remove("is-dragging");
    if (wasDragging) {
      state.suppressClickUntil = performance.now() + 280;
      startInertia(velocity);
    } else if (state.motionKind === "idle") {
      carousel.classList.remove("is-moving");
    }
  });

  carousel.addEventListener("pointercancel", () => {
    const wasDragging = state.pointerDragging;
    state.pointerId = null;
    state.pointerDragging = false;
    carousel.classList.remove("is-dragging");
    if (wasDragging) {
      state.suppressClickUntil = performance.now() + 280;
      settleToNearest();
    } else if (state.motionKind === "idle") {
      carousel.classList.remove("is-moving");
    }
  });

  explorer.addEventListener("click", (event) => {
    if (event.target === explorer) requestCloseExplorer();
  });

  explorer.addEventListener("keydown", (event) => {
    trapFocus(event);
    if (event.key === "Escape") {
      event.preventDefault();
      requestPreviousOverlayView();
      return;
    }
    if (state.view !== "selector") return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1, { focusCurrent: true });
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1, { focusCurrent: true });
    } else if ((event.key === "Enter" || event.key === " ") && document.activeElement === carousel) {
      event.preventDefault();
      showDetail({ pushHistory: true });
    }
  });

  window.addEventListener("resize", requestGeometry, { passive: true });
  window.addEventListener("popstate", handleHistoryChange);

  document.addEventListener("warspawn:languagechange", (event) => {
    state.language = event.detail?.language === "en" ? "en" : "pt";
    updateStaticText();
    if (!state.open) return;
    if (state.view === "detail") renderDetail();
    else renderSelector();
  });

  updateStaticText();
})();
