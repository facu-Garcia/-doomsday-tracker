# DOOMSDAY · Marvel Watch Tracker

PWA personal para organizar el camino a Avengers: Doomsday, el Universo Cinematográfico Marvel y X-Men.

- Guarda el progreso en el navegador (localStorage) y permite respaldo JSON.
- Instalable desde GitHub Pages como PWA.
- Pósteres promocionales enlazados desde fuentes externas; se respeta el formato original sin recortes.

**Aviso:** los cambios publicados en GitHub no sincronizan automáticamente tu progreso personal entre dispositivos. Antes de cambiar de dispositivo, exporta un respaldo JSON.

## Actualización V7 — personajes de Doomsday

- Menú hamburguesa: Camino a Doomsday, Universo Marvel, Universo X-Men y Personajes.
- Galería con retratos **individualizados**: se priorizan los pósteres promocionales de *Avengers: Doomsday* (2026), recortando por personaje cuando el cartel es de dos personas. Si no existe póster oficial del filme, se utiliza arte promocional de una obra anterior. Enlace externo: la disponibilidad depende de cada servidor.
- Encabezados por nivel de evidencia: **confirmados por Marvel/Disney**, **rumores sin confirmar** e **hipótesis**. Entre los oficiales se muestran además encabezados por equipo.
- Iconos de app con rutas nuevas: `doom-icon-v7-192.png`, `doom-icon-v7-512.png` y `doom-icon-v7-maskable-512.png`; son recortes de material promocional existente y no imágenes generadas.
- Caché `doom-tracker-v7` y versiones nuevas de JS/CSS.

### Actualizar icono en Android

Android puede retener el icono original aunque el sitio ya muestre el catálogo V7. **Antes de desinstalar la aplicación, exporta tu progreso con el botón de respaldo JSON**. Después, retira el acceso/instalación anterior y vuelve a instalar desde Chrome abriendo la dirección HTTPS. Por seguridad, conserva el archivo JSON hasta comprobar que importaste correctamente tus estados.

### Fuentes del elenco

- [Reparto confirmado de Disney+](https://www.disneyplus.com/explore/articles/avengers-doomsday)
- [Pósteres de personajes publicados por Marvel Studios, recopilados por Pop Culture Pit](https://popculturepit.com/avengers-doomsday-character-posters/)

**Los reportes de filtraciones y las hipótesis no constituyen confirmación de Marvel.**

## Actualización V8 — galería y sillas del elenco

- Galería visual de **personajes**, con imágenes individuales como prioridad. La información detallada (actor, filmografía y estado de confirmación) se abre mediante el botón **Detalles** de cada tarjeta.
- División obligatoria en **Confirmados oficialmente**, **Rumores y filtraciones** (sin confirmar) y **Posibles** (hipótesis). Los oficiales también se agrupan por equipos.
- Subvista **Las 27 sillas · 2025**, con el orden auténtico del anuncio del 26 de marzo de 2025, del primer actor Chris Hemsworth al último Robert Downey Jr. No incluye dentro de esas 27 sillas a los intérpretes confirmados después.
- La colección de retratos emplea material promocional existente. Se prefieren carteles individuales de películas/series anteriores y se usa recorte individual de arte promocional como último recurso cuando no se localiza una versión individual independiente. La disponibilidad de enlaces de terceros no está garantizada.
- Los archivos `cast-v8.js` y `cast-v8.css` se incorporaron al caché offline `doom-tracker-v8`, sin tocar el progreso de visionado.

Fuentes: [Disney, anuncio oficial de 26 de marzo de 2025](https://thewaltdisneycompany.com/news/marvel-studios-avengers-doomsday-cast/) y [ComicBook.com, orden exacto de revelación de las 27 sillas](https://comicbook.com/movies/news/marvel-avengers-doomsday-cast-mcu-x-men-actors-confirmed/).
