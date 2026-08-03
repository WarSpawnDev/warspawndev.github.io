"use strict";

(function initializeDimensionExplorer() {
  const registry = window.WarSpawnDimensions;
  if (!registry?.entries?.length) return;

  const copy = {
    pt: {
      showcaseEyebrow: "6 NOVAS DIMENSÕES",
      showcaseAction: "Explorar rede dimensional",
      explorerKicker: "REDE DIMENSIONAL WARSPAWN",
      explorerTitle: "Escolha um destino",
      explorerHelp: "Mova o cursor pelo mapa e selecione a dimensão que deseja explorar.",
      hoverPrompt: "Passe o cursor sobre um destino",
      openDestination: (name) => `Abrir ${name}`,
      closeLabel: "Fechar mapa dimensional",
      backToMap: "Voltar ao mapa",
      warspawnKind: "DIMENSÃO WARSPAWN",
      vanillaKind: "DIMENSÃO VANILLA",
      showcaseAlt:
        "As seis dimensões do WarSpawn ao redor do Overworld, Nether e The End",
      selectorAlt: "Mapa octogonal das dimensões do WarSpawn",
      detailAlt: (name) => `Cenário da dimensão ${name}`,
    },
    en: {
      showcaseEyebrow: "6 NEW DIMENSIONS",
      showcaseAction: "Explore the dimensional network",
      explorerKicker: "WARSPAWN DIMENSIONAL NETWORK",
      explorerTitle: "Choose a destination",
      explorerHelp: "Move the pointer across the map and select the dimension you want to explore.",
      hoverPrompt: "Point to a destination",
      openDestination: (name) => `Open ${name}`,
      closeLabel: "Close dimensional map",
      backToMap: "Back to map",
      warspawnKind: "WARSPAWN DIMENSION",
      vanillaKind: "VANILLA DIMENSION",
      showcaseAlt:
        "WarSpawn's six dimensions surrounding the Overworld, Nether and The End",
      selectorAlt: "Octagonal map of WarSpawn dimensions",
      detailAlt: (name) => `${name} dimension scenery`,
    },
  };

  const elements = {
    showcase: document.querySelector("#dimension-explorer-open"),
    showcaseImage: document.querySelector("#dimension-explorer-open img"),
    explorer: document.querySelector("#dimension-explorer"),
    close: document.querySelector("#dimension-explorer-close"),
    wheelView: document.querySelector("#dimension-wheel-view"),
    wheelFrame: document.querySelector("#dimension-wheel-frame"),
    wheelCamera: document.querySelector("#dimension-wheel-camera"),
    wheelBase: document.querySelector("#dimension-wheel-base"),
    sectorLayer: document.querySelector("#dimension-sector-layer"),
    status: document.querySelector("#dimension-wheel-status"),
    detailView: document.querySelector("#dimension-detail-view"),
    detailBack: document.querySelector("#dimension-detail-back"),
    detailKind: document.querySelector("#dimension-detail-kind"),
    detailName: document.querySelector("#dimension-detail-name"),
    detailArt: document.querySelector("#dimension-detail-art"),
    detailImage: document.querySelector("#dimension-detail-image"),
  };

  if (Object.values(elements).some((element) => !element)) return;

  const state = {
    language: localStorage.getItem("warspawn-language") === "en" ? "en" : "pt",
    selected: null,
    lastTrigger: null,
    lastSector: null,
    sectorButtons: [],
    selectorLoaded: false,
    imageRequest: 0,
    wheelFrameRequest: 0,
    showcaseFrameRequest: 0,
  };

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function text() {
    return copy[state.language];
  }

  function nameOf(entry) {
    return entry.name[state.language] || entry.name.pt;
  }

  function loadSelector() {
    if (state.selectorLoaded) return;
    state.selectorLoaded = true;
    elements.wheelBase.src = registry.selectorImage;
    elements.wheelCamera.style.setProperty(
      "--dimension-selector-image",
      `url("${registry.selectorImage}")`,
    );
  }

  function setStatus(entry = null) {
    elements.status.replaceChildren();
    if (!entry) {
      elements.status.textContent = text().hoverPrompt;
      return;
    }

    const prefix = document.createTextNode(
      state.language === "pt" ? "Selecionar " : "Select ",
    );
    const destination = document.createElement("strong");
    destination.textContent = nameOf(entry);
    elements.status.append(prefix, destination);
  }

  function renderSectors() {
    state.sectorButtons = registry.entries.map((entry) => {
      const button = document.createElement("button");
      const visual = document.createElement("span");

      button.type = "button";
      button.className = "dimension-sector";
      button.dataset.dimension = entry.slug;
      button.style.setProperty("--clip", entry.clip);
      button.style.setProperty("--glow", entry.glow);
      button.style.setProperty("--origin", entry.origin);
      button.style.setProperty("--lift-x", `${entry.lift.x}px`);
      button.style.setProperty("--lift-y", `${entry.lift.y}px`);
      button.setAttribute("aria-label", text().openDestination(nameOf(entry)));

      visual.className = "dimension-sector-copy";
      visual.setAttribute("aria-hidden", "true");
      button.append(visual);

      button.addEventListener("pointerenter", () => setStatus(entry));
      button.addEventListener("focus", () => {
        state.lastSector = button;
        setStatus(entry);
      });
      button.addEventListener("blur", () => button.classList.remove("is-active"));
      button.addEventListener("click", () => openDetail(entry, button));
      return button;
    });

    elements.sectorLayer.replaceChildren(...state.sectorButtons);
  }

  function updateLanguage() {
    const t = text();
    document.querySelectorAll("[data-dimension-i18n]").forEach((element) => {
      const value = t[element.dataset.dimensionI18n];
      if (typeof value === "string") element.textContent = value;
    });

    elements.close.setAttribute("aria-label", t.closeLabel);
    elements.showcaseImage.alt = t.showcaseAlt;
    elements.wheelBase.alt = t.selectorAlt;
    state.sectorButtons.forEach((button) => {
      const entry = registry.bySlug[button.dataset.dimension];
      button.setAttribute("aria-label", t.openDestination(nameOf(entry)));
    });

    if (state.selected) {
      elements.detailName.textContent = nameOf(state.selected);
      elements.detailKind.textContent =
        state.selected.kind === "warspawn" ? t.warspawnKind : t.vanillaKind;
      elements.detailImage.alt = t.detailAlt(nameOf(state.selected));
    }
    setStatus(state.lastSector ? registry.bySlug[state.lastSector.dataset.dimension] : null);
  }

  function resetCamera() {
    elements.wheelCamera.style.setProperty("--camera-rx", "0deg");
    elements.wheelCamera.style.setProperty("--camera-ry", "0deg");
    elements.wheelCamera.style.setProperty("--camera-x", "0px");
    elements.wheelCamera.style.setProperty("--camera-y", "0px");
  }

  function handleWheelPointer(event) {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    const bounds = elements.wheelFrame.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));

    cancelAnimationFrame(state.wheelFrameRequest);
    state.wheelFrameRequest = requestAnimationFrame(() => {
      elements.wheelCamera.style.setProperty("--camera-rx", `${(-y * 1.15).toFixed(2)}deg`);
      elements.wheelCamera.style.setProperty("--camera-ry", `${(x * 1.15).toFixed(2)}deg`);
      elements.wheelCamera.style.setProperty("--camera-x", `${(x * 2).toFixed(2)}px`);
      elements.wheelCamera.style.setProperty("--camera-y", `${(y * 2).toFixed(2)}px`);
    });
  }

  function handleShowcasePointer(event) {
    if (reducedMotion.matches || event.pointerType === "touch") return;
    const bounds = elements.showcase.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * -6;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -6;

    cancelAnimationFrame(state.showcaseFrameRequest);
    state.showcaseFrameRequest = requestAnimationFrame(() => {
      elements.showcase.style.setProperty("--showcase-x", `${x.toFixed(2)}px`);
      elements.showcase.style.setProperty("--showcase-y", `${y.toFixed(2)}px`);
    });
  }

  function resetShowcase() {
    elements.showcase.style.setProperty("--showcase-x", "0px");
    elements.showcase.style.setProperty("--showcase-y", "0px");
  }

  function focusableElements() {
    return [...elements.explorer.querySelectorAll("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")]
      .filter((element) => !element.closest("[hidden]") && element.getClientRects().length);
  }

  function handleExplorerKeys(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeExplorer();
      return;
    }

    if (event.key === "Tab") {
      const focusable = focusableElements();
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
  }

  function handleSectorKeys(event) {
    const direction = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }[event.key];
    if (!direction) return;

    event.preventDefault();
    const currentIndex = state.sectorButtons.indexOf(document.activeElement);
    const nextIndex =
      (Math.max(0, currentIndex) + direction + state.sectorButtons.length) %
      state.sectorButtons.length;
    state.sectorButtons[nextIndex].focus();
  }

  function openExplorer() {
    state.lastTrigger = document.activeElement;
    loadSelector();
    elements.explorer.hidden = false;
    elements.wheelView.hidden = false;
    elements.detailView.hidden = true;
    document.body.classList.add("dimension-explorer-open");
    elements.explorer.addEventListener("keydown", handleExplorerKeys);

    requestAnimationFrame(() => {
      const overworld = state.sectorButtons.find(
        (button) => button.dataset.dimension === "overworld",
      );
      (overworld || state.sectorButtons[0] || elements.close).focus();
    });
  }

  function closeExplorer() {
    if (elements.explorer.hidden) return;
    elements.explorer.hidden = true;
    elements.wheelView.hidden = false;
    elements.detailView.hidden = true;
    document.body.classList.remove("dimension-explorer-open");
    elements.explorer.removeEventListener("keydown", handleExplorerKeys);
    state.selected = null;
    resetCamera();
    state.lastTrigger?.focus();
  }

  function finishImageRequest(requestId) {
    if (requestId === state.imageRequest) elements.detailArt.classList.remove("is-loading");
  }

  function openDetail(entry, trigger) {
    state.selected = entry;
    state.lastSector = trigger;
    state.imageRequest += 1;
    const requestId = state.imageRequest;
    const t = text();

    elements.detailView.style.setProperty("--detail-glow", entry.glow);
    elements.detailName.textContent = nameOf(entry);
    elements.detailKind.textContent = entry.kind === "warspawn" ? t.warspawnKind : t.vanillaKind;
    elements.detailImage.alt = t.detailAlt(nameOf(entry));
    elements.detailArt.classList.add("is-loading");
    elements.detailImage.onload = () => finishImageRequest(requestId);
    elements.detailImage.onerror = () => finishImageRequest(requestId);
    elements.detailImage.src = entry.scene;

    if (elements.detailImage.complete) {
      if (typeof elements.detailImage.decode === "function") {
        elements.detailImage
          .decode()
          .catch(() => {})
          .finally(() => finishImageRequest(requestId));
      } else {
        finishImageRequest(requestId);
      }
    }

    elements.wheelView.hidden = true;
    elements.detailView.hidden = false;
    elements.explorer.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
    requestAnimationFrame(() => elements.detailBack.focus());
  }

  function backToWheel() {
    elements.detailView.hidden = true;
    elements.wheelView.hidden = false;
    elements.explorer.scrollTo({ top: 0, behavior: "auto" });
    state.selected = null;
    requestAnimationFrame(() => (state.lastSector || state.sectorButtons[0]).focus());
  }

  renderSectors();
  updateLanguage();

  elements.showcase.addEventListener("click", openExplorer);
  elements.showcase.addEventListener("pointermove", handleShowcasePointer);
  elements.showcase.addEventListener("pointerleave", resetShowcase);
  elements.close.addEventListener("click", closeExplorer);
  elements.detailBack.addEventListener("click", backToWheel);
  elements.wheelFrame.addEventListener("pointermove", handleWheelPointer);
  elements.wheelFrame.addEventListener("pointerleave", resetCamera);
  elements.sectorLayer.addEventListener("pointerleave", () => {
    const focused = document.activeElement?.closest?.(".dimension-sector");
    setStatus(focused ? registry.bySlug[focused.dataset.dimension] : null);
  });
  elements.sectorLayer.addEventListener("keydown", handleSectorKeys);
  elements.explorer.addEventListener("pointerdown", (event) => {
    if (event.target === elements.explorer) closeExplorer();
  });

  document.addEventListener("warspawn:languagechange", (event) => {
    state.language = event.detail?.language === "en" ? "en" : "pt";
    updateLanguage();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadSelector();
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(elements.showcase);
  }
})();
