// Meditaciones guiadas con tono binaural (Web Audio) y voz en off (síntesis de voz del navegador).
// Oído izquierdo: 369 Hz. Oído derecho: 369 Hz + la frecuencia de batido elegida (theta = 6 Hz por defecto).
window.MEDITACION = (function () {
  const BASE = 369;
  const ONDAS = { theta: { hz: 6, nombre: "Theta · 6 Hz" }, alfa: { hz: 10, nombre: "Alfa · 10 Hz" } };
  let estado = null; // sesión en curso

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const duracionGuiada = m => m.pasos.reduce((a, p) => a + p.pausa + Math.ceil(p.texto.length / 13), 0);

  function vozEs() {
    try { return speechSynthesis.getVoices().find(v => /^es/i.test(v.lang)); } catch (e) { return null; }
  }

  function iniciaBinaural(onda, volumen) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const crea = (frec, lado) => {
      const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = frec;
      const p = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      if (p) { p.pan.value = lado; o.connect(p); p.connect(master); }
      else { const m = ctx.createChannelMerger(2); o.connect(m, 0, lado < 0 ? 0 : 1); m.connect(master); }
      o.start(); return o;
    };
    const osc = [crea(BASE, -1), crea(BASE + ONDAS[onda].hz, 1)];
    master.gain.linearRampToValueAtTime(volumen, ctx.currentTime + 6); // entrada suave
    return { ctx, master, osc };
  }

  function pararBinaural(b, segundos) {
    if (!b) return;
    const t = b.ctx.currentTime;
    b.master.gain.cancelScheduledValues(t);
    b.master.gain.setValueAtTime(b.master.gain.value, t);
    b.master.gain.linearRampToValueAtTime(0, t + segundos);
    setTimeout(() => { try { b.osc.forEach(o => o.stop()); b.ctx.close(); } catch (e) {} }, segundos * 1000 + 200);
  }

  async function mantenPantalla() {
    try { if (navigator.wakeLock) return await navigator.wakeLock.request("screen"); } catch (e) {}
    return null;
  }

  function parar(final) {
    if (!estado) return;
    const e = estado; estado = null;
    clearInterval(e.reloj); clearTimeout(e.espera);
    try { speechSynthesis.cancel(); } catch (x) {}
    pararBinaural(e.bin, final ? 8 : 2);
    try { e.lock && e.lock.release(); } catch (x) {}
    pinta(e.cont, e.med, final ? "Meditación terminada. Vuelve despacio y anota en tu diario cómo te ha ido." : "");
  }

  async function empezar(cont, med, modo) {
    if (estado) parar(false);
    const onda = cont.querySelector(".m-onda").value;
    const vol = +cont.querySelector(".m-vol").value / 100 * 0.25;
    const minutos = +cont.querySelector(".m-min").value;
    estado = { cont, med, modo, inicio: Date.now(), lock: await mantenPantalla() };
    if (modo !== "voz") estado.bin = iniciaBinaural(onda, vol);
    const total = modo === "binaural" ? minutos * 60 : duracionGuiada(med) + 10;
    estado.total = total;
    pinta(cont, med);
    const e = estado;
    e.reloj = setInterval(() => {
      if (estado !== e) return;
      const t = (Date.now() - e.inicio) / 1000;
      const r = cont.querySelector(".m-tiempo"); if (r) r.textContent = `${mmss(t)} / ${mmss(e.total)}`;
      if (modo === "binaural" && t >= total) parar(true);
    }, 500);
    if (modo !== "binaural") guia(e, 0);
  }

  function guia(e, i) {
    if (estado !== e) return;
    if (i >= e.med.pasos.length) { e.espera = setTimeout(() => parar(true), 6000); return; }
    const paso = e.med.pasos[i];
    const txt = e.cont.querySelector(".m-paso"); if (txt) txt.textContent = paso.texto;
    const u = new SpeechSynthesisUtterance(paso.texto);
    const v = vozEs(); if (v) u.voice = v; u.lang = "es-ES"; u.rate = 0.82; u.pitch = 0.95;
    let hecho = false;
    const sigue = () => {
      if (hecho || estado !== e) return; hecho = true;
      const marca = e.cont.querySelector(".m-silencio");
      if (marca) marca.textContent = paso.pausa >= 20 ? `Silencio de ${paso.pausa} s para practicar…` : "";
      e.espera = setTimeout(() => guia(e, i + 1), paso.pausa * 1000);
    };
    u.onend = sigue; u.onerror = sigue;
    speechSynthesis.speak(u);
  }

  function pinta(cont, med, mensaje) {
    const enCurso = estado && estado.cont === cont;
    const guardado = (k, d) => { try { return localStorage.getItem("med-" + k) || d; } catch (e) { return d; } };
    cont.innerHTML = `
      <div class="med-cab"><strong>🎧 ${esc(med.titulo)}</strong> <span class="aviso">${esc(med.resumen)}</span></div>
      ${enCurso ? `
        <p class="m-paso">${estado.modo === "binaural" ? "Solo tono binaural. Practica en silencio." : "Preparando la voz…"}</p>
        <p class="aviso"><span class="m-silencio"></span> <span class="m-tiempo"></span></p>
        <button class="boton m-parar" type="button">⏹ Parar</button>` : `
        <div class="fila">
          <label>Onda <select class="m-onda">${Object.entries(ONDAS).map(([k, o]) => `<option value="${k}" ${guardado("onda", "theta") === k ? "selected" : ""}>${o.nombre}</option>`).join("")}</select></label>
          <label>Volumen del tono <input class="m-vol" type="range" min="5" max="100" value="${guardado("vol", "40")}"></label>
          <label>Duración (solo binaural) <select class="m-min">${[5, 10, 15, 20, 30].map(m => `<option ${+guardado("min", "10") === m ? "selected" : ""}>${m}</option>`).join("")}</select></label>
        </div>
        <div class="acciones">
          <button class="boton" data-modo="guiada" type="button">▶ Binaural con voz (≈ ${Math.round(duracionGuiada(med) / 60)} min)</button>
          <button class="boton secundario" data-modo="binaural" type="button">▶ Solo binaural</button>
          <button class="boton secundario" data-modo="voz" type="button">▶ Solo voz</button>
        </div>
        ${mensaje ? `<p class="nota">${esc(mensaje)}</p>` : ""}
        <details><summary>Ver los pasos y la configuración del sonido</summary>
          <p class="aviso">Oído izquierdo ${BASE} Hz; oído derecho ${BASE} Hz más la onda elegida (con theta, ${BASE + 6} Hz). El efecto binaural solo se produce con auriculares. Mantén la pantalla encendida mientras suena.</p>
          <ol>${med.pasos.map(p => `<li>${esc(p.texto)} <span class="aviso">(${p.pausa} s de silencio)</span></li>`).join("")}</ol>
        </details>`}
    `;
    cont.querySelectorAll("[data-modo]").forEach(b => b.onclick = () => {
      try { ["onda", "min"].forEach(k => localStorage.setItem("med-" + k, cont.querySelector(".m-" + k).value)); localStorage.setItem("med-vol", cont.querySelector(".m-vol").value); } catch (e) {}
      empezar(cont, med, b.dataset.modo);
    });
    const p = cont.querySelector(".m-parar"); if (p) p.onclick = () => parar(false);
  }

  // Monta todos los reproductores de una página: <div class="meditacion" data-med="id"></div>
  function monta(raiz) {
    raiz.querySelectorAll(".meditacion[data-med]").forEach(cont => {
      const med = (window.CURSO.meditaciones || []).find(m => m.id === cont.dataset.med);
      if (med) pinta(cont, med);
    });
  }
  window.addEventListener("hashchange", () => parar(false));
  return { monta, parar };
})();
