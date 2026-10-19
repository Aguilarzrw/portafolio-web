// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("is-open");
});

// Cierra el menú al hacer clic en un enlace (móvil)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
  });
});

// ===== Animaciones estilo Arcane: "shock" al cargar y "flashbacks" al hacer scroll =====
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function glitch(el) {
  el.classList.remove("is-glitching");
  void el.offsetWidth; // reinicia la animación CSS
  el.classList.add("is-glitching");
}

document.querySelectorAll(".is-glitching, [data-glitch], .section__title").forEach((el) => {
  el.addEventListener("animationend", () => el.classList.remove("is-glitching"));
});

// Sin Motion (CDN caído) o con movimiento reducido, todo queda visible y estático
if (window.Motion && !reduceMotion) {
  const { animate, inView } = Motion;
  const heroTitle = document.querySelector("[data-glitch]");

  // Shock: destello neón, sacudida de la escena y título con RGB partido
  animate(".shock", { opacity: [0, 0.85, 0, 0.5, 0, 0.2, 0] }, { duration: 0.7, ease: "linear" });
  animate(".hero__inner", { x: [0, -14, 12, -7, 4, 0] }, { duration: 0.45, delay: 0.05 });
  glitch(heroTitle);
  heroTitle.addEventListener("mouseenter", () => glitch(heroTitle));

  // Flashback: cada bloque entra parpadeando en gris quemado y vuelve al color
  const flashEls = document.querySelectorAll("[data-flash]");
  flashEls.forEach((el) => { el.style.opacity = 0; });

  inView("[data-flash]", ({ target: el }) => {
    animate(
      el,
      {
        opacity: [0, 1, 0.15, 1, 0.5, 1],
        filter: [
          "grayscale(1) contrast(2.2) blur(3px)",
          "grayscale(1) contrast(2.2) blur(0px)",
          "hue-rotate(90deg) saturate(3)",
          "none",
        ],
        x: [-16, 10, -4, 0],
      },
      { duration: 0.6, ease: "linear" }
    );
    if (el.classList.contains("section__title")) glitch(el);
  }, { amount: 0.25 });
}

// ===== Formulario de contacto (sin backend: abre el correo con todo listo) =====
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    const subject = `Contacto desde el portafolio — ${name}`;
    const body =
      `Nombre: ${name}\n` +
      `Correo: ${email}\n\n` +
      `Mensaje:\n${message}`;

    const mailto =
      `mailto:reyaguilarwanh@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}
