"use strict";

/* Generated from the 148 audited screenshots in Crafts.zip. */
(function exposeArsenalCraftingCatalog() {
  const armorCatalog = window.WarSpawnArmorCatalog;
  const core = window.WarSpawnCraftingCore;
  if (!armorCatalog || !core) return;

  const extraItems = [
  {
    "id": "mc:stick",
    "name": {
      "pt": "Graveto",
      "en": "Stick"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-stick.png"
  },
  {
    "id": "mc:emerald",
    "name": {
      "pt": "Esmeralda",
      "en": "Emerald"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-emerald.png"
  },
  {
    "id": "mc:poppy",
    "name": {
      "pt": "Papoula",
      "en": "Poppy"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-poppy.png"
  },
  {
    "id": "mc:lapis-block",
    "name": {
      "pt": "Bloco de Lápis-Lazúli",
      "en": "Lapis Lazuli Block"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-lapis-block.png"
  },
  {
    "id": "mc:iron-ingot",
    "name": {
      "pt": "Barra de Ferro",
      "en": "Iron Ingot"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-iron-ingot.png"
  },
  {
    "id": "mc:string",
    "name": {
      "pt": "Linha",
      "en": "String"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-string.png"
  },
  {
    "id": "mc:experience-bottle",
    "name": {
      "pt": "Frasco de Encantamentos",
      "en": "Bottle o' Enchanting"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-experience-bottle.png"
  },
  {
    "id": "mc:redstone-block",
    "name": {
      "pt": "Bloco de Redstone",
      "en": "Block of Redstone"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-redstone-block.png"
  },
  {
    "id": "mc:cobblestone",
    "name": {
      "pt": "Pedregulho",
      "en": "Cobblestone"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-cobblestone.png"
  },
  {
    "id": "mc:ender-pearl",
    "name": {
      "pt": "Pérola do End",
      "en": "Ender Pearl"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-ender-pearl.png"
  },
  {
    "id": "mc:eye-of-ender",
    "name": {
      "pt": "Olho do End",
      "en": "Eye of Ender"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-eye-of-ender.png"
  },
  {
    "id": "mc:gunpowder",
    "name": {
      "pt": "Pólvora",
      "en": "Gunpowder"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-gunpowder.png"
  },
  {
    "id": "mc:oak-planks",
    "name": {
      "pt": "Tábuas de Carvalho",
      "en": "Oak Planks"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-oak-planks.png"
  },
  {
    "id": "mc:diamond",
    "name": {
      "pt": "Diamante",
      "en": "Diamond"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-diamond.png"
  },
  {
    "id": "mc:redstone-dust",
    "name": {
      "pt": "Pó de Redstone",
      "en": "Redstone Dust"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-redstone-dust.png"
  },
  {
    "id": "mc:wheat",
    "name": {
      "pt": "Trigo",
      "en": "Wheat"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-wheat.png"
  },
  {
    "id": "mc:nether-star",
    "name": {
      "pt": "Estrela do Nether",
      "en": "Nether Star"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-nether-star.png"
  },
  {
    "id": "mc:netherrack",
    "name": {
      "pt": "Netherrack",
      "en": "Netherrack"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-netherrack.png"
  },
  {
    "id": "mc:cactus",
    "name": {
      "pt": "Cacto",
      "en": "Cactus"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-cactus.png"
  },
  {
    "id": "mc:apple",
    "name": {
      "pt": "Maçã",
      "en": "Apple"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-apple.png"
  },
  {
    "id": "mc:ink-sac",
    "name": {
      "pt": "Bolsa de Tinta",
      "en": "Ink Sac"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-ink-sac.png"
  },
  {
    "id": "mc:glass-bottle",
    "name": {
      "pt": "Frasco de Vidro",
      "en": "Glass Bottle"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-glass-bottle.png"
  },
  {
    "id": "mc:iron-block",
    "name": {
      "pt": "Bloco de Ferro",
      "en": "Block of Iron"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-iron-block.png"
  },
  {
    "id": "mc:glass",
    "name": {
      "pt": "Vidro",
      "en": "Glass"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-glass.png"
  },
  {
    "id": "mc:quartz-block",
    "name": {
      "pt": "Bloco de Quartzo",
      "en": "Block of Quartz"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-quartz-block.png"
  },
  {
    "id": "mc:paper",
    "name": {
      "pt": "Papel",
      "en": "Paper"
    },
    "source": "minecraft",
    "category": "vanilla",
    "image": "assets/crafting/minecraft/mc-paper.png"
  },
  {
    "id": "ws:amethyst",
    "name": {
      "pt": "Ametista",
      "en": "Amethyst"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-amethyst.png"
  },
  {
    "id": "ws:crystal-planks",
    "name": {
      "pt": "Tábuas de Cristal",
      "en": "Crystal Planks"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-crystal-planks.png"
  },
  {
    "id": "ws:crystal-stick",
    "name": {
      "pt": "Graveto de Cristal",
      "en": "Crystal Stick"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-crystal-stick.png"
  },
  {
    "id": "ws:crystal-fairy",
    "name": {
      "pt": "Cristal de Fada",
      "en": "Fairy Crystal"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-crystal-fairy.png"
  },
  {
    "id": "ws:kyanite",
    "name": {
      "pt": "Cianita",
      "en": "Kyanite"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-kyanite.png"
  },
  {
    "id": "ws:lava-eel",
    "name": {
      "pt": "Enguia de Lava",
      "en": "Lava Eel"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-lava-eel.png"
  },
  {
    "id": "ws:mobzilla-scale",
    "name": {
      "pt": "Escama de Mobzilla",
      "en": "Mobzilla Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-mobzilla-scale.png"
  },
  {
    "id": "ws:moth-scale",
    "name": {
      "pt": "Escama de Mottra",
      "en": "Moth Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-moth-scale.png"
  },
  {
    "id": "ws:peacock-feather",
    "name": {
      "pt": "Pena de Pavão",
      "en": "Peacock Feather"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-peacock-feather.png"
  },
  {
    "id": "ws:dead-stink-bug",
    "name": {
      "pt": "Percevejo Fedorento Morto",
      "en": "Dead Stink Bug"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-dead-stink-bug.png"
  },
  {
    "id": "ws:queen-scale",
    "name": {
      "pt": "Escama da The Queen",
      "en": "The Queen Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-queen-scale.png"
  },
  {
    "id": "ws:crystal-rat",
    "name": {
      "pt": "Cristal de Rato",
      "en": "Rat Crystal"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-crystal-rat.png"
  },
  {
    "id": "ws:ruby",
    "name": {
      "pt": "Rubi",
      "en": "Ruby"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-ruby.png"
  },
  {
    "id": "ws:tigers-eye-ingot",
    "name": {
      "pt": "Barra de Olho de Tigre",
      "en": "Tiger's Eye Ingot"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-tigers-eye-ingot.png"
  },
  {
    "id": "ws:tourmaline-ingot",
    "name": {
      "pt": "Barra de Turmalina Rosa",
      "en": "Pink Tourmaline Ingot"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-tourmaline-ingot.png"
  },
  {
    "id": "ws:titanium-ingot",
    "name": {
      "pt": "Barra de Titânio",
      "en": "Titanium Ingot"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-titanium-ingot.png"
  },
  {
    "id": "ws:uranium-ingot",
    "name": {
      "pt": "Barra de Urânio",
      "en": "Uranium Ingot"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-uranium-ingot.png"
  },
  {
    "id": "ws:titanium-nugget",
    "name": {
      "pt": "Pepita de Titânio",
      "en": "Titanium Nugget"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-titanium-nugget.png"
  },
  {
    "id": "ws:uranium-nugget",
    "name": {
      "pt": "Pepita de Urânio",
      "en": "Uranium Nugget"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-uranium-nugget.png"
  },
  {
    "id": "ws:big-hammer",
    "name": {
      "pt": "Martelo Grande",
      "en": "Big Hammer"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-big-hammer.png"
  },
  {
    "id": "ws:green-goo",
    "name": {
      "pt": "Gosma Verde",
      "en": "Green Goo"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-green-goo.png"
  },
  {
    "id": "ws:big-bertha-blade",
    "name": {
      "pt": "Lâmina da Big Bertha",
      "en": "Big Bertha Blade"
    },
    "source": "warspawn",
    "category": "component",
    "image": "assets/crafting/warspawn/ws-big-bertha-blade.png"
  },
  {
    "id": "ws:big-bertha-guard",
    "name": {
      "pt": "Guarda da Big Bertha",
      "en": "Big Bertha Guard"
    },
    "source": "warspawn",
    "category": "component",
    "image": "assets/crafting/warspawn/ws-big-bertha-guard.png"
  },
  {
    "id": "ws:big-bertha-handle",
    "name": {
      "pt": "Cabo da Big Bertha",
      "en": "Big Bertha Handle"
    },
    "source": "warspawn",
    "category": "component",
    "image": "assets/crafting/warspawn/ws-big-bertha-handle.png"
  },
  {
    "id": "ws:molenoid-nose",
    "name": {
      "pt": "Nariz de Molenoide",
      "en": "Molenoid Nose"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-molenoid-nose.png"
  },
  {
    "id": "ws:sea-monster-scale",
    "name": {
      "pt": "Escama de Monstro Marinho",
      "en": "Sea Monster Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-sea-monster-scale.png"
  },
  {
    "id": "ws:jumpy-bug-scale",
    "name": {
      "pt": "Escama de Inseto Saltador",
      "en": "Jumpy Bug Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-jumpy-bug-scale.png"
  },
  {
    "id": "ws:basilisk-scale",
    "name": {
      "pt": "Escama de Basilisco",
      "en": "Basilisk Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-basilisk-scale.png"
  },
  {
    "id": "ws:nightmare-scale",
    "name": {
      "pt": "Escama de Pesadelo",
      "en": "Nightmare Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-nightmare-scale.png"
  },
  {
    "id": "ws:emperor-scorpion-scale",
    "name": {
      "pt": "Escama de Escorpião-Imperador",
      "en": "Emperor Scorpion Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-emperor-scorpion-scale.png"
  },
  {
    "id": "ws:kraken-tooth",
    "name": {
      "pt": "Dente de Kraken",
      "en": "Kraken Tooth"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-kraken-tooth.png"
  },
  {
    "id": "ws:worm-tooth",
    "name": {
      "pt": "Dente de Verme",
      "en": "Worm Tooth"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-worm-tooth.png"
  },
  {
    "id": "ws:vortex-eye",
    "name": {
      "pt": "Olho de Vórtice",
      "en": "Vortex Eye"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-vortex-eye.png"
  },
  {
    "id": "ws:t-rex-tooth",
    "name": {
      "pt": "Dente de T-Rex",
      "en": "T-Rex Tooth"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-t-rex-tooth.png"
  },
  {
    "id": "ws:caterkiller-jaw",
    "name": {
      "pt": "Mandíbula de Caterkiller",
      "en": "Caterkiller Jaw"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-caterkiller-jaw.png"
  },
  {
    "id": "ws:sea-viper-tongue",
    "name": {
      "pt": "Língua de Víbora-Marinha",
      "en": "Sea Viper Tongue"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-sea-viper-tongue.png"
  },
  {
    "id": "ws:ray-gun",
    "name": {
      "pt": "Arma de Raios",
      "en": "Ray Gun"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-ray-gun.png"
  },
  {
    "id": "ws:mantis-claw",
    "name": {
      "pt": "Garra de Louva-a-Deus",
      "en": "Mantis Claw"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-mantis-claw.png"
  },
  {
    "id": "ws:water-dragon-scale",
    "name": {
      "pt": "Escama de Dragão Aquático",
      "en": "Water Dragon Scale"
    },
    "source": "warspawn",
    "category": "material",
    "image": "assets/crafting/warspawn/ws-water-dragon-scale.png"
  },
  {
    "id": "ws:amethyst-block",
    "name": {
      "pt": "Bloco de Ametista",
      "en": "Amethyst Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-amethyst-block.png"
  },
  {
    "id": "ws:ender-pearl-block",
    "name": {
      "pt": "Bloco de Pérola do End",
      "en": "Ender Pearl Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-ender-pearl-block.png"
  },
  {
    "id": "ws:eye-of-ender-block",
    "name": {
      "pt": "Bloco de Olho do End",
      "en": "Eye of Ender Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-eye-of-ender-block.png"
  },
  {
    "id": "ws:mobzilla-scale-block",
    "name": {
      "pt": "Bloco de Escamas de Mobzilla",
      "en": "Mobzilla Scale Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-mobzilla-scale-block.png"
  },
  {
    "id": "ws:ruby-block",
    "name": {
      "pt": "Bloco de Rubi",
      "en": "Ruby Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-ruby-block.png"
  },
  {
    "id": "ws:tigers-eye-block",
    "name": {
      "pt": "Bloco de Olho de Tigre",
      "en": "Tiger's Eye Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-tigers-eye-block.png"
  },
  {
    "id": "ws:titanium-block",
    "name": {
      "pt": "Bloco de Titânio",
      "en": "Titanium Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-titanium-block.png"
  },
  {
    "id": "ws:tourmaline-block",
    "name": {
      "pt": "Bloco de Turmalina Rosa",
      "en": "Pink Tourmaline Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-tourmaline-block.png"
  },
  {
    "id": "ws:uranium-block",
    "name": {
      "pt": "Bloco de Urânio",
      "en": "Uranium Block"
    },
    "source": "warspawn",
    "category": "block",
    "image": "assets/crafting/warspawn/ws-uranium-block.png"
  },
  {
    "id": "ws:crystal-wood-sword",
    "name": {
      "pt": "Espada de Madeira de Cristal",
      "en": "Crystal Wood Sword"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-crystal-wood-sword.png"
  },
  {
    "id": "ws:crystal-wood-axe",
    "name": {
      "pt": "Machado de Madeira de Cristal",
      "en": "Crystal Wood Axe"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-crystal-wood-axe.png"
  },
  {
    "id": "ws:crystal-wood-pickaxe",
    "name": {
      "pt": "Picareta de Madeira de Cristal",
      "en": "Crystal Wood Pickaxe"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-crystal-wood-pickaxe.png"
  },
  {
    "id": "ws:crystal-wood-shovel",
    "name": {
      "pt": "Pá de Madeira de Cristal",
      "en": "Crystal Wood Shovel"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-crystal-wood-shovel.png"
  },
  {
    "id": "ws:crystal-wood-hoe",
    "name": {
      "pt": "Enxada de Madeira de Cristal",
      "en": "Crystal Wood Hoe"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-crystal-wood-hoe.png"
  },
  {
    "id": "ws:fairy-sword",
    "name": {
      "pt": "Espada de Fada",
      "en": "Fairy Sword"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-fairy-sword.png"
  },
  {
    "id": "ws:flower-sword",
    "name": {
      "pt": "Espada de Flores",
      "en": "Flower Sword"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-flower-sword.png"
  },
  {
    "id": "ws:kyanite-hoe",
    "name": {
      "pt": "Enxada de Cianita",
      "en": "Kyanite Hoe"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-kyanite-hoe.png"
  },
  {
    "id": "ws:kyanite-pickaxe",
    "name": {
      "pt": "Picareta de Cianita",
      "en": "Kyanite Pickaxe"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-kyanite-pickaxe.png"
  },
  {
    "id": "ws:kyanite-shovel",
    "name": {
      "pt": "Pá de Cianita",
      "en": "Kyanite Shovel"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-kyanite-shovel.png"
  },
  {
    "id": "ws:kyanite-sword",
    "name": {
      "pt": "Espada de Cianita",
      "en": "Kyanite Sword"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-kyanite-sword.png"
  },
  {
    "id": "ws:rat-sword",
    "name": {
      "pt": "Espada de Rato",
      "en": "Rat Sword"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-rat-sword.png"
  },
  {
    "id": "ws:instant-shelter",
    "name": {
      "pt": "Abrigo Instantâneo",
      "en": "Instant Shelter"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-instant-shelter.png"
  },
  {
    "id": "ws:wrench",
    "name": {
      "pt": "Chave Inglesa",
      "en": "Wrench"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-wrench.png"
  },
  {
    "id": "ws:stairs-down",
    "name": {
      "pt": "Escadas para Baixo",
      "en": "Stairs Down"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-stairs-down.png"
  },
  {
    "id": "ws:stairs-up",
    "name": {
      "pt": "Escadas para Cima",
      "en": "Stairs Up"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-stairs-up.png"
  },
  {
    "id": "ws:elevator",
    "name": {
      "pt": "Elevador",
      "en": "Elevator"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-elevator.png"
  },
  {
    "id": "ws:instant-garden",
    "name": {
      "pt": "Jardim Instantâneo",
      "en": "Instant Garden"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-instant-garden.png"
  },
  {
    "id": "ws:nether-tracker",
    "name": {
      "pt": "Rastreador do Nether",
      "en": "Nether Tracker"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-nether-tracker.png"
  },
  {
    "id": "ws:miners-dream",
    "name": {
      "pt": "Sonho do Minerador",
      "en": "Miner's Dream"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-miners-dream.png"
  },
  {
    "id": "ws:nightmare-sword",
    "name": {
      "pt": "Espada do Pesadelo",
      "en": "Nightmare Sword"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-nightmare-sword.png"
  },
  {
    "id": "ws:omg-apple",
    "name": {
      "pt": "Maçã OMG",
      "en": "OMG Apple"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-omg-apple.png"
  },
  {
    "id": "ws:sifter",
    "name": {
      "pt": "Peneira",
      "en": "Sifter"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-sifter.png"
  },
  {
    "id": "ws:bridge",
    "name": {
      "pt": "Ponte",
      "en": "Bridge"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-bridge.png"
  },
  {
    "id": "ws:squidzooka",
    "name": {
      "pt": "Lula-Zooka",
      "en": "SquidZooka"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-squidzooka.png"
  },
  {
    "id": "ws:experience-capturator",
    "name": {
      "pt": "Capturador de Experiência",
      "en": "Experience Capturator"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-experience-capturator.png"
  },
  {
    "id": "ws:creeper-launcher",
    "name": {
      "pt": "Lançador de Creeper",
      "en": "Creeper Launcher"
    },
    "source": "warspawn",
    "category": "equipment",
    "image": "assets/crafting/warspawn/ws-creeper-launcher.png"
  },
  {
    "id": "ws:zoo-2",
    "name": {
      "pt": "Jaula Zoo SP",
      "en": "Zoo SP Cage"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-zoo-2.png"
  },
  {
    "id": "ws:zoo-4",
    "name": {
      "pt": "Jaula Zoo P",
      "en": "Zoo P Cage"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-zoo-4.png"
  },
  {
    "id": "ws:zoo-6",
    "name": {
      "pt": "Jaula Zoo M",
      "en": "Zoo M Cage"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-zoo-6.png"
  },
  {
    "id": "ws:zoo-8",
    "name": {
      "pt": "Jaula Zoo G",
      "en": "Zoo G Cage"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-zoo-8.png"
  },
  {
    "id": "ws:zoo-10",
    "name": {
      "pt": "Jaula Zoo GG",
      "en": "Zoo GG Cage"
    },
    "source": "warspawn",
    "category": "utility",
    "image": "assets/crafting/warspawn/ws-zoo-10.png"
  },
  {
    "id": "ws:zoo-exg",
    "name": {
      "pt": "Jaula Zoo EXG",
      "en": "Zoo EXG Cage"
    },
    "source": "warspawn",
    "category": "utility",
    "assetNote": "O pacote não contém uma textura individual exclusiva para a variante EXG.",
    "image": "assets/crafting/warspawn/ws-zoo-10.png"
  }
];
  const recipes = [
  {
    "id": "arsenal-craft-001",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:amethyst",
      "ws:amethyst",
      null,
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "amethyst-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist  Hoe.png",
      "index": 1
    }
  },
  {
    "id": "arsenal-craft-002",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:amethyst",
      "ws:amethyst",
      null,
      "ws:amethyst",
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "amethyst-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist Axe.png",
      "index": 2
    }
  },
  {
    "id": "arsenal-craft-003",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:amethyst",
      null,
      "ws:amethyst",
      "ws:amethyst",
      null,
      "ws:amethyst"
    ],
    "result": {
      "item": "amethyst-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist Boots.png",
      "index": 3
    }
  },
  {
    "id": "arsenal-craft-004",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:amethyst",
      null,
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst"
    ],
    "result": {
      "item": "amethyst-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist ChestPlate.png",
      "index": 4
    }
  },
  {
    "id": "arsenal-craft-005",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "amethyst-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist Pick.png",
      "index": 5
    }
  },
  {
    "id": "arsenal-craft-006",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:amethyst",
      null,
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "amethyst-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist Shovel .png",
      "index": 6
    }
  },
  {
    "id": "arsenal-craft-007",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:amethyst",
      null,
      null,
      "ws:amethyst",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "amethyst-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist Sword.png",
      "index": 7
    }
  },
  {
    "id": "arsenal-craft-008",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      null,
      "ws:amethyst"
    ],
    "result": {
      "item": "amethyst-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist helmet.png",
      "index": 8
    }
  },
  {
    "id": "arsenal-craft-009",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      null,
      "ws:amethyst",
      "ws:amethyst",
      null,
      "ws:amethyst"
    ],
    "result": {
      "item": "amethyst-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ametist leggs.png",
      "index": 9
    }
  },
  {
    "id": "arsenal-craft-010",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:crystal-planks",
      null,
      null,
      "ws:crystal-planks",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:crystal-wood-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Cristal  plaks Sword.png",
      "index": 10
    }
  },
  {
    "id": "arsenal-craft-011",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:crystal-planks",
      "ws:crystal-planks",
      null,
      "ws:crystal-planks",
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:crystal-wood-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Cristal Planks Sword.png",
      "index": 11
    }
  },
  {
    "id": "arsenal-craft-012",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:crystal-planks",
      "ws:crystal-planks",
      "ws:crystal-planks",
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:crystal-wood-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Cristal planks Pick.png",
      "index": 12
    }
  },
  {
    "id": "arsenal-craft-013",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:crystal-planks",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:crystal-wood-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Cristal planks Shovel.png",
      "index": 13
    }
  },
  {
    "id": "arsenal-craft-014",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:crystal-planks",
      "ws:crystal-planks",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:crystal-wood-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Cristal planks hoe.png",
      "index": 14
    }
  },
  {
    "id": "arsenal-craft-015",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "emerald-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald  Pick.png",
      "index": 15
    }
  },
  {
    "id": "arsenal-craft-016",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "mc:emerald",
      null,
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "emerald-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald  Shovel.png",
      "index": 16
    }
  },
  {
    "id": "arsenal-craft-017",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:emerald",
      "mc:emerald",
      null,
      "mc:emerald",
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "emerald-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald Axe.png",
      "index": 17
    }
  },
  {
    "id": "arsenal-craft-018",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "mc:emerald",
      null,
      "mc:emerald",
      "mc:emerald",
      null,
      "mc:emerald"
    ],
    "result": {
      "item": "emerald-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald Boots.png",
      "index": 18
    }
  },
  {
    "id": "arsenal-craft-019",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:emerald",
      null,
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      "mc:emerald"
    ],
    "result": {
      "item": "emerald-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald Chestplate.png",
      "index": 19
    }
  },
  {
    "id": "arsenal-craft-020",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:emerald",
      "mc:emerald",
      null,
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "emerald-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald Hoe.png",
      "index": 20
    }
  },
  {
    "id": "arsenal-craft-021",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      null,
      "mc:emerald",
      "mc:emerald",
      null,
      "mc:emerald"
    ],
    "result": {
      "item": "emerald-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald Legs.png",
      "index": 21
    }
  },
  {
    "id": "arsenal-craft-022",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "mc:emerald",
      null,
      null,
      "mc:emerald",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "emerald-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Emerald Sword.png",
      "index": 22
    }
  },
  {
    "id": "arsenal-craft-023",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:crystal-fairy",
      null,
      null,
      "ws:crystal-fairy",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:fairy-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Fairy Sword.png",
      "index": 23
    }
  },
  {
    "id": "arsenal-craft-024",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "mc:poppy",
      null,
      null,
      "mc:poppy",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "ws:flower-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Flower Sword.png",
      "index": 24
    }
  },
  {
    "id": "arsenal-craft-025",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:kyanite",
      "ws:kyanite",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:kyanite-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Kyanite Hoe.png",
      "index": 25
    }
  },
  {
    "id": "arsenal-craft-026",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:kyanite",
      "ws:kyanite",
      "ws:kyanite",
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:kyanite-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Kyanite Pick.png",
      "index": 26
    }
  },
  {
    "id": "arsenal-craft-027",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:kyanite",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:kyanite-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Kyanite Shovel.png",
      "index": 27
    }
  },
  {
    "id": "arsenal-craft-028",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:kyanite",
      null,
      null,
      "ws:kyanite",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:kyanite-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Kyanite Sword.png",
      "index": 28
    }
  },
  {
    "id": "arsenal-craft-029",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:lapis-block",
      null,
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block"
    ],
    "result": {
      "item": "lapis-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Lapis Chestplate.png",
      "index": 29
    }
  },
  {
    "id": "arsenal-craft-030",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      null,
      "mc:lapis-block"
    ],
    "result": {
      "item": "lapis-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Lapis Helmet.png",
      "index": 30
    }
  },
  {
    "id": "arsenal-craft-031",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      "mc:lapis-block",
      null,
      "mc:lapis-block",
      "mc:lapis-block",
      null,
      "mc:lapis-block"
    ],
    "result": {
      "item": "lapis-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Lapis leggs.png",
      "index": 31
    }
  },
  {
    "id": "arsenal-craft-032",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:lava-eel",
      null,
      "ws:lava-eel",
      "ws:lava-eel",
      null,
      "ws:lava-eel"
    ],
    "result": {
      "item": "lava-eel-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Lavael Boots.png",
      "index": 32
    }
  },
  {
    "id": "arsenal-craft-033",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:lava-eel",
      null,
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel"
    ],
    "result": {
      "item": "lava-eel-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Lavael Chestplate.png",
      "index": 33
    }
  },
  {
    "id": "arsenal-craft-034",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      null,
      "ws:lava-eel",
      "ws:lava-eel",
      null,
      "ws:lava-eel"
    ],
    "result": {
      "item": "lava-eel-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Lavael Leggs.png",
      "index": 34
    }
  },
  {
    "id": "arsenal-craft-035",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:mobzilla-scale",
      null,
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale"
    ],
    "result": {
      "item": "mobzilla-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mobzilla Chestplate.png",
      "index": 35
    }
  },
  {
    "id": "arsenal-craft-036",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      null,
      "ws:mobzilla-scale"
    ],
    "result": {
      "item": "mobzilla-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mobzilla Helmet.png",
      "index": 36
    }
  },
  {
    "id": "arsenal-craft-037",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:mobzilla-scale",
      null,
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      null,
      "ws:mobzilla-scale"
    ],
    "result": {
      "item": "mobzilla-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mobzilla boots.png",
      "index": 37
    }
  },
  {
    "id": "arsenal-craft-038",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      null,
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      null,
      "ws:mobzilla-scale"
    ],
    "result": {
      "item": "mobzilla-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mobzilla leggs.png",
      "index": 38
    }
  },
  {
    "id": "arsenal-craft-039",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:moth-scale",
      null,
      "ws:moth-scale",
      "ws:moth-scale",
      null,
      "ws:moth-scale"
    ],
    "result": {
      "item": "moth-scale-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mottra Boots.png",
      "index": 39
    }
  },
  {
    "id": "arsenal-craft-040",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:moth-scale",
      null,
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale"
    ],
    "result": {
      "item": "moth-scale-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mottra Chestplate.png",
      "index": 40
    }
  },
  {
    "id": "arsenal-craft-041",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      null,
      "ws:moth-scale"
    ],
    "result": {
      "item": "moth-scale-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mottra Helmet.png",
      "index": 41
    }
  },
  {
    "id": "arsenal-craft-042",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      "ws:moth-scale",
      null,
      "ws:moth-scale",
      "ws:moth-scale",
      null,
      "ws:moth-scale"
    ],
    "result": {
      "item": "moth-scale-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Mottra Leggs.png",
      "index": 42
    }
  },
  {
    "id": "arsenal-craft-043",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:peacock-feather",
      null,
      "ws:peacock-feather",
      "ws:peacock-feather",
      null,
      "ws:peacock-feather"
    ],
    "result": {
      "item": "peacock-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Peacock Boots.png",
      "index": 43
    }
  },
  {
    "id": "arsenal-craft-044",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:peacock-feather",
      null,
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather"
    ],
    "result": {
      "item": "peacock-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Peacock Chestplate.png",
      "index": 44
    }
  },
  {
    "id": "arsenal-craft-045",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      null,
      "ws:peacock-feather"
    ],
    "result": {
      "item": "peacock-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Peacock Helmet.png",
      "index": 45
    }
  },
  {
    "id": "arsenal-craft-046",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      "ws:peacock-feather",
      null,
      "ws:peacock-feather",
      "ws:peacock-feather",
      null,
      "ws:peacock-feather"
    ],
    "result": {
      "item": "peacock-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Peacock Legss.png",
      "index": 46
    }
  },
  {
    "id": "arsenal-craft-047",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:dead-stink-bug",
      "ws:dead-stink-bug",
      "ws:dead-stink-bug",
      "ws:dead-stink-bug",
      "emerald-sword",
      "ws:dead-stink-bug",
      "ws:dead-stink-bug",
      "ws:dead-stink-bug",
      "ws:dead-stink-bug"
    ],
    "result": {
      "item": "experience-poison-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Poiseon Sword.png",
      "index": 47
    }
  },
  {
    "id": "arsenal-craft-048",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:queen-scale",
      null,
      "ws:queen-scale",
      "ws:queen-scale",
      null,
      "ws:queen-scale"
    ],
    "result": {
      "item": "queen-scale-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Queen Boots.png",
      "index": 48
    }
  },
  {
    "id": "arsenal-craft-049",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:queen-scale",
      null,
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale"
    ],
    "result": {
      "item": "queen-scale-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Queen Chestplate.png",
      "index": 49
    }
  },
  {
    "id": "arsenal-craft-050",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      null,
      "ws:queen-scale"
    ],
    "result": {
      "item": "queen-scale-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Queen Helmet.png",
      "index": 50
    }
  },
  {
    "id": "arsenal-craft-051",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      "ws:queen-scale",
      null,
      "ws:queen-scale",
      "ws:queen-scale",
      null,
      "ws:queen-scale"
    ],
    "result": {
      "item": "queen-scale-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Queen Leggs.png",
      "index": 51
    }
  },
  {
    "id": "arsenal-craft-052",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:crystal-rat",
      null,
      null,
      "ws:crystal-rat",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "ws:rat-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rat Sword.png",
      "index": 52
    }
  },
  {
    "id": "arsenal-craft-053",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:ruby",
      "ws:ruby",
      null,
      "ws:ruby",
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "ruby-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Axe.png",
      "index": 53
    }
  },
  {
    "id": "arsenal-craft-054",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:ruby",
      null,
      "ws:ruby",
      "ws:ruby",
      null,
      "ws:ruby"
    ],
    "result": {
      "item": "ruby-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Boots.png",
      "index": 54
    }
  },
  {
    "id": "arsenal-craft-055",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:ruby",
      null,
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby"
    ],
    "result": {
      "item": "ruby-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Chestplate.png",
      "index": 55
    }
  },
  {
    "id": "arsenal-craft-056",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      null,
      "ws:ruby"
    ],
    "result": {
      "item": "ruby-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Helmet.png",
      "index": 56
    }
  },
  {
    "id": "arsenal-craft-057",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:ruby",
      "ws:ruby",
      null,
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "ruby-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Hoe.png",
      "index": 57
    }
  },
  {
    "id": "arsenal-craft-058",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      null,
      "ws:ruby",
      "ws:ruby",
      null,
      "ws:ruby"
    ],
    "result": {
      "item": "ruby-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Leggs.png",
      "index": 58
    }
  },
  {
    "id": "arsenal-craft-059",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "ruby-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Pick.png",
      "index": 59
    }
  },
  {
    "id": "arsenal-craft-060",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:ruby",
      null,
      null,
      "mc:stick",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "ruby-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Shovel.png",
      "index": 60
    }
  },
  {
    "id": "arsenal-craft-061",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:ruby",
      null,
      null,
      "ws:ruby",
      null,
      null,
      "mc:stick",
      null
    ],
    "result": {
      "item": "ruby-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Rubi Sword.png",
      "index": 61
    }
  },
  {
    "id": "arsenal-craft-062",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:tigers-eye-ingot",
      null,
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      null,
      "ws:tigers-eye-ingot"
    ],
    "result": {
      "item": "tigers-eye-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye  Boots.png",
      "index": 62
    }
  },
  {
    "id": "arsenal-craft-063",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tigers-eye-ingot",
      null,
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot"
    ],
    "result": {
      "item": "tigers-eye-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye  Chestplate.png",
      "index": 63
    }
  },
  {
    "id": "arsenal-craft-064",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tigers-eye-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye  Hoe.png",
      "index": 64
    }
  },
  {
    "id": "arsenal-craft-065",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      null,
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      null,
      "ws:tigers-eye-ingot"
    ],
    "result": {
      "item": "tigers-eye-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye  Leggs.png",
      "index": 65
    }
  },
  {
    "id": "arsenal-craft-066",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      null,
      "ws:tigers-eye-ingot",
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tigers-eye-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye Axe.png",
      "index": 66
    }
  },
  {
    "id": "arsenal-craft-067",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tigers-eye-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye Pick.png",
      "index": 67
    }
  },
  {
    "id": "arsenal-craft-068",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:tigers-eye-ingot",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tigers-eye-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye Shovel.png",
      "index": 68
    }
  },
  {
    "id": "arsenal-craft-069",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:tigers-eye-ingot",
      null,
      null,
      "ws:tigers-eye-ingot",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tigers-eye-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye Sword.png",
      "index": 69
    }
  },
  {
    "id": "arsenal-craft-070",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      null,
      "ws:tigers-eye-ingot"
    ],
    "result": {
      "item": "tigers-eye-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Tigereye helmet.png",
      "index": 70
    }
  },
  {
    "id": "arsenal-craft-071",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tourmaline-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmalim Hoe.png",
      "index": 71
    }
  },
  {
    "id": "arsenal-craft-072",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tourmaline-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmalim Pick.png",
      "index": 72
    }
  },
  {
    "id": "arsenal-craft-073",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:tourmaline-ingot",
      null,
      null,
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tourmaline-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmalim Shovel.png",
      "index": 73
    }
  },
  {
    "id": "arsenal-craft-074",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      null,
      "ws:tourmaline-ingot",
      "ws:crystal-stick",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tourmaline-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmalin Axe.png",
      "index": 74
    }
  },
  {
    "id": "arsenal-craft-075",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:tourmaline-ingot",
      null,
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      null,
      "ws:tourmaline-ingot"
    ],
    "result": {
      "item": "tourmaline-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmaline Boots.png",
      "index": 75
    }
  },
  {
    "id": "arsenal-craft-076",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tourmaline-ingot",
      null,
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot"
    ],
    "result": {
      "item": "tourmaline-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmaline Chestplate.png",
      "index": 76
    }
  },
  {
    "id": "arsenal-craft-077",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      null,
      "ws:tourmaline-ingot"
    ],
    "result": {
      "item": "tourmaline-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmaline Helmet.png",
      "index": 77
    }
  },
  {
    "id": "arsenal-craft-078",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:tourmaline-ingot",
      null,
      null,
      "ws:tourmaline-ingot",
      null,
      null,
      "ws:crystal-stick",
      null
    ],
    "result": {
      "item": "tourmaline-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmaline Sword.png",
      "index": 78
    }
  },
  {
    "id": "arsenal-craft-079",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      null,
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      null,
      "ws:tourmaline-ingot"
    ],
    "result": {
      "item": "tourmaline-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Turmaline leggs.png",
      "index": 79
    }
  },
  {
    "id": "arsenal-craft-080",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:titanium-ingot",
      "ws:uranium-ingot",
      null,
      "ws:titanium-ingot",
      "mc:iron-ingot",
      null,
      null,
      "mc:iron-ingot",
      null
    ],
    "result": {
      "item": "ultimate-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Axe.png",
      "index": 80
    }
  },
  {
    "id": "arsenal-craft-081",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:titanium-ingot",
      null,
      "ws:titanium-ingot",
      "ws:uranium-ingot",
      null,
      "ws:uranium-ingot"
    ],
    "result": {
      "item": "ultimate-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Boots.png",
      "index": 81
    }
  },
  {
    "id": "arsenal-craft-082",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:iron-ingot",
      null,
      "mc:iron-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:uranium-ingot"
    ],
    "result": {
      "item": "ultimate-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Chestplate.png",
      "index": 82
    }
  },
  {
    "id": "arsenal-craft-083",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      "ws:titanium-ingot",
      null,
      "ws:uranium-ingot",
      "mc:string",
      "mc:iron-ingot",
      null,
      "mc:string"
    ],
    "result": {
      "item": "ultimate-fishing-rod",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Fishing Road.png",
      "index": 83
    }
  },
  {
    "id": "arsenal-craft-084",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:titanium-ingot",
      "mc:iron-ingot",
      "ws:titanium-ingot",
      "ws:uranium-ingot",
      null,
      "ws:uranium-ingot"
    ],
    "result": {
      "item": "ultimate-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Helmet.png",
      "index": 84
    }
  },
  {
    "id": "arsenal-craft-085",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:titanium-ingot",
      "ws:uranium-ingot",
      null,
      null,
      "mc:iron-ingot",
      null,
      null,
      "mc:iron-ingot",
      null
    ],
    "result": {
      "item": "ultimate-hoe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Hoe.png",
      "index": 85
    }
  },
  {
    "id": "arsenal-craft-086",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:iron-ingot",
      "mc:iron-ingot",
      "mc:iron-ingot",
      "ws:titanium-ingot",
      null,
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      null,
      "ws:uranium-ingot"
    ],
    "result": {
      "item": "ultimate-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Leggs.png",
      "index": 86
    }
  },
  {
    "id": "arsenal-craft-087",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:titanium-ingot",
      "ws:uranium-ingot",
      "ws:titanium-ingot",
      null,
      "ws:uranium-ingot",
      null,
      null,
      "mc:iron-ingot",
      null
    ],
    "result": {
      "item": "ultimate-pickaxe",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Pick.png",
      "index": 87
    }
  },
  {
    "id": "arsenal-craft-088",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:uranium-ingot",
      null,
      null,
      "ws:titanium-ingot",
      null,
      null,
      "mc:iron-ingot",
      null
    ],
    "result": {
      "item": "ultimate-shovel",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Shovel.png",
      "index": 88
    }
  },
  {
    "id": "arsenal-craft-089",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:titanium-ingot",
      null,
      null,
      "ws:uranium-ingot",
      null,
      null,
      "mc:iron-ingot",
      null
    ],
    "result": {
      "item": "ultimate-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft Ultimate Sword.png",
      "index": 89
    }
  },
  {
    "id": "arsenal-craft-090",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "emerald-sword",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle"
    ],
    "result": {
      "item": "experience-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft XP Sword.png",
      "index": 90
    }
  },
  {
    "id": "arsenal-craft-091",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "emerald-boots",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle"
    ],
    "result": {
      "item": "experience-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft XP bots.png",
      "index": 91
    }
  },
  {
    "id": "arsenal-craft-092",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "emerald-chestplate",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle"
    ],
    "result": {
      "item": "experience-chestplate",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft XP chestplate.png",
      "index": 92
    }
  },
  {
    "id": "arsenal-craft-093",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "emerald-helmet",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle"
    ],
    "result": {
      "item": "experience-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft XP helmet.png",
      "index": 93
    }
  },
  {
    "id": "arsenal-craft-094",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "emerald-leggings",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle",
      "mc:experience-bottle"
    ],
    "result": {
      "item": "experience-leggings",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft XP legs.png",
      "index": 94
    }
  },
  {
    "id": "arsenal-craft-095",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      "mc:emerald",
      null,
      "mc:emerald"
    ],
    "result": {
      "item": "emerald-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft emerald Helmt.png",
      "index": 95
    }
  },
  {
    "id": "arsenal-craft-096",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "mc:lapis-block",
      null,
      "mc:lapis-block",
      "mc:lapis-block",
      null,
      "mc:lapis-block"
    ],
    "result": {
      "item": "lapis-boots",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft lapis boots.png",
      "index": 96
    }
  },
  {
    "id": "arsenal-craft-097",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      "ws:lava-eel",
      null,
      "ws:lava-eel"
    ],
    "result": {
      "item": "lava-eel-helmet",
      "count": 1
    },
    "source": {
      "screenshot": "Armors/Craft lavael helmet.png",
      "index": 97
    }
  },
  {
    "id": "arsenal-craft-098",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:queen-scale",
      "mc:iron-ingot",
      "ws:queen-scale",
      "ws:queen-scale",
      "mc:iron-ingot",
      "ws:queen-scale",
      null,
      "mc:iron-ingot",
      null
    ],
    "result": {
      "item": "queen-scale-battle-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Craft .png",
      "index": 98
    }
  },
  {
    "id": "arsenal-craft-099",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "mc:redstone-block",
      "mc:stick",
      null,
      "mc:cobblestone",
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:instant-shelter",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Abrigo instanteneo.png",
      "index": 99
    }
  },
  {
    "id": "arsenal-craft-100",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst",
      "ws:amethyst"
    ],
    "result": {
      "item": "ws:amethyst-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Ametist Block.png",
      "index": 100
    }
  },
  {
    "id": "arsenal-craft-101",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ultimate-sword",
      "ultimate-sword",
      null,
      "ws:big-hammer",
      "ws:green-goo",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ultimate-attitude-adjuster-og",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Attitude Adjuster OG.png",
      "index": 101
    }
  },
  {
    "id": "arsenal-craft-102",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ultimate-sword",
      "ultimate-pickaxe",
      null,
      "ws:big-hammer",
      "ws:green-goo",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ultimate-attitude-adjuster",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Attitude Adjuster.png",
      "index": 102
    }
  },
  {
    "id": "arsenal-craft-103",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ultimate-sword",
      "ultimate-axe",
      null,
      "ws:green-goo",
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ultimate-battle-axe-og",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Battle Axe OG.png",
      "index": 103
    }
  },
  {
    "id": "arsenal-craft-104",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ultimate-sword",
      "ultimate-hoe",
      null,
      "ws:green-goo",
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ultimate-battle-axe",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Battle Axe.png",
      "index": 104
    }
  },
  {
    "id": "arsenal-craft-105",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      "ws:big-bertha-blade",
      null,
      "ws:big-bertha-guard",
      null,
      "ws:big-bertha-handle",
      null,
      null
    ],
    "result": {
      "item": "mobzilla-big-bertha",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Big Bertha.png",
      "index": 105
    }
  },
  {
    "id": "arsenal-craft-106",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block",
      "ultimate-axe",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block"
    ],
    "result": {
      "item": "ultimate-chainsawn",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Chaisawn.png",
      "index": 106
    }
  },
  {
    "id": "arsenal-craft-107",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:iron-ingot",
      null,
      "mc:iron-ingot",
      null,
      "mc:iron-ingot",
      null,
      null,
      "mc:iron-ingot",
      null
    ],
    "result": {
      "item": "ws:wrench",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Chave Inglesa.png",
      "index": 107
    }
  },
  {
    "id": "arsenal-craft-108",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:ender-pearl",
      "mc:ender-pearl",
      "mc:ender-pearl",
      "mc:ender-pearl",
      "mc:ender-pearl",
      "mc:ender-pearl",
      "mc:ender-pearl",
      "mc:ender-pearl",
      "mc:ender-pearl"
    ],
    "result": {
      "item": "ws:ender-pearl-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Ender Preal Block.png",
      "index": 108
    }
  },
  {
    "id": "arsenal-craft-109",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:eye-of-ender",
      "mc:eye-of-ender",
      "mc:eye-of-ender",
      "mc:eye-of-ender",
      "mc:eye-of-ender",
      "mc:eye-of-ender",
      "mc:eye-of-ender",
      "mc:eye-of-ender",
      "mc:eye-of-ender"
    ],
    "result": {
      "item": "ws:eye-of-ender-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft EnderEye Block.png",
      "index": 109
    }
  },
  {
    "id": "arsenal-craft-110",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "mc:cobblestone",
      null,
      null,
      "mc:cobblestone",
      null,
      "mc:gunpowder",
      "mc:cobblestone",
      null
    ],
    "result": {
      "item": "ws:stairs-down",
      "count": 8
    },
    "source": {
      "screenshot": "Craft Escadas Descendo.png",
      "index": 110
    }
  },
  {
    "id": "arsenal-craft-111",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:gunpowder",
      "mc:cobblestone",
      null,
      null,
      "mc:cobblestone",
      null,
      null,
      "mc:cobblestone",
      null
    ],
    "result": {
      "item": "ws:stairs-up",
      "count": 8
    },
    "source": {
      "screenshot": "Craft Escadas Subindo.png",
      "index": 111
    }
  },
  {
    "id": "arsenal-craft-112",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:molenoid-nose",
      "ws:sea-monster-scale",
      "ws:jumpy-bug-scale",
      "ws:moth-scale",
      "ws:basilisk-scale",
      "ws:nightmare-scale",
      "ws:emperor-scorpion-scale",
      null,
      null
    ],
    "result": {
      "item": "ws:big-bertha-guard",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Guarda Big Bertha.png",
      "index": 112
    }
  },
  {
    "id": "arsenal-craft-113",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      null,
      null,
      null,
      "mc:oak-planks",
      "mc:oak-planks",
      "mc:oak-planks",
      "mc:diamond",
      "mc:redstone-dust",
      "mc:diamond"
    ],
    "result": {
      "item": "ws:elevator",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Hover.png",
      "index": 113
    }
  },
  {
    "id": "arsenal-craft-114",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "mc:redstone-block",
      "mc:wheat",
      null,
      "mc:gunpowder",
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:instant-garden",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Jardim Instantaneo.png",
      "index": 114
    }
  },
  {
    "id": "arsenal-craft-115",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:kraken-tooth",
      "ws:worm-tooth",
      "ws:vortex-eye",
      "ws:t-rex-tooth",
      "ultimate-sword",
      "ws:caterkiller-jaw",
      "ws:sea-viper-tongue",
      null,
      null
    ],
    "result": {
      "item": "ws:big-bertha-blade",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Lamina Big Bertha.png",
      "index": 115
    }
  },
  {
    "id": "arsenal-craft-116",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "mc:nether-star",
      "mc:netherrack",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:nether-tracker",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Lança do nether .png",
      "index": 116
    }
  },
  {
    "id": "arsenal-craft-117",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "mc:cactus",
      "mc:cactus",
      "mc:cactus",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:gunpowder",
      "mc:gunpowder",
      "mc:gunpowder"
    ],
    "result": {
      "item": "ws:miners-dream",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Miners Dream.png",
      "index": 117
    }
  },
  {
    "id": "arsenal-craft-118",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale",
      "ws:mobzilla-scale"
    ],
    "result": {
      "item": "ws:mobzilla-scale-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Mobzilla Block.png",
      "index": 118
    }
  },
  {
    "id": "arsenal-craft-119",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      null,
      "ws:mobzilla-scale-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:mobzilla-scale",
      "count": 9
    },
    "source": {
      "screenshot": "Craft Mobzilla.png",
      "index": 119
    }
  },
  {
    "id": "arsenal-craft-120",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "ws:nightmare-scale",
      "mc:diamond",
      "ws:nightmare-scale",
      "mc:redstone-dust",
      "ws:titanium-ingot",
      "mc:redstone-dust",
      "ws:nightmare-scale",
      "mc:iron-ingot",
      "ws:nightmare-scale"
    ],
    "result": {
      "item": "ws:nightmare-sword",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Nightmare Sword.png",
      "index": 120
    }
  },
  {
    "id": "arsenal-craft-121",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:apple",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block",
      "mc:redstone-block"
    ],
    "result": {
      "item": "ws:omg-apple",
      "count": 1
    },
    "source": {
      "screenshot": "Craft OMG apple.png",
      "index": 121
    }
  },
  {
    "id": "arsenal-craft-122",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:stick",
      "mc:stick",
      "mc:stick",
      "mc:stick",
      "mc:string",
      "mc:stick",
      "mc:stick",
      "mc:stick",
      "mc:stick"
    ],
    "result": {
      "item": "ws:sifter",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Peneira.png",
      "index": 122
    }
  },
  {
    "id": "arsenal-craft-123",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "mc:cobblestone",
      null,
      "mc:gunpowder",
      "mc:cobblestone",
      null,
      null,
      "mc:cobblestone",
      null
    ],
    "result": {
      "item": "ws:bridge",
      "count": 8
    },
    "source": {
      "screenshot": "Craft Ponte.png",
      "index": 123
    }
  },
  {
    "id": "arsenal-craft-124",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      "ws:ruby"
    ],
    "result": {
      "item": "ws:ruby-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Rubi Block.png",
      "index": 124
    }
  },
  {
    "id": "arsenal-craft-125",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:crystal-stick",
      "mc:string",
      "ws:crystal-stick",
      null,
      "mc:string",
      null,
      "ws:crystal-stick",
      "mc:string"
    ],
    "result": {
      "item": "peacock-skate-bow",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Skate Bow.png",
      "index": 125
    }
  },
  {
    "id": "arsenal-craft-126",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mobzilla-big-bertha",
      "mc:iron-ingot",
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "mobzilla-slice",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Slice.png",
      "index": 126
    }
  },
  {
    "id": "arsenal-craft-127",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "mc:iron-ingot",
      "mc:iron-ingot",
      "mc:iron-ingot",
      "mc:iron-ingot",
      "mc:ink-sac",
      "mc:iron-ingot",
      "mc:ink-sac",
      "mc:ink-sac",
      "mc:iron-ingot"
    ],
    "result": {
      "item": "ws:squidzooka",
      "count": 1
    },
    "source": {
      "screenshot": "Craft SquidZooka.png",
      "index": 127
    }
  },
  {
    "id": "arsenal-craft-128",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot",
      "ws:tigers-eye-ingot"
    ],
    "result": {
      "item": "ws:tigers-eye-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Tiger Eye Block.png",
      "index": 128
    }
  },
  {
    "id": "arsenal-craft-129",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      null,
      "ws:tigers-eye-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:tigers-eye-ingot",
      "count": 9
    },
    "source": {
      "screenshot": "Craft Tigereye.png",
      "index": 129
    }
  },
  {
    "id": "arsenal-craft-130",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:titanium-nugget",
      "ws:titanium-nugget",
      "ws:titanium-nugget",
      "ws:titanium-nugget",
      "ws:titanium-nugget",
      "ws:titanium-nugget",
      "ws:titanium-nugget",
      "ws:titanium-nugget",
      "ws:titanium-nugget"
    ],
    "result": {
      "item": "ws:titanium-ingot",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Titaium.png",
      "index": 130
    }
  },
  {
    "id": "arsenal-craft-131",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot",
      "ws:titanium-ingot"
    ],
    "result": {
      "item": "ws:titanium-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Titanium Block.png",
      "index": 131
    }
  },
  {
    "id": "arsenal-craft-132",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      null,
      "ws:titanium-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:titanium-ingot",
      "count": 9
    },
    "source": {
      "screenshot": "Craft Titanium2.png",
      "index": 132
    }
  },
  {
    "id": "arsenal-craft-133",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:ruby",
      "mc:diamond",
      null,
      "ws:ruby",
      "ws:ruby",
      "ws:ruby",
      null,
      null
    ],
    "result": {
      "item": "ruby-thunder-staff",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Tunder Staff (Rubi).png",
      "index": 133
    }
  },
  {
    "id": "arsenal-craft-134",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot",
      "ws:tourmaline-ingot"
    ],
    "result": {
      "item": "ws:tourmaline-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Turmalin Block.png",
      "index": 134
    }
  },
  {
    "id": "arsenal-craft-135",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      null,
      "ws:tourmaline-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:tourmaline-ingot",
      "count": 9
    },
    "source": {
      "screenshot": "Craft Turmalin.png",
      "index": 135
    }
  },
  {
    "id": "arsenal-craft-136",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      "ws:titanium-ingot",
      "mc:string",
      "mc:iron-ingot",
      null,
      "mc:string",
      null,
      "ws:uranium-ingot",
      "mc:string"
    ],
    "result": {
      "item": "ultimate-bow",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Ultimate Bow.png",
      "index": 136
    }
  },
  {
    "id": "arsenal-craft-137",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:uranium-ingot",
      "ws:uranium-ingot",
      "ws:uranium-ingot",
      "ws:uranium-ingot",
      "ws:uranium-ingot",
      "ws:uranium-ingot",
      "ws:uranium-ingot",
      "ws:uranium-ingot",
      "ws:uranium-ingot"
    ],
    "result": {
      "item": "ws:uranium-block",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Uranium Block.png",
      "index": 137
    }
  },
  {
    "id": "arsenal-craft-138",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:uranium-nugget",
      "ws:uranium-nugget",
      "ws:uranium-nugget",
      "ws:uranium-nugget",
      "ws:uranium-nugget",
      "ws:uranium-nugget",
      "ws:uranium-nugget",
      "ws:uranium-nugget",
      "ws:uranium-nugget"
    ],
    "result": {
      "item": "ws:uranium-ingot",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Uranium.png",
      "index": 138
    }
  },
  {
    "id": "arsenal-craft-139",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      null,
      null,
      null,
      null,
      "ws:uranium-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:uranium-ingot",
      "count": 9
    },
    "source": {
      "screenshot": "Craft Uranium2.png",
      "index": 139
    }
  },
  {
    "id": "arsenal-craft-140",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:glass-bottle",
      "mc:stick",
      null,
      "mc:string",
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:experience-capturator",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Xp Capturator.png",
      "index": 140
    }
  },
  {
    "id": "arsenal-craft-141",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "ws:zoo-10",
      "mc:iron-block",
      null,
      "mc:glass",
      "mc:quartz-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:zoo-exg",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Zoo EXG.png",
      "index": 141
    }
  },
  {
    "id": "arsenal-craft-142",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "ws:zoo-6",
      "mc:iron-block",
      null,
      "mc:glass",
      "mc:quartz-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:zoo-8",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Zoo G.png",
      "index": 142
    }
  },
  {
    "id": "arsenal-craft-143",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "ws:zoo-8",
      "mc:iron-block",
      null,
      "mc:glass",
      "mc:quartz-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:zoo-10",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Zoo GG.png",
      "index": 143
    }
  },
  {
    "id": "arsenal-craft-144",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "ws:zoo-4",
      "mc:iron-block",
      null,
      "mc:glass",
      "mc:quartz-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:zoo-6",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Zoo M.png",
      "index": 144
    }
  },
  {
    "id": "arsenal-craft-145",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "ws:zoo-2",
      "mc:iron-block",
      null,
      "mc:glass",
      "mc:quartz-block",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:zoo-4",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Zoo P.png",
      "index": 145
    }
  },
  {
    "id": "arsenal-craft-146",
    "station": "crafting",
    "type": "shapeless",
    "grid": [
      "mc:iron-block",
      "mc:glass",
      null,
      "mc:quartz-block",
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:zoo-2",
      "count": 1
    },
    "source": {
      "screenshot": "Craft Zoo SP.png",
      "index": 146
    }
  },
  {
    "id": "arsenal-craft-147",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "ws:ray-gun",
      "ws:big-hammer",
      "ws:mantis-claw",
      "ws:water-dragon-scale",
      "ws:green-goo",
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:big-bertha-handle",
      "count": 1
    },
    "source": {
      "screenshot": "Craft cabo Big Bertha.png",
      "index": 147
    }
  },
  {
    "id": "arsenal-craft-148",
    "station": "crafting",
    "type": "shaped",
    "grid": [
      "mc:paper",
      "mc:redstone-dust",
      null,
      "mc:stick",
      null,
      null,
      null,
      null,
      null
    ],
    "result": {
      "item": "ws:creeper-launcher",
      "count": 4
    },
    "source": {
      "screenshot": "Craft lançador de creeper.png",
      "index": 148
    }
  }
];
  const roots = armorCatalog.items.map((entry) => entry.id);
  const items = [...armorCatalog.items, ...extraItems];
  const registry = core.createRegistry({ items, recipes, roots });

  window.WarSpawnCraftingCatalog = Object.freeze({
    version: 1,
    items,
    recipes,
    roots,
    registry,
    audit: Object.freeze({
      screenshots: 148,
      completeRecipes: 148,
      partialRecipes: 0,
      unidentifiedRecipes: 0,
      ambiguousIngredientSlots: 0,
      assetExceptions: Object.freeze([
        "A variante Zoo EXG não possui sprite individual no arquivo de texturas enviado; permanece interna e oculta.",
      ]),
    }),
  });
})();
