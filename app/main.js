// Japan in Figures — wiring: charts, the year slider, the ageing table and
// the searchable, sortable prefecture table. Hash scrolling included.

import {
  populationTrend,
  ageingTrend,
  ageStructure2020,
  fertilityTrend,
  prefectures,
  totalPopulation2020,
} from "./data.js";
import { drawLineChart, drawBarChart } from "./charts.js";

const $ = (id) => document.getElementById(id);

function formatMillions(n) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 }) + " million";
}

// --- Population chart with year slider -------------------------------------
const popCanvas = $("popChart");
const slider = $("yearSlider");
const readout = $("yearReadout");
slider.max = String(populationTrend.length - 1);
slider.value = slider.max;

function drawPopulation() {
  const index = Number(slider.value);
  drawLineChart(popCanvas, populationTrend, {
    yMin: 50,
    yMax: 135,
    yTicks: [50, 75, 100, 125],
    highlightIndex: index,
    formatValue: (p) => p.year + ": " + formatMillions(p.value),
  });
  const point = populationTrend[index];
  readout.textContent = point.year + " — " + formatMillions(point.value);
}

slider.addEventListener("input", drawPopulation);
drawPopulation();

// --- Ageing table -----------------------------------------------------------
const ageingBody = $("ageingRows");
for (const row of ageingTrend) {
  const tr = document.createElement("tr");
  const yearCell = document.createElement("td");
  yearCell.textContent = row.year;
  const valueCell = document.createElement("td");
  valueCell.textContent = row.value.toFixed(1) + "%";
  tr.append(yearCell, valueCell);
  ageingBody.append(tr);
}

// --- Age structure bar chart -------------------------------------------------
drawBarChart($("ageChart"), ageStructure2020, { unitLabel: "Thousands of people" });

// --- Fertility chart ---------------------------------------------------------
drawLineChart($("tfrChart"), fertilityTrend, {
  yMin: 0,
  yMax: 2.5,
  yTicks: [0, 0.5, 1, 1.5, 2, 2.5],
  highlightIndex: fertilityTrend.length - 1,
  formatValue: (p) => p.year + ": " + p.value.toFixed(2),
});

// --- Prefecture table: search + sort -----------------------------------------
const searchInput = $("prefSearch");
const sortSelect = $("prefSort");
const prefBody = $("prefRows");
const prefCount = $("prefCount");

function renderPrefectures() {
  const query = searchInput.value.trim().toLowerCase();
  const mode = sortSelect.value;
  let rows = prefectures.filter((p) => p.name.toLowerCase().includes(query));
  if (mode === "pop-desc") rows = [...rows].sort((a, b) => b.population - a.population);
  if (mode === "pop-asc") rows = [...rows].sort((a, b) => a.population - b.population);
  if (mode === "name") rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));

  prefBody.textContent = "";
  rows.forEach((p, i) => {
    const tr = document.createElement("tr");
    const rank = document.createElement("td");
    rank.textContent = i + 1;
    const name = document.createElement("td");
    name.textContent = p.name;
    const pop = document.createElement("td");
    pop.className = "num";
    pop.textContent = p.population.toLocaleString("en-US");
    const share = document.createElement("td");
    share.className = "num";
    share.textContent = ((p.population / totalPopulation2020) * 100).toFixed(1) + "%";
    tr.append(rank, name, pop, share);
    prefBody.append(tr);
  });
  prefCount.textContent = rows.length + " of 47 prefectures shown";
}

searchInput.addEventListener("input", renderPrefectures);
sortSelect.addEventListener("change", renderPrefectures);
renderPrefectures();

// --- Hash scrolling -----------------------------------------------------------
function scrollToHash() {
  if (!location.hash) return;
  const target = document.querySelector(location.hash);
  if (target) target.scrollIntoView();
}

window.addEventListener("hashchange", scrollToHash);
scrollToHash();
