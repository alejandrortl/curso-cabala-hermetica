// Visor de cartas: convierte en pulsable cada mención de una carta de window.CARTAS
// y abre una ventana con su imagen grande. También dibuja la galería #/cartas.
window.VISOR = (function () {
  const D = window.CARTAS || { mayores: [], menores: [] };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const baraja = [...D.mayores, ...(D.menores || [])];
  const porId = new Map(baraja.map(c => [c.id, c]));
  const mini = c => `imagenes/arcanos/${c.id}.webp`;
  const grande = c => `imagenes/arcanos/grandes/${c.id}.webp`;
  const titulo = c => (c.num != null ? `${c.num} · ` : "") + c.t;

  // Formas buscadas, de la más larga a la más corta («La Rueda de la Fortuna» gana a «La Rueda»).
  // Con mayúsculas exactas: «El Sol» es la carta; «el Sol», el astro.
  const formas = new Map();
  baraja.forEach(c => {
    const fs = c.f || [c.t, c.t.toLocaleLowerCase("es")];
    fs.forEach(f => formas.set(f.normalize("NFC"), c.id));
  });
  const lista = [...formas.keys()].sort((a, b) => b.length - a.length);
  const patron = lista.length ? new RegExp(`(^|[^\\p{L}\\p{N}])(${lista.map(f => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}\\p{N}])`, "gu") : null;

  // Dentro de estos elementos no se marca nada (los mismos que en el glosario).
  const FUERA = "h1,h2,h3,h4,a,button,label,summary,textarea,input,select,svg,code,.heb,[data-decir],.etiqueta,.credito,.info,.meditacion,figure.interactivo,.no-glosa,.no-cartas,.termino,.carta-t,.tabla th,.visor";

  function boton(id, texto) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "carta-t"; b.dataset.c = id; b.textContent = texto;
    b.setAttribute("aria-haspopup", "dialog");
    b.title = "Ver la carta";
    return b;
  }

  // Marca todas las menciones de cartas. Las miniaturas de .arcano img también abren el visor.
  function marca(raiz) {
    raiz.querySelectorAll("[data-carta]").forEach(el => {
      if (porId.has(el.dataset.carta)) el.replaceWith(boton(el.dataset.carta, el.textContent));
    });
    raiz.querySelectorAll(".arcano img, img.carta-img").forEach(img => {
      const m = (img.getAttribute("src") || "").match(/arcanos\/([^/]+)\.webp$/);
      if (!m || !porId.has(m[1])) return;
      img.dataset.c = m[1]; img.classList.add("carta-zoom");
      img.tabIndex = 0; img.setAttribute("role", "button");
      img.setAttribute("aria-label", `Ampliar la carta ${porId.get(m[1]).t}`);
    });
    if (!patron) return;
    const textos = [];
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (n.nodeType === 1) return n.matches(FUERA) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = w.nextNode())) {
      const txt = n.nodeValue;
      if (!txt.trim()) continue;
      const trozos = [];
      patron.lastIndex = 0;
      let m;
      while ((m = patron.exec(txt))) {
        const id = formas.get(m[2].normalize("NFC"));
        if (id) trozos.push({ i: m.index + m[1].length, txt: m[2], id });
      }
      if (trozos.length) textos.push({ n, trozos });
    }
    textos.forEach(({ n, trozos }) => {
      const frag = document.createDocumentFragment(), s = n.nodeValue;
      let pos = 0;
      trozos.forEach(t => {
        if (t.i > pos) frag.append(s.slice(pos, t.i));
        frag.append(boton(t.id, t.txt));
        pos = t.i + t.txt.length;
      });
      if (pos < s.length) frag.append(s.slice(pos));
      n.replaceWith(frag);
    });
  }

  // ── Ventana ──
  let capa = null, actual = null, origen = null;
  function datos(c) {
    const C = window.CURSO || { lecciones: [] };
    const lec = c.l && C.lecciones.find(x => x.n === c.l);
    const enLeccion = (location.hash.match(/^#\/leccion\/(\d+)/) || [])[1] === String(c.l);
    const partes = [];
    if (c.letra) partes.push(`<span class="heb">${esc(c.letra)}</span> ${esc(c.nl)}`);
    if (c.palo) partes.push(esc(D.palos[c.palo] || c.palo));
    if (c.sendero) partes.push(`sendero ${c.sendero}`);
    if (c.sefirot || c.sefira) partes.push(esc(c.sefirot || c.sefira));
    if (c.astro) partes.push(esc(c.astro));
    const enlaces = [];
    if (lec && lec.disponible && !enLeccion) enlaces.push(`<a href="#/leccion/${c.l}${c.sec ? "/" + c.sec : ""}">Estudiarla en la lección ${c.l}</a>`);
    else if (lec && !lec.disponible) enlaces.push(`<span>La estudiarás en la lección ${c.l}.</span>`);
    if (!location.hash.startsWith("#/cartas")) enlaces.push(`<a href="#/cartas">Todas las cartas</a>`);
    return `${partes.length ? `<p class="v-datos">${partes.join(" · ")}</p>` : ""}
      ${c.idea ? `<p class="v-idea">${esc(c.idea)}</p>` : ""}
      ${enlaces.length ? `<p class="v-enlaces">${enlaces.join(" · ")}</p>` : ""}`;
  }
  function pinta(c) {
    actual = c;
    const i = baraja.indexOf(c);
    capa.querySelector(".v-img").innerHTML = `<img src="${grande(c)}" alt="${esc(c.alt || c.t)}" onerror="this.onerror=null;this.src='${mini(c)}'">`;
    capa.querySelector("#visor-t").textContent = titulo(c);
    capa.querySelector(".v-texto").innerHTML = datos(c);
    capa.querySelector(".v-cuenta").textContent = `${i + 1} de ${baraja.length}`;
    // Precarga las vecinas para pasar de carta sin esperas.
    [baraja[(i + 1) % baraja.length], baraja[(i - 1 + baraja.length) % baraja.length]].forEach(v => { new Image().src = grande(v); });
  }
  function mueve(d) { if (actual) pinta(baraja[(baraja.indexOf(actual) + d + baraja.length) % baraja.length]); }
  function crea() {
    capa = document.createElement("div");
    capa.className = "visor"; capa.hidden = true;
    capa.innerHTML = `<div class="v-caja" role="dialog" aria-modal="true" aria-labelledby="visor-t" tabindex="-1">
      <div class="v-cab"><strong id="visor-t"></strong><button type="button" class="v-cerrar" aria-label="Cerrar">✕</button></div>
      <div class="v-cuerpo">
        <button type="button" class="v-paso v-ant" aria-label="Carta anterior">‹</button>
        <div class="v-img"></div>
        <button type="button" class="v-paso v-sig" aria-label="Carta siguiente">›</button>
      </div>
      <div class="v-texto"></div>
      <p class="v-cuenta" aria-live="polite"></p>
    </div>`;
    document.body.append(capa);
    capa.addEventListener("click", ev => {
      if (ev.target === capa || ev.target.closest(".v-cerrar")) cierra(true);
      else if (ev.target.closest(".v-ant")) mueve(-1);
      else if (ev.target.closest(".v-sig")) mueve(1);
      else if (ev.target.closest("a")) cierra(false);
    });
    let x0 = null;
    capa.addEventListener("touchstart", ev => { x0 = ev.touches[0].clientX; }, { passive: true });
    capa.addEventListener("touchend", ev => {
      if (x0 == null) return;
      const dx = ev.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) mueve(dx < 0 ? 1 : -1);
    });
  }
  function abre(id, desde) {
    const c = porId.get(id);
    if (!c) return;
    if (!capa) crea();
    origen = desde || document.activeElement;
    pinta(c);
    capa.hidden = false;
    document.documentElement.classList.add("visor-abierto");
    capa.querySelector(".v-caja").focus({ preventScroll: true });
  }
  function cierra(devuelveFoco) {
    if (!capa || capa.hidden) return;
    capa.hidden = true; actual = null;
    document.documentElement.classList.remove("visor-abierto");
    if (devuelveFoco && origen && origen.focus) origen.focus({ preventScroll: true });
    origen = null;
  }
  const abierto = () => capa && !capa.hidden;
  document.addEventListener("click", ev => {
    const b = ev.target.closest(".carta-t, .carta-zoom, [data-ver-carta]");
    if (b) { ev.preventDefault(); abre(b.dataset.c || b.dataset.verCarta, b); }
  });
  document.addEventListener("keydown", ev => {
    if (abierto()) {
      if (ev.key === "Escape") { ev.stopPropagation(); cierra(true); }
      else if (ev.key === "ArrowRight") mueve(1);
      else if (ev.key === "ArrowLeft") mueve(-1);
      else if (ev.key === "Tab") { // mantiene el foco dentro de la ventana
        const f = [...capa.querySelectorAll("button, a[href]")];
        if (!f.length) return;
        const primero = f[0], ultimo = f[f.length - 1];
        if (ev.shiftKey && (document.activeElement === primero || !capa.contains(document.activeElement))) { ev.preventDefault(); ultimo.focus(); }
        else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primero.focus(); }
      }
      return;
    }
    const z = ev.target.closest && ev.target.closest(".carta-zoom");
    if (z && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); abre(z.dataset.c, z); }
  }, true);
  window.addEventListener("hashchange", () => cierra(false));

  // ── Galería ──
  function grupo(titulo, cartas, texto) {
    return `<h2>${esc(titulo)}</h2>${texto ? `<p>${texto}</p>` : ""}
      <ul class="galeria">${cartas.map(c => `<li><button type="button" class="g-carta" data-ver-carta="${c.id}">
        <img src="${mini(c)}" alt="" loading="lazy" width="240" height="416">
        <span class="g-nombre">${c.num != null ? `<span class="g-num">${esc(c.num)}</span>` : ""}${esc(c.t)}</span>
        ${c.letra ? `<span class="g-letra heb" aria-label="Letra ${esc(c.nl)}">${esc(c.letra)}</span>` : ""}
      </button></li>`).join("")}</ul>`;
  }
  function pagina(app, id) {
    const menores = D.menores || [];
    app.innerHTML = `<h1>Cartas del tarot</h1>
      <p>La baraja de referencia del curso es la Rider-Waite, dibujada por Pamela Colman Smith en 1909. Toca una carta para verla grande; dentro de la ventana puedes pasar a la siguiente con las flechas, el teclado o deslizando el dedo. En las lecciones, el nombre de cada carta también se puede tocar.</p>
      ${grupo("Arcanos mayores", D.mayores, "Las 22 cartas con figura y número romano. Cada una corresponde a una letra hebrea y a un sendero del Árbol de la Vida (lección 5).")}
      ${Object.keys(D.palos).map(p => {
        const cs = menores.filter(c => c.palo === p);
        const txt = { bastos: "El fuego: la letra Yod y el mundo de Atsilut.", copas: "El agua: la primera He y el mundo de Beriá.", espadas: "El aire: la Vav y el mundo de Yetsirá.", oros: "La tierra: la He final y el mundo de Asiá." }[p] || "";
        return cs.length ? grupo(`Arcanos menores: ${D.palos[p]}`, cs, txt ? `${txt} Del As al Diez, las diez sefirot; después, las cuatro figuras de la corte (lección 6).` : "") : "";
      }).join("")}
      ${menores.length ? "" : `<p class="aviso">Los 56 arcanos menores llegarán con la lección 6.</p>`}`;
    window.scrollTo(0, 0);
    if (id && porId.has(id)) abre(id);
  }

  return { marca, abre, pagina, cartas: baraja };
})();
