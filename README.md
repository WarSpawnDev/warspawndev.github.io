# WarSpawn — site oficial

Este repositório publica o site oficial do WarSpawn em:

**https://warspawndev.github.io/**

O site reúne o bestiário, dimensões, arsenal, comidas, galeria, redes sociais oficiais
e informações do projeto em português e inglês.

## Conteúdo integrado

- `dimension-data.js` é o registro central das dimensões. Cada entrada usa um `slug`
  estável e já possui vínculos preparados para itens, mobs, chefes, receitas, crafts e
  conquistas.
- `dimension-system.js` e `dimension-system.css` cuidam somente da apresentação e da
  interação do mapa dimensional; novos conteúdos devem referenciar o `slug`, sem
  duplicar os dados dos outros catálogos.
- `food-data.js`, `food-assets.js` e `food-system.js` mantêm o catálogo dinâmico de
  comidas e receitas.

## Licença e créditos

Consulte a [licença oficial do projeto](https://github.com/WarSpawnDev/WarSpawn/blob/main/LICENSE.md).

WarSpawn é um projeto comunitário inspirado no OreSpawn original. O conteúdo
original de OreSpawn pertence aos seus respectivos autores, incluindo
TheyCallMeDanger.
