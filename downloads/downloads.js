"use strict";

const formatNumber = new Intl.NumberFormat("pt-BR");
const formatDate = new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeZone: "UTC" });
const formatMonth = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" });
const element = (id) => document.getElementById(id);

function node(tag, content, className) {
  const result = document.createElement(tag);
  if (content) result.textContent = content;
  if (className) result.className = className;
  return result;
}

async function readJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function period(start, end) {
  const firstMonth = formatMonth.format(new Date(`${start}-01T00:00:00Z`));
  if (start === end) return firstMonth;
  const lastMonth = formatMonth.format(new Date(`${end}-01T00:00:00Z`));
  return `${firstMonth} a ${lastMonth}`;
}

function downloadNode(asset, text, label) {
  if (!asset) return node("span", "Indisponível", "unavailable");
  const link = node("a", text, "download");
  link.href = asset.browser_download_url;
  link.setAttribute("aria-label", label);
  return link;
}

function renderArchive(catalog, assets) {
  const versions = element("versions");
  const timeline = element("timeline");

  for (const phase of [...catalog.fases].reverse()) {
    const group = node("details", "", "phase");
    group.id = phase.id;
    const summary = node("summary");
    summary.append(node("span", phase.nome, "phase-title"), node("span", `${phase.versoes.length} arquivos · ${phase.loader}`, "phase-count"));
    const releases = node("ul", "", "releases");

    for (const entry of phase.versoes) {
      const row = node("li", "", "release-row");
      const info = node("div");
      const date = formatDate.format(new Date(`${entry.data}T00:00:00Z`));
      const size = formatNumber.format(Math.round(entry.bytes / 104857.6) / 10);
      info.append(node("strong", entry.versao), node("span", `${entry.arquivo} · ${date} · ${size} MiB`, "version-meta"));
      if (entry.nota) info.append(node("span", entry.nota, "version-meta"));
      row.append(info, downloadNode(assets.get(entry.arquivo), "Baixar", `Baixar ${phase.nome} ${entry.arquivo}`));
      releases.append(row);
    }

    group.append(summary, releases);
    versions.append(group);

    const milestone = node("li");
    const link = node("a", `Ver arquivos · ${phase.nome}`);
    link.href = `#${phase.id}`;
    link.addEventListener("click", () => { group.open = true; });
    const firstVersion = phase.versoes.at(-1).versao;
    const lastVersion = phase.versoes[0].versao;
    const range = firstVersion === lastVersion ? `Versão ${firstVersion}` : `De ${firstVersion} a ${lastVersion}`;
    milestone.append(
      node("strong", `${phase.nome} · ${range}`, "phase-range"),
      node("p", period(phase.inicio, phase.fim), "period"),
      node("h3", phase.titulo),
      node("p", phase.descricao),
      link
    );
    timeline.prepend(milestone);
  }

  const target = document.getElementById(location.hash.slice(1));
  if (target?.matches(".phase")) {
    target.open = true;
    target.scrollIntoView();
  }
}

async function loadArchive() {
  const catalog = await readJson("catalogo.json?v=20261126-newest-first");
  const expected = new Map(catalog.fases.flatMap((phase) => phase.versoes.map((entry) => [entry.arquivo, entry])));
  const assets = new Map();
  const archiveStatus = element("archive-status");
  const countStatus = element("count-status");
  const releasePage = `https://github.com/${catalog.repositorio}/releases/tag/${encodeURIComponent(catalog.release)}`;

  try {
    const release = await readJson(`https://api.github.com/repos/${catalog.repositorio}/releases/tags/${encodeURIComponent(catalog.release)}`);
    const releaseAssets = await readJson(`https://api.github.com/repos/${catalog.repositorio}/releases/${release.id}/assets?per_page=100`);
    for (const asset of releaseAssets) {
      const entry = expected.get(asset.name);
      const url = `https://github.com/${catalog.repositorio}/releases/download/${encodeURIComponent(catalog.release)}/${encodeURIComponent(asset.name)}`;
      if (entry && asset.size === entry.bytes && asset.state === "uploaded" && asset.browser_download_url === url) {
        assets.set(asset.name, asset);
      }
    }

    const counts = Array.from(assets.values(), (asset) => asset.download_count);
    if (assets.size && counts.every((count) => Number.isSafeInteger(count) && count >= 0)) {
      element("total").textContent = formatNumber.format(counts.reduce((sum, count) => sum + count, 0));
      if (assets.size !== expected.size) countStatus.textContent = "Soma dos arquivos disponíveis no momento.";
    } else {
      countStatus.textContent = "Contagem indisponível no momento.";
    }

    if (assets.size !== expected.size) {
      archiveStatus.textContent = `${assets.size} de ${expected.size} arquivos disponíveis.`;
    }
  } catch {
    archiveStatus.append("O GitHub não respondeu com os downloads. ", Object.assign(node("a", "Consultar no GitHub"), { href: releasePage }));
    countStatus.textContent = "Contagem indisponível no momento.";
  }

  const current = expected.get(catalog.atual.arquivo);
  const currentPhase = catalog.fases.find((phase) => phase.versoes.includes(current));
  element("current-title").textContent = `WarSpawn ${current.versao}`;
  element("requirements").textContent = `Minecraft Java ${currentPhase.minecraft} · ${currentPhase.loader} ${catalog.atual.loaderMinimo} ou superior`;
  element("current-download").replaceChildren(downloadNode(assets.get(current.arquivo), "Baixar versão atual", `Baixar WarSpawn ${current.versao}`));
  renderArchive(catalog, assets);
}

loadArchive().catch(() => {
  element("archive-status").textContent = "Não foi possível carregar o catálogo de versões.";
  element("current-download").textContent = "Download indisponível no momento.";
  element("count-status").textContent = "Contagem indisponível no momento.";
});
