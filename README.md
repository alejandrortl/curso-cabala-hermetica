# Curso de Qabalah hermética, tarot y numerología

Web estática del curso: lecciones, alfabeto hebreo con gematría, rituales y diario de estudio.
No necesita compilación: GitHub Pages sirve directamente `index.html`.

- `lecciones/leccion-N.html`: texto de cada lección.
- `js/datos.js`: lista de lecciones, 22 letras, materiales y rituales.
- `js/glosario.js`: términos clave con su explicación breve. La web los marca sola en lecciones y rituales (subrayado punteado) y abre una ventana al tocarlos; la página `#/glosario` los lista todos. Para una lección nueva basta con añadir aquí sus términos. En el HTML, `<span data-glosa="id">` marca un texto a mano y `class="no-glosa"` evita que se marque nada dentro.
- `imagenes/`: ilustraciones generadas con IA (ver `prompts/`) y obras de arte de dominio público o con licencia libre, descargadas de Internet Archive, Wellcome Collection y Web Gallery of Art. Cada obra lleva en su pie autor, fecha, enlace a la fuente y licencia.

El progreso y el diario se guardan en el navegador (localStorage); el diario se puede exportar.
Los libros de consulta no se incluyen por derechos de autor; las lecciones citan libro y capítulo.
