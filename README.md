# Portafolio Web — aguidev

Base del sitio de portafolio personal: experiencia, proyectos web y apps.

## Estructura

```
portafolio-web/
├── index.html        # Página principal (todas las secciones)
├── css/
│   └── styles.css    # Estilos
├── js/
│   └── main.js        # Menú móvil, animaciones Motion, formulario
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

"Jinx con traje": fondo tinta violeta de Zaun, rosa solo para botones y
llamadas a la acción (`--accent`), azul para detalles y enlaces (`--accent-2`),
morado casi solo en la barra de scroll (`--shimmer`). Tipografía Chakra Petch
(títulos) + Manrope (texto); Permanent Marker queda como firma (logo y
"¡boom!"). Garabato SVG de Jinx en el hero que se "pinta" al cargar, y fondo de
grafiti a media opacidad solo en el hero y en contacto. Movimiento sutil con
Motion (CDN): un glitch RGB suave al cargar y entrada simple al hacer scroll.
Respeta `prefers-reduced-motion`. La paleta se ajusta en `:root` de
`css/styles.css`. La versión anterior, más grafiti, está en la rama `jinx-v1`.

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
- [ ] Agregar foto de perfil real en `assets/img/`
- [ ] Actualizar enlaces de LinkedIn/GitHub en la sección de contacto (aún sin URL)
- [ ] Subir CV en PDF a `assets/cv/`
- [x] Publicar en GitHub Pages
