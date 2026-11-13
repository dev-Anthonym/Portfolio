document.addEventListener("DOMContentLoaded", () => {
  const EN = {
    "nav.sobre": "about",
    "nav.tec": "stack",
    "nav.projetos": "projects",
    "nav.formacao": "education",
    "nav.cert": "certificates",
    "nav.traj": "journey",
    "nav.conteudos": "content",
    "nav.contato": "contact",
    "theme.dark": "dark",
    "theme.light": "light",

    "hero.role": "Back-end Java developer in training · Computer Science",
    "hero.pitch": "I’m building my career in back-end development with Java. Every line of code is a step forward, and I share this whole journey on my social media for anyone who wants to follow along.",
    "hero.status": "Open to software development internships",
    "hero.cta1": "See projects",
    "hero.cta2": "Download résumé",
    "hero.cta3": "Get in touch",
    "hero.file": "AboutMe.java",
    "hero.code": '<code><span class="k">public class</span> <span class="t">AboutMe</span> {\n\n    <span class="t">String</span> name     = <span class="s">"Anthony Magalhães"</span>;\n    <span class="t">String</span> degree   = <span class="s">"Computer Science"</span>;\n    <span class="t">String</span> focus    = <span class="s">"Back-end"</span>;\n    <span class="t">String</span> language = <span class="s">"Java"</span>;\n    <span class="t">String</span> city     = <span class="s">"Contagem, Brazil"</span>;\n    <span class="t">boolean</span> openToInternship = <span class="k">true</span>;\n\n    <span class="c">// always learning something new</span>\n}</code>',

    "sobre.title": "About me",
    "sobre.p1": "I'm a Computer Science student at UNA Contagem and, since June 2025, an IT intern at the Municipal Administration Department of Contagem, where I support users and manage the Moodle platform.",
    "sobre.p2": "I want to build a career in back-end development with Java: business rules, APIs and data persistence. I study a little every day, build a small system every week to practice on my own, and document this journey in public, here and on my social media.",
    "sobre.p3": "I use generative AI as a tool for studying and building software, and my goal is to always understand the code that goes into my projects.",
    "sobre.interesses": "interests",
    "sobre.interesses.list": "<li>Back-end development</li><li>Databases</li><li>Software architecture</li><li>AI applied to real problems</li>",
    "sobre.objetivos": "goals",
    "sobre.objetivos.list": "<li>Land a software development internship</li><li>Go deeper into Java and Spring Boot</li><li>Become fluent in English</li><li>Graduate in 2028</li>",
    "sobre.github": "github activity",
    "contrib.menos": "Less",
    "contrib.mais": "More",

    "tec.title": "Stack",
    "tec.java": "Main language, daily OOP practice",
    "tec.spring": "REST APIs in the Ticket Triage System",
    "tec.sqlite": "Data persistence in IntegraSaúde",
    "tec.git": "Version control with Conventional Commits",
    "tec.eclipse": "Everyday IDE, with Spring Tools",
    "tec.uso": "using",
    "tec.estudando": "learning",

    "proj.title": "Projects",
    "proj.dev": "in development",
    "proj.done": "completed",
    "proj.andamento": "in progress",
    "proj.repo": "View repository",
    "proj.triagem.title": "AI-powered Ticket Triage System",
    "proj.triagem.desc": "It started at my internship, where support tickets are read and sorted by hand. When a ticket is opened, a generative AI classifies its category and priority, summarizes the issue and suggests a reply.",
    "proj.triagem.feat": "<li>Automatic triage with the Claude API</li><li>Reports built with SQL queries</li><li>Weekly CSV report</li>",
    "proj.integra.desc": "Medication and appointment reminders with patient and caregiver profiles. If a dose isn't confirmed in time, the caregiver gets an alert. A group project for the Software Quality Assurance course, where I was in charge of development.",
    "proj.curso.desc": "The code from my daily Java and Object-Oriented Programming studies, organized lesson by lesson. It's the most honest record of my progress.",

    "form.title": "Education",
    "form.curso": "Bachelor's in Computer Science",
    "form.previsao": "Expected graduation: Dec 2028",

    "cert.title": "Certificates",
    "cert.java": "Java: Object-Oriented Programming and Projects",
    "cert.ingles": "English from beginner to fluency",
    "cert.note": "New certificates will show up here as soon as they're completed.",

    "traj.title": "Timeline",
    "traj.sub": "My journey told as a commit history, newest first.",
    "traj.1": "<b>feat:</b> started documenting my progress in public on GitHub, LinkedIn, Instagram and YouTube",
    "traj.2": "<b>feat(project):</b> started the AI-powered Ticket Triage System",
    "traj.3": "<b>feat(project):</b> delivered IntegraSaúde",
    "traj.4": "<b>chore(studies):</b> started Java and English courses on Udemy",
    "traj.5": "<b>feat(career):</b> IT internship at Contagem City Hall",
    "traj.6": "<b>init:</b> started my Computer Science degree at UNA Contagem",

    "cont.title": "Content",
    "cont.sub": "Where I share what I'm learning.",
    "cont.yt": "Video lessons in English about what I'm studying in Java, reflections and my progress in tech.",
    "cont.ig": "Quick explanations, news and tech memes, in a more relaxed tone.",
    "cont.li": "My professional journey: projects, courses and lessons learned.",

    "contato.title": "Contact",
    "contato.sub": "The fastest way to reach me is by email or LinkedIn.",
    "form.nome": "Name",
    "form.msg": "Message",
    "form.enviar": "Send message",

    "footer.ai": "This website was built with generative AI (Claude)."
  };

  const MSG = {
    pt: {
      name: "Informe seu nome.",
      email: "Informe um e-mail válido.",
      message: "Escreva uma mensagem com pelo menos 10 caracteres.",
      check: "Confira os campos destacados.",
      sent: "Mensagem enviada. Respondo em breve.",
      mail: "Abrindo seu app de e-mail com a mensagem pronta.",
      fail: "Não foi possível enviar agora. Tente pelo e-mail dev.anthony.m@gmail.com."
    },
    en: {
      name: "Enter your name.",
      email: "Enter a valid email.",
      message: "Write a message with at least 10 characters.",
      check: "Check the highlighted fields.",
      sent: "Message sent. I'll get back to you soon.",
      mail: "Opening your email app with the message ready.",
      fail: "Couldn't send right now. Try emailing dev.anthony.m@gmail.com."
    }
  };

  const store = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { } }
  };

  const body = document.body;
  const i18nEls = Array.from(document.querySelectorAll("[data-i18n]"));
  i18nEls.forEach((el) => { el.dataset.pt = el.innerHTML; });

  let lang = store.get("portfolio-lang") === "en" ? "en" : "pt";
  let theme = store.get("portfolio-theme") === "light" ? "light" : "dark";
  const themeLabel = document.getElementById("themeLabel");

  function applyLang() {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    i18nEls.forEach((el) => {
      if (el === themeLabel) return;
      const key = el.dataset.i18n;
      el.innerHTML = lang === "en" && EN[key] ? EN[key] : el.dataset.pt;
    });
    document.querySelectorAll("[data-lang-opt]").forEach((opt) => {
      opt.classList.toggle("is-on", opt.dataset.langOpt === lang);
    });
    applyTheme();
  }

  function applyTheme() {
    body.setAttribute("data-theme", theme);
    const key = theme === "dark" ? "theme.dark" : "theme.light";
    themeLabel.textContent = lang === "en" ? EN[key] : (theme === "dark" ? "escuro" : "claro");
  }

  document.getElementById("langToggle").addEventListener("click", () => {
    lang = lang === "pt" ? "en" : "pt";
    store.set("portfolio-lang", lang);
    applyLang();
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    store.set("portfolio-theme", theme);
    applyTheme();
  });

  applyLang();

  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  const navLinks = Array.from(nav.querySelectorAll("a"));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach((section) => spy.observe(section));

    document.querySelectorAll(".github-stats img").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
      const card = img.closest(".card");
      const allHidden = Array.from(card.querySelectorAll("img")).every((i) => i.style.display === "none");
      if (allHidden) card.style.display = "none";
    });
  });

  const form = document.getElementById("contactForm");
  const fields = {
    name: [document.getElementById("fieldName"), document.getElementById("errorName")],
    email: [document.getElementById("fieldEmail"), document.getElementById("errorEmail")],
    message: [document.getElementById("fieldMessage"), document.getElementById("errorMessage")]
  };
  const status = document.getElementById("formStatus");

  function setError(name, message) {
    const [input, errorEl] = fields[name];
    input.classList.toggle("has-error", Boolean(message));
    errorEl.textContent = message || "";
  }

  Object.keys(fields).forEach((name) => {
    fields[name][0].addEventListener("input", () => setError(name, ""));
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const t = MSG[lang];
    const name = fields.name[0].value.trim();
    const email = fields.email[0].value.trim();
    const message = fields.message[0].value.trim();
    let ok = true;

    if (name.length < 2) { setError("name", t.name); ok = false; } else setError("name", "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("email", t.email); ok = false; } else setError("email", "");
    if (message.length < 10) { setError("message", t.message); ok = false; } else setError("message", "");

    if (!ok) { status.textContent = t.check; return; }

    if (form.action.includes("SEU_ID")) {
      const subject = encodeURIComponent("Contato pelo portfólio: " + name);
      const text = encodeURIComponent(message + "\n\n" + name + " (" + email + ")");
      window.location.href = "mailto:dev.anthony.m@gmail.com?subject=" + subject + "&body=" + text;
      status.textContent = t.mail;
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error();
      status.textContent = t.sent;
      form.reset();
    } catch {
      status.textContent = t.fail;
    }
  });
});
