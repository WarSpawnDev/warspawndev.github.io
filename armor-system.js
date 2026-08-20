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
  const status = document.querySelector("#armor-selector-status");
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
    !status ||
    !openDetailButton ||
    !detailBackButton ||
    !detailIndex ||
    !detailContent
  ) {
    return;
  }

  const setsById = new Map(catalog.sets.map((armorSet) => [armorSet.id, armorSet]));
  const sets = catalog.order.map((id) => setsById.get(id)).filter(Boolean);
  const visibleOffsets = [-3, -2, -1, 0, 1, 2, 3];
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
      position: (position, total, name) => `${String(position).padStart(2, "0")} / ${total} • ${name}`,
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
      position: (position, total, name) => `${String(position).padStart(2, "0")} / ${total} • ${name}`,
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
    open: false,
    view: "selector",
    animating: false,
    wheelLocked: false,
    pointerId: null,
    pointerCaptured: false,
    pointerStartX: 0,
    pointerStartY: 0,
    suppressClick: false,
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

  function slotClass(offset) {
    if (offset === 0) return "armor-slot-0";
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

  function optionMarkup(armorSet, offset) {
    const name = local(armorSet.name);
    const isCurrent = offset === 0;
    const fallbackClass = armorSet.conceptFallback ? " is-pixel-fallback" : "";
    return `
      <button
        class="armor-option ${slotClass(offset)}${fallbackClass}"
        type="button"
        data-armor-offset="${offset}"
        data-armor-id="${escapeHtml(armorSet.id)}"
        style="--option-accent: ${escapeHtml(armorSet.accent)}"
        aria-label="${escapeHtml(isCurrent ? t().open(name) : t().select(name))}"
        ${isCurrent ? 'aria-current="true"' : ""}
      >
        <img
          src="${escapeHtml(armorSet.concept)}"
          alt=""
          aria-hidden="true"
          loading="eager"
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

  function renderSelector({ focusCurrent = false } = {}) {
    const current = selectedSet();
    setAccent(current);
    stage.innerHTML = visibleOffsets.map((offset) => {
      const armorSet = sets[wrappedIndex(state.selectedIndex + offset)];
      return optionMarkup(armorSet, offset);
    }).join("");
    status.textContent = t().position(current.order, sets.length, local(current.name));

    if (focusCurrent) {
      requestAnimationFrame(() => {
        stage.querySelector('[data-armor-offset="0"]')?.focus({ preventScroll: true });
      });
    }
  }

  function navigate(delta, { focusCurrent = false } = {}) {
    if (!delta || state.animating || state.view !== "selector") return;
    state.animating = true;
    stage.classList.add(delta > 0 ? "is-shifting-next" : "is-shifting-prev");
    const delay = reduceMotion.matches ? 0 : 115;
    window.setTimeout(() => {
      state.selectedIndex = wrappedIndex(state.selectedIndex + delta);
      renderSelector({ focusCurrent });
      stage.classList.remove("is-shifting-next", "is-shifting-prev");
      state.animating = false;
    }, delay);
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

  function showSelector({ focus = true } = {}) {
    state.view = "selector";
    detailView.hidden = true;
    selectorView.hidden = false;
    renderSelector();
    explorer.scrollTo({ top: 0, behavior: "auto" });
    if (focus) {
      requestAnimationFrame(() => carousel.focus({ preventScroll: true }));
    }
  }

  function showDetail() {
    state.view = "detail";
    renderDetail();
    selectorView.hidden = true;
    detailView.hidden = false;
    explorer.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => detailContent.focus({ preventScroll: true }));
  }

  function openExplorer() {
    state.previousFocus = document.activeElement;
    state.selectedIndex = 0;
    state.open = true;
    explorer.hidden = false;
    document.body.classList.add("armor-explorer-open");
    updateStaticText();
    showSelector();
    preloadConcepts();
  }

  function closeExplorer() {
    state.open = false;
    explorer.hidden = true;
    document.body.classList.remove("armor-explorer-open");
    state.previousFocus?.focus?.({ preventScroll: true });
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

  openButton.addEventListener("click", openExplorer);
  closeButton.addEventListener("click", closeExplorer);
  previousButton.addEventListener("click", () => navigate(-1, { focusCurrent: false }));
  nextButton.addEventListener("click", () => navigate(1, { focusCurrent: false }));
  openDetailButton.addEventListener("click", showDetail);
  detailBackButton.addEventListener("click", () => showSelector());

  stage.addEventListener("click", (event) => {
    if (state.suppressClick) return;
    const option = event.target.closest("[data-armor-offset]");
    if (!option) return;
    const offset = Number(option.dataset.armorOffset);
    if (offset === 0) {
      showDetail();
    } else {
      navigate(offset);
    }
  });

  carousel.addEventListener("wheel", (event) => {
    if (state.view !== "selector") return;
    const movement = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
    if (Math.abs(movement) < 4) return;
    event.preventDefault();
    if (state.wheelLocked) return;
    state.wheelLocked = true;
    navigate(movement > 0 ? 1 : -1);
    window.setTimeout(() => {
      state.wheelLocked = false;
    }, 185);
  }, { passive: false });

  carousel.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    state.pointerId = event.pointerId;
    state.pointerCaptured = false;
    state.pointerStartX = event.clientX;
    state.pointerStartY = event.clientY;
  });

  carousel.addEventListener("pointermove", (event) => {
    if (event.pointerId !== state.pointerId || state.pointerCaptured) return;
    const horizontal = event.clientX - state.pointerStartX;
    const vertical = event.clientY - state.pointerStartY;
    if (Math.abs(horizontal) < 12 || Math.abs(horizontal) <= Math.abs(vertical)) return;
    if (typeof carousel.setPointerCapture !== "function") return;
    try {
      carousel.setPointerCapture(event.pointerId);
      state.pointerCaptured = true;
    } catch {
      state.pointerCaptured = false;
    }
  });

  carousel.addEventListener("pointerup", (event) => {
    if (event.pointerId !== state.pointerId) return;
    const horizontal = event.clientX - state.pointerStartX;
    const vertical = event.clientY - state.pointerStartY;
    state.pointerId = null;
    state.pointerCaptured = false;
    if (Math.abs(horizontal) >= 38 && Math.abs(horizontal) > Math.abs(vertical) * 1.15) {
      state.suppressClick = true;
      navigate(horizontal < 0 ? 1 : -1);
      window.setTimeout(() => {
        state.suppressClick = false;
      }, 220);
    }
  });

  carousel.addEventListener("pointercancel", () => {
    state.pointerId = null;
    state.pointerCaptured = false;
  });

  explorer.addEventListener("click", (event) => {
    if (event.target === explorer) closeExplorer();
  });

  explorer.addEventListener("keydown", (event) => {
    trapFocus(event);
    if (event.key === "Escape") {
      event.preventDefault();
      if (state.view === "detail") showSelector();
      else closeExplorer();
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
      showDetail();
    }
  });

  document.addEventListener("warspawn:languagechange", (event) => {
    state.language = event.detail?.language === "en" ? "en" : "pt";
    updateStaticText();
    if (!state.open) return;
    if (state.view === "detail") renderDetail();
    else renderSelector();
  });

  updateStaticText();
  renderSelector();
})();
