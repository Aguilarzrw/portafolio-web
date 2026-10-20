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

// ===== Animaciones: un glitch RGB suave al cargar y entrada simple al hacer scroll =====
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Sin Motion (CDN caído) o con movimiento reducido, todo queda visible y estático
if (window.Motion && !reduceMotion) {
  const { animate, inView } = Motion;
  const heroTitle = document.querySelector("[data-glitch]");

  heroTitle.classList.add("is-glitching");
  heroTitle.addEventListener("animationend", () => heroTitle.classList.remove("is-glitching"), { once: true });

  document.querySelectorAll("[data-reveal]").forEach((el) => { el.style.opacity = 0; });

  inView("[data-reveal]", ({ target }) => {
    animate(target, { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, ease: "easeOut" });
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
      const res = await fetch("https://formsubmit.co/ajax/3eb5b9ff1cca92f752b38a937093abe0", {
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
