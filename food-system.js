"use strict";

(function initializeFoodSystem() {
  const catalog = window.WarSpawnCatalog;
  const root = document.querySelector("#comidas");
  const catalogGrid = document.querySelector("#food-catalog");
  const detail = document.querySelector("#food-detail");
  const search = document.querySelector("#food-search");
  const count = document.querySelector("#food-count");
  const noResults = document.querySelector("#food-no-results");
  const filterButtons = [...document.querySelectorAll("[data-food-filter]")];
  const categoryFilters = document.querySelector(".food-filters");
  const sortSelect = document.querySelector("#food-sort");
  const effectFilter = document.querySelector("#food-effect-filter");
  const craftFilter = document.querySelector("#food-craft-filter");
  const resetFilters = document.querySelector("#food-filter-reset");
  const filterControls = document.querySelector("#food-filter-controls");
  const localizedFilterLabels = [
    ...document.querySelectorAll("[data-food-label]"),
  ];

  if (
    !catalog ||
    !root ||
    !catalogGrid ||
    !detail ||
    !search ||
    !sortSelect ||
    !effectFilter ||
    !craftFilter ||
    !resetFilters
  ) {
    return;
  }

  const text = {
    pt: {
      search: "Buscar comida ou ingrediente...",
      searchLabel: "Buscar no catálogo de comidas",
      all: "Todos",
      meals: "Pratos",
      ingredients: "Ingredientes",
      fish: "Peixes",
      special: "Especiais",
      categoriesLabel: "Categorias do catálogo de comidas",
      advancedFilters: "Filtros avançados do catálogo",
      sortLabel: "Ordenar por",
      sortCreative: "Ordem do mod",
      sortNutritionDesc: "Nutrição: maior → menor",
      sortNutritionAsc: "Nutrição: menor → maior",
      sortSaturationDesc: "Saturação: maior → menor",
      sortSaturationAsc: "Saturação: menor → maior",
      effectFilterLabel: "Efeitos",
      effectAll: "Todos",
      effectWith: "Com efeitos",
      effectWithout: "Sem efeitos",
      craftFilterLabel: "Fabricação",
      craftAll: "Todos",
      craftable: "Fabricáveis",
      notCraftable: "Não fabricáveis",
      clearFilters: "Limpar filtros",
      results: (value) => `${value} ${value === 1 ? "item encontrado" : "itens encontrados"}`,
      noResults: "Nenhum item corresponde à busca.",
      open: "Abrir ficha de",
      categoryMeals: "Prato",
      categoryIngredients: "Ingrediente",
      categoryFish: "Peixe",
      categorySpecial: "Especial",
      nutrition: "Nutrição",
      nutritionPoints: "pontos de fome",
      hungerIcons: "pernis",
      saturation: "Saturação",
      effectiveSaturation: "pontos (máx.)",
      saturationIcons: "ícones (máx.)",
      configuredModifier: "Multiplicador configurado",
      consumeTime: "Tempo de consumo",
      eatSpeedCommon: "Comum",
      ticks: "ticks",
      second: "segundo",
      seconds: "segundos",
      minute: "minuto",
      minutes: "minutos",
      hour: "hora",
      hours: "horas",
      day: "dia",
      days: "dias",
      perSlice: "Valores por fatia",
      effects: "Efeitos",
      noEffects: "Este alimento não aplica efeitos temporários.",
      level: "Nível",
      obtain: "Como obter",
      usedIn: "Usado em",
      noObtain:
        "Nenhuma receita foi cadastrada para obter este item nesta primeira versão.",
      noUses: "Nenhuma outra receita cadastrada usa este item.",
      craftingTable: "Bancada de trabalho",
      furnace: "Fornalha",
      shaped: "Receita com formato",
      shapeless: "Receita sem formato",
      shapelessHelp:
        "Receita sem formato: os ingredientes podem ser colocados em qualquer ordem.",
      result: "Resultado",
      ingredient: "Ingrediente",
      smeltingTime: "Tempo de preparo",
      experience: "experiência",
      variant: "Variação",
      relations: "Conexões do mundo",
      relationsLead:
        "A ficha já aceita vínculos dinâmicos; eles aparecerão aqui assim que os outros arquivos forem cadastrados.",
      mobsDrops: "Mobs e drops",
      botany: "Botânica",
      dimensions: "Dimensões",
      pendingLink: "Aguardando vínculo",
      sourceMinecraft: "Minecraft base",
      sourceWarspawn: "WarSpawn",
      pendingStats: "Dados nutricionais pendentes",
      effectCount: (value) => `${value} ${value === 1 ? "efeito" : "efeitos"}`,
      genericMeal:
        "Alimento preparado do WarSpawn. Consulte abaixo sua nutrição, receitas e usos relacionados.",
      genericIngredient:
        "Ingrediente do catálogo. As receitas abaixo mostram como ele participa da cadeia de criação.",
      genericFish:
        "Peixe do WarSpawn com propriedades próprias de nutrição e saturação.",
      genericSpecial:
        "Alimento especial com propriedades que podem alterar uma expedição.",
      minecraftIngredient:
        "Ingrediente do Minecraft base usado por uma ou mais receitas do WarSpawn.",
      pendingDescription:
        "O sprite já está no catálogo; nutrição, saturação e obtenção serão completadas quando os próximos dados forem enviados.",
    },
    en: {
      search: "Search food or ingredient...",
      searchLabel: "Search the food catalog",
      all: "All",
      meals: "Meals",
      ingredients: "Ingredients",
      fish: "Fish",
      special: "Special",
      categoriesLabel: "Food catalog categories",
      advancedFilters: "Advanced catalog filters",
      sortLabel: "Sort by",
      sortCreative: "Mod order",
      sortNutritionDesc: "Nutrition: highest to lowest",
      sortNutritionAsc: "Nutrition: lowest to highest",
      sortSaturationDesc: "Saturation: highest to lowest",
      sortSaturationAsc: "Saturation: lowest to highest",
      effectFilterLabel: "Effects",
      effectAll: "All",
      effectWith: "With effects",
      effectWithout: "Without effects",
      craftFilterLabel: "Crafting",
      craftAll: "All",
      craftable: "Craftable",
      notCraftable: "Not craftable",
      clearFilters: "Clear filters",
      results: (value) => `${value} ${value === 1 ? "item found" : "items found"}`,
      noResults: "No items match this search.",
      open: "Open file for",
      categoryMeals: "Meal",
      categoryIngredients: "Ingredient",
      categoryFish: "Fish",
      categorySpecial: "Special",
      nutrition: "Nutrition",
      nutritionPoints: "hunger points",
      hungerIcons: "drumsticks",
      saturation: "Saturation",
      effectiveSaturation: "maximum points",
      saturationIcons: "maximum icons",
      configuredModifier: "Configured multiplier",
      consumeTime: "Consumption time",
      eatSpeedCommon: "Common",
      ticks: "ticks",
      second: "second",
      seconds: "seconds",
      minute: "minute",
      minutes: "minutes",
      hour: "hour",
      hours: "hours",
      day: "day",
      days: "days",
      perSlice: "Values per slice",
      effects: "Effects",
      noEffects: "This food does not apply temporary effects.",
      level: "Level",
      obtain: "How to obtain",
      usedIn: "Used in",
      noObtain: "No recipe to obtain this item is registered in this first version.",
      noUses: "No other registered recipe uses this item.",
      craftingTable: "Crafting table",
      furnace: "Furnace",
      shaped: "Shaped recipe",
      shapeless: "Shapeless recipe",
      shapelessHelp:
        "Shapeless recipe: ingredients can be placed in any order.",
      result: "Result",
      ingredient: "Ingredient",
      smeltingTime: "Cooking time",
      experience: "experience",
      variant: "Variation",
      relations: "World connections",
      relationsLead:
        "This file already accepts dynamic links; they will appear here as the other archives are added.",
      mobsDrops: "Mobs and drops",
      botany: "Botany",
      dimensions: "Dimensions",
      pendingLink: "Awaiting link",
      sourceMinecraft: "Base Minecraft",
      sourceWarspawn: "WarSpawn",
      pendingStats: "Nutrition data pending",
      effectCount: (value) => `${value} ${value === 1 ? "effect" : "effects"}`,
      genericMeal:
        "A prepared WarSpawn food. See its nutrition, recipes and related uses below.",
      genericIngredient:
        "A catalog ingredient. The recipes below show where it fits in the crafting chain.",
      genericFish:
        "A WarSpawn fish with its own nutrition and saturation properties.",
      genericSpecial:
        "A special food with properties that can change the course of an expedition.",
      minecraftIngredient:
        "A base Minecraft ingredient used by one or more WarSpawn recipes.",
      pendingDescription:
        "The sprite is already cataloged; nutrition, saturation and acquisition will be completed when the next data arrives.",
    },
  };

  const itemById = new Map(catalog.items.map((entry) => [entry.id, entry]));
  const creativeRank = new Map(
    (catalog.creativeOrder || []).map((itemId, index) => [itemId, index]),
  );
  const publicItems = catalog.items.filter((entry) => entry.catalog);
  const craftableItemIds = new Set(
    catalog.recipes.map((recipe) => recipe.result.item),
  );
  const savedItem = localStorage.getItem("warspawn-selected-food");
  const state = {
    language: document.documentElement.lang.startsWith("en") ? "en" : "pt",
    query: "",
    filter: "all",
    sort: "creative",
    effectFilter: "all",
    craftFilter: "all",
    selected: itemById.has(savedItem) ? savedItem : "pizza",
  };

  function t() {
    return text[state.language];
  }

  function localName(entry) {
    return entry?.name[state.language] || entry?.name.pt || entry?.id || "";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatNumber(value, maximumFractionDigits = 2) {
    return new Intl.NumberFormat(state.language === "pt" ? "pt-BR" : "en-US", {
      maximumFractionDigits,
    }).format(value);
  }

  function secondsFromTicks(ticks) {
    return ticks / 20;
  }

  function formatDurationFromTicks(ticks) {
    const seconds = secondsFromTicks(ticks);

    if (seconds <= 60) {
      const label = seconds === 1 ? t().second : t().seconds;
      return `${formatNumber(seconds)} ${label}`;
    }

    let remainingSeconds = Math.round(seconds);
    const units = [
      { size: 86400, singular: t().day, plural: t().days },
      { size: 3600, singular: t().hour, plural: t().hours },
      { size: 60, singular: t().minute, plural: t().minutes },
      { size: 1, singular: t().second, plural: t().seconds },
    ];
    const parts = [];

    units.forEach((unit) => {
      if (remainingSeconds < unit.size || parts.length >= 2) return;
      const value = Math.floor(remainingSeconds / unit.size);
      remainingSeconds -= value * unit.size;
      parts.push(`${formatNumber(value, 0)} ${value === 1 ? unit.singular : unit.plural}`);
    });

    return parts.join(" ");
  }

  function romanNumeral(value) {
    return ["", "I", "II", "III", "IV", "V"][value] || String(value);
  }

  function categoryLabel(category) {
    const key = `category${category[0].toUpperCase()}${category.slice(1)}`;
    return t()[key];
  }

  function normalize(value) {
    return value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLocaleLowerCase(state.language);
  }

  function assetUrl(path) {
    return window.WarSpawnFoodAssets?.[path] || path;
  }

  function itemImage(entry, className, alt = "") {
    if (!entry?.image) {
      const initials = localName(entry)
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("");
      return `<span class="${className} item-sprite-placeholder" aria-hidden="true">${escapeHtml(initials)}</span>`;
    }
    return `<img class="${className}" src="${escapeHtml(assetUrl(entry.image))}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">`;
  }

  function ingredientIds(recipe) {
    return recipe.station === "furnace"
      ? [recipe.ingredient]
      : recipe.grid.filter(Boolean);
  }

  function effectiveSaturation(foodData) {
    const calculated =
      2 * foodData.nutrition * foodData.saturationModifier;
    return Math.min(calculated, 20);
  }

  function creativePosition(entry) {
    return creativeRank.get(entry.id) ?? Number.MAX_SAFE_INTEGER;
  }

  function compareCreativeOrder(left, right) {
    const rankDifference =
      creativePosition(left) - creativePosition(right);
    if (rankDifference !== 0) return rankDifference;
    return localName(left).localeCompare(localName(right), state.language);
  }

  function sortableStat(entry, stat) {
    if (!entry.food) return null;
    return stat === "saturation"
      ? effectiveSaturation(entry.food)
      : entry.food.nutrition;
  }

  function compareFoodStat(left, right, stat, direction) {
    const leftValue = sortableStat(left, stat);
    const rightValue = sortableStat(right, stat);

    if (leftValue === null && rightValue === null) {
      return compareCreativeOrder(left, right);
    }
    if (leftValue === null) return 1;
    if (rightValue === null) return -1;

    const difference =
      direction === "desc"
        ? rightValue - leftValue
        : leftValue - rightValue;
    return difference || compareCreativeOrder(left, right);
  }

  function sortCatalogItems(entries) {
    const items = [...entries];
    if (state.sort === "creative") {
      return items.sort(compareCreativeOrder);
    }

    const [stat, direction] = state.sort.split("-");
    return items.sort((left, right) =>
      compareFoodStat(left, right, stat, direction),
    );
  }

  function renderMeter(points, type) {
    const bounded = Math.max(0, Math.min(20, points));
    const images = {
      hunger: {
        full: "assets/ui/hunger/hunger-full.png",
        half: "assets/ui/hunger/hunger-half.png",
        empty: "assets/ui/hunger/hunger-empty.png",
      },
      saturation: {
        full: "assets/ui/hunger/saturation-full.png",
        half: "assets/ui/hunger/saturation-half.png",
        empty: "assets/ui/hunger/hunger-empty.png",
      },
    };

    return Array.from({ length: 10 }, (_, index) => {
      const remaining = bounded - index * 2;
      const fill = remaining >= 2 ? "full" : remaining > 0 ? "half" : "empty";
      return `<img src="${assetUrl(images[type][fill])}" alt="" aria-hidden="true" loading="lazy" decoding="async">`;
    }).join("");
  }

  function itemButton(itemId, countValue = 1, context = "ingredient") {
    const entry = itemById.get(itemId);
    if (!entry) return '<span class="craft-slot craft-slot-empty" aria-hidden="true"></span>';

    const name = localName(entry);
    const quantity =
      countValue > 1
        ? `<span class="craft-quantity" aria-label="${countValue}">×${countValue}</span>`
        : "";
    return `
      <button
        class="craft-slot craft-item"
        type="button"
        data-food-id="${escapeHtml(entry.id)}"
        aria-label="${escapeHtml(`${t()[context]}: ${name}`)}"
        title="${escapeHtml(name)}"
      >
        ${itemImage(entry, "craft-sprite")}
        ${quantity}
      </button>
    `;
  }

  function shapelessBadge() {
    return `
      <span class="recipe-order-wrap">
        <button
          class="recipe-order-badge"
          type="button"
          aria-label="${escapeHtml(t().shapelessHelp)}"
          data-tooltip="${escapeHtml(t().shapelessHelp)}"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4l16 16M15 20h5v-5M4 20L20 4M15 4h5v5"></path>
          </svg>
        </button>
      </span>
    `;
  }

  function renderRecipe(recipe, variationIndex = 0, variationCount = 1) {
    const result = itemById.get(recipe.result.item);
    const label = recipe.station === "furnace" ? t().furnace : t().craftingTable;
    const variation =
      variationCount > 1
        ? `<span class="recipe-variation">${t().variant} ${variationIndex + 1}/${variationCount}</span>`
        : "";

    if (recipe.station === "furnace") {
      return `
        <article class="recipe-card furnace-recipe">
          <header class="recipe-card-head">
            <div>
              <span class="recipe-station">${label}</span>
              <strong>${escapeHtml(localName(result))}</strong>
            </div>
            ${variation}
          </header>
          <div class="furnace-layout">
            <div class="furnace-input">
              ${itemButton(recipe.ingredient, 1, "ingredient")}
              <span class="furnace-flame" aria-hidden="true">♨</span>
            </div>
            <span class="craft-arrow" aria-hidden="true">→</span>
            <div class="craft-result">
              ${itemButton(recipe.result.item, recipe.result.count, "result")}
            </div>
          </div>
          <p class="recipe-note">
            ${t().smeltingTime}: ${formatNumber(recipe.timeTicks)} ${t().ticks}
            · ${formatDurationFromTicks(recipe.timeTicks)}
            · ${formatNumber(recipe.experience)} ${t().experience}
          </p>
        </article>
      `;
    }

    return `
      <article class="recipe-card">
        <header class="recipe-card-head">
          <div>
            <span class="recipe-station">${label}</span>
            <strong>${escapeHtml(localName(result))}</strong>
          </div>
          <div class="recipe-head-actions">
            ${variation}
            ${recipe.type === "shapeless" ? shapelessBadge() : ""}
          </div>
        </header>
        <div class="crafting-layout">
          <div
            class="crafting-grid"
            aria-label="${escapeHtml(recipe.type === "shapeless" ? t().shapeless : t().shaped)}"
          >
            ${recipe.grid
              .map((itemId) =>
                itemId
                  ? itemButton(itemId, 1, "ingredient")
                  : '<span class="craft-slot craft-slot-empty" aria-hidden="true"></span>',
              )
              .join("")}
          </div>
          <span class="craft-arrow" aria-hidden="true">→</span>
          <div class="craft-result">
            ${itemButton(recipe.result.item, recipe.result.count, "result")}
          </div>
        </div>
      </article>
    `;
  }

  function renderRecipeCollection(recipes) {
    const resultCounts = recipes.reduce((accumulator, recipe) => {
      const key = recipe.result.item;
      accumulator.set(key, (accumulator.get(key) || 0) + 1);
      return accumulator;
    }, new Map());
    const seen = new Map();

    return recipes
      .map((recipe) => {
        const key = recipe.result.item;
        const index = seen.get(key) || 0;
        seen.set(key, index + 1);
        return renderRecipe(recipe, index, resultCounts.get(key));
      })
      .join("");
  }

  function descriptionFor(entry) {
    if (entry.description) return entry.description[state.language];
    if (entry.source === "minecraft") return t().minecraftIngredient;
    if (!entry.food) return t().pendingDescription;
    if (entry.category === "meals") return t().genericMeal;
    if (entry.category === "fish") return t().genericFish;
    if (entry.category === "special") return t().genericSpecial;
    return t().genericIngredient;
  }

  function renderEffects(entry) {
    const effects = entry.food?.effects || [];
    if (!effects.length) {
      return `<p class="food-empty-note">${t().noEffects}</p>`;
    }

    return `
      <div class="effect-list">
        ${effects
          .map((effect) => {
            const definition = catalog.effects[effect.id];
            if (!definition) return "";
            return `
              <article class="effect-chip">
                <img src="${escapeHtml(assetUrl(definition.image))}" alt="" loading="lazy" decoding="async">
                <div>
                  <strong>${escapeHtml(definition.name[state.language])} ${romanNumeral(effect.level)}</strong>
                  <span>
                    ${formatNumber(effect.durationTicks)} ${t().ticks}
                    · ${formatDurationFromTicks(effect.durationTicks)}
                  </span>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderNutrition(entry) {
    if (!entry.food) {
      return `
        <div class="nutrition-pending">
          <span aria-hidden="true">◇</span>
          <p>${t().pendingStats}</p>
        </div>
      `;
    }

    const data = entry.food;
    const saturation = effectiveSaturation(data);
    const hungerDrumsticks = data.nutrition / 2;
    const saturationIcons = saturation / 2;
    const eatSpeed =
      data.eatSpeed === "common" ? ` · ${t().eatSpeedCommon}` : "";

    return `
      ${data.perSlice ? `<span class="per-slice-badge">${t().perSlice}</span>` : ""}
      <div class="nutrition-grid">
        <article class="nutrition-card">
          <div class="nutrition-card-head">
            <span>${t().nutrition}</span>
            <strong>${formatNumber(data.nutrition)} ${t().nutritionPoints}</strong>
          </div>
          <div
            class="food-meter"
            role="img"
            aria-label="${escapeHtml(`${formatNumber(hungerDrumsticks)} ${t().hungerIcons}`)}"
          >
            ${renderMeter(data.nutrition, "hunger")}
          </div>
          <small>${formatNumber(hungerDrumsticks)} ${t().hungerIcons}</small>
        </article>
        <article class="nutrition-card">
          <div class="nutrition-card-head">
            <span>${t().saturation}</span>
            <strong>${formatNumber(saturation)} ${t().effectiveSaturation}</strong>
          </div>
          <div
            class="food-meter"
            role="img"
            aria-label="${escapeHtml(`${formatNumber(saturationIcons)} ${t().saturationIcons}`)}"
          >
            ${renderMeter(saturation, "saturation")}
          </div>
          <small>
            ${formatNumber(saturationIcons)} ${t().saturationIcons}
            · ${t().configuredModifier}: ${formatNumber(data.saturationModifier)}
          </small>
        </article>
      </div>
      <div class="food-facts">
        <span>
          <b>${t().consumeTime}</b>
          ${formatNumber(data.eatTicks)} ${t().ticks}
          · ${formatDurationFromTicks(data.eatTicks)}${eatSpeed}
        </span>
      </div>
    `;
  }

  function renderRelations(entry) {
    const relationGroups = [
      {
        key: "mobs",
        label: t().mobsDrops,
        values: [...entry.relations.mobs, ...entry.relations.drops],
      },
      { key: "botany", label: t().botany, values: entry.relations.botany },
      {
        key: "dimensions",
        label: t().dimensions,
        values: entry.relations.dimensions,
      },
    ];

    return `
      <div class="food-relations">
        ${relationGroups
          .map(
            (group) => `
              <article>
                <span class="relation-node" aria-hidden="true"></span>
                <strong>${group.label}</strong>
                ${
                  group.values.length
                    ? `<ul>${group.values.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul>`
                    : `<small>${t().pendingLink}</small>`
                }
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderCatalog() {
    const query = normalize(state.query.trim());
    const visible = sortCatalogItems(
      publicItems.filter((entry) => {
        const matchesCategory =
          state.filter === "all" || entry.category === state.filter;
        const hasEffects = Boolean(entry.food?.effects?.length);
        const matchesEffects =
          state.effectFilter === "all" ||
          (state.effectFilter === "with" && hasEffects) ||
          (state.effectFilter === "without" && !hasEffects);
        const isCraftable = craftableItemIds.has(entry.id);
        const matchesCraft =
          state.craftFilter === "all" ||
          (state.craftFilter === "craftable" && isCraftable) ||
          (state.craftFilter === "not-craftable" && !isCraftable);
        const searchable = normalize(
          `${entry.name.pt} ${entry.name.en} ${entry.id}`,
        );

        return (
          matchesCategory &&
          matchesEffects &&
          matchesCraft &&
          searchable.includes(query)
        );
      }),
    );

    catalogGrid.innerHTML = visible
      .map((entry) => {
        const effectTotal = entry.food?.effects?.length || 0;
        const stat = entry.food
          ? `
              <span>
                <img src="${assetUrl("assets/ui/hunger/hunger-full.png")}" alt="" aria-hidden="true">
                ${formatNumber(entry.food.nutrition / 2)}
              </span>
            `
          : `<span class="food-card-pending">◇</span>`;
        const effects =
          effectTotal > 0
            ? `<span class="food-card-effect">+${effectTotal}</span>`
            : "";
        return `
          <button
            class="catalog-item${entry.id === state.selected ? " is-selected" : ""}"
            type="button"
            data-food-id="${escapeHtml(entry.id)}"
            aria-label="${escapeHtml(`${t().open} ${localName(entry)}`)}"
            aria-current="${entry.id === state.selected ? "true" : "false"}"
          >
            <span class="catalog-sprite-frame">
              ${itemImage(entry, "catalog-sprite")}
              ${effects}
            </span>
            <span class="catalog-item-copy">
              <strong>${escapeHtml(localName(entry))}</strong>
              <small>${escapeHtml(categoryLabel(entry.category))}</small>
            </span>
            <span class="catalog-item-stat">${stat}</span>
          </button>
        `;
      })
      .join("");

    count.textContent = t().results(visible.length);
    noResults.textContent = t().noResults;
    noResults.hidden = visible.length !== 0;
  }

  function renderDetail() {
    const entry = itemById.get(state.selected) || publicItems[0];
    state.selected = entry.id;
    const obtaining = catalog.recipes.filter(
      (recipe) => recipe.result.item === entry.id,
    );
    const uses = catalog.recipes.filter((recipe) =>
      ingredientIds(recipe).includes(entry.id),
    );
    const sourceLabel =
      entry.source === "minecraft" ? t().sourceMinecraft : t().sourceWarspawn;

    detail.innerHTML = `
      <header class="food-dossier-head">
        <div class="food-hero-sprite">
          ${itemImage(entry, "detail-sprite", localName(entry))}
        </div>
        <div>
          <div class="food-dossier-labels">
            <span>${escapeHtml(categoryLabel(entry.category))}</span>
            <span>${sourceLabel}</span>
          </div>
          <h3>${escapeHtml(localName(entry))}</h3>
          <p>${escapeHtml(descriptionFor(entry))}</p>
        </div>
      </header>

      <section class="food-detail-section" aria-labelledby="food-nutrition-title">
        <div class="food-detail-title">
          <span>01</span>
          <h4 id="food-nutrition-title">${t().nutrition} &amp; ${t().saturation}</h4>
        </div>
        ${renderNutrition(entry)}
      </section>

      <section class="food-detail-section" aria-labelledby="food-effects-title">
        <div class="food-detail-title">
          <span>02</span>
          <h4 id="food-effects-title">${t().effects}</h4>
        </div>
        ${renderEffects(entry)}
      </section>

      <section class="food-detail-section" aria-labelledby="food-obtain-title">
        <div class="food-detail-title">
          <span>03</span>
          <h4 id="food-obtain-title">${t().obtain}</h4>
        </div>
        ${
          obtaining.length
            ? `<div class="recipe-list">${renderRecipeCollection(obtaining)}</div>`
            : `<p class="food-empty-note">${t().noObtain}</p>`
        }
      </section>

      <section class="food-detail-section" aria-labelledby="food-uses-title">
        <div class="food-detail-title">
          <span>04</span>
          <h4 id="food-uses-title">${t().usedIn}</h4>
        </div>
        ${
          uses.length
            ? `<div class="recipe-list">${renderRecipeCollection(uses)}</div>`
            : `<p class="food-empty-note">${t().noUses}</p>`
        }
      </section>

      <section class="food-detail-section" aria-labelledby="food-relations-title">
        <div class="food-detail-title">
          <span>05</span>
          <h4 id="food-relations-title">${t().relations}</h4>
        </div>
        <p class="relations-lead">${t().relationsLead}</p>
        ${renderRelations(entry)}
      </section>
    `;

    localStorage.setItem("warspawn-selected-food", entry.id);
  }

  function updateControls() {
    search.placeholder = t().search;
    search.setAttribute("aria-label", t().searchLabel);
    if (categoryFilters) {
      categoryFilters.setAttribute("aria-label", t().categoriesLabel);
    }
    if (filterControls) {
      filterControls.setAttribute("aria-label", t().advancedFilters);
    }
    localizedFilterLabels.forEach((element) => {
      const key = element.dataset.foodLabel;
      if (t()[key]) element.textContent = t()[key];
    });
    filterButtons.forEach((button) => {
      const key = button.dataset.foodFilter;
      button.textContent = t()[key];
      const isActive = key === state.filter;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    sortSelect.value = state.sort;
    effectFilter.value = state.effectFilter;
    craftFilter.value = state.craftFilter;
  }

  function selectItem(itemId, trigger) {
    if (!itemById.has(itemId)) return;
    state.selected = itemId;
    renderCatalog();
    renderDetail();

    const cameFromRecipe = Boolean(trigger?.closest(".craft-item"));
    const cameFromMobileCatalog =
      Boolean(trigger?.closest(".catalog-item")) &&
      window.matchMedia("(max-width: 980px)").matches;

    if (cameFromRecipe || cameFromMobileCatalog) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      detail.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      detail.focus({ preventScroll: true });
    }
  }

  root.addEventListener("click", (event) => {
    const itemControl = event.target.closest("[data-food-id]");
    if (!itemControl || !root.contains(itemControl)) return;
    selectItem(itemControl.dataset.foodId, itemControl);
  });

  search.addEventListener("input", (event) => {
    state.query = event.currentTarget.value;
    renderCatalog();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.foodFilter;
      updateControls();
      renderCatalog();
    });
  });

  sortSelect.addEventListener("change", (event) => {
    state.sort = event.currentTarget.value;
    renderCatalog();
  });

  effectFilter.addEventListener("change", (event) => {
    state.effectFilter = event.currentTarget.value;
    renderCatalog();
  });

  craftFilter.addEventListener("change", (event) => {
    state.craftFilter = event.currentTarget.value;
    renderCatalog();
  });

  resetFilters.addEventListener("click", () => {
    state.query = "";
    state.filter = "all";
    state.sort = "creative";
    state.effectFilter = "all";
    state.craftFilter = "all";
    search.value = "";
    updateControls();
    renderCatalog();
  });

  document.addEventListener("warspawn:languagechange", (event) => {
    state.language = event.detail.language;
    updateControls();
    renderCatalog();
    renderDetail();
  });

  updateControls();
  renderCatalog();
  renderDetail();
})();
