// Año dinámico en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Navegación =====
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function setMenu(open) {
  navLinks.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("is-open")) {
    setMenu(false);
    navToggle.focus();
  }
});

// Sombra en la barra al hacer scroll
const onScroll = () => navbar.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
addEventListener("scroll", onScroll, { passive: true });

// Enlace activo según la sección visible
const links = [...navLinks.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach((a) => {
  const section = document.querySelector(a.getAttribute("href"));
  if (section) sectionObserver.observe(section);
});

// ===== Movimiento (Motion) =====
// Sin Motion (CDN caído) o con movimiento reducido, todo queda visible y estático.
const root = document.documentElement;

function initMotion() {
  const { animate, inView, hover, press, scroll, stagger } = Motion;
  const spring = { type: "spring", bounce: 0.2, visualDuration: 0.4 };
  const enter = { duration: 0.5, ease: "easeOut" };

  // Entrada del hero: texto escalonado, capturas con resorte y subrayado que se dibuja
  animate("[data-hero]", { opacity: [0, 1], y: [20, 0] }, { ...enter, duration: 0.6, delay: stagger(0.09) });
  animate(".hero__accent", { "--underline": ["0%", "100%"] }, { duration: 0.7, delay: 0.8, ease: "easeInOut" });
  animate(".hero__shot--back", { opacity: [0, 1], x: [48, 0] }, { ...spring, visualDuration: 0.7, delay: 0.25 });
  animate(".hero__shot--front", { opacity: [0, 1], x: [-48, 0] }, { ...spring, visualDuration: 0.7, delay: 0.4 });

  // Barra de progreso y parallax suave de las capturas
  scroll(animate("#scrollProgress", { scaleX: [0, 1] }, { ease: "linear" }));
  const heroScroll = { target: document.getElementById("inicio"), offset: ["start start", "end start"] };
  scroll(animate(".hero__shot--back", { y: [0, -48] }, { ease: "linear" }), heroScroll);
  scroll(animate(".hero__shot--front", { y: [0, 32] }, { ease: "linear" }), heroScroll);

  // Revelado al entrar en pantalla (una sola vez)
  inView("[data-reveal]", (el) => {
    animate(el, { opacity: [0, 1], y: [24, 0] }, enter);
  }, { amount: 0.2 });

  // Grupos escalonados: servicios, pasos del proceso y tecnologías
  document.querySelectorAll(".services, .process, .skills").forEach((group) => {
    inView(group, () => {
      animate(group.querySelectorAll("[data-stagger]"), { opacity: [0, 1], y: [20, 0] }, { ...enter, delay: stagger(0.08) });
    }, { amount: 0.2 });
  });

  // Hover con resorte: interrumpible, conserva la velocidad
  const lift = (selector, y, scale = 1) => hover(selector, (el) => {
    animate(el, { y, scale }, spring);
    return () => animate(el, { y: 0, scale: 1 }, spring);
  });
  lift(".case__media", -4, 1.015);
  lift(".service", -4);
  lift(".skill-item", -2);
  lift(".btn, .contact-btn", -2);

  hover(".case__media", (el) => {
    const img = el.querySelector("img");
    animate(img, { scale: 1.05 }, { duration: 0.6, ease: "easeOut" });
    return () => animate(img, { scale: 1 }, { duration: 0.6, ease: "easeOut" });
  });

  hover(".hero__stack", () => {
    animate(".hero__shot--back", { rotate: 1.2, scale: 1.02 }, spring);
    animate(".hero__shot--front", { rotate: -1.2, scale: 1.02 }, spring);
    return () => animate(".hero__shot--back, .hero__shot--front", { rotate: 0, scale: 1 }, spring);
  });

  // Feedback al presionar
  press(".btn, .contact-btn, .contact-chip", (el) => {
    animate(el, { scale: 0.97 }, { duration: 0.12 });
    return () => animate(el, { scale: 1 }, spring);
  });
}

if (root.classList.contains("has-motion")) {
  try {
    if (!window.Motion) throw new Error("Motion no cargó");
    initMotion();
  } catch {
    root.classList.remove("has-motion");
    document.querySelectorAll("[style*='opacity']").forEach((el) => { el.style.opacity = ""; });
  }
}

// ===== Formulario de contacto: envía al correo vía FormSubmit (sin backend propio) =====
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  const fields = [...contactForm.querySelectorAll("input[required], textarea[required]")];
  const messages = {
    name: "Escribe tu nombre.",
    email: "Escribe un correo válido, por ejemplo nombre@correo.com.",
    message: "Cuéntame brevemente sobre tu proyecto.",
  };

  const setError = (field, message) => {
    const error = document.getElementById(`err-${field.name}`);
    field.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message || "";
    error.hidden = !message;
  };

  const validate = (field) => {
    const valid = field.value.trim() !== "" && field.validity.valid;
    setError(field, valid ? "" : messages[field.name]);
    return valid;
  };

  fields.forEach((field) => {
    field.addEventListener("blur", () => validate(field));
    field.addEventListener("input", () => { if (field.getAttribute("aria-invalid") === "true") validate(field); });
  });

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

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
      fields.forEach((field) => setError(field, ""));
      formStatus.textContent = "¡Mensaje enviado! Te respondo pronto a tu correo.";
      formStatus.classList.add("is-ok");
      button.textContent = "Mensaje enviado";
    } catch {
      formStatus.innerHTML = 'No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme por <a href="https://wa.me/584243241640" target="_blank" rel="noopener">WhatsApp</a>.';
      formStatus.classList.add("is-error");
      button.textContent = "Enviar mensaje";
    } finally {
      button.disabled = false;
      if (root.classList.contains("has-motion")) Motion.animate(formStatus, { opacity: [0, 1], y: [6, 0] }, { duration: 0.3 });
    }
  });
}
