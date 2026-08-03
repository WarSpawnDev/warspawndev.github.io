"use strict";

/*
 * Registro central das dimensões do WarSpawn.
 *
 * Novos conteúdos devem referenciar uma dimensão pelo `slug` estável. As listas em
 * `content` já estão preparadas para receber os IDs usados pelos catálogos de itens,
 * mobs, chefes, receitas, crafts e conquistas sem duplicar os dados desses sistemas.
 */
(function registerWarSpawnDimensions() {
  const emptyContent = () => ({
    items: [],
    mobs: [],
    bosses: [],
    recipes: [],
    crafts: [],
    achievements: [],
  });

  const entries = [
    {
      slug: "the-end",
      kind: "vanilla",
      name: { pt: "The End", en: "The End" },
      scene: "assets/dimensions/scenes/the-end.webp",
      portal: null,
      glow: "#c66cff",
      clip: "polygon(27.2% 0%, 72.8% 0%, 65% 24.2%, 38.3% 24.2%)",
      origin: "50% 8%",
      lift: { x: 0, y: -6 },
      content: emptyContent(),
    },
    {
      slug: "unstable",
      kind: "warspawn",
      name: { pt: "Instável", en: "Unstable" },
      scene: "assets/dimensions/scenes/unstable.webp",
      portal: {
        image: "assets/dimensions/portals/unstable-ant.webp",
        name: { pt: "Formiga instável", en: "Unstable Ant" },
      },
      glow: "#ff37df",
      clip: "polygon(72.8% 0%, 100% 0%, 100% 33.3%, 78% 39.7%, 65% 24.2%)",
      origin: "88% 12%",
      lift: { x: 5, y: -5 },
      content: emptyContent(),
    },
    {
      slug: "utopia",
      kind: "warspawn",
      name: { pt: "Utopia", en: "Utopia" },
      scene: "assets/dimensions/scenes/utopia.webp",
      portal: {
        image: "assets/dimensions/portals/brown-ant.webp",
        name: { pt: "Formiga marrom", en: "Brown Ant" },
      },
      glow: "#6dff43",
      clip: "polygon(100% 33.3%, 100% 70.5%, 78% 64%, 78% 39.7%)",
      origin: "92% 50%",
      lift: { x: 6, y: 0 },
      content: emptyContent(),
    },
    {
      slug: "mining",
      kind: "warspawn",
      name: { pt: "Mineração", en: "Mining" },
      scene: "assets/dimensions/scenes/mining.webp",
      portal: {
        image: "assets/dimensions/portals/red-ant.webp",
        name: { pt: "Formiga vermelha", en: "Red Ant" },
      },
      glow: "#ff612d",
      clip: "polygon(100% 70.5%, 100% 100%, 72.8% 100%, 64% 78%, 78% 64%)",
      origin: "88% 88%",
      lift: { x: 5, y: 5 },
      content: emptyContent(),
    },
    {
      slug: "nether",
      kind: "vanilla",
      name: { pt: "Nether", en: "Nether" },
      scene: "assets/dimensions/scenes/nether.webp",
      portal: null,
      glow: "#ff382b",
      clip: "polygon(72.8% 100%, 30% 100%, 37.3% 78%, 64% 78%)",
      origin: "50% 92%",
      lift: { x: 0, y: 6 },
      content: emptyContent(),
    },
    {
      slug: "crystal",
      kind: "warspawn",
      name: { pt: "Cristal", en: "Crystal" },
      scene: "assets/dimensions/scenes/crystal.webp",
      portal: {
        image: "assets/dimensions/portals/crystal-termite.webp",
        name: { pt: "Cupim de cristal", en: "Crystal Termite" },
      },
      glow: "#58d9ff",
      clip: "polygon(30% 100%, 0% 100%, 0% 70.5%, 23.2% 64%, 37.3% 78%)",
      origin: "12% 88%",
      lift: { x: -5, y: 5 },
      content: emptyContent(),
    },
    {
      slug: "villages",
      kind: "warspawn",
      name: { pt: "Vilas", en: "Villages" },
      scene: "assets/dimensions/scenes/villages.webp",
      portal: {
        image: "assets/dimensions/portals/rainbow-ant.webp",
        name: { pt: "Formiga colorida", en: "Rainbow Ant" },
      },
      glow: "#4bc7ff",
      clip: "polygon(0% 70.5%, 0% 33.2%, 23.2% 39.7%, 23.2% 64%)",
      origin: "8% 50%",
      lift: { x: -6, y: 0 },
      content: emptyContent(),
    },
    {
      slug: "chaos",
      kind: "warspawn",
      name: { pt: "Caos", en: "Chaos" },
      scene: "assets/dimensions/scenes/chaos.webp",
      portal: {
        image: "assets/dimensions/portals/chaos-butterfly.webp",
        name: { pt: "Borboleta", en: "Butterfly" },
      },
      glow: "#ff9b2f",
      clip: "polygon(0% 33.2%, 0% 0%, 27.2% 0%, 38.3% 24.2%, 23.2% 39.7%)",
      origin: "12% 12%",
      lift: { x: -5, y: -5 },
      content: emptyContent(),
    },
    {
      slug: "overworld",
      kind: "vanilla",
      name: { pt: "Overworld", en: "Overworld" },
      scene: "assets/dimensions/scenes/overworld.webp",
      portal: null,
      glow: "#f4d9a1",
      clip:
        "polygon(38.3% 24.2%, 65% 24.2%, 78% 39.7%, 78% 64%, 64% 78%, 37.3% 78%, 23.2% 64%, 23.2% 39.7%)",
      origin: "50% 50%",
      lift: { x: 0, y: 0 },
      content: emptyContent(),
    },
  ];

  window.WarSpawnDimensions = {
    schemaVersion: 1,
    overviewImage: "assets/dimensions/dimensions-overview.webp",
    selectorImage: "assets/dimensions/dimension-selector.webp",
    contentTypes: ["items", "mobs", "bosses", "recipes", "crafts", "achievements"],
    entries,
    bySlug: Object.fromEntries(entries.map((entry) => [entry.slug, entry])),
  };
})();
