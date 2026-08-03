"use strict";

(function initializeUiSoundSystem() {
  const elements = {
    audioControl: document.querySelector("#audio-control"),
    soundToggle: document.querySelector("#sound-toggle"),
    menuToggle: document.querySelector("#sound-menu-toggle"),
    menu: document.querySelector("#sound-profile-menu"),
    menuKicker: document.querySelector("#sound-profile-kicker"),
    menuTitle: document.querySelector("#sound-profile-title"),
    masterToggle: document.querySelector("#audio-master-toggle"),
    masterLabel: document.querySelector("#audio-master-label"),
    profileList: document.querySelector("#sound-profile-list"),
    profileHint: document.querySelector("#sound-profile-hint"),
  };

  if (Object.values(elements).some((element) => !element)) return;

  const profileOrder = ["velvet", "orbit", "crystal", "neon", "pulse"];
  const soundProfiles = {
    velvet: {
      accent: "#dac8ff",
      name: { pt: "Veludo", en: "Velvet" },
      description: {
        pt: "Suave, quente e discreto",
        en: "Soft, warm and discreet",
      },
      synth: {
        base: 310,
        primaryType: "sine",
        overtoneType: "sine",
        harmonic: 1.5,
        harmonicMix: 0.055,
        detune: 3,
        glide: 1.018,
        duration: 0.18,
        attack: 0.024,
        volume: 0.12,
        send: 0.055,
        interval: 1.22,
        spacing: 0.058,
      },
    },
    orbit: {
      accent: "#72deff",
      name: { pt: "Órbita", en: "Orbit" },
      description: {
        pt: "Luminoso, estilo console clássico",
        en: "Luminous, classic console style",
      },
      synth: {
        base: 425,
        primaryType: "sine",
        overtoneType: "triangle",
        harmonic: 2,
        harmonicMix: 0.11,
        detune: 4,
        glide: 1.045,
        duration: 0.145,
        attack: 0.015,
        volume: 0.125,
        send: 0.14,
        interval: 1.5,
        spacing: 0.046,
      },
    },
    crystal: {
      accent: "#b4f4ff",
      name: { pt: "Cristal", en: "Crystal" },
      description: {
        pt: "Aéreo, estilo console moderno",
        en: "Airy, modern console style",
      },
      synth: {
        base: 545,
        primaryType: "sine",
        overtoneType: "sine",
        harmonic: 2.01,
        harmonicMix: 0.13,
        detune: 6,
        glide: 1.025,
        duration: 0.19,
        attack: 0.011,
        volume: 0.105,
        send: 0.22,
        interval: 1.335,
        spacing: 0.064,
      },
    },
    neon: {
      accent: "#ff66cf",
      name: { pt: "Neon", en: "Neon" },
      description: {
        pt: "Futurista, amplo e envolvente",
        en: "Futuristic, wide and immersive",
      },
      synth: {
        base: 365,
        primaryType: "sine",
        overtoneType: "triangle",
        harmonic: 2,
        harmonicMix: 0.065,
        detune: 8,
        glide: 1.095,
        duration: 0.155,
        attack: 0.014,
        volume: 0.115,
        send: 0.17,
        interval: 1.414,
        spacing: 0.048,
      },
    },
    pulse: {
      accent: "#ffd16a",
      name: { pt: "Pulso", en: "Pulse" },
      description: {
        pt: "Retrô, curto e bem definido",
        en: "Retro, short and well defined",
      },
      synth: {
        base: 255,
        primaryType: "triangle",
        overtoneType: "sine",
        harmonic: 2,
        harmonicMix: 0.075,
        detune: 2,
        glide: 1.01,
        duration: 0.09,
        attack: 0.008,
        volume: 0.12,
        send: 0.035,
        interval: 1.25,
        spacing: 0.034,
      },
    },
  };

  const selectableSelector = [
    "[data-ui-sound]",
    "[data-audio-profile]",
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
    profile: readProfilePreference(),
    context: null,
    audio: null,
    hovered: null,
    lastPlayedAt: 0,
    menuOpen: false,
    touch: null,
    suppressClickUntil: 0,
    suppressedElements: [],
    language: document.documentElement.lang.startsWith("en") ? "en" : "pt",
  };

  const labels = {
    pt: {
      on: (profile) => `Desativar sons da interface — perfil ${profile}`,
      off: (profile) => `Ativar sons da interface — perfil ${profile}`,
      unsupported: "Sons da interface não são suportados neste navegador",
      chooseProfile: (profile) => `Escolher perfil de áudio. Atual: ${profile}`,
      kicker: "ÁUDIO DA INTERFACE",
      title: "Perfil sonoro",
      profilesLabel: "Perfis de áudio",
      masterOn: "Ligado",
      masterOff: "Desligado",
      hint: "Passe o cursor ou selecione um perfil para ouvi-lo.",
    },
    en: {
      on: (profile) => `Turn interface sounds off — ${profile} profile`,
      off: (profile) => `Turn interface sounds on — ${profile} profile`,
      unsupported: "Interface sounds are not supported by this browser",
      chooseProfile: (profile) => `Choose audio profile. Current: ${profile}`,
      kicker: "INTERFACE AUDIO",
      title: "Sound profile",
      profilesLabel: "Audio profiles",
      masterOn: "On",
      masterOff: "Off",
      hint: "Hover over or select a profile to hear it.",
    },
  };

  function readSoundPreference() {
    try {
      return localStorage.getItem("warspawn-ui-sound") !== "off";
    } catch {
      return true;
    }
  }

  function readProfilePreference() {
    try {
      const saved = localStorage.getItem("warspawn-ui-sound-profile");
      return profileOrder.includes(saved) ? saved : "velvet";
    } catch {
      return "velvet";
    }
  }

  function savePreferences() {
    try {
      localStorage.setItem("warspawn-ui-sound", state.enabled ? "on" : "off");
      localStorage.setItem("warspawn-ui-sound-profile", state.profile);
    } catch {
      // The interface keeps working when storage is unavailable.
    }
  }

  function profileName(profileId = state.profile) {
    return soundProfiles[profileId].name[state.language];
  }

  function renderProfiles() {
    const fragment = document.createDocumentFragment();
    profileOrder.forEach((profileId) => {
      const profile = soundProfiles[profileId];
      const button = document.createElement("button");
      const orb = document.createElement("span");
      const copy = document.createElement("span");
      const name = document.createElement("strong");
      const description = document.createElement("small");
      const check = document.createElement("span");

      button.type = "button";
      button.className = "sound-profile-option";
      button.dataset.audioProfile = profileId;
      button.setAttribute("role", "radio");
      button.style.setProperty("--profile-accent", profile.accent);
      button.setAttribute(
        "aria-label",
        `${profile.name[state.language]} — ${profile.description[state.language]}`,
      );

      orb.className = "sound-profile-orb";
      orb.setAttribute("aria-hidden", "true");
      copy.className = "sound-profile-copy";
      name.textContent = profile.name[state.language];
      description.textContent = profile.description[state.language];
      check.className = "sound-profile-check";
      check.textContent = "✓";
      check.setAttribute("aria-hidden", "true");

      copy.append(name, description);
      button.append(orb, copy, check);
      button.addEventListener("click", () => void selectProfile(profileId, button));
      fragment.append(button);
    });
    elements.profileList.replaceChildren(fragment);
    updateProfileSelection();
  }

  function updateProfileSelection() {
    elements.profileList.querySelectorAll("[data-audio-profile]").forEach((button) => {
      const selected = button.dataset.audioProfile === state.profile;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-checked", String(selected));
    });
  }

  function updateUi() {
    const copy = labels[state.language];
    const supported = Boolean(AudioContextConstructor);
    const activeProfile = soundProfiles[state.profile];
    const activeName = profileName();

    elements.audioControl.style.setProperty("--sound-profile-accent", activeProfile.accent);
    elements.soundToggle.disabled = !supported;
    elements.menuToggle.disabled = !supported;
    elements.masterToggle.disabled = !supported;
    elements.soundToggle.dataset.soundState = state.enabled && supported ? "on" : "off";
    elements.soundToggle.dataset.soundProfile = state.profile;
    elements.soundToggle.setAttribute("aria-pressed", String(state.enabled && supported));
    elements.soundToggle.setAttribute(
      "aria-label",
      supported ? (state.enabled ? copy.on(activeName) : copy.off(activeName)) : copy.unsupported,
    );
    elements.soundToggle.title = elements.soundToggle.getAttribute("aria-label");

    elements.menuToggle.setAttribute("aria-expanded", String(state.menuOpen));
    elements.menuToggle.setAttribute(
      "aria-label",
      supported ? copy.chooseProfile(activeName) : copy.unsupported,
    );
    elements.menuToggle.title = elements.menuToggle.getAttribute("aria-label");
    elements.masterToggle.setAttribute("aria-pressed", String(state.enabled && supported));
    elements.masterLabel.textContent = state.enabled && supported ? copy.masterOn : copy.masterOff;
    elements.menuKicker.textContent = copy.kicker;
    elements.menuTitle.textContent = copy.title;
    elements.profileList.setAttribute("aria-label", copy.profilesLabel);
    elements.profileHint.textContent = supported ? copy.hint : copy.unsupported;
    elements.profileList.querySelectorAll("button").forEach((button) => {
      button.disabled = !supported;
    });
    updateProfileSelection();
  }

  function setMenuOpen(open, restoreFocus = false) {
    state.menuOpen = Boolean(open);
    elements.menu.hidden = !state.menuOpen;
    elements.menuToggle.setAttribute("aria-expanded", String(state.menuOpen));
    if (!state.menuOpen && restoreFocus) elements.menuToggle.focus();
  }

  function buildAudioGraph(context) {
    const output = context.createGain();
    const compressor = context.createDynamicsCompressor();
    const delay = context.createDelay(0.35);
    const feedback = context.createGain();
    const wet = context.createGain();
    const filter = context.createBiquadFilter();

    output.gain.value = 0.16;
    filter.type = "lowpass";
    filter.frequency.value = 4300;
    filter.Q.value = 0.35;
    compressor.threshold.value = -24;
    compressor.knee.value = 22;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.006;
    compressor.release.value = 0.2;
    delay.delayTime.value = 0.092;
    feedback.gain.value = 0.075;
    wet.gain.value = 0.14;

    output.connect(filter);
    filter.connect(compressor);
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

  function voice(specification, profile) {
    const context = state.context;
    if (!state.enabled || !context || context.state !== "running" || !state.audio) return;

    const frequency = specification.frequency;
    const glide = specification.glide ?? profile.glide;
    const duration = specification.duration ?? profile.duration;
    const volume = specification.volume ?? profile.volume;
    const attack = Math.min(specification.attack ?? profile.attack, duration * 0.42);
    const offset = specification.offset || 0;
    const harmonic = specification.harmonic ?? profile.harmonic;
    const harmonicMix = specification.harmonicMix ?? profile.harmonicMix;
    const sendAmount = specification.send ?? profile.send;
    const start = context.currentTime + 0.005 + offset;
    const end = start + duration;
    const envelope = context.createGain();
    const primary = context.createOscillator();
    const overtone = context.createOscillator();
    const overtoneGain = context.createGain();
    const send = context.createGain();

    primary.type = specification.primaryType || profile.primaryType;
    overtone.type = specification.overtoneType || profile.overtoneType;
    primary.frequency.setValueAtTime(frequency, start);
    primary.frequency.exponentialRampToValueAtTime(frequency * glide, end);
    overtone.frequency.setValueAtTime(frequency * harmonic, start);
    overtone.frequency.exponentialRampToValueAtTime(frequency * harmonic * glide, end);
    overtone.detune.value = specification.detune ?? profile.detune;
    overtoneGain.gain.value = harmonicMix;
    send.gain.value = sendAmount;

    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(volume, start + attack);
    envelope.gain.exponentialRampToValueAtTime(0.0001, end);

    primary.connect(envelope);
    overtone.connect(overtoneGain);
    overtoneGain.connect(envelope);
    envelope.connect(state.audio.output);
    envelope.connect(send);
    send.connect(state.audio.delay);

    primary.start(start);
    overtone.start(start);
    primary.stop(end + 0.012);
    overtone.stop(end + 0.012);
    primary.addEventListener("ended", () => {
      primary.disconnect();
      overtone.disconnect();
      overtoneGain.disconnect();
      send.disconnect();
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
    return total * 7;
  }

  function buildPattern(profileId, kind, variation) {
    const profile = soundProfiles[profileId].synth;
    const base = profile.base + variation;
    const compact = (overrides) => ({ ...overrides });

    if (kind === "dimension") {
      return [
        compact({ frequency: base + 18, duration: profile.duration * 0.92, volume: profile.volume * 0.78 }),
        compact({
          frequency: (base + 18) * profile.interval,
          duration: profile.duration * 0.72,
          volume: profile.volume * 0.34,
          offset: profile.spacing,
          send: profile.send * 1.12,
        }),
      ];
    }
    if (kind === "item") {
      return [compact({
        frequency: base,
        duration: profile.duration * 0.66,
        volume: profile.volume * 0.7,
        send: profile.send * 0.7,
      })];
    }
    if (kind === "media") {
      return [compact({
        frequency: base * 0.84,
        duration: profile.duration * 0.78,
        volume: profile.volume * 0.72,
      })];
    }
    if (kind === "confirm") {
      return [
        compact({ frequency: base + 48, duration: profile.duration * 0.78, volume: profile.volume * 0.82 }),
        compact({
          frequency: (base + 48) * profile.interval,
          duration: profile.duration * 0.9,
          volume: profile.volume * 0.48,
          offset: profile.spacing,
        }),
      ];
    }
    if (kind === "back") {
      return [compact({
        frequency: base + 72,
        duration: profile.duration * 0.82,
        volume: profile.volume * 0.74,
        glide: 0.76,
      })];
    }
    if (kind === "preview") {
      return [
        compact({ frequency: base, duration: profile.duration, volume: profile.volume * 0.92 }),
        compact({
          frequency: base * profile.interval,
          duration: profile.duration * 0.92,
          volume: profile.volume * 0.5,
          offset: profile.spacing,
          send: profile.send * 1.16,
        }),
      ];
    }
    return [compact({
      frequency: base + 64,
      duration: profile.duration * 0.52,
      volume: profile.volume * 0.58,
      send: profile.send * 0.6,
    })];
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

  function playSound(kind, element = null, force = false, profileId = state.profile) {
    if (!state.enabled || !state.context || state.context.state !== "running") return;
    const now = performance.now();
    if (!force && now - state.lastPlayedAt < 55) return;
    state.lastPlayedAt = now;

    const resolvedProfile = soundProfiles[profileId] ? profileId : "velvet";
    const variation = pitchVariation(element);
    buildPattern(resolvedProfile, kind, variation).forEach((specification) => {
      voice(specification, soundProfiles[resolvedProfile].synth);
    });
  }

  function closestSelectable(node) {
    return node instanceof Element ? node.closest(selectableSelector) : null;
  }

  async function selectProfile(profileId, trigger) {
    if (!soundProfiles[profileId] || !AudioContextConstructor) return;
    state.profile = profileId;
    state.enabled = true;
    savePreferences();
    updateUi();
    updateProfileSelection();
    if (await unlockAudio()) playSound("confirm", trigger, true, profileId);
  }

  async function toggleSound() {
    if (!AudioContextConstructor) return;
    if (state.enabled) {
      playSound("back", elements.soundToggle, true);
      state.enabled = false;
    } else {
      state.enabled = true;
      if (await unlockAudio()) playSound("confirm", elements.soundToggle, true);
    }
    savePreferences();
    updateUi();
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

      const previewProfile = element.dataset.audioProfile;
      if (previewProfile) playSound("preview", element, true, previewProfile);
      else playSound(soundKind(element), element);
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

  document.addEventListener("pointerdown", (event) => {
    if (state.enabled) void unlockAudio();
    if (
      state.menuOpen &&
      event.target instanceof Node &&
      !elements.audioControl.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  }, { capture: true, passive: true });

  document.addEventListener("keydown", (event) => {
    if (state.enabled) void unlockAudio();
    if (event.key === "Escape" && state.menuOpen) {
      event.preventDefault();
      setMenuOpen(false, true);
    }
  }, { capture: true });

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const element = closestSelectable(event.target);
    if (!element || element === state.hovered) return;
    state.hovered = element;

    const previewProfile = element.dataset.audioProfile;
    if (previewProfile) playSound("preview", element, true, previewProfile);
    else playSound(soundKind(element), element);
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

    const previewProfile = element.dataset.audioProfile;
    if (previewProfile) playSound("preview", element, true, previewProfile);
    else playSound(soundKind(element), element);
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
    if (
      !element ||
      element === elements.soundToggle ||
      element === elements.menuToggle ||
      element === elements.masterToggle ||
      element.matches("[data-audio-profile]")
    ) return;

    const isBackAction = element.matches(
      ".dimension-back, .dimension-explorer-close, .modal-close, #modal-close-button",
    );
    playSound(isBackAction ? "back" : "confirm", element, true);
  }, true);

  document.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) playSound("confirm", event.target, true);
  });

  elements.profileList.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) return;
    const buttons = [...elements.profileList.querySelectorAll("button:not([disabled])")];
    if (!buttons.length) return;
    event.preventDefault();
    const currentIndex = Math.max(0, buttons.indexOf(document.activeElement));
    const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    buttons[(currentIndex + direction + buttons.length) % buttons.length].focus();
  });

  elements.soundToggle.addEventListener("click", () => void toggleSound());
  elements.masterToggle.addEventListener("click", () => void toggleSound());
  elements.menuToggle.addEventListener("click", () => {
    setMenuOpen(!state.menuOpen);
    playSound("navigation", elements.menuToggle, true);
  });

  document.addEventListener("warspawn:languagechange", (event) => {
    state.language = event.detail?.language === "en" ? "en" : "pt";
    renderProfiles();
    updateUi();
  });

  renderProfiles();
  updateUi();
})();
