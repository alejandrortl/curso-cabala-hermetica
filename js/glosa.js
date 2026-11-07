// Términos pulsables: marca en el texto las entradas de window.GLOSARIO y abre una ventana breve
// con su explicación. También dibuja la página #/glosario.
window.GLOSA = (function () {
  const G = window.GLOSARIO || [];
  const porId = new Map(G.map(e => [e.id, e]));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = s => s.normalize("NFC").toLocaleLowerCase("es");

  // Una sola expresión con todas las formas, de la más larga a la más corta, para que
  // «Ain Soph Aur» gane a «Ain» y «tarot Thoth» a «tarot».
  const exactas = new Map(), sinCaso = new Map(), formas = [];
  G.forEach(e => (e.f || [e.t]).forEach(f => {
    f = f.normalize("NFC");
    if (e.cs) exactas.set(f, e.id); else sinCaso.set(norm(f), e.id);
    formas.push(f);
  }));
  formas.sort((a, b) => b.length - a.length);
  const patron = formas.length ? new RegExp(`(^|[^\\p{L}\\p{N}])(${formas.map(f => f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}\\p{N}])`, "giu") : null;
  const busca = txt => exactas.get(txt) || sinCaso.get(norm(txt));

  // Dentro de estos elementos no se marca nada.
  const FUERA = "h1,h2,h3,h4,a,button,label,summary,textarea,input,select,svg,code,.heb,[data-decir],.etiqueta,.credito,.info,.meditacion,figure.interactivo,.no-glosa,.termino,.tabla th";

  function boton(id, texto) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "termino"; b.dataset.g = id; b.textContent = texto;
    b.setAttribute("aria-haspopup", "dialog");
    return b;
  }

  // Marca la primera aparición de cada término en cada sección (cada h2 empieza una nueva).
  // Los términos frecuentes (una: true) y los que se presentan en la propia lección se marcan
  // una sola vez por página. En el recuadro «Términos nuevos de esta lección» se marcan todos.
  function marca(raiz, leccion) {
    if (!patron) return;
    raiz.querySelectorAll("[data-glosa]").forEach(el => {
      if (!porId.has(el.dataset.glosa)) return;
      const b = boton(el.dataset.glosa, el.textContent); el.replaceWith(b);
    });
    raiz.querySelectorAll(".nota").forEach(n => {
      const s = n.querySelector("strong");
      if (s && /^Términos nuevos/i.test(s.textContent.trim())) n.classList.add("terminos-nuevos");
    });
    const textos = [];
    const unaVez = id => { const e = porId.get(id); return e.una || (leccion && e.l === leccion); };
    const enPagina = new Set();
    let vistos = new Set();
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (n.nodeType === 1) {
          if (n.tagName === "H2") vistos = new Set();
          return n.matches(FUERA) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while ((n = w.nextNode())) {
      const txt = n.nodeValue;
      if (!txt.trim()) continue;
      const todos = !!n.parentElement.closest(".terminos-nuevos");
      const trozos = [];
      patron.lastIndex = 0;
      let m;
      while ((m = patron.exec(txt))) {
        const id = busca(m[2]);
        if (!id) continue;
        if (!todos) {
          const conjunto = unaVez(id) ? enPagina : vistos;
          if (conjunto.has(id)) continue;
          conjunto.add(id);
        }
        trozos.push({ i: m.index + m[1].length, txt: m[2], id });
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
  let ventana = null, origen = null;
  function leccionTxt(e) {
    if (!e.l) return "";
    const C = window.CURSO || { lecciones: [] };
    const lec = C.lecciones.find(x => x.n === e.l);
    const actual = (location.hash.match(/^#\/leccion\/(\d+)/) || [])[1];
    if (String(e.l) === actual) return `<p class="g-lec">Aparece en esta lección.</p>`;
    return lec && lec.disponible
      ? `<p class="g-lec">Aparece por primera vez en la <a href="#/leccion/${e.l}">lección ${e.l}</a>.</p>`
      : `<p class="g-lec">Lo verás en la lección ${e.l}.</p>`;
  }
  function cierra(devuelveFoco) {
    if (!ventana || ventana.hidden) return;
    ventana.hidden = true;
    if (origen) { origen.setAttribute("aria-expanded", "false"); if (devuelveFoco) origen.focus(); }
    origen = null;
  }
  function abre(b) {
    const e = porId.get(b.dataset.g);
    if (!e) return;
    if (!ventana) {
      ventana = document.createElement("div");
      ventana.className = "glosa"; ventana.id = "glosa"; ventana.hidden = true;
      ventana.setAttribute("role", "dialog"); ventana.setAttribute("aria-labelledby", "glosa-t"); ventana.tabIndex = -1;
      document.body.append(ventana);
      ventana.addEventListener("click", ev => {
        if (ev.target.closest(".g-cerrar")) cierra(true);
        else if (ev.target.closest("a")) cierra(false);
      });
    }
    if (origen === b && !ventana.hidden) { cierra(true); return; }
    if (origen) origen.setAttribute("aria-expanded", "false");
    origen = b; b.setAttribute("aria-expanded", "true");
    ventana.innerHTML = `<div class="g-cab"><strong id="glosa-t">${esc(e.t)}</strong><button type="button" class="g-cerrar" aria-label="Cerrar">✕</button></div>
      <p>${esc(e.d)}</p>${leccionTxt(e)}<a href="#/glosario/${e.id}" class="g-todo">Ver en el glosario completo</a>`;
    ventana.hidden = false;
    coloca(b);
    ventana.focus({ preventScroll: true });
  }
  function coloca(b) {
    ventana.style.left = ventana.style.top = "";
    ventana.classList.remove("arriba");
    const r = b.getBoundingClientRect(), v = ventana.getBoundingClientRect();
    if (window.matchMedia("(max-width: 640px)").matches) { // en el móvil, hoja fija abajo (CSS): que no tape el término
      const libre = window.innerHeight - v.height - 12;
      if (r.bottom > libre) window.scrollBy({ top: r.bottom - libre + 24, behavior: "smooth" });
      return;
    }
    const ancho = document.documentElement.clientWidth;
    const left = Math.max(16, Math.min(r.left + window.scrollX, window.scrollX + ancho - v.width - 16));
    let top = r.bottom + window.scrollY + 6;
    if (r.bottom + v.height + 12 > window.innerHeight && r.top > v.height + 12) { top = r.top + window.scrollY - v.height - 6; ventana.classList.add("arriba"); }
    ventana.style.left = left + "px"; ventana.style.top = top + "px";
  }
  document.addEventListener("click", ev => {
    const b = ev.target.closest(".termino");
    if (b) { abre(b); return; }
    if (ventana && !ventana.hidden && !ev.target.closest(".glosa")) cierra(false);
  });
  document.addEventListener("keydown", ev => { if (ev.key === "Escape") cierra(true); });
  window.addEventListener("hashchange", () => cierra(false));
  window.addEventListener("resize", () => { if (origen && ventana && !ventana.hidden) coloca(origen); });

  // ── Página del glosario ──
  function pagina(app, destacado) {
    const orden = [...G].sort((a, b) => a.t.localeCompare(b.t, "es", { sensitivity: "base" }));
    const C = window.CURSO || { lecciones: [] };
    const disp = n => (C.lecciones.find(x => x.n === n) || {}).disponible;
    const inicial = t => t.normalize("NFD").replace(/[̀-ͯ]/g, "").charAt(0).toUpperCase();
    app.innerHTML = `<h1>Glosario</h1>
      <p>Los términos de esta lista aparecen subrayados en las lecciones: tócalos para ver su explicación sin perder el hilo.</p>
      <p><input type="text" id="g-busca" placeholder="Buscar un término…" aria-label="Buscar en el glosario" autocomplete="off"></p>
      <p class="aviso" id="g-cuenta"></p>
      <dl class="glosario">${orden.map((e, i) => {
        const letra = inicial(e.t), nueva = i === 0 || inicial(orden[i - 1].t) !== letra;
        return `${nueva ? `<div class="g-letra" data-letra="${letra}">${letra}</div>` : ""}
        <div class="g-entrada" id="g-${e.id}" data-letra="${letra}" data-buscar="${esc(norm(e.t + " " + (e.f || []).join(" ") + " " + e.d))}">
          <dt>${esc(e.t)}</dt><dd>${esc(e.d)}${e.l ? ` <span class="g-l">${disp(e.l) ? `<a href="#/leccion/${e.l}">Lección ${e.l}</a>` : `Lección ${e.l}`}</span>` : ""}</dd></div>`;
      }).join("")}</dl>`;
    const caja = app.querySelector("#g-busca"), cuenta = app.querySelector("#g-cuenta");
    const filtra = () => {
      const q = norm(caja.value.trim());
      let n = 0;
      const letras = new Set();
      app.querySelectorAll(".g-entrada").forEach(d => {
        const ok = !q || d.dataset.buscar.includes(q);
        d.hidden = !ok; if (ok) { n++; letras.add(d.dataset.letra); }
      });
      app.querySelectorAll(".g-letra").forEach(l => { l.hidden = !letras.has(l.dataset.letra); });
      cuenta.textContent = q ? `${n} ${n === 1 ? "término" : "términos"}` : `${G.length} términos`;
    };
    caja.addEventListener("input", filtra); filtra();
    const el = destacado && app.querySelector(`#g-${CSS.escape(destacado)}`);
    if (el) { el.classList.add("destacado"); setTimeout(() => el.scrollIntoView({ block: "center" }), 30); }
    else window.scrollTo(0, 0);
  }

  return { marca, pagina };
})();
