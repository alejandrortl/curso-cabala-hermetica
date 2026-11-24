#!/usr/bin/env python3
"""Regenera la lista de archivos que sw.js guarda para usar la web sin conexión.

Uso, desde la raíz del repositorio:  python3 herramientas/actualizar-offline.py
Ejecútalo cada vez que añadas una lección, un ritual o una imagen. Cambia también
la versión de la caché, para que los navegadores descarguen la copia nueva.
"""
import hashlib, pathlib, re

raiz = pathlib.Path(__file__).resolve().parent.parent
carpetas = ["css", "js", "lecciones", "rituales", "imagenes", "iconos"]
archivos = ["./", "index.html", "manifest.webmanifest"]
for c in carpetas:
    for f in sorted((raiz / c).rglob("*")):
        if f.is_file() and not f.name.startswith("."):
            archivos.append(f.relative_to(raiz).as_posix())
# Los scripts y la hoja de estilos se piden con ?v=N desde index.html.
indice = (raiz / "index.html").read_text(encoding="utf-8")
archivos += sorted(set(re.findall(r'(?:src|href)="((?:js|css)/[^"]+\?v=[^"]+)"', indice)))

huella = hashlib.sha1()
for a in archivos:
    p = raiz / a
    if p.is_file():
        huella.update(a.encode()); huella.update(p.read_bytes())
version = huella.hexdigest()[:10]

sw = raiz / "sw.js"
texto = sw.read_text(encoding="utf-8")
lista = ",\n".join(f'  "{a}"' for a in archivos)
texto = re.sub(r"// INICIO-LISTA.*?// FIN-LISTA", f"// INICIO-LISTA\n{lista}\n  // FIN-LISTA", texto, flags=re.S)
texto = re.sub(r'const VERSION = "[^"]*";', f'const VERSION = "{version}";', texto)
sw.write_text(texto, encoding="utf-8")
print(f"{len(archivos)} archivos, versión {version}")
