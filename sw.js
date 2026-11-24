// Service worker: guarda la web en el dispositivo para poder estudiar sin conexión.
// La lista de archivos se regenera con: python3 herramientas/actualizar-offline.py
const VERSION = "d3241fc93a";
const CACHE = `qabalah-${VERSION}`;
const FUENTES = "qabalah-fuentes";
const ARCHIVOS = [
  // INICIO-LISTA
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/estilo.css",
  "js/app.js",
  "js/audio.js",
  "js/cartas-visor.js",
  "js/cartas.js",
  "js/datos.js",
  "js/glosa.js",
  "js/glosario.js",
  "js/meditacion.js",
  "lecciones/leccion-1.html",
  "lecciones/leccion-2.html",
  "lecciones/leccion-3.html",
  "lecciones/leccion-4.html",
  "lecciones/leccion-5.html",
  "lecciones/leccion-6.html",
  "rituales/consagracion.html",
  "imagenes/arcanos/grandes/rws-00.webp",
  "imagenes/arcanos/grandes/rws-01.webp",
  "imagenes/arcanos/grandes/rws-02.webp",
  "imagenes/arcanos/grandes/rws-03.webp",
  "imagenes/arcanos/grandes/rws-04.webp",
  "imagenes/arcanos/grandes/rws-05.webp",
  "imagenes/arcanos/grandes/rws-06.webp",
  "imagenes/arcanos/grandes/rws-07.webp",
  "imagenes/arcanos/grandes/rws-08.webp",
  "imagenes/arcanos/grandes/rws-09.webp",
  "imagenes/arcanos/grandes/rws-10.webp",
  "imagenes/arcanos/grandes/rws-11.webp",
  "imagenes/arcanos/grandes/rws-12.webp",
  "imagenes/arcanos/grandes/rws-13.webp",
  "imagenes/arcanos/grandes/rws-14.webp",
  "imagenes/arcanos/grandes/rws-15.webp",
  "imagenes/arcanos/grandes/rws-16.webp",
  "imagenes/arcanos/grandes/rws-17.webp",
  "imagenes/arcanos/grandes/rws-18.webp",
  "imagenes/arcanos/grandes/rws-19.webp",
  "imagenes/arcanos/grandes/rws-20.webp",
  "imagenes/arcanos/grandes/rws-21.webp",
  "imagenes/arcanos/grandes/rws-bastos-01.webp",
  "imagenes/arcanos/grandes/rws-bastos-02.webp",
  "imagenes/arcanos/grandes/rws-bastos-03.webp",
  "imagenes/arcanos/grandes/rws-bastos-04.webp",
  "imagenes/arcanos/grandes/rws-bastos-05.webp",
  "imagenes/arcanos/grandes/rws-bastos-06.webp",
  "imagenes/arcanos/grandes/rws-bastos-07.webp",
  "imagenes/arcanos/grandes/rws-bastos-08.webp",
  "imagenes/arcanos/grandes/rws-bastos-09.webp",
  "imagenes/arcanos/grandes/rws-bastos-10.webp",
  "imagenes/arcanos/grandes/rws-bastos-11.webp",
  "imagenes/arcanos/grandes/rws-bastos-12.webp",
  "imagenes/arcanos/grandes/rws-bastos-13.webp",
  "imagenes/arcanos/grandes/rws-bastos-14.webp",
  "imagenes/arcanos/grandes/rws-copas-01.webp",
  "imagenes/arcanos/grandes/rws-copas-02.webp",
  "imagenes/arcanos/grandes/rws-copas-03.webp",
  "imagenes/arcanos/grandes/rws-copas-04.webp",
  "imagenes/arcanos/grandes/rws-copas-05.webp",
  "imagenes/arcanos/grandes/rws-copas-06.webp",
  "imagenes/arcanos/grandes/rws-copas-07.webp",
  "imagenes/arcanos/grandes/rws-copas-08.webp",
  "imagenes/arcanos/grandes/rws-copas-09.webp",
  "imagenes/arcanos/grandes/rws-copas-10.webp",
  "imagenes/arcanos/grandes/rws-copas-11.webp",
  "imagenes/arcanos/grandes/rws-copas-12.webp",
  "imagenes/arcanos/grandes/rws-copas-13.webp",
  "imagenes/arcanos/grandes/rws-copas-14.webp",
  "imagenes/arcanos/grandes/rws-espadas-01.webp",
  "imagenes/arcanos/grandes/rws-espadas-02.webp",
  "imagenes/arcanos/grandes/rws-espadas-03.webp",
  "imagenes/arcanos/grandes/rws-espadas-04.webp",
  "imagenes/arcanos/grandes/rws-espadas-05.webp",
  "imagenes/arcanos/grandes/rws-espadas-06.webp",
  "imagenes/arcanos/grandes/rws-espadas-07.webp",
  "imagenes/arcanos/grandes/rws-espadas-08.webp",
  "imagenes/arcanos/grandes/rws-espadas-09.webp",
  "imagenes/arcanos/grandes/rws-espadas-10.webp",
  "imagenes/arcanos/grandes/rws-espadas-11.webp",
  "imagenes/arcanos/grandes/rws-espadas-12.webp",
  "imagenes/arcanos/grandes/rws-espadas-13.webp",
  "imagenes/arcanos/grandes/rws-espadas-14.webp",
  "imagenes/arcanos/grandes/rws-oros-01.webp",
  "imagenes/arcanos/grandes/rws-oros-02.webp",
  "imagenes/arcanos/grandes/rws-oros-03.webp",
  "imagenes/arcanos/grandes/rws-oros-04.webp",
  "imagenes/arcanos/grandes/rws-oros-05.webp",
  "imagenes/arcanos/grandes/rws-oros-06.webp",
  "imagenes/arcanos/grandes/rws-oros-07.webp",
  "imagenes/arcanos/grandes/rws-oros-08.webp",
  "imagenes/arcanos/grandes/rws-oros-09.webp",
  "imagenes/arcanos/grandes/rws-oros-10.webp",
  "imagenes/arcanos/grandes/rws-oros-11.webp",
  "imagenes/arcanos/grandes/rws-oros-12.webp",
  "imagenes/arcanos/grandes/rws-oros-13.webp",
  "imagenes/arcanos/grandes/rws-oros-14.webp",
  "imagenes/arcanos/rws-00.webp",
  "imagenes/arcanos/rws-01.webp",
  "imagenes/arcanos/rws-02.webp",
  "imagenes/arcanos/rws-03.webp",
  "imagenes/arcanos/rws-04.webp",
  "imagenes/arcanos/rws-05.webp",
  "imagenes/arcanos/rws-06.webp",
  "imagenes/arcanos/rws-07.webp",
  "imagenes/arcanos/rws-08.webp",
  "imagenes/arcanos/rws-09.webp",
  "imagenes/arcanos/rws-10.webp",
  "imagenes/arcanos/rws-11.webp",
  "imagenes/arcanos/rws-12.webp",
  "imagenes/arcanos/rws-13.webp",
  "imagenes/arcanos/rws-14.webp",
  "imagenes/arcanos/rws-15.webp",
  "imagenes/arcanos/rws-16.webp",
  "imagenes/arcanos/rws-17.webp",
  "imagenes/arcanos/rws-18.webp",
  "imagenes/arcanos/rws-19.webp",
  "imagenes/arcanos/rws-20.webp",
  "imagenes/arcanos/rws-21.webp",
  "imagenes/arcanos/rws-bastos-01.webp",
  "imagenes/arcanos/rws-bastos-02.webp",
  "imagenes/arcanos/rws-bastos-03.webp",
  "imagenes/arcanos/rws-bastos-04.webp",
  "imagenes/arcanos/rws-bastos-05.webp",
  "imagenes/arcanos/rws-bastos-06.webp",
  "imagenes/arcanos/rws-bastos-07.webp",
  "imagenes/arcanos/rws-bastos-08.webp",
  "imagenes/arcanos/rws-bastos-09.webp",
  "imagenes/arcanos/rws-bastos-10.webp",
  "imagenes/arcanos/rws-bastos-11.webp",
  "imagenes/arcanos/rws-bastos-12.webp",
  "imagenes/arcanos/rws-bastos-13.webp",
  "imagenes/arcanos/rws-bastos-14.webp",
  "imagenes/arcanos/rws-copas-01.webp",
  "imagenes/arcanos/rws-copas-02.webp",
  "imagenes/arcanos/rws-copas-03.webp",
  "imagenes/arcanos/rws-copas-04.webp",
  "imagenes/arcanos/rws-copas-05.webp",
  "imagenes/arcanos/rws-copas-06.webp",
  "imagenes/arcanos/rws-copas-07.webp",
  "imagenes/arcanos/rws-copas-08.webp",
  "imagenes/arcanos/rws-copas-09.webp",
  "imagenes/arcanos/rws-copas-10.webp",
  "imagenes/arcanos/rws-copas-11.webp",
  "imagenes/arcanos/rws-copas-12.webp",
  "imagenes/arcanos/rws-copas-13.webp",
  "imagenes/arcanos/rws-copas-14.webp",
  "imagenes/arcanos/rws-espadas-01.webp",
  "imagenes/arcanos/rws-espadas-02.webp",
  "imagenes/arcanos/rws-espadas-03.webp",
  "imagenes/arcanos/rws-espadas-04.webp",
  "imagenes/arcanos/rws-espadas-05.webp",
  "imagenes/arcanos/rws-espadas-06.webp",
  "imagenes/arcanos/rws-espadas-07.webp",
  "imagenes/arcanos/rws-espadas-08.webp",
  "imagenes/arcanos/rws-espadas-09.webp",
  "imagenes/arcanos/rws-espadas-10.webp",
  "imagenes/arcanos/rws-espadas-11.webp",
  "imagenes/arcanos/rws-espadas-12.webp",
  "imagenes/arcanos/rws-espadas-13.webp",
  "imagenes/arcanos/rws-espadas-14.webp",
  "imagenes/arcanos/rws-oros-01.webp",
  "imagenes/arcanos/rws-oros-02.webp",
  "imagenes/arcanos/rws-oros-03.webp",
  "imagenes/arcanos/rws-oros-04.webp",
  "imagenes/arcanos/rws-oros-05.webp",
  "imagenes/arcanos/rws-oros-06.webp",
  "imagenes/arcanos/rws-oros-07.webp",
  "imagenes/arcanos/rws-oros-08.webp",
  "imagenes/arcanos/rws-oros-09.webp",
  "imagenes/arcanos/rws-oros-10.webp",
  "imagenes/arcanos/rws-oros-11.webp",
  "imagenes/arcanos/rws-oros-12.webp",
  "imagenes/arcanos/rws-oros-13.webp",
  "imagenes/arcanos/rws-oros-14.webp",
  "imagenes/leccion1-columnas.webp",
  "imagenes/leccion1-golden-dawn.webp",
  "imagenes/leccion1-ricius.webp",
  "imagenes/leccion1-tablero.webp",
  "imagenes/leccion2-blake-anciano.webp",
  "imagenes/leccion2-cruz.webp",
  "imagenes/leccion2-enoc.webp",
  "imagenes/leccion2-flammarion.webp",
  "imagenes/leccion2-fludd-infinitum.webp",
  "imagenes/leccion2-fludd-microcosmos.webp",
  "imagenes/leccion2-gajendra-moksha.webp",
  "imagenes/leccion2-hildegarda-trinidad.webp",
  "imagenes/leccion2-hunefer-osiris.webp",
  "imagenes/leccion2-masaccio-trinidad.webp",
  "imagenes/leccion2-microcosmos.webp",
  "imagenes/leccion2-rubliov-trinidad.webp",
  "imagenes/leccion2-sennedjem-osiris.webp",
  "imagenes/leccion2-vitruvio.webp",
  "imagenes/leccion3-agrippa-pentagrama.webp",
  "imagenes/leccion3-arbol.webp",
  "imagenes/leccion3-durero-pentagono.webp",
  "imagenes/leccion3-kepler.webp",
  "imagenes/leccion3-lbrp.webp",
  "imagenes/leccion3-leonardo-dodecaedro.webp",
  "imagenes/leccion3-mundos.webp",
  "imagenes/leccion4-abulafia.webp",
  "imagenes/leccion4-bolonia.webp",
  "imagenes/leccion4-constructoras.webp",
  "imagenes/leccion4-helmont-alef.webp",
  "imagenes/leccion4-siloe.webp",
  "imagenes/leccion4-vibracion.webp",
  "imagenes/leccion5-ani-juicio.webp",
  "imagenes/leccion5-gebelin.webp",
  "imagenes/leccion5-sendero.webp",
  "imagenes/leccion5-serpiente.webp",
  "imagenes/leccion6-ases.webp",
  "imagenes/leccion6-palos.webp",
  "iconos/icono-180.png",
  "iconos/icono-192.png",
  "iconos/icono-32.png",
  "iconos/icono-512.png",
  "iconos/icono.svg",
  "css/estilo.css?v=19",
  "js/app.js?v=19",
  "js/audio.js?v=19",
  "js/cartas-visor.js?v=19",
  "js/cartas.js?v=19",
  "js/datos.js?v=19",
  "js/glosa.js?v=19",
  "js/glosario.js?v=19",
  "js/meditacion.js?v=19"
  // FIN-LISTA
];

self.addEventListener("install", ev => {
  ev.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // Uno a uno: si falta un archivo, el resto se guarda igual.
    await Promise.allSettled(ARCHIVOS.map(a => c.add(new Request(a, { cache: "reload" }))));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", ev => {
  ev.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE && k !== FUENTES) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", ev => {
  const req = ev.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Tipografías de Google: lo guardado primero, y se actualiza por detrás.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    ev.respondWith((async () => {
      const c = await caches.open(FUENTES);
      const guardada = await c.match(req);
      const red = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => guardada);
      return guardada || red;
    })());
    return;
  }
  if (url.origin !== location.origin) return;

  // Imágenes e iconos: no cambian, así que lo guardado primero.
  if (/\/(imagenes|iconos)\//.test(url.pathname)) {
    ev.respondWith((async () => {
      const c = await caches.open(CACHE);
      const guardada = await c.match(req, { ignoreSearch: true });
      if (guardada) return guardada;
      const r = await fetch(req);
      if (r.ok) c.put(req, r.clone());
      return r;
    })());
    return;
  }

  // Lecciones, scripts y estilos: la red primero (para ver siempre lo último)
  // y, sin conexión, la copia guardada.
  ev.respondWith((async () => {
    const c = await caches.open(CACHE);
    try {
      const r = await fetch(req);
      if (r.ok) c.put(req, r.clone());
      return r;
    } catch (e) {
      const guardada = await c.match(req) || await c.match(req, { ignoreSearch: true })
        || (req.mode === "navigate" ? await c.match("index.html") : undefined);
      if (guardada) return guardada;
      throw e;
    }
  })());
});
