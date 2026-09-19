"use strict";

/*
 * Shared crafting registry used by the food catalog and the Arsenal.
 *
 * The UI is deliberately kept outside this file. This module owns the
 * normalized item/recipe indexes, reverse "used in" lookup and public graph
 * reachability so every view reads from the same source of truth.
 */
(function exposeCraftingCore() {
  function ingredientIds(recipe) {
    if (!recipe) return [];
    if (recipe.station === "furnace") {
      return recipe.ingredient ? [recipe.ingredient] : [];
    }
    return (recipe.grid ?? []).filter(Boolean);
  }

  function createRegistry({ items = [], recipes = [], roots = [] } = {}) {
    const itemsById = new Map(items.map((entry) => [entry.id, entry]));
    const recipesById = new Map();
    const recipesByResult = new Map();
    const recipesByIngredient = new Map();

    recipes.forEach((recipe, index) => {
      const normalized = {
        id: recipe.id || `recipe-${index + 1}`,
        station: "crafting",
        type: "shaped",
        ...recipe,
        result: {
          count: 1,
          ...(recipe.result ?? {}),
        },
      };
      recipesById.set(normalized.id, normalized);

      const resultId = normalized.result.item;
      if (resultId) {
        const bucket = recipesByResult.get(resultId) ?? [];
        bucket.push(normalized);
        recipesByResult.set(resultId, bucket);
      }

      new Set(ingredientIds(normalized)).forEach((ingredientId) => {
        const bucket = recipesByIngredient.get(ingredientId) ?? [];
        bucket.push(normalized);
        recipesByIngredient.set(ingredientId, bucket);
      });
    });

    const publicRoots = new Set(roots.filter((itemId) => itemsById.has(itemId)));
    const reachable = new Set(publicRoots);
    const queue = [...publicRoots];

    while (queue.length) {
      const itemId = queue.shift();
      const obtaining = recipesByResult.get(itemId) ?? [];
      obtaining.forEach((recipe) => {
        ingredientIds(recipe).forEach((ingredientId) => {
          if (!itemsById.has(ingredientId) || reachable.has(ingredientId)) return;
          reachable.add(ingredientId);
          queue.push(ingredientId);
        });
      });
    }

    return Object.freeze({
      itemsById,
      recipesById,
      recipesByResult,
      recipesByIngredient,
      publicRoots,
      reachable,
      ingredientIds,
      getItem(itemId) {
        return itemsById.get(itemId) ?? null;
      },
      getRecipe(recipeId) {
        return recipesById.get(recipeId) ?? null;
      },
      getRecipesForResult(itemId) {
        return recipesByResult.get(itemId) ?? [];
      },
      getRecipesUsingIngredient(itemId) {
        return recipesByIngredient.get(itemId) ?? [];
      },
      isReachable(itemId) {
        return reachable.has(itemId);
      },
    });
  }

  window.WarSpawnCraftingCore = Object.freeze({
    createRegistry,
    ingredientIds,
  });
})();
