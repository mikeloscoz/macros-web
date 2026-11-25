// Macros · web de presentación. Sin dependencias.
(() => {
  document.documentElement.classList.remove("sin-js");
  const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Aparecer al hacer scroll
  const elementos = document.querySelectorAll(".aparece");
  if ("IntersectionObserver" in window && !reducido) {
    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("visible");
        observador.unobserve(e.target);
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    elementos.forEach((el) => observador.observe(el));
  } else {
    elementos.forEach((el) => el.classList.add("visible"));
  }

  // Barra de navegación con fondo al bajar
  const nav = document.getElementById("nav");
  const alHacerScroll = () => nav.classList.toggle("con-fondo", scrollY > 12);
  addEventListener("scroll", alHacerScroll, { passive: true });
  alHacerScroll();

  // Contador del anillo (0 → valor)
  const contador = document.querySelector("[data-contador]");
  if (contador && !reducido) {
    const final = Number(contador.dataset.contador);
    const inicio = performance.now() + 500;
    const dura = 1600;
    const paso = (t) => {
      const p = Math.min(1, Math.max(0, (t - inicio) / dura));
      const suave = 1 - Math.pow(1 - p, 4);
      // El anillo se llena con lo consumido; el número baja desde el objetivo hasta lo que queda.
      contador.textContent = Math.round(2000 - (2000 - final) * suave);
      if (p < 1) requestAnimationFrame(paso);
    };
    contador.textContent = "2000";
    requestAnimationFrame(paso);
  }

  // Fuera de Android: avisar de que se instala en el móvil
  const esAndroid = /android/i.test(navigator.userAgent);
  if (!esAndroid) {
    document.querySelectorAll("[data-nota-dispositivo]").forEach((n) => {
      n.textContent = "Para Android 8 o superior · abre esta página en tu móvil para instalarla";
    });
  }
})();
