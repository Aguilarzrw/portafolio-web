# Portafolio Web — aguidev

Base del sitio de portafolio personal: experiencia, proyectos web y apps.

## Estructura

```
portafolio-web/
├── index.html        # Página principal (todas las secciones)
├── css/
│   └── styles.css    # Estilos
├── js/
│   └── main.js        # Menú, animaciones Motion, formulario
└── assets/
    ├── img/           # Imágenes de proyectos, foto de perfil, etc.
    └── cv/            # PDF del currículum
```

## Secciones incluidas (orden actual)

- **Inicio** — titular + capturas de proyectos apiladas (lo primero que se ve)
- **Proyectos** — casos grandes: Bramdon Aguilar y Ricardo Velasco (El Príncipe De La Ranchera), con enlace al sitio en vivo
- **Servicios** — Landing page, Sitio web multipágina, Portafolio web, Tienda online, Aplicación web a medida, Mantenimiento y soporte + proceso de trabajo
- **Sobre mí** — presentación, formación y stack (íconos vía Devicon)
- **Contacto** — email, WhatsApp, redes y formulario (abre el correo)

Para agregar un proyecto: copia un bloque `<article class="case">` en `index.html`
y pon su captura (1200×630) en `assets/img/`.

## Estilo visual

Estilo sobrio y editorial: fondo grafito (`--color-bg`), un único acento azul
(`--color-accent`) para CTAs, enlaces y detalles. Tipografía Fraunces (títulos)
+ Manrope (texto). Todos los colores, tamaños, espaciados, radios y tiempos
viven como variables en `:root` de `css/styles.css`.

Movimiento con Motion (CDN, `js/main.js`): entrada escalonada del hero,
parallax suave de las capturas, barra de progreso de scroll, revelado al
entrar en pantalla, enlace activo en la navegación y hovers con resorte.
Respeta `prefers-reduced-motion` y, si Motion no carga, el contenido queda
visible. Las imágenes están en WebP (640 y 1200 px). La versión anterior
(estilo grafiti Jinx) está en la rama `jinx-v1`.

## Cómo verlo localmente

Abre `index.html` directamente en el navegador, o si tienes Python instalado:

```bash
python -m http.server 8000
```

y entra a `http://localhost:8000`.

## Marca

Nombre definido: **aguidev** (Reyniel Aguilar). Ver `../Marca/README.md` para
el detalle del logo, paleta y archivos. Favicon ya aplicado en
`assets/img/favicon.png`.

## Próximos pasos (pendientes de personalizar)

- [x] Definir nombre definitivo (marca personal / dominio del sitio) — **aguidev**
- [x] Definir diseño y estética final (colores, tipografía, estilo visual) — **estilo Jinx**
- [x] Definir contenido definitivo de cada sección (Sobre mí, Experiencia, Contacto — con datos reales del CV)
- [x] Foto de perfil real (`assets/img/reyniel.webp`)
- [x] Enlaces de LinkedIn y GitHub en contacto y footer
- [x] CV en PDF (`assets/cv/cv-reyniel-aguilar.pdf`)
- [x] Publicar en GitHub Pages
