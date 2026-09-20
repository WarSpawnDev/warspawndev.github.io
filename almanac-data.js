"use strict";

/*
 * Metadata layer for the global Items / Blocks almanac.
 *
 * This file does not create another item registry. It enriches the original
 * Armor, Crafting and Food entries and keeps references to those same objects.
 */
(function exposeAlmanacData() {
  const armorCatalog = window.WarSpawnArmorCatalog;
  const craftingCatalog = window.WarSpawnCraftingCatalog;
  const foodCatalog = window.WarSpawnCatalog;
  if (!armorCatalog || !craftingCatalog || !foodCatalog) return;

  const local = (pt, en) => ({ pt, en });
  const families = [
    { id: "emerald", name: local("Esmeralda", "Emerald"), order: 10 },
    { id: "amethyst", name: local("Ametista", "Amethyst"), order: 20 },
    { id: "experience", name: local("Experiência", "Experience"), order: 30 },
    { id: "ruby", name: local("Rubi", "Ruby"), order: 40 },
    { id: "ultimate", name: local("Ultimate", "Ultimate"), order: 50 },
    { id: "lava-eel", name: local("Enguia de Lava", "Lava Eel"), order: 60 },
    { id: "moth-scale", name: local("Mottra", "Mothra"), order: 70 },
    { id: "queen-scale", name: local("The Queen", "The Queen"), order: 80 },
    { id: "royal-guardian", name: local("Royal", "Royal"), order: 90 },
    { id: "mobzilla", name: local("Mobzilla", "Mobzilla"), order: 100 },
    { id: "lapis", name: local("Lápis-Lazúli", "Lapis Lazuli"), order: 110 },
    { id: "peacock", name: local("Pavão", "Peacock"), order: 120 },
    { id: "tourmaline", name: local("Turmalina", "Tourmaline"), order: 130 },
    { id: "tigers-eye", name: local("Olho de Tigre", "Tiger's Eye"), order: 140 },
    { id: "crystal", name: local("Cristal", "Crystal"), order: 200 },
    { id: "kyanite", name: local("Cianita", "Kyanite"), order: 210 },
    { id: "titanium", name: local("Titânio", "Titanium"), order: 220 },
    { id: "uranium", name: local("Urânio", "Uranium"), order: 230 },
    { id: "big-bertha", name: local("Big Bertha", "Big Bertha"), order: 240 },
    { id: "end", name: local("Materiais do End", "End Materials"), order: 250 },
    { id: "special-weapons", name: local("Armas especiais", "Special Weapons"), order: 260 },
    { id: "creature-drops", name: local("Materiais de criaturas", "Creature Materials"), order: 300 },
    { id: "utility", name: local("Utilidades", "Utilities"), order: 310 },
    { id: "zoo", name: local("Jaulas Zoo", "Zoo Cages"), order: 320 },
    { id: "food", name: local("Comidas e plantas", "Food and Plants"), order: 400 },
    { id: "uncategorized", name: local("Sem família", "Uncategorized"), order: 999 },
  ];
  const familyById = new Map(families.map((entry) => [entry.id, entry]));
  const armorFamilyByItem = new Map();
  armorCatalog.sets.forEach((set) => {
    [...set.pieces, ...set.relatedItems].forEach((entry) => {
      armorFamilyByItem.set(entry.id, set.id);
    });
  });

  const familyRules = [
    { family: "amethyst", ids: ["ws:amethyst", "ws:amethyst-block"] },
    { family: "ruby", prefixes: ["ws:ruby"] },
    { family: "tourmaline", prefixes: ["ws:tourmaline"] },
    { family: "tigers-eye", prefixes: ["ws:tigers-eye"] },
    { family: "mobzilla", prefixes: ["ws:mobzilla"] },
    { family: "moth-scale", ids: ["ws:moth-scale"] },
    { family: "peacock", ids: ["ws:peacock-feather"] },
    { family: "queen-scale", ids: ["ws:queen-scale"] },
    { family: "experience", ids: ["ws:dead-stink-bug", "ws:green-goo"] },
    { family: "lava-eel", ids: ["lava-eel"] },
    { family: "titanium", prefixes: ["ws:titanium"] },
    { family: "uranium", prefixes: ["ws:uranium"] },
    { family: "big-bertha", prefixes: ["ws:big-bertha"], ids: ["ws:big-hammer", "ws:ray-gun", "ws:mantis-claw", "ws:water-dragon-scale"] },
    { family: "end", ids: ["ws:ender-pearl-block", "ws:eye-of-ender-block"] },
    { family: "special-weapons", ids: ["ws:nightmare-sword", "ws:squidzooka", "ws:creeper-launcher"] },
    { family: "crystal", prefixes: ["ws:crystal-", "ws:fairy-", "ws:flower-", "ws:rat-"] },
    { family: "kyanite", prefixes: ["ws:kyanite"] },
    { family: "zoo", prefixes: ["ws:zoo-"] },
    { family: "utility", categories: ["utility"] },
    { family: "creature-drops", categories: ["material"] },
  ];

  function familyFor(item, sourceKind) {
    if (sourceKind === "food") return "food";
    const armorFamily = armorFamilyByItem.get(item.id);
    if (armorFamily) return armorFamily;
    const rule = familyRules.find((candidate) =>
      candidate.ids?.includes(item.id)
      || candidate.prefixes?.some((prefix) => item.id.startsWith(prefix))
      || candidate.categories?.includes(item.category));
    return rule?.family || "uncategorized";
  }

  function itemType(item) {
    return item.category === "block" ? "block" : "item";
  }

  const foodRecipeResults = new Set(foodCatalog.recipes.map((recipe) => recipe.result.item));
  const entries = [];
  const entryById = new Map();

  function addEntry(item, sourceKind) {
    if (!item || item.source !== "warspawn" || entryById.has(item.id)) return;
    const family = familyFor(item, sourceKind);
    const hasRecipe = craftingCatalog.registry.getRecipesForResult(item.id).length > 0
      || foodRecipeResults.has(item.id);
    const armorContext = armorFamilyByItem.has(item.id);
    const foodPage = foodCatalog.items.some((foodItem) => foodItem.catalog && foodItem.id === item.id);
    const craftingPage = craftingCatalog.registry.isReachable(item.id);
    const pageKind = armorContext ? "armor" : foodPage ? "food" : craftingPage ? "crafting" : "generic";
    const hasDedicatedPage = pageKind !== "generic";
    const hasMetadata = family !== "uncategorized";
    const status = hasDedicatedPage && hasRecipe && hasMetadata
      ? "complete"
      : hasDedicatedPage || hasRecipe
        ? "partial"
        : "undocumented";
    const tags = [...new Set([
      item.category,
      sourceKind,
      family,
      ...(item.tags ?? []),
      ...(item.aliases ?? []),
    ].filter(Boolean))];
    const metadata = Object.freeze({
      type: itemType(item),
      family,
      tags,
      status,
      hasRecipe,
      hasDedicatedPage,
      pageKind,
    });
    item.almanac = metadata;
    const image = window.WarSpawnFoodAssets?.[item.image] || item.image;
    const entry = Object.freeze({ id: item.id, item, image, sourceKind, ...metadata });
    entries.push(entry);
    entryById.set(entry.id, entry);
  }

  craftingCatalog.items.forEach((item) => addEntry(item, "crafting"));
  foodCatalog.items.filter((item) => item.catalog).forEach((item) => addEntry(item, "food"));

  function related(itemId, limit = 10) {
    const current = entryById.get(itemId);
    if (!current || current.family === "uncategorized") return [];
    return entries
      .filter((entry) => entry.id !== itemId && entry.family === current.family)
      .map((entry) => {
        const sharedTags = entry.tags.filter((tag) => current.tags.includes(tag)).length;
        const categoryMatch = entry.item.category === current.item.category ? 4 : 0;
        return { entry, score: 10 + categoryMatch + sharedTags };
      })
      .sort((a, b) => b.score - a.score
        || (a.entry.item.name.pt || a.entry.id).localeCompare(b.entry.item.name.pt || b.entry.id, "pt-BR"))
      .slice(0, limit)
      .map(({ entry }) => entry);
  }

  function publicUses(itemId) {
    const craftUses = craftingCatalog.registry.getRecipesUsingIngredient(itemId)
      .filter((recipe) => craftingCatalog.registry.isReachable(recipe.result.item));
    const foodUses = foodCatalog.recipes.filter((recipe) =>
      (recipe.grid ?? []).includes(itemId)
      && foodCatalog.items.some((item) => item.catalog && item.id === recipe.result.item));
    return [...craftUses, ...foodUses];
  }

  function recipesFor(itemId) {
    return [
      ...craftingCatalog.registry.getRecipesForResult(itemId),
      ...foodCatalog.recipes.filter((recipe) => recipe.result.item === itemId),
    ];
  }

  window.WarSpawnAlmanacData = Object.freeze({
    version: 1,
    entries: Object.freeze(entries),
    families: Object.freeze(families),
    familyById,
    entryById,
    getEntry: (itemId) => entryById.get(itemId) ?? null,
    getRelated: related,
    getRecipesFor: recipesFor,
    getPublicUses: publicUses,
  });
})();
