document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     1. Tema claro / escuro (com persistência)
  ========================================================= */
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    themeLabel.textContent = theme === "dark" ? "modo escuro" : "modo claro";
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  applyTheme(savedTheme === "light" ? "light" : "dark");

  themeToggle.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("portfolio-theme", next);
  });

  /* =========================================================
     2. Menu mobile (dropdown da navegação na topbar)
  ========================================================= */
  const menuToggle = document.getElementById("menuToggle");
  const topNav = document.getElementById("topNav");

  function closeMobileMenu() {
    topNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function toggleMobileMenu() {
    const isOpen = topNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  }

  menuToggle.addEventListener("click", toggleMobileMenu);

  /* =========================================================
     3. Navegação: abas da topbar controlam a seção ativa
  ========================================================= */
  const sections = Array.from(document.querySelectorAll(".pane"));
  const tabs = Array.from(document.querySelectorAll(".tab"));

  function setActiveTarget(targetId) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === targetId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  }

  // Clique nas abas rola até a seção correspondente e fecha o dropdown mobile
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.getElementById(tab.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      closeMobileMenu();
    });
  });

  // CTAs internos (ex.: "ver projetos", "falar comigo") também fecham o menu
  document.querySelectorAll("a[data-target]").forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu());
  });

  // Scroll-spy: destaca a seção visível no momento
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTarget(entry.target.id);
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  /* =========================================================
     4. Botão "voltar ao topo"
  ========================================================= */
  const backToTop = document.getElementById("backToTop");
  const scrollContainer = document.querySelector(".editor__scroll");

  function handleScrollVisibility() {
    const scrolled = window.scrollY > 400;
    backToTop.classList.toggle("is-visible", scrolled);
  }

  window.addEventListener("scroll", handleScrollVisibility, { passive: true });
  handleScrollVisibility();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* =========================================================
     6. Contadores animados (estatísticas do início)
  ========================================================= */
  const stats = Array.from(document.querySelectorAll(".stat"));

  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const valueEl = el.querySelector(".stat__value");
    const duration = 900;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      valueEl.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  if (stats.length) {
    const statsObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    stats.forEach((stat) => statsObserver.observe(stat));
  }

  /* =========================================================
     7. Validação do formulário de contato
  ========================================================= */
  const form = document.getElementById("contactForm");
  const fieldName = document.getElementById("fieldName");
  const fieldEmail = document.getElementById("fieldEmail");
  const fieldMessage = document.getElementById("fieldMessage");
  const errorName = document.getElementById("errorName");
  const errorEmail = document.getElementById("errorEmail");
  const errorMessage = document.getElementById("errorMessage");
  const formStatus = document.getElementById("formStatus");

  function setError(field, errorEl, message) {
    if (message) {
      field.classList.add("has-error");
      errorEl.textContent = message;
    } else {
      field.classList.remove("has-error");
      errorEl.textContent = "";
    }
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let hasError = false;

    if (fieldName.value.trim().length < 2) {
      setError(fieldName, errorName, "Informe seu nome.");
      hasError = true;
    } else {
      setError(fieldName, errorName, "");
    }

    if (!isValidEmail(fieldEmail.value.trim())) {
      setError(fieldEmail, errorEmail, "Informe um e-mail válido.");
      hasError = true;
    } else {
      setError(fieldEmail, errorEmail, "");
    }

    if (fieldMessage.value.trim().length < 10) {
      setError(fieldMessage, errorMessage, "Escreva uma mensagem com pelo menos 10 caracteres.");
      hasError = true;
    } else {
      setError(fieldMessage, errorMessage, "");
    }

    if (hasError) {
      formStatus.textContent = "Verifique os campos destacados acima.";
      return;
    }

    // Sem back-end conectado: aqui a mensagem é apenas confirmada na tela.
    formStatus.textContent =
      "Mensagem pronta para envio! Conecte este formulário a um serviço de e-mail (ex.: mailto, Formspree) para recebê-la de fato.";
    form.reset();
  });
});