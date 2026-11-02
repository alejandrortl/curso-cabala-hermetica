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
        <div class="tarjeta"><h3>Rituales</h3><p>Antes del primer uso de las cartas: consagración de la baraja.</p><a href="#/rituales">Materiales y rituales</a></div>
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
      const r = await fetch(`lecciones/leccion-${n}.html`);
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
      app.querySelectorAll(".repetir").forEach(b => b.addEventListener("click", () => {
        const svg = b.closest("figure").querySelector("svg"); const copia = svg.cloneNode(true); svg.replaceWith(copia);
      }));
      window.scrollTo(0, 0);
    } catch (e) {
      app.innerHTML = `<p>No se pudo cargar la lección (${esc(e.message)}).</p>`;
    }
  }

  function letras() {
    app.innerHTML = `<h1>Las 22 letras</h1>
      <p>Las letras resaltadas son las que ya has aprendido. Correspondencias de la Golden Dawn, el sistema de tu Rider-Waite.</p>
      <div class="letras">${C.letras.map(l => `
        <div class="letra-card ${l.leccion ? "aprendida" : ""}">
          <div class="glifo">${l.l}</div>
          <div class="nombre">${l.nombre} · ${l.valor}</div>
          <div class="det">${l.significado} · ${l.tipo}</div>
          <div class="det">${l.astro} · ${l.arcano}</div>
          ${l.leccion ? `<div class="det">Lección ${l.leccion}</div>` : ""}
        </div>`).join("")}</div>
      <h2>Calculadora de gematría</h2>
      <p>Escribe una palabra en letras hebreas.</p>
      <input type="text" id="gem" class="heb" dir="rtl" value="קבלה">
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
      ${C.rituales.map(r => `<tr><td>${esc(r.nombre)}</td><td>${esc(r.cuando)}</td><td>${esc(r.materiales)}</td><td>${esc(r.estado)}</td></tr>`).join("")}</table>`;
    const t = app.querySelector("table"); const d = document.createElement("div"); d.className = "tabla"; t.parentNode.insertBefore(d, t); d.appendChild(t);
    app.querySelectorAll("input[type=checkbox]").forEach(cb => cb.addEventListener("change", () => {
      guarda.escribir("materiales", [...app.querySelectorAll("input[type=checkbox]:checked")].map(x => x.dataset.id));
    }));
  }

  function diario() {
    const entradas = guarda.leer("diario", []);
    app.innerHTML = `<h1>Diario de estudio</h1>
      <p>Se guarda solo en este navegador. Exporta de vez en cuando para no perderlo.</p>
      <textarea id="txt" placeholder="Fecha, práctica, carta, sensaciones…"></textarea>
      <p><button class="boton" id="add">Guardar entrada</button> <button class="boton secundario" id="exp">Exportar</button></p>
      <div id="lista">${entradas.slice().reverse().map(e => `<div class="entrada"><div class="fecha">${esc(new Date(e.f).toLocaleString("es"))}</div><div>${esc(e.t).replace(/\n/g, "<br>")}</div></div>`).join("")}</div>`;
    document.getElementById("add").onclick = () => {
      const t = document.getElementById("txt").value.trim(); if (!t) return;
      entradas.push({ f: Date.now(), t }); guarda.escribir("diario", entradas); diario();
    };
    document.getElementById("exp").onclick = () => {
      const txt = entradas.map(e => `## ${new Date(e.f).toLocaleString("es")}\n\n${e.t}\n`).join("\n");
      const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], { type: "text/markdown" }));
      a.download = "diario-de-estudio.md"; a.click();
    };
  }

  function ruta() {
    const h = location.hash.replace(/^#\/?/, "");
    const [seccion, arg] = h.split("/");
    document.querySelectorAll(".menu a").forEach(a => a.classList.toggle("activo", a.getAttribute("href") === "#/" + (seccion || "")));
    document.getElementById("menu").classList.remove("abierto");
    if (seccion === "lecciones") lecciones();
    else if (seccion === "leccion") leccion(parseInt(arg, 10));
    else if (seccion === "letras") letras();
    else if (seccion === "rituales") rituales();
    else if (seccion === "diario") diario();
    else inicio();
  }
  document.getElementById("menu-btn").onclick = () => document.getElementById("menu").classList.toggle("abierto");
  window.addEventListener("hashchange", ruta);
  ruta();
})();
