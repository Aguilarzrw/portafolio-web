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

// ===== Formulario de contacto: envía al correo vía FormSubmit (sin backend propio) =====
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const button = contactForm.querySelector("button[type=submit]");
    const data = Object.fromEntries(new FormData(contactForm));

    button.disabled = true;
    button.textContent = "Enviando...";
    formStatus.classList.remove("is-error", "is-ok");

    try {
      const res = await fetch("https://formsubmit.co/ajax/reyaguilarwanh@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, _replyto: data.email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error(json.message || res.status);

      contactForm.reset();
      formStatus.textContent = "¡Mensaje enviado! Te respondo pronto a tu correo.";
      formStatus.classList.add("is-ok");
      button.textContent = "Mensaje enviado";
    } catch {
      formStatus.innerHTML = 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por <a href="https://wa.me/584243241640" target="_blank" rel="noopener">WhatsApp</a>.';
      formStatus.classList.add("is-error");
      button.textContent = "Enviar mensaje";
    } finally {
      button.disabled = false;
    }
  });
}
