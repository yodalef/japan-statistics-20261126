// Canvas chart helpers: one line chart and one bar chart, drawn in the
// site's own palette. No libraries, no network.

const INK = "#14213d";
const MUTED = "#6b7280";
const VERMILION = "#c0392b";
const GRID = "#e3dccd";

function setupCanvas(canvas) {
  const scale = window.devicePixelRatio || 1;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.font = "13px system-ui, sans-serif";
  return { ctx, width, height };
}

function drawAxes(ctx, width, height, pad, yMin, yMax, yTicks) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.lineWidth = 1;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const tick of yTicks) {
    const y = pad.top + (1 - (tick - yMin) / (yMax - yMin)) * (height - pad.top - pad.bottom);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();
    ctx.fillText(String(tick), pad.left - 8, y);
  }
  ctx.strokeStyle = INK;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, height - pad.bottom);
  ctx.lineTo(width - pad.right, height - pad.bottom);
  ctx.stroke();
}

// Draw a line chart of {year, value} points. highlightIndex marks one point.
export function drawLineChart(canvas, points, options) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { top: 16, right: 16, bottom: 34, left: 52 };
  const values = points.map((p) => p.value);
  const yMin = options.yMin;
  const yMax = options.yMax;
  const yTicks = options.yTicks;
  drawAxes(ctx, width, height, pad, yMin, yMax, yTicks);

  const xAt = (i) => pad.left + (i / (points.length - 1)) * (width - pad.left - pad.right);
  const yAt = (v) => pad.top + (1 - (v - yMin) / (yMax - yMin)) * (height - pad.top - pad.bottom);

  ctx.strokeStyle = VERMILION;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  points.forEach((p, i) => {
    if (i === 0) ctx.moveTo(xAt(i), yAt(p.value));
    else ctx.lineTo(xAt(i), yAt(p.value));
  });
  ctx.stroke();

  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  points.forEach((p, i) => {
    if (i % 4 === 0 || i === points.length - 1) {
      ctx.fillText(String(p.year), xAt(i), height - pad.bottom + 8);
    }
  });

  const hi = options.highlightIndex;
  if (hi !== undefined && hi !== null && points[hi]) {
    const p = points[hi];
    ctx.fillStyle = VERMILION;
    ctx.beginPath();
    ctx.arc(xAt(hi), yAt(p.value), 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(xAt(hi), yAt(p.value), 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = "bold 14px system-ui, sans-serif";
    ctx.textAlign = xAt(hi) > width - 140 ? "right" : "left";
    const label = options.formatValue
      ? options.formatValue(p)
      : p.year + ": " + p.value.toFixed(2) + "m";
    ctx.fillText(label, xAt(hi) + (xAt(hi) > width - 140 ? -12 : 12), Math.max(4, yAt(p.value) - 28));
    ctx.font = "13px system-ui, sans-serif";
  }
}

// Draw a vertical bar chart of {band, value} items.
export function drawBarChart(canvas, items, options) {
  const { ctx, width, height } = setupCanvas(canvas);
  const pad = { top: 16, right: 16, bottom: 34, left: 56 };
  const max = Math.max(...items.map((d) => d.value));
  const yMax = Math.ceil(max / 1000) * 1000;
  const yTicks = [];
  for (let t = 0; t <= yMax; t += 2500) yTicks.push(t);
  drawAxes(ctx, width, height, pad, 0, yMax, yTicks);

  const slot = (width - pad.left - pad.right) / items.length;
  const barWidth = Math.min(28, slot * 0.62);
  items.forEach((d, i) => {
    const x = pad.left + i * slot + (slot - barWidth) / 2;
    const barHeight = (d.value / yMax) * (height - pad.top - pad.bottom);
    const y = height - pad.bottom - barHeight;
    ctx.fillStyle = d.band === "45–49" || d.band === "70–74" ? VERMILION : "#33507e";
    ctx.fillRect(x, y, barWidth, barHeight);
    if (i % 2 === 0) {
      ctx.fillStyle = MUTED;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(d.band, pad.left + i * slot + slot / 2, height - pad.bottom + 8);
    }
  });

  ctx.fillStyle = MUTED;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(options.unitLabel, pad.left, 2);
}
