(function () {
  const C = window.CURSO;
  const app = document.getElementById("app");

  // Almacenamiento local seguro (puede fallar en modo privado).
  const guarda = {
    leer(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } },
    escribir(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function inicio() {
    const hechas = guarda.leer("lecciones-hechas", []);
    const aprendidas = C.letras.filter(l => l.leccion).length;
    const sig = C.lecciones.find(l => l.disponible && !hechas.includes(l.n));
    app.innerHTML = `
      <h1>Curso de Qabalah hermética, tarot y numerología</h1>
      <p>Un curso de iniciación progresivo, una lección cada vez, con la baraja Rider-Waite como referencia y las 22 letras hebreas como hilo conductor.</p>
      <div class="tarjetas">
        <div class="tarjeta"><h3>Lecciones</h3><p>${hechas.length} de ${C.lecciones.length} completadas</p>
          ${sig ? `<a href="#/leccion/${sig.n}">Continuar con la lección ${sig.n}</a>` : ""}</div>
        <div class="tarjeta"><h3>Letras</h3><p class="heb" style="font-size:1.6rem">${C.letras.filter(l => l.leccion).map(l => l.l).join(" ")}</p>
          <p>${aprendidas} de 22 aprendidas</p><a href="#/letras">Ver alfabeto</a></div>
        <div class="tarjeta"><h3>Rituales</h3><p>Antes del primer uso de las cartas: consagración de la baraja.</p><a href="#/ritual/consagracion">Ver el ritual</a> · <a href="#/rituales">Materiales</a></div>
        <div class="tarjeta"><h3>Diario</h3><p>${guarda.leer("diario", []).length} entradas</p><a href="#/diario">Escribir</a></div>
      </div>`;
  }

  function lecciones() {
    const hechas = guarda.leer("lecciones-hechas", []);
    app.innerHTML = `<h1>Lecciones</h1><div class="tarjetas">${C.lecciones.map(l => `
      <div class="tarjeta ${hechas.includes(l.n) ? "hecha" : ""}">
        <span class="etiqueta ${hechas.includes(l.n) ? "ok" : ""}">Lección ${l.n}${hechas.includes(l.n) ? " · completada" : ""}</span>
        <h3>${l.disponible ? `<a href="#/leccion/${l.n}">${esc(l.titulo)}</a>` : esc(l.titulo)}</h3>
        <div class="estado">${l.disponible ? "" : "Próximamente"}</div>
      </div>`).join("")}</div>`;
  }

  async function leccion(n) {
    const meta = C.lecciones.find(l => l.n === n);
    if (!meta || !meta.disponible) { app.innerHTML = `<h1>Lección ${n}</h1><p>Esta lección todavía no está disponible.</p>`; return; }
    app.innerHTML = "<p>Cargando…</p>";
    try {
      const r = await fetch(`lecciones/leccion-${n}.html`, { cache: "no-cache" });
      if (!r.ok) throw new Error(r.status);
      const html = await r.text();
      const hechas = guarda.leer("lecciones-hechas", []);
      app.innerHTML = html + `
        <p><label><input type="checkbox" id="hecha" ${hechas.includes(n) ? "checked" : ""}> He completado esta lección</label></p>
        <div class="navlec">${n > 1 ? `<a href="#/leccion/${n - 1}">← Lección ${n - 1}</a>` : "<span></span>"}
        ${C.lecciones.find(l => l.n === n + 1 && l.disponible) ? `<a href="#/leccion/${n + 1}">Lección ${n + 1} →</a>` : ""}</div>`;
      document.querySelectorAll("table").forEach(t => { const d = document.createElement("div"); d.className = "tabla"; t.parentNode.insertBefore(d, t); d.appendChild(t); });
      document.getElementById("hecha").addEventListener("change", e => {
        let h = guarda.leer("lecciones-hechas", []).filter(x => x !== n);
        if (e.target.checked) h.push(n);
        guarda.escribir("lecciones-hechas", h);
      });
      prepara();
    } catch (e) {
      app.innerHTML = `<p>No se pudo cargar la lección (${esc(e.message)}).</p>`;
    }
  }

  // Tras cargar una página de contenido: audio de las palabras, reproductores y animaciones.
  function prepara() {
    app.querySelectorAll("[data-decir]").forEach(el => el.insertAdjacentHTML("afterend", " " + AUDIO.boton(el.dataset.decir, el.dataset.tr, "Escuchar")));
    MEDITACION.monta(app);
    app.querySelectorAll(".repetir").forEach(b => b.addEventListener("click", () => {
      const svg = b.closest("figure").querySelector("svg"); const copia = svg.cloneNode(true); svg.replaceWith(copia);
    }));
    window.scrollTo(0, 0);
  }

  async function ritual(id) {
    if (!/^[a-z-]+$/.test(id || "")) { rituales(); return; }
    app.innerHTML = "<p>Cargando…</p>";
    try {
      const r = await fetch(`rituales/${id}.html`, { cache: "no-cache" });
      if (!r.ok) throw new Error(r.status);
      app.innerHTML = await r.text() + `<div class="navlec"><a href="#/rituales">← Materiales y rituales</a><span></span></div>`;
      app.querySelectorAll("table").forEach(t => { const d = document.createElement("div"); d.className = "tabla"; t.parentNode.insertBefore(d, t); d.appendChild(t); });
      prepara();
    } catch (e) {
      app.innerHTML = `<p>No se pudo cargar el ritual (${esc(e.message)}).</p>`;
    }
  }

  function letras() {
    app.innerHTML = `<h1>Las 22 letras</h1>
      <p>Las letras resaltadas son las que ya has aprendido. Correspondencias de la Golden Dawn, el sistema de tu Rider-Waite.</p>
      <div class="letras">${C.letras.map(l => `
        <div class="letra-card ${l.leccion ? "aprendida" : ""}">
          <div class="glifo">${l.l}</div>
          <div class="nombre">${l.nombre} · ${l.valor} ${AUDIO.boton(l.he, l.nombre, "Escuchar " + l.nombre)}</div>
          <div class="det">${l.significado} · ${l.tipo}</div>
          <div class="det">${l.astro} · ${l.arcano}</div>
          ${l.leccion ? `<div class="det">Lección ${l.leccion}</div>` : ""}
        </div>`).join("")}</div>
      <p class="aviso" id="aviso-voz"></p>
      <h2>Calculadora de gematría</h2>
      <p>Escribe una palabra en letras hebreas.</p>
      <div class="fila"><input type="text" id="gem" class="heb" dir="rtl" value="קבלה" style="flex:1"><button class="boton secundario" id="gem-oir" type="button">🔊 Escuchar</button></div>
      <p id="gem-res"></p>`;
    const val = {}; C.letras.forEach(l => val[l.l] = l.valor);
    Object.assign(val, { "ך": 20, "ם": 40, "ן": 50, "ף": 80, "ץ": 90 });
    const red = x => { while (x > 9 && x !== 11 && x !== 22 && x !== 33) x = String(x).split("").reduce((a, b) => a + +b, 0); return x; };
    const calc = () => {
      const t = document.getElementById("gem").value;
      const s = [...t].reduce((a, c) => a + (val[c] || 0), 0);
      document.getElementById("gem-res").textContent = s ? `Valor: ${s} · reducción: ${red(s)}` : "";
    };
    document.getElementById("gem").addEventListener("input", calc); calc();
    document.getElementById("gem-oir").onclick = () => AUDIO.decir(document.getElementById("gem").value);
    setTimeout(() => { const a = document.getElementById("aviso-voz"); if (a && !AUDIO.hayHebreo()) a.textContent = "Tu dispositivo no tiene voz hebrea instalada: oirás el nombre en español. En Android o iPhone puedes añadir la voz hebrea en los ajustes de texto a voz."; }, 800);
  }

  function rituales() {
    const marcados = guarda.leer("materiales", []);
    const li = m => `<li><label><input type="checkbox" data-id="${m.id}" ${marcados.includes(m.id) ? "checked" : ""}> ${esc(m.texto)}</label></li>`;
    app.innerHTML = `<h1>Rituales y materiales</h1>
      <div class="nota">Antes de usar las cartas por primera vez haremos la consagración de la baraja.</div>
      <h2>Lista de materiales</h2>
      <h3>Imprescindible</h3><ul class="check">${C.materiales.filter(m => m.imprescindible).map(li).join("")}</ul>
      <h3>Recomendable</h3><ul class="check">${C.materiales.filter(m => !m.imprescindible).map(li).join("")}</ul>
      <h2>Rituales del curso</h2>
      <table><tr><th>Ritual</th><th>Cuándo</th><th>Materiales</th><th>Estado</th></tr>
      ${C.rituales.map(r => `<tr><td>${esc(r.nombre)}</td><td>${esc(r.cuando)}</td><td>${esc(r.materiales)}</td><td>${r.enlace ? `<a href="${r.enlace}">${esc(r.estado)}</a>` : esc(r.estado)}</td></tr>`).join("")}</table>
      <h2>Meditaciones guiadas</h2>
      <p class="aviso">Cada meditación tiene tres versiones: binaural con voz, solo binaural y solo voz. El tono binaural necesita auriculares.</p>
      ${(C.meditaciones || []).map(m => `<p>${m.ritual ? `<a href="#/ritual/${m.ritual}">Ver el ritual completo</a>` : `<a href="#/leccion/${m.leccion}">Lección ${m.leccion}</a>`}</p><div class="meditacion" data-med="${m.id}"></div>`).join("")}`;
    MEDITACION.monta(app);
    const t = app.querySelector("table"); const d = document.createElement("div"); d.className = "tabla"; t.parentNode.insertBefore(d, t); d.appendChild(t);
    app.querySelectorAll("input[type=checkbox]").forEach(cb => cb.addEventListener("change", () => {
      guarda.escribir("materiales", [...app.querySelectorAll("input[type=checkbox]:checked")].map(x => x.dataset.id));
    }));
  }

  const TIPOS = ["Estudio", "Ritual", "Meditación", "Tirada", "Sueño", "Sincronicidad", "Reflexión", "Otro"];
  const hoy = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
  const fechaLarga = iso => new Date(iso + "T12:00:00").toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  function diario() {
    // Formato antiguo {f, t} -> nuevo {id, fecha, tipo, t}
    let entradas = guarda.leer("diario", []).map(e => e.fecha ? e : { id: e.f, fecha: new Date(e.f).toISOString().slice(0, 10), tipo: "Estudio", t: e.t });
    const filtro = guarda.leer("diario-filtro", "Todos");
    const editando = diario.editando || null;
    const ed = editando ? entradas.find(e => e.id === editando) : null;
    const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const lista = entradas.filter(e => filtro === "Todos" || e.tipo === filtro)
      .sort((a, b) => (b.fecha + b.id).localeCompare(a.fecha + a.id));
    app.innerHTML = `<h1>Diario de estudio</h1>
      <p>Se guarda solo en este navegador. Exporta de vez en cuando para no perderlo.</p>
      <div class="form-diario">
        <div class="fila">
          <label>Fecha <input type="date" id="fecha" value="${ed ? ed.fecha : hoy()}"></label>
          <label>Tipo <select id="tipo">${TIPOS.map(t => `<option ${(ed ? ed.tipo : "Estudio") === t ? "selected" : ""}>${t}</option>`).join("")}</select></label>
        </div>
        <textarea id="txt" placeholder="Qué practicaste, qué carta salió, qué soñaste, qué sentiste…">${ed ? esc(ed.t) : ""}</textarea>
        <p class="acciones">
          <button class="boton" id="add">${ed ? "Guardar cambios" : "Guardar entrada"}</button>
          ${Rec ? `<button class="boton secundario" id="mic" type="button">🎙 Dictar</button>` : `<span class="aviso">Tu navegador no permite dictar aquí; usa el micrófono del teclado del móvil.</span>`}
          ${ed ? `<button class="boton secundario" id="cancelar" type="button">Cancelar</button>` : ""}
          <span id="mic-estado" class="aviso"></span>
        </p>
      </div>
      <div class="fila filtros"><label>Mostrar <select id="filtro">${["Todos", ...TIPOS].map(t => `<option ${filtro === t ? "selected" : ""}>${t}</option>`).join("")}</select></label>
        <button class="boton secundario" id="exp" type="button">Exportar</button></div>
      <div id="lista">${lista.map(e => `<div class="entrada"><div class="fecha"><span class="etiqueta">${esc(e.tipo)}</span> ${esc(fechaLarga(e.fecha))}
        <span class="mini"><a href="#" data-ed="${e.id}">Editar</a> · <a href="#" data-del="${e.id}">Borrar</a></span></div>
        <div>${esc(e.t).replace(/\n/g, "<br>")}</div></div>`).join("") || "<p>No hay entradas todavía.</p>"}</div>`;

    const txt = document.getElementById("txt");
    const guardar = () => guarda.escribir("diario", entradas);
    document.getElementById("add").onclick = () => {
      const t = txt.value.trim(); if (!t) return;
      const datos = { fecha: document.getElementById("fecha").value || hoy(), tipo: document.getElementById("tipo").value, t };
      if (ed) Object.assign(ed, datos); else entradas.push({ id: Date.now(), ...datos });
      guardar(); diario.editando = null; diario();
    };
    const c = document.getElementById("cancelar"); if (c) c.onclick = () => { diario.editando = null; diario(); };
    document.getElementById("filtro").onchange = e => { guarda.escribir("diario-filtro", e.target.value); diario(); };
    app.querySelectorAll("[data-ed]").forEach(a => a.onclick = ev => { ev.preventDefault(); diario.editando = +a.dataset.ed; diario(); window.scrollTo(0, 0); });
    app.querySelectorAll("[data-del]").forEach(a => a.onclick = ev => {
      ev.preventDefault(); if (!confirm("¿Borrar esta entrada?")) return;
      entradas = entradas.filter(e => e.id !== +a.dataset.del); guardar(); diario();
    });
    document.getElementById("exp").onclick = () => {
      const orden = entradas.slice().sort((a, b) => (a.fecha + a.id).localeCompare(b.fecha + b.id));
      const md = orden.map(e => `## ${fechaLarga(e.fecha)} · ${e.tipo}\n\n${e.t}\n`).join("\n");
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([md], { type: "text/markdown" }));
      a.download = "diario-de-estudio.md"; a.click();
    };

    // Dictado por voz
    const mic = document.getElementById("mic");
    if (mic && Rec) {
      let rec = null, base = "";
      const estado = document.getElementById("mic-estado");
      mic.onclick = () => {
        if (rec) { rec.stop(); return; }
        rec = new Rec(); rec.lang = "es-ES"; rec.continuous = true; rec.interimResults = true;
        base = txt.value ? txt.value.replace(/\s*$/, " ") : "";
        rec.onresult = ev => {
          let fin = "", prov = "";
          for (let k = ev.resultIndex; k < ev.results.length; k++) {
            const r = ev.results[k]; if (r.isFinal) fin += r[0].transcript; else prov += r[0].transcript;
          }
          if (fin) base += fin.trim() + " ";
          txt.value = base + prov;
        };
        rec.onerror = ev => { estado.textContent = ev.error === "not-allowed" ? "Permite el uso del micrófono para dictar." : "Error de dictado: " + ev.error; };
        rec.onend = () => { rec = null; mic.textContent = "🎙 Dictar"; mic.classList.remove("grabando"); if (!estado.textContent.startsWith("Error") && !estado.textContent.startsWith("Permite")) estado.textContent = ""; txt.value = base.trim(); };
        rec.start(); mic.textContent = "⏹ Parar"; mic.classList.add("grabando"); estado.textContent = "Escuchando…";
      };
    }
  }

  // Tamaño de letra
  function aplicaTamano(px) { document.documentElement.style.fontSize = px + "px"; }
  aplicaTamano(guarda.leer("tamano", 20));
  document.getElementById("tam").addEventListener("click", ev => {
    const b = ev.target.closest("button"); if (!b) return;
    let px = guarda.leer("tamano", 20);
    px = b.dataset.t === "+" ? Math.min(36, px + 3) : b.dataset.t === "-" ? Math.max(14, px - 3) : 20;
    guarda.escribir("tamano", px); aplicaTamano(px);
  });

  function ruta() {
    const h = location.hash.replace(/^#\/?/, "");
    const [seccion, arg] = h.split("/");
    document.querySelectorAll(".menu a").forEach(a => a.classList.toggle("activo", a.getAttribute("href") === "#/" + (seccion === "ritual" ? "rituales" : seccion || "")));
    document.getElementById("menu").classList.remove("abierto");
    if (seccion === "lecciones") lecciones();
    else if (seccion === "leccion") leccion(parseInt(arg, 10));
    else if (seccion === "letras") letras();
    else if (seccion === "rituales") rituales();
    else if (seccion === "ritual") ritual(arg);
    else if (seccion === "diario") diario();
    else inicio();
  }
  document.getElementById("menu-btn").onclick = () => document.getElementById("menu").classList.toggle("abierto");
  window.addEventListener("hashchange", ruta);
  ruta();
})();
