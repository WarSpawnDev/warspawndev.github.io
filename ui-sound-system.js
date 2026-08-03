"use strict";

(function initializeUiSoundSystem() {
  const soundToggle = document.querySelector("#sound-toggle");
  if (!soundToggle) return;

  const selectableSelector = [
    "[data-ui-sound]",
    ".dimension-sector",
    ".dimension-showcase",
    ".mob-card",
    ".catalog-item",
    "button.craft-item",
    ".recipe-order-badge",
    ".site-header nav a",
    ".brand",
    ".button",
    ".filters button",
    ".food-filters button",
    ".food-filter-reset",
    ".dimension-explorer-close",
    ".dimension-back",
    ".modal-close",
    ".lang",
    ".sound-toggle",
    ".gallery figure",
    ".arsenal-tags span",
    "footer a",
    "button:not([disabled])",
    "a[href]",
    "select",
  ].join(",");

  const touchSurfaceSelector = [
    selectableSelector,
    ".dimension-wheel-frame",
    ".food-catalog",
    ".bestiary-grid",
    ".gallery",
  ].join(",");

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  const state = {
    enabled: readSoundPreference(),
    context: null,
    audio: null,
    hovered: null,
    lastPlayedAt: 0,
    touch: null,
    suppressClickUntil: 0,
    suppressedElements: [],
    language: document.documentElement.lang.startsWith("en") ? "en" : "pt",
  };

  const labels = {
    pt: {
      on: "Desativar sons da interface",
      off: "Ativar sons da interface",
      unsupported: "Sons da interface não são suportados neste navegador",
    },
    en: {
      on: "Turn interface sounds off",
      off: "Turn interface sounds on",
      unsupported: "Interface sounds are not supported by this browser",
    },
  };

  function readSoundPreference() {
    try {
      return localStorage.getItem("warspawn-ui-sound") !== "off";
    } catch {
      return true;
    }
  }

  function saveSoundPreference() {
    try {
      localStorage.setItem("warspawn-ui-sound", state.enabled ? "on" : "off");
    } catch {
      // The interface keeps working when storage is unavailable.
    }
  }

  function updateToggle() {
    const copy = labels[state.language];
    const supported = Boolean(AudioContextConstructor);
    soundToggle.disabled = !supported;
    soundToggle.dataset.soundState = state.enabled && supported ? "on" : "off";
    soundToggle.setAttribute("aria-pressed", String(state.enabled && supported));
    soundToggle.setAttribute(
      "aria-label",
      supported ? (state.enabled ? copy.on : copy.off) : copy.unsupported,
    );
    soundToggle.title = soundToggle.getAttribute("aria-label");
  }

  function buildAudioGraph(context) {
    const output = context.createGain();
    const compressor = context.createDynamicsCompressor();
    const delay = context.createDelay(0.3);
    const feedback = context.createGain();
    const wet = context.createGain();

    output.gain.value = 0.16;
    compressor.threshold.value = -22;
    compressor.knee.value = 18;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.16;
    delay.delayTime.value = 0.082;
    feedback.gain.value = 0.13;
    wet.gain.value = 0.2;

    output.connect(compressor);
    compressor.connect(context.destination);
    delay.connect(wet);
    wet.connect(output);
    delay.connect(feedback);
    feedback.connect(delay);

    return { output, delay };
  }

  async function unlockAudio() {
    if (!state.enabled || !AudioContextConstructor) return false;

    if (!state.context) {
      try {
        state.context = new AudioContextConstructor({ latencyHint: "interactive" });
      } catch {
        state.context = new AudioContextConstructor();
      }
      state.audio = buildAudioGraph(state.context);
    }

    if (state.context.state === "suspended") {
      try {
        await state.context.resume();
      } catch {
        return false;
      }
    }
    return state.context.state === "running";
  }

  function voice({
    frequency,
    harmonic = 1.5,
    glide = 1.04,
    duration = 0.09,
    volume = 0.17,
    offset = 0,
  }) {
    const context = state.context;
    if (!state.enabled || !context || context.state !== "running" || !state.audio) return;

    const start = context.currentTime + 0.004 + offset;
    const end = start + duration;
    const envelope = context.createGain();
    const primary = context.createOscillator();
    const overtone = context.createOscillator();
    const overtoneGain = context.createGain();

    primary.type = "triangle";
    overtone.type = "sine";
    primary.frequency.setValueAtTime(frequency, start);
    primary.frequency.exponentialRampToValueAtTime(frequency * glide, end);
    overtone.frequency.setValueAtTime(frequency * harmonic, start);
    overtone.frequency.exponentialRampToValueAtTime(frequency * harmonic * glide, end);
    overtone.detune.value = 5;
    overtoneGain.gain.value = 0.34;

    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.012, duration * 0.24));
    envelope.gain.exponentialRampToValueAtTime(0.0001, end);

    primary.connect(envelope);
    overtone.connect(overtoneGain);
    overtoneGain.connect(envelope);
    envelope.connect(state.audio.output);
    envelope.connect(state.audio.delay);

    primary.start(start);
    overtone.start(start);
    primary.stop(end + 0.01);
    overtone.stop(end + 0.01);
    primary.addEventListener("ended", () => {
      primary.disconnect();
      overtone.disconnect();
      overtoneGain.disconnect();
      envelope.disconnect();
    }, { once: true });
  }

  function pitchVariation(element) {
    const identity =
      element?.dataset?.dimension ||
      element?.dataset?.foodId ||
      element?.dataset?.slug ||
      element?.textContent ||
      "warspawn";
    let total = 0;
    for (const character of identity.trim()) total = (total + character.codePointAt(0)) % 7;
    return total * 13;
  }

  function soundKind(element) {
    const declaredKind = element.dataset.uiSound;
    if (["dimension", "item", "media", "navigation"].includes(declaredKind)) {
      return declaredKind;
    }
    if (element.matches(".dimension-sector, .dimension-showcase")) return "dimension";
    if (element.matches(".catalog-item, button.craft-item, .mob-card")) return "item";
    if (element.matches(".gallery figure, .arsenal-tags span")) return "media";
    return "navigation";
  }

  function playSound(kind, element = null, force = false) {
    if (!state.enabled || !state.context || state.context.state !== "running") return;
    const now = performance.now();
    if (!force && now - state.lastPlayedAt < 48) return;
    state.lastPlayedAt = now;

    const variation = pitchVariation(element);
    if (kind === "dimension") {
      voice({ frequency: 430 + variation, harmonic: 2.01, duration: 0.13, volume: 0.17, glide: 1.06 });
      voice({ frequency: 650 + variation, harmonic: 1.5, duration: 0.11, volume: 0.08, offset: 0.018 });
      return;
    }
    if (kind === "item") {
      voice({ frequency: 350 + variation, harmonic: 1.52, duration: 0.085, volume: 0.16, glide: 1.08 });
      return;
    }
    if (kind === "media") {
      voice({ frequency: 285 + variation, harmonic: 2, duration: 0.1, volume: 0.13, glide: 1.04 });
      return;
    }
    if (kind === "confirm") {
      voice({ frequency: 510, harmonic: 1.5, duration: 0.105, volume: 0.17, glide: 1.08 });
      voice({ frequency: 735, harmonic: 2, duration: 0.13, volume: 0.12, offset: 0.052, glide: 1.04 });
      return;
    }
    if (kind === "back") {
      voice({ frequency: 610, harmonic: 1.5, duration: 0.14, volume: 0.15, glide: 0.64 });
      return;
    }
    voice({ frequency: 540 + variation, harmonic: 1.5, duration: 0.07, volume: 0.13, glide: 1.06 });
  }

  function closestSelectable(node) {
    return node instanceof Element ? node.closest(selectableSelector) : null;
  }

  function applyTouchHighlight(element) {
    const previous = state.touch?.highlighted || null;
    if (previous === element) return;

    if (previous) {
      previous.classList.remove("is-touch-highlighted");
      if (previous.matches(".dimension-sector")) previous.classList.remove("is-active");
    }

    if (state.touch) state.touch.highlighted = element;
    if (element) {
      if (state.touch) state.touch.lastHighlighted = element;
      if (element.matches(".dimension-sector")) element.classList.add("is-active");
      else element.classList.add("is-touch-highlighted");
      playSound(soundKind(element), element);
    }

    document.dispatchEvent(
      new CustomEvent("warspawn:uihighlightchange", {
        detail: { element, previous, source: "touch" },
      }),
    );
  }

  function touchByIdentifier(touchList, identifier) {
    for (let index = 0; index < touchList.length; index += 1) {
      if (touchList[index].identifier === identifier) return touchList[index];
    }
    return null;
  }

  function endTouchDrag(event) {
    if (!state.touch) return;
    const ended = touchByIdentifier(event.changedTouches, state.touch.identifier);
    if (!ended && event.type !== "touchcancel") return;

    const wasDragging = state.touch.dragging;
    const suppressedElements = [state.touch.startTarget, state.touch.lastHighlighted]
      .filter((element, index, entries) => element && entries.indexOf(element) === index);
    applyTouchHighlight(null);
    document.documentElement.classList.remove("ui-touch-dragging");
    state.touch = null;
    if (wasDragging) {
      state.suppressClickUntil = performance.now() + 450;
      state.suppressedElements = suppressedElements;
    }
  }

  document.addEventListener("pointerdown", () => {
    if (state.enabled) void unlockAudio();
  }, { capture: true, passive: true });

  document.addEventListener("keydown", () => {
    if (state.enabled) void unlockAudio();
  }, { capture: true });

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const element = closestSelectable(event.target);
    if (!element || element === state.hovered) return;
    state.hovered = element;
    playSound(soundKind(element), element);
  });

  document.addEventListener("pointerout", (event) => {
    if (
      !state.hovered ||
      (event.relatedTarget instanceof Node && state.hovered.contains(event.relatedTarget))
    ) return;
    state.hovered = null;
  });

  document.addEventListener("focusin", (event) => {
    const element = closestSelectable(event.target);
    if (!element || element === state.hovered) return;
    playSound(soundKind(element), element);
  });

  document.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1 || state.touch) return;
    const touch = event.touches[0];
    const surface = event.target instanceof Element
      ? event.target.closest(touchSurfaceSelector)
      : null;
    if (!surface) return;

    state.suppressClickUntil = 0;
    state.suppressedElements = [];
    if (state.enabled) void unlockAudio();
    state.touch = {
      identifier: touch.identifier,
      startX: touch.clientX,
      startY: touch.clientY,
      startTarget: closestSelectable(event.target),
      dragging: false,
      highlighted: null,
      lastHighlighted: null,
    };
  }, { capture: true, passive: true });

  document.addEventListener("touchmove", (event) => {
    if (!state.touch) return;
    const touch = touchByIdentifier(event.touches, state.touch.identifier);
    if (!touch) return;

    const distance = Math.hypot(
      touch.clientX - state.touch.startX,
      touch.clientY - state.touch.startY,
    );
    if (!state.touch.dragging && distance < 8) return;
    if (!state.touch.dragging) {
      state.touch.dragging = true;
      document.documentElement.classList.add("ui-touch-dragging");
    }

    const hit = document.elementFromPoint(touch.clientX, touch.clientY);
    applyTouchHighlight(closestSelectable(hit));
  }, { capture: true, passive: true });

  document.addEventListener("touchend", endTouchDrag, { capture: true, passive: true });
  document.addEventListener("touchcancel", endTouchDrag, { capture: true, passive: true });

  document.addEventListener("click", (event) => {
    const element = closestSelectable(event.target);
    const mustSuppress =
      performance.now() < state.suppressClickUntil &&
      element &&
      state.suppressedElements.includes(element);
    if (mustSuppress) {
      event.preventDefault();
      event.stopImmediatePropagation();
      state.suppressClickUntil = 0;
      state.suppressedElements = [];
      return;
    }
    if (performance.now() < state.suppressClickUntil && element) {
      state.suppressClickUntil = 0;
      state.suppressedElements = [];
    }
    if (!element || element === soundToggle) return;

    const isBackAction = element.matches(
      ".dimension-back, .dimension-explorer-close, .modal-close, #modal-close-button",
    );
    playSound(isBackAction ? "back" : "confirm", element, true);
  }, true);

  document.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) playSound("confirm", event.target, true);
  });

  soundToggle.addEventListener("click", async () => {
    if (!AudioContextConstructor) return;
    if (state.enabled) {
      playSound("back", soundToggle, true);
      state.enabled = false;
    } else {
      state.enabled = true;
      if (await unlockAudio()) playSound("confirm", soundToggle, true);
    }
    saveSoundPreference();
    updateToggle();
  });

  document.addEventListener("warspawn:languagechange", (event) => {
    state.language = event.detail?.language === "en" ? "en" : "pt";
    updateToggle();
  });

  updateToggle();
})();
