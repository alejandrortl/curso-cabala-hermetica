// Pronunciación con la síntesis de voz del navegador (hebreo he-IL; si no hay voz hebrea, español).
window.AUDIO = (function () {
  let voces = [];
  const cargar = () => { try { voces = speechSynthesis.getVoices(); } catch (e) {} };
  if ("speechSynthesis" in window) { cargar(); speechSynthesis.onvoiceschanged = cargar; }
  const vozHe = () => voces.find(v => /^he|^iw/i.test(v.lang));
  const vozEs = () => voces.find(v => /^es/i.test(v.lang));
  function decir(hebreo, translit) {
    if (!("speechSynthesis" in window)) { alert("Este navegador no puede reproducir voz."); return; }
    speechSynthesis.cancel();
    const v = vozHe();
    const u = new SpeechSynthesisUtterance(v || !translit ? hebreo : translit);
    if (v) { u.voice = v; u.lang = v.lang; } else if (translit) { const e = vozEs(); if (e) u.voice = e; u.lang = "es-ES"; } else u.lang = "he-IL";
    u.rate = (window.AUDIO && window.AUDIO.lento) ? 0.55 : 0.8;
    speechSynthesis.speak(u);
  }
  function boton(hebreo, translit, titulo) {
    return `<button class="altavoz" type="button" data-he="${hebreo}" data-tr="${translit || ""}" title="${titulo || "Escuchar"}" aria-label="${titulo || "Escuchar"}">🔊</button>`;
  }
  document.addEventListener("click", ev => {
    const b = ev.target.closest(".altavoz"); if (!b) return;
    decir(b.dataset.he, b.dataset.tr);
  });
  return { decir, boton, hayHebreo: () => !!vozHe(), lento: false };
})();
