# Gloz Studio · Landing

Landing de Gloz Studio (marketing, contenido y software a medida), hecha en Angular 22 y publicada como HTML estático ya armado (prerenderizado).

- **Acción única:** escribir por WhatsApp. Hay botones directos, cada uno con su propio mensaje, y un formulario corto que arma el mensaje.
- **Dirección de arte aprobada:** "Lo que hay detrás", el 4 de noviembre de 2026. La muestra está en [materiales/direccion-de-arte/direccion-de-arte.html](materiales/direccion-de-arte/direccion-de-arte.html).
- **Estructura y textos aprobados:** el 4 de noviembre de 2026.

---

## Cómo correrla

```bash
npm install
npm start            # vista de desarrollo en http://localhost:4200
npm run build        # versión para publicar: dist/gloz/browser
npx ng test --watch=false   # pruebas
```

`npm run build` deja en `dist/gloz/browser/` una página completa en HTML, que se ve aunque el JavaScript no cargue. Esa carpeta es la que se sube al hosting.

---

## Qué editar fácil (sin tocar el diseño)

Todo el contenido vive en `src/app/data/`. Las secciones solo lo pintan.

| Quieres cambiar… | Archivo |
|---|---|
| WhatsApp, correo, Instagram, ubicación, mensajes de cada botón, rubros del buscador | `src/app/data/site.data.ts` |
| Servicios (nombres, descripciones, botón y mensaje de cada grupo) | `src/app/data/services.data.ts` |
| Casos de trabajo (texto, servicios, fotos, video) | `src/app/data/cases.data.ts` |
| Logos de clientes | `src/app/data/clients.data.ts` + el PNG en `public/img/logos/` |
| Pasos del proceso, datos de confianza, etiquetas del diagrama | `src/app/data/about.data.ts` |
| Fotos de la portada y sus etiquetas | `src/app/data/hero.data.ts` |
| Orden de las secciones | `src/app/features/landing/landing.page.ts` |
| Testimonio | `TESTIMONIAL` en `src/app/data/about.data.ts` |
| Título y descripción para Google y al compartir | `src/index.html` |

**Fotos nuevas:** cada foto va en WebP con su ancho en el nombre (`cafe-560.webp`, `cafe-960.webp`), en proporción 4:5. Las de apoyo van en 360 px.

---

## Estructura del código

```
src/
  index.html                 metadatos, favicon, imagen para compartir, clase js/no-js
  styles/tokens.css          colores, letras, radios, movimiento y texturas (variables)
  styles/base.css            base, títulos, marcador amarillo, estados ocultos con rescate, Lenis
  app/
    app.routes.ts            la landing se carga como ruta perezosa
    app.config.ts            hidratación + cargador de imágenes
    core/
      motion/                MotionService (GSAP, ScrollTrigger, SplitText, Lenis), tokens, motionEffect()
      contact/               WhatsappService: único lugar que arma enlaces wa.me y mailto
      images/                cargador de NgOptimizedImage (archivo WebP del ancho justo)
    shared/
      directives/            glozReveal, glozSplitLines, glozDrawOnScroll, glozWhatsapp, glozAutoplayInView
      ui/                    logo, botón, título de sección, buscador, imagen responsiva
    data/                    todo el contenido (una sola fuente)
    models/                  interfaces del contenido
    features/landing/
      landing.page.ts        orden de secciones
      sections/              hero, brands, behind, services, work, process, trust, contact, footer, sticky-cta
public/                      fuentes, imágenes, video, favicon, imagen para compartir
materiales/                  NO se publica: originales, hoja de muestra y capturas de revisión
```

**Principios que se siguieron:**
- **Una responsabilidad por pieza:** cada sección pinta y nada más. El movimiento vive en `MotionService` y en sus directivas, y los enlaces de contacto en `WhatsappService`.
- **Sin repetir código (DRY):** el contenido está en `data/` y el patrón "animar después del primer render y limpiar al destruir" está una sola vez, en `motionEffect()`.
- **Convenciones de Angular 22:** componentes standalone, OnPush por defecto, `input()` y `computed()`/`linkedSignal()`, control de flujo nativo (`@if`, `@for`, `@switch`), `host` en lugar de decoradores, `inject()` y `@Service()`. El formulario usa Signal Forms (`form`, `[formRoot]`, `[formField]`) y las imágenes `NgOptimizedImage`. TypeScript está en modo estricto (`strict` y `strictTemplates`).

---

## Dirección de arte (valores técnicos)

### Colores y contraste (WCAG AA)

| Papel | HEX | Pareja comprobada |
|---|---|---|
| Azul vivido (principal, portada, botones sobre claro) | `#024AA9` | blanco sobre azul **8.22:1** |
| Azul oscuro (texto, Trabajos, pie) | `#172547` | sobre gris claro **13.34:1** |
| Gris claro (fondo) | `#EDF2F1` | sobre azul vivido **7.27:1** |
| Blanco (tarjetas, botón sobre azul) | `#FFFFFF` | azul vivido sobre blanco **8.22:1** |
| Celeste, apoyo sobre azul *(nuevo)* | `#C9DBFF` | sobre azul vivido **5.89:1** |
| Azul suave, etiquetas *(nuevo)* | `#DCE6F6` | azul oscuro encima **11.99:1** |
| Azul para texto sobre oscuro | `#8DB4FF` | sobre azul oscuro **7.26:1** |
| Texto secundario | `#4A5672` | sobre gris claro **6.48:1** |
| Error del formulario | `#B3261E` | sobre blanco **6.54:1** |

Azul vivido sobre azul oscuro da **1.84:1**: nunca se usan juntos para texto.

### Letras
- **Montserrat** variable, de 300 a 800 (latín): títulos en mayúsculas (fina + gruesa) y textos.
- **Yeseva One** 400: el logo, la palabra acento de la portada ("estrategia."), los números de servicios y los datos de confianza.
- Las dos van como archivos propios en `public/fonts/`, con precarga.

### Logo
"Gloz" en Yeseva One, convertido a trazos con una pieza por letra (`src/app/data/logo.data.ts`). Así se anima letra por letra y se ve igual en cualquier dispositivo.

### Forma
Radios de 28, 20, 14 y 10 px. Tarjetas de fotos con borde blanco de 3 px y sombra larga teñida.

### Texturas
Pana, acanalado y grano en SVG/CSS muy livianos, con opacidad de 3 a 7 %.

### Movimiento ("preciso, cálido, elegante")

| Token | GSAP | CSS |
|---|---|---|
| Entrada | `power3.out` | `cubic-bezier(.25,1,.5,1)` |
| Cortinas y trazos | `power3.inOut` | `cubic-bezier(.76,0,.24,1)` |
| Piezas chicas | `back.out(1.2)` | `cubic-bezier(.34,1.4,.64,1)` |
| Duración base | 0.9 s | `--dur: .9s` |
| Recorrido | 22 px | `--dist: 22px` |
| Escalonado | 0.06 s | |
| Inercia de Lenis | 0.105 | |

- **Firma (portada, unos 2.8 s, se salta con un toque o una tecla):** las letras de "Gloz" suben → el titular aparece palabra por palabra de borroso a nítido → las 3 piezas de clientes se asientan → se dibujan las flechas y sus etiquetas → el buscador aparece → la última flecha se dibuja hasta el botón de WhatsApp.
- **Rima de la firma:** las flechas se dibujan en "Lo que hay detrás", la línea de "Cómo trabajamos" avanza y "Gloz" gigante se arma letra por letra en el pie.
- **Rescates:** sin JavaScript se ve todo, porque el HTML está prerenderizado y los estados ocultos solo existen con la clase `.js`. Si algo falla, todo aparece a los 4 s. Con "Reducir movimiento" no se crea Lenis ni ninguna animación, y el buscador no rota.
- **Versiones fijas:** `gsap@3.13.0` (incluye ScrollTrigger y SplitText, gratis para uso comercial) y `lenis@1.3.11`.

---

## De dónde salió cada dato (todo con fecha del 4 de noviembre de 2026)

| Dato | Fuente |
|---|---|
| Colores, tipografías, texturas, logo | `materiales/originales/Libro de marca/Gloz libro de marca.pdf` |
| Servicios (nombres exactos) | `materiales/originales/Info/Services.md` |
| Desde 2023, +30 marcas, roles, Sillón Tech hoy, "entender, proponer y resolver" | `materiales/originales/Info/AboutUs.md` |
| WhatsApp +506 6265 2841, holaagloz@gmail.com, @studiogloz | Gloz, en la conversación |
| "En remoto, para toda Latinoamérica" | Gloz, en la conversación |
| Servicios por cliente: Burguer House, @Cafe y Sillón Tech | Gloz, en la conversación |
| Permiso para mostrar los 10 logos | Gloz, en la conversación |
| Testimonio de Dayanna Jara, CEO de Sillón Tech | Sus mensajes de WhatsApp, enviados por Gloz |
| Fotos y video de clientes | `materiales/originales/Clientes/` (las fotos de Sillón Tech son de banco y no se usan) |

---

## Por validar (lo decidí yo, revísalo)

1. Dos tonos nuevos que salen de tu azul: celeste `#C9DBFF` (textos de apoyo sobre azul) y azul suave `#DCE6F6` (etiquetas).
2. Sobre azul, el botón va blanco con letra azul. Sobre fondos claros, azul con letra blanca.
3. Textos escritos por mí: el titular y su bajada, los títulos de sección, las frases cortas de cada grupo de servicios ("Campañas que buscan ventas, no solo likes", etc.), los 4 pasos del proceso y las frases de la sección de confianza.
4. Las descripciones de los servicios están adaptadas a "tú". Los **nombres** son los exactos de tu archivo.
5. **Tienda del Oro:** la descripción y sus servicios (Producción de contenido y Edición de video) los deduje de las fotos y videos.
6. **@Cafe:** "fotos de sus bebidas y platos" lo deduje de las fotos.
7. Te hablo de tú en toda la página y en los mensajes de WhatsApp.
8. Los servicios están en 3 grupos, con un botón por grupo.
9. "Cada propuesta es a la medida: depende de lo que necesitas y por cuánto tiempo." (no hay precios).
10. No publico un tiempo de respuesta, solo "Respondemos por ahí". Tampoco hay preguntas frecuentes, para no inventar respuestas.
11. Quité las etiquetas chicas sobre los títulos de sección (estaban en la muestra), porque repetían el título. Volver a ponerlas es una línea en `shared/ui/section-heading/section-heading.ts`.
12. Rubros del buscador de la portada: hamburgueserías, joyerías, cafeterías, barberías y estudios de uñas (salen de tus clientes).
13. Recreé las texturas en lugar de usar las imágenes originales, para que la página cargue rápido.
14. La imagen para compartir (`public/og-imagen.jpg`) y el ícono (la "G" de tu logo sobre tu azul) los diseñé yo.
15. Sillón Tech aparece con su logo sobre tu azul y lo que llevan (Estrategia, Campañas, Análisis, Seguimiento), sin fotos.
16. **Testimonio de Dayanna Jara:** uní sus mensajes de WhatsApp con sus propias palabras (solo recorté y corregí "me gusta las ideas" a "me gustan las ideas"). Dejé afuera "gracias chicas! son unas geniaa". Confírmale que sale publicado con su nombre y su cargo.

## Pendientes

- [ ] Confirmar con Dayanna Jara que está de acuerdo en que su mensaje se publique con su nombre y cargo.
- [ ] **Dirección pública:** por ahora no hay dominio. Al publicar en Netlify con nombre propio (por ejemplo `glozstudio.netlify.app`), cambiar en `src/index.html` `og:image` por la URL completa y agregar `og:url`, y generar el QR hacia esa dirección. Si después compran dominio, se conecta en Netlify y la dirección .netlify.app sigue funcionando, así que el QR impreso no se rompe.
- [ ] *(Opcional)* Las texturas originales del libro de marca, si las tienes en archivo.
- [ ] *(Opcional)* 4 o 5 preguntas frecuentes reales con sus respuestas.
- [ ] Probar en tu celular cada botón de WhatsApp: que abra tu número con el mensaje correcto.

---

## Cómo publicar

1. `npm run build`
2. **Netlify Drop** (gratis): entra a app.netlify.com/drop **con tu cuenta iniciada** y arrastra la carpeta `dist/gloz/browser`. Sin cuenta, el enlace queda con contraseña temporal y se borra.
3. **Otra opción:** Vercel o cualquier hosting que sirva archivos estáticos. Se sube el contenido de `dist/gloz/browser`.
4. Después, conecta tu dominio desde el panel del hosting. DNS es la "libreta de direcciones" que conecta tu dominio con el hosting.

Los archivos llevan una huella en el nombre (`main-ABC123.js`), así que cada versión nueva se ve al instante, sin problemas de caché (la copia vieja que guarda el navegador).

---

## Revisión hecha (4 de noviembre de 2026)

- `revisar-sitio.mjs` a 375 × 812 y 1440 × 900, con "Reducir movimiento" y sin JavaScript: sin desborde lateral, sin errores de consola, sin imágenes rotas y sin contenido oculto. Fuentes cargadas. El botón principal se ve completo en la primera pantalla del celular.
- **AXE** (WCAG 2.2 AA + buenas prácticas): **0 violaciones** en celular y en escritorio. Contraste sobre texturas comprobado a mano (tabla de arriba). El video es mudo, así que no necesita subtítulos.
- **Pruebas:** 8/8 (enlaces de WhatsApp y su codificación, mensaje del formulario, correo y cargador de imágenes).
- Botón flotante: aparece después de la portada y se esconde en Contacto.
- Capturas en `materiales/revision-sitio/`.
