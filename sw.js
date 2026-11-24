// Service worker: guarda la web en el dispositivo para poder estudiar sin conexión.
// La lista de archivos se regenera con: python3 herramientas/actualizar-offline.py
const VERSION = "22e54ab69e";
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
  "iconos/icono-180.png",
  "iconos/icono-192.png",
  "iconos/icono-32.png",
  "iconos/icono-512.png",
  "iconos/icono.svg",
  "css/estilo.css?v=18",
  "js/app.js?v=18",
  "js/audio.js?v=18",
  "js/cartas-visor.js?v=18",
  "js/cartas.js?v=18",
  "js/datos.js?v=18",
  "js/glosa.js?v=18",
  "js/glosario.js?v=18",
  "js/meditacion.js?v=18"
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
