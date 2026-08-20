"use strict";

/*
 * Catálogo de armaduras do WarSpawn
 *
 * Assim como food-data.js, este arquivo contém somente dados. Cada conjunto,
 * peça e item possui um ID estável, relações e uma lista de receitas pronta
 * para receber os crafts quando eles forem cadastrados.
 */
(function exposeArmorCatalog() {
  const local = (pt, en) => ({ pt, en });

  const emptyRelations = () => ({
    mobs: [],
    drops: [],
    dimensions: [],
    materials: [],
    recipes: [],
  });

  const item = (
    id,
    namePt,
    nameEn,
    image,
    category,
    stats = {},
    options = {},
  ) => ({
    id,
    name: local(namePt, nameEn),
    image,
    category,
    stats,
    catalog: true,
    source: "warspawn",
    recipes: [],
    relations: emptyRelations(),
    ...options,
  });

  const pieceLabels = {
    helmet: local("Capacete", "Helmet"),
    chestplate: local("Peitoral", "Chestplate"),
    leggings: local("Calças", "Leggings"),
    boots: local("Botas", "Boots"),
  };

  const armorPieces = (
    setId,
    qualifierPt,
    qualifierEn,
    basePath,
    files,
    defense,
  ) => ["helmet", "chestplate", "leggings", "boots"].map((slot, index) =>
    item(
      `${setId}-${slot}`,
      `${pieceLabels[slot].pt} ${qualifierPt}`,
      `${qualifierEn} ${pieceLabels[slot].en}`,
      `${basePath}/${files[index]}`,
      "armor",
      { defense: defense[index], slot },
    ),
  );

  const equipment = (
    setId,
    id,
    namePt,
    nameEn,
    file,
    category,
    stats = {},
    options = {},
  ) => item(
    `${setId}-${id}`,
    namePt,
    nameEn,
    `assets/armors/items/${setId}/${file}`,
    category,
    stats,
    options,
  );

  const set = (definition) => ({
    enchantments: [],
    recipes: [],
    relations: emptyRelations(),
    conceptFallback: false,
    ...definition,
    totalDefense: definition.pieces.reduce(
      (total, pieceEntry) => total + pieceEntry.stats.defense,
      0,
    ),
  });

  const sets = [
    set({
      id: "emerald",
      order: 1,
      name: local("Esmeralda", "Emerald"),
      fullName: local("Armadura de Esmeralda", "Emerald Armor"),
      concept: "assets/armors/concepts/emerald.webp",
      game: "assets/armors/game/emerald.png",
      accent: "#42ff70",
      description: local(
        "Um conjunto verde-vivo de ótima proteção e a base necessária para evoluir até a Armadura de XP.",
        "A bright-green set with strong protection and the required base for upgrading into Experience Armor.",
      ),
      acquisition: local(
        "Fabricada com esmeraldas. O conjunto sem uso também participa da criação da Armadura de XP.",
        "Crafted with emeralds. An unused set is also used to create Experience Armor.",
      ),
      abilities: [
        local("A picareta de Esmeralda recebe Toque Suave na referência original.", "The Emerald Pickaxe comes with Silk Touch in the original reference."),
      ],
      pieces: armorPieces(
        "emerald",
        "de Esmeralda",
        "Emerald",
        "assets/armors/items/emerald",
        ["emerald_helmet.png", "emerald_chest.png", "emerald_leggings.png", "emerald_boots.png"],
        [3, 8, 6, 3],
      ),
      relatedItems: [
        equipment("emerald", "sword", "Espada de Esmeralda", "Emerald Sword", "emeraldsword.png", "sword", { attack: 10 }),
        equipment("emerald", "axe", "Machado de Esmeralda", "Emerald Axe", "emeraldaxe.png", "axe", { attack: 9 }),
        equipment("emerald", "pickaxe", "Picareta de Esmeralda", "Emerald Pickaxe", "emeraldpickaxe.png", "pickaxe", { attack: 8 }),
        equipment("emerald", "shovel", "Pá de Esmeralda", "Emerald Shovel", "emeraldshovel.png", "shovel", { attack: 7 }),
        equipment("emerald", "hoe", "Enxada de Esmeralda", "Emerald Hoe", "emeraldhoe.png", "hoe", { attack: 1 }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/emerald-armor.html",
    }),
    set({
      id: "amethyst",
      order: 2,
      name: local("Ametista", "Amethyst"),
      fullName: local("Armadura de Ametista", "Amethyst Armor"),
      concept: "assets/armors/concepts/amethyst.webp",
      game: "assets/armors/game/amethyst.png",
      accent: "#a86bff",
      description: local(
        "Um conjunto roxo, resistente e durável, posicionado entre os melhores equipamentos fabricáveis do OreSpawn clássico.",
        "A purple, tough and durable set ranked among the strongest craftable equipment in classic OreSpawn.",
      ),
      acquisition: local("Fabricada com ametistas.", "Crafted with amethysts."),
      abilities: [local("Alta durabilidade e eficiência.", "High durability and efficiency.")],
      pieces: armorPieces(
        "amethyst",
        "de Ametista",
        "Amethyst",
        "assets/armors/items/amethyst",
        ["amethyst_helmet.png", "amethyst_chest.png", "amethyst_leggings.png", "amethyst_boots.png"],
        [4, 8, 7, 3],
      ),
      relatedItems: [
        equipment("amethyst", "sword", "Espada de Ametista", "Amethyst Sword", "amethystsword.png", "sword", { attack: 15 }),
        equipment("amethyst", "axe", "Machado de Ametista", "Amethyst Axe", "amethystaxe.png", "axe", { attack: 14 }),
        equipment("amethyst", "pickaxe", "Picareta de Ametista", "Amethyst Pickaxe", "amethystpickaxe.png", "pickaxe", { attack: 13 }),
        equipment("amethyst", "shovel", "Pá de Ametista", "Amethyst Shovel", "amethystshovel.png", "shovel", { attack: 12 }),
        equipment("amethyst", "hoe", "Enxada de Ametista", "Amethyst Hoe", "amethysthoe.png", "hoe", { attack: 1 }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/amethyst-armor.html",
    }),
    set({
      id: "experience",
      order: 3,
      name: local("XP", "XP"),
      fullName: local("Armadura de Experiência", "Experience Armor"),
      concept: "assets/armors/concepts/experience.webp",
      game: "assets/armors/game/experience.png",
      accent: "#adff38",
      description: local(
        "Uma evolução da Esmeralda que transforma experiência em progressão constante enquanto sua espada permanece no inventário.",
        "An Emerald upgrade that turns experience into constant progression while its sword remains in the inventory.",
      ),
      acquisition: local(
        "Criada a partir de peças de Esmeralda sem uso e Frascos de Encantamentos.",
        "Created from unused Emerald pieces and Bottles o' Enchanting.",
      ),
      abilities: [
        local("Gera experiência quando usada junto da Espada de Experiência.", "Generates experience when worn with the Experience Sword."),
        local("A Espada de Veneno pertence a esta família no catálogo WarSpawn.", "The Poison Sword belongs to this family in the WarSpawn catalog."),
      ],
      pieces: armorPieces(
        "experience",
        "de Experiência",
        "Experience",
        "assets/armors/items/experience",
        ["experience_helmet.png", "experience_chest.png", "experience_leggings.png", "experience_boots.png"],
        [5, 9, 7, 4],
      ),
      relatedItems: [
        equipment("experience", "sword", "Espada de Experiência", "Experience Sword", "experiencesword.png", "sword", { attack: "10+" }),
        equipment("experience", "poison-sword", "Espada de Veneno", "Poison Sword", "poisonsword.png", "sword", { attack: "10 + veneno", attackEn: "10 + poison" }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/experience-armor.html",
    }),
    set({
      id: "ruby",
      order: 4,
      name: local("Rubi", "Ruby"),
      fullName: local("Armadura de Rubi", "Ruby Armor"),
      concept: "assets/armors/concepts/ruby.webp",
      game: "assets/armors/game/ruby.png",
      accent: "#ff454d",
      description: local(
        "Proteção vermelho-sangue criada com um recurso raro, acompanhada por ferramentas muito eficientes e pelo Cajado de Raios.",
        "Blood-red protection made from a rare resource, paired with highly efficient tools and the Thunder Staff.",
      ),
      acquisition: local("Fabricada com rubis encontrados sob lava.", "Crafted with rubies found beneath lava."),
      abilities: [local("Grande durabilidade e eficiência.", "Great durability and efficiency.")],
      pieces: armorPieces(
        "ruby",
        "de Rubi",
        "Ruby",
        "assets/armors/items/ruby",
        ["ruby_helmet.png", "ruby_chest.png", "ruby_leggings.png", "ruby_boots.png"],
        [4, 9, 8, 4],
      ),
      relatedItems: [
        equipment("ruby", "sword", "Espada de Rubi", "Ruby Sword", "rubysword.png", "sword", { attack: 20 }),
        equipment("ruby", "axe", "Machado de Rubi", "Ruby Axe", "rubyaxe.png", "axe", { attack: 19 }),
        equipment("ruby", "pickaxe", "Picareta de Rubi", "Ruby Pickaxe", "rubypickaxe.png", "pickaxe", { attack: 18 }),
        equipment("ruby", "shovel", "Pá de Rubi", "Ruby Shovel", "rubyshovel.png", "shovel", { attack: 17 }),
        equipment("ruby", "hoe", "Enxada de Rubi", "Ruby Hoe", "rubyhoe.png", "hoe", { attack: 1 }),
        equipment("ruby", "thunder-staff", "Cajado de Raios", "Thunder Staff", "thunderstaff.png", "staff", { attack: "raios", attackEn: "lightning" }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/ruby-armor.html",
    }),
    set({
      id: "ultimate",
      order: 5,
      name: local("Ultimate", "Ultimate"),
      fullName: local("Armadura Ultimate", "Ultimate Armor"),
      concept: "assets/armors/concepts/ultimate.webp",
      game: "assets/armors/game/ultimate.png",
      accent: "#3c8dff",
      description: local(
        "O grande conjunto fabricável do fim de jogo: proteção ampla, ferramentas extremas e utilidades capazes de enfrentar lava.",
        "The premier craftable end-game set: broad protection, extreme tools and utilities capable of facing lava.",
      ),
      acquisition: local(
        "Fabricada com combinações de titânio, urânio e ferro.",
        "Crafted from combinations of titanium, uranium and iron.",
      ),
      abilities: [
        local("Proteções amplas no conjunto histórico.", "Broad protections on the historical set."),
        local("A vara de pesca funciona na lava; o arco dispara rapidamente e usa fogo.", "The fishing rod works in lava; the bow fires rapidly and uses flames."),
      ],
      pieces: armorPieces(
        "ultimate",
        "Ultimate",
        "Ultimate",
        "assets/armors/items/ultimate",
        ["ultimate_helmet.png", "ultimate_chest.png", "ultimate_leggings.png", "ultimate_boots.png"],
        [6, 12, 10, 6],
      ),
      relatedItems: [
        equipment("ultimate", "sword", "Espada Ultimate", "Ultimate Sword", "ultimatesword.png", "sword", { attack: 40 }),
        equipment("ultimate", "axe", "Machado Ultimate", "Ultimate Axe", "ultimateaxe.png", "axe", { attack: 39 }),
        equipment("ultimate", "pickaxe", "Picareta Ultimate", "Ultimate Pickaxe", "ultimatepickaxe.png", "pickaxe", { attack: 38 }),
        equipment("ultimate", "shovel", "Pá Ultimate", "Ultimate Shovel", "ultimateshovel.png", "shovel", { attack: 37 }),
        equipment("ultimate", "hoe", "Enxada Ultimate", "Ultimate Hoe", "ultimatehoe.png", "hoe", { attack: 1 }),
        equipment("ultimate", "bow", "Arco Ultimate", "Ultimate Bow", "ultimatebow.png", "bow", { attack: "rápido + fogo", attackEn: "rapid-fire + flames" }),
        equipment("ultimate", "fishing-rod", "Vara de Pesca Ultimate", "Ultimate Fishing Rod", "ultimatefishingrod.png", "rod", { utility: local("Pesca na lava", "Lava fishing") }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/ultimate-armor.html",
    }),
    set({
      id: "mobzilla",
      order: 6,
      name: local("Mobzilla", "Mobzilla"),
      fullName: local("Armadura de Mobzilla", "Mobzilla Armor"),
      concept: "assets/armors/concepts/mobzilla.webp",
      game: "assets/armors/game/mobzilla.png",
      accent: "#a26cff",
      description: local(
        "Um troféu de combate transformado em proteção extrema. Cada peça representa a vitória sobre Mobzilla.",
        "A battle trophy turned into extreme protection. Every piece represents victory over Mobzilla.",
      ),
      acquisition: local("Fabricada com Escamas de Mobzilla.", "Crafted with Mobzilla Scales."),
      abilities: [local("Proteção X no conjunto histórico.", "Protection X on the historical set.")],
      pieces: armorPieces(
        "mobzilla",
        "de Mobzilla",
        "Mobzilla",
        "assets/armors/items/mobzilla",
        ["mobzilla_helmet.png", "mobzilla_chest.png", "mobzilla_leggings.png", "mobzilla_boots.png"],
        [7, 13, 11, 7],
      ),
      relatedItems: [],
      source: "https://shrekleaker.github.io/orespawn.com/mobzilla-armor.html",
    }),
    set({
      id: "royal-guardian",
      order: 7,
      name: local("Guardião Real", "Royal Guardian"),
      fullName: local("Armadura do Guardião Real", "Royal Guardian Armor"),
      concept: "assets/armors/concepts/royal-guardian.webp",
      game: "assets/armors/game/royal-guardian.png",
      accent: "#ffda57",
      description: local(
        "Equipamento lendário concedido aos que vencem o Rei ou conquistam o nível mais brutal do Challenge Dungeon.",
        "Legendary equipment awarded to those who defeat The King or conquer the most brutal Challenge Dungeon level.",
      ),
      acquisition: local(
        "Obtida ao derrotar The King ou no Challenge Dungeon de nível 6.",
        "Obtained by defeating The King or in the Level 6 Challenge Dungeon.",
      ),
      abilities: [local("As botas permitem planar.", "The boots grant gliding.")],
      pieces: armorPieces(
        "royal-guardian",
        "do Guardião Real",
        "Royal Guardian",
        "assets/armors/items/royal-guardian",
        ["royal_helmet.png", "royal_chest.png", "royal_leggings.png", "royal_boots.png"],
        [8, 14, 12, 8],
      ),
      relatedItems: [
        equipment("royal-guardian", "sword", "Espada do Guardião Real", "Royal Guardian Sword", "royalsmall.png", "sword", { attack: 750 }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/royal-guardian-armor.html",
    }),
    set({
      id: "queen-scale",
      order: 8,
      name: local("A Rainha", "The Queen"),
      fullName: local("Armadura de Escamas da Rainha", "Queen Scale Armor"),
      concept: "assets/armors/concepts/queen-scale.webp",
      game: "assets/armors/game/queen-scale.png",
      accent: "#ff3345",
      description: local(
        "O conjunto de maior defesa bruta do catálogo histórico, forjado com as escamas da própria Rainha.",
        "The set with the highest raw defense in the historical catalog, forged from The Queen's own scales.",
      ),
      acquisition: local("Fabricada com Escamas da Rainha.", "Crafted with Queen Scales."),
      abilities: [
        local("O conjunto original vem sem encantamentos: sua defesa base já é excepcional.", "The original set comes without enchantments: its base defense is already exceptional."),
      ],
      pieces: armorPieces(
        "queen-scale",
        "da Rainha",
        "Queen Scale",
        "assets/armors/items/queen-scale",
        ["queen_helmet.png", "queen_chest.png", "queen_leggings.png", "queen_boots.png"],
        [9, 16, 14, 9],
      ),
      relatedItems: [
        equipment("queen-scale", "battle-axe", "Machado de Batalha da Rainha", "Queen Scale Battle Axe", "queenbattleaxesmall.png", "axe", { attack: "666+" }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/queen-scale-armor.html",
    }),
    set({
      id: "moth-scale",
      order: 9,
      name: local("Mariposa", "Moth"),
      fullName: local("Armadura de Escamas de Mothra", "Moth Scale Armor"),
      concept: "assets/armors/concepts/moth-scale.webp",
      game: "assets/armors/game/moth-scale.png",
      accent: "#ff8138",
      description: local(
        "Proteção criada das escamas de Mothra, pensada para expedições em ambientes explosivos e incendiários.",
        "Protection made from Mothra scales, designed for expeditions through explosive and fiery environments.",
      ),
      acquisition: local("Fabricada com Escamas de Mothra.", "Crafted with Mothra Scales."),
      abilities: [
        local("Proteção, proteção contra explosões, resistência ao fogo e queda suave na referência original.", "Protection, Blast Protection, Fire Resistance and Feather Falling in the original reference."),
      ],
      pieces: armorPieces(
        "moth-scale",
        "de Mothra",
        "Moth Scale",
        "assets/armors/items/moth-scale",
        ["mothscale_helmet.png", "mothscale_chest.png", "mothscale_leggings.png", "mothscale_boots.png"],
        [2, 7, 5, 2],
      ),
      relatedItems: [],
      source: "https://shrekleaker.github.io/orespawn.com/moth-scale-armor.html",
    }),
    set({
      id: "lava-eel",
      order: 10,
      name: local("Enguia de Lava", "Lava Eel"),
      fullName: local("Armadura de Enguia de Lava", "Lava Eel Armor"),
      concept: "assets/armors/concepts/lava-eel.webp",
      game: "assets/armors/game/lava-eel.png",
      accent: "#ff521f",
      description: local(
        "Mais durável que diamante e preparada para o fogo, esta armadura nasce de pescarias nos lagos de lava.",
        "More durable than diamond and prepared for fire, this armor begins with fishing trips through lava lakes.",
      ),
      acquisition: local(
        "Fabricada com Enguias de Lava pescadas usando a Vara Ultimate.",
        "Crafted with Lava Eels caught using the Ultimate Fishing Rod.",
      ),
      abilities: [
        local("Proteções contra fogo e explosões, respiração, afinidade aquática e queda suave na referência original.", "Fire and blast protections, Respiration, Aqua Affinity and Feather Falling in the original reference."),
      ],
      pieces: armorPieces(
        "lava-eel",
        "de Enguia de Lava",
        "Lava Eel",
        "assets/armors/items/lava-eel",
        ["lavaeel_helmet.png", "lavaeel_chest.png", "lavaeel_leggings.png", "lavaeel_boots.png"],
        [2, 7, 5, 2],
      ),
      relatedItems: [],
      source: "https://shrekleaker.github.io/orespawn.com/lava-eel-armor.html",
    }),
    set({
      id: "lapis",
      order: 11,
      name: local("Lápis-Lazúli", "Lapis"),
      fullName: local("Armadura de Lápis-Lazúli", "Lapis Armor"),
      concept: "assets/armors/concepts/lapis.webp",
      game: "assets/armors/game/lapis.png",
      accent: "#55d5ff",
      description: local(
        "Um conjunto azul de uso geral que transforma blocos de lápis-lazúli em proteção elegante e funcional.",
        "A blue all-purpose set that turns lapis lazuli blocks into stylish and functional protection.",
      ),
      acquisition: local("Fabricada com blocos de lápis-lazúli.", "Crafted with lapis lazuli blocks."),
      abilities: [local("Proteção equilibrada para uso geral.", "Balanced protection for general use.")],
      pieces: armorPieces(
        "lapis",
        "de Lápis-Lazúli",
        "Lapis",
        "assets/armors/items/lapis",
        ["lapis_helmet.png", "lapis_chest.png", "lapis_leggings.png", "lapis_boots.png"],
        [2, 7, 5, 2],
      ),
      relatedItems: [],
      source: "https://shrekleaker.github.io/orespawn.com/lapis-armor.html",
    }),
    set({
      id: "peacock",
      order: 12,
      name: local("Pavão", "Peacock"),
      fullName: local("Armadura de Penas de Pavão", "Peacock Feather Armor"),
      concept: "assets/armors/concepts/peacock.webp",
      game: "assets/armors/game/peacock.png",
      accent: "#38e0b9",
      description: local(
        "Uma armadura leve da Dimensão de Cristal, acompanhada pelo Arco Skate e pelas devastadoras Flechas de Irukandji.",
        "A light Crystal Dimension armor paired with the Skate Bow and devastating Irukandji Arrows.",
      ),
      acquisition: local("Fabricada com penas deixadas por pavões.", "Crafted with feathers dropped by peacocks."),
      abilities: [local("As botas oferecem queda suave e planeio.", "The boots provide Feather Falling and gliding.")],
      pieces: armorPieces(
        "peacock",
        "de Pavão",
        "Peacock Feather",
        "assets/armors/items/peacock",
        ["peacock_helmet.png", "peacock_chest.png", "peacock_leggings.png", "peacock_boots.png"],
        [2, 5, 4, 2],
      ),
      relatedItems: [
        equipment("peacock", "skate-bow", "Arco Skate", "Skate Bow", "skatebow.png", "bow", { attack: 100 }),
        equipment("peacock", "irukandji-arrow", "Flecha de Irukandji", "Irukandji Arrow", "irukandjiarrow.png", "arrow", { attack: 100 }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/peacock-feather-armor.html",
    }),
    set({
      id: "tourmaline",
      order: 13,
      name: local("Turmalina", "Tourmaline"),
      fullName: local("Armadura de Turmalina Rosa", "Pink Tourmaline Armor"),
      concept: "assets/armors/concepts/tourmaline.webp",
      game: "assets/armors/game/tourmaline.png",
      accent: "#ff64dc",
      description: local(
        "Equipamento cristalino rosa da Dimensão de Cristal, com uma linha completa de ferramentas correspondentes.",
        "Pink crystalline equipment from the Crystal Dimension with a complete matching tool line.",
      ),
      acquisition: local("Fabricada com turmalina rosa da Dimensão de Cristal.", "Crafted with Pink Tourmaline from the Crystal Dimension."),
      abilities: [local("Pode ser usada pelas Girlfriends na referência original.", "Can be worn by Girlfriends in the original reference.")],
      pieces: armorPieces(
        "tourmaline",
        "de Turmalina",
        "Pink Tourmaline",
        "assets/armors/items/tourmaline",
        ["pink_helmet.png", "pink_chest.png", "pink_leggings.png", "pink_boots.png"],
        [3, 7, 5, 2],
      ),
      relatedItems: [
        equipment("tourmaline", "sword", "Espada de Turmalina", "Pink Tourmaline Sword", "crystalpinksword.png", "sword", { attack: 11 }),
        equipment("tourmaline", "axe", "Machado de Turmalina", "Pink Tourmaline Axe", "crystalpinkaxe.png", "axe", { attack: 10 }),
        equipment("tourmaline", "pickaxe", "Picareta de Turmalina", "Pink Tourmaline Pickaxe", "crystalpinkpickaxe.png", "pickaxe", { attack: 9 }),
        equipment("tourmaline", "shovel", "Pá de Turmalina", "Pink Tourmaline Shovel", "crystalpinkshovel.png", "shovel", { attack: 8 }),
        equipment("tourmaline", "hoe", "Enxada de Turmalina", "Pink Tourmaline Hoe", "crystalpinkhoe.png", "hoe", { attack: 1 }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/pink-tourmaline-armor.html",
    }),
    set({
      id: "tigers-eye",
      order: 14,
      name: local("Olho de Tigre", "Tiger's Eye"),
      fullName: local("Armadura de Olho de Tigre", "Tiger's Eye Armor"),
      concept: "assets/armors/concepts/tigers-eye.webp",
      game: "assets/armors/game/tigers-eye.png",
      accent: "#d5a34e",
      description: local(
        "Uma armadura cristalina quase transparente que encerra a sequência do catálogo e retorna à Esmeralda pelo lado esquerdo da roda.",
        "A nearly transparent crystal armor that closes the catalog sequence and loops back to Emerald on the left side of the wheel.",
      ),
      acquisition: local("Fabricada com Olhos de Tigre da Dimensão de Cristal.", "Crafted with Tiger's Eyes from the Crystal Dimension."),
      abilities: [
        local("Visual translúcido; pode ser usada pelas Girlfriends na referência original.", "See-through appearance; can be worn by Girlfriends in the original reference."),
      ],
      pieces: armorPieces(
        "tigers-eye",
        "de Olho de Tigre",
        "Tiger's Eye",
        "assets/armors/items/tigers-eye",
        ["tigerseye_helmet.png", "tigerseye_chest.png", "tigerseye_leggings.png", "tigerseye_boots.png"],
        [4, 8, 7, 4],
      ),
      relatedItems: [
        equipment("tigers-eye", "sword", "Espada de Olho de Tigre", "Tiger's Eye Sword", "tigerseye_sword.png", "sword", { attack: 12 }),
        equipment("tigers-eye", "axe", "Machado de Olho de Tigre", "Tiger's Eye Axe", "tigerseye_axe.png", "axe", { attack: 11 }),
        equipment("tigers-eye", "pickaxe", "Picareta de Olho de Tigre", "Tiger's Eye Pickaxe", "tigerseye_pickaxe.png", "pickaxe", { attack: 10 }),
        equipment("tigers-eye", "shovel", "Pá de Olho de Tigre", "Tiger's Eye Shovel", "tigerseye_shovel.png", "shovel", { attack: 9 }),
        equipment("tigers-eye", "hoe", "Enxada de Olho de Tigre", "Tiger's Eye Hoe", "tigerseye_hoe.png", "hoe", { attack: 1 }),
      ],
      source: "https://shrekleaker.github.io/orespawn.com/tigers-eye-armor.html",
    }),
  ];

  const items = sets.flatMap((armorSet) => [
    ...armorSet.pieces,
    ...armorSet.relatedItems,
  ]);

  // Segue o mesmo contrato do catálogo culinário: receitas referenciam os IDs
  // estáveis de `items` e podem ser adicionadas sem alterar a interface.
  const recipes = [];

  window.WarSpawnArmorCatalog = Object.freeze({
    version: 1,
    order: sets.map((armorSet) => armorSet.id),
    sets,
    items,
    recipes,
  });
})();
