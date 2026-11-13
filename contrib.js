// Gráfico de contribuições do GitHub, desenhado no estilo do próprio GitHub
document.addEventListener("DOMContentLoaded", () => {
  const USER = "dev-Anthonym";
  const graph = document.getElementById("contribGraph");
  const totalEl = document.getElementById("contribTotal");
  if (!graph) return;

  const card = graph.closest(".card");
  let days = [];
  let total = 0;

  function lang() {
    return document.documentElement.lang === "en" ? "en" : "pt-BR";
  }

  function render() {
    if (!days.length) return;
    const locale = lang();
    graph.innerHTML = "";

    const first = new Date(days[0].date + "T00:00:00");
    const offset = first.getDay();
    let lastMonth = -1;
    const weeks = Math.ceil((days.length + offset) / 7);
    graph.style.gridTemplateColumns = "28px repeat(" + weeks + ", 11px)";

    const dayNames = locale === "en" ? ["Mon", "Wed", "Fri"] : ["Seg", "Qua", "Sex"];
    [[2, 0], [4, 1], [6, 2]].forEach(([row, i]) => {
      const label = document.createElement("span");
      label.className = "contrib__day";
      label.textContent = dayNames[i];
      label.style.gridRow = row + 1;
      label.style.gridColumn = 1;
      graph.appendChild(label);
    });

    days.forEach((day, index) => {
      const pos = index + offset;
      const week = Math.floor(pos / 7);
      const weekday = pos % 7;
      const date = new Date(day.date + "T00:00:00");

      if (weekday === 0 || index === 0) {
        const month = date.getMonth();
        if (month !== lastMonth && date.getDate() <= 7) {
          const label = document.createElement("span");
          label.className = "contrib__month";
          label.textContent = date.toLocaleString(locale, { month: "short" }).replace(".", "");
          label.style.gridRow = 1;
          label.style.gridColumn = week + 2;
          graph.appendChild(label);
          lastMonth = month;
        }
      }

      const cell = document.createElement("span");
      cell.className = "contrib__cell";
      cell.dataset.level = day.level;
      cell.style.gridRow = weekday + 2;
      cell.style.gridColumn = week + 2;
      const when = date.toLocaleDateString(locale, { day: "numeric", month: "long" });
      cell.title = locale === "en"
        ? day.count + (day.count === 1 ? " contribution on " : " contributions on ") + when
        : day.count + (day.count === 1 ? " contribuição em " : " contribuições em ") + when;
      graph.appendChild(cell);
    });

    totalEl.textContent = locale === "en"
      ? total + " contributions in the last year"
      : total + " contribuições no último ano";
  }

  fetch("https://github-contributions-api.jogruber.de/v4/" + USER + "?y=last")
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then((data) => {
      days = data.contributions || [];
      total = data.total && data.total.lastYear !== undefined
        ? data.total.lastYear
        : days.reduce((sum, d) => sum + d.count, 0);
      if (!days.length) throw new Error();
      render();
    })
    .catch(() => {
      if (card) card.style.display = "none";
    });

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
});