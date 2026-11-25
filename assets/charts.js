/* Väikesed sõltuvusteta graafikukomponendid portaali jaoks. */
(function(){
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (v, d) => v == null || isNaN(v) ? '–' : (d == null ? (Math.abs(v - Math.round(v)) < 0.05 ? Math.round(v) : v.toFixed(1)) : v.toFixed(d)).toString().replace('.', ',');
  const pct = (v, d) => v == null ? '–' : fmt(v, d) + '%';

  // Ühine kohtspikker: iga element, millel on data-tip
  let tip;
  function ensureTip(){
    if (tip) return;
    tip = document.createElement('div'); tip.id = 'tip'; tip.setAttribute('role','tooltip'); document.body.append(tip);
    document.addEventListener('pointermove', e => {
      const t = e.target.closest && e.target.closest('[data-tip]');
      if (!t){ tip.style.opacity = 0; return; }
      tip.innerHTML = t.dataset.tip; tip.style.opacity = 1;
      const w = tip.offsetWidth, h = tip.offsetHeight;
      let x = e.clientX + 14, y = e.clientY + 14;
      if (x + w > innerWidth - 8) x = e.clientX - w - 14;
      if (y + h > innerHeight - 8) y = e.clientY - h - 14;
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    });
    document.addEventListener('pointerleave', () => tip.style.opacity = 0);
  }

  function legend(series){
    return `<div class="legend">${series.map(s => `<span class="key"><i class="${s.na ? 'na' : ''}" style="--c:${s.color}"></i>${esc(s.name)}</span>`).join('')}</div>`;
  }

  function hbars(el, o){
    ensureTip();
    const max = o.max || 100;
    el.innerHTML = `<div class="hb">${o.rows.map(r => {
      const v = r.value / max * 100;
      return `<div class="hb-row${r.hl ? ' hl' : ''}" data-tip="${esc(r.label)}: <b>${pct(r.value)}</b>${r.tip ? '<br>' + esc(r.tip) : ''}">
        <span>${esc(r.label)}</span><div class="hb-track"><div class="hb-fill" style="--v:${v};${r.color ? '--c:' + r.color : (o.color ? '--c:' + o.color : '')}"></div></div><span class="hb-val">${o.raw ? fmt(r.value) : pct(r.value)}</span></div>`;
    }).join('')}</div>`;
  }

  function grouped(el, o){
    ensureTip();
    const max = o.max || 100;
    el.innerHTML = legend(o.series) + `<div class="gb">${o.rows.map(r => `<div class="gb-row"><span>${esc(r.label)}</span><div class="gb-bars">${
      r.values.map((v, i) => `<div class="gb-bar" data-tip="${esc(r.label)}<br>${esc(o.series[i].name)}: <b>${o.raw ? fmt(v) : pct(v)}</b>"><div class="hb-track"><div class="hb-fill" style="--v:${v / max * 100};--c:${o.series[i].color}"></div></div><span>${o.raw ? fmt(v) : pct(v)}</span></div>`).join('')
    }</div></div>`).join('')}</div>`;
  }

  function stacked(el, o){
    ensureTip();
    el.innerHTML = legend(o.series) + `<div class="sb">${o.rows.map(r => {
      const tot = o.normalize ? r.values.reduce((a, b) => a + (b || 0), 0) : 100;
      return `<div class="sb-row"><span>${esc(r.label)}</span><div class="sb-bar" role="img" aria-label="${esc(r.label)}: ${o.series.map((s, i) => s.name + ' ' + pct(r.values[i])).join(', ')}">${
        r.values.map((v, i) => {
          const s = o.series[i]; const w = (v || 0) / tot * 100;
          if (!w) return '';
          return `<div class="sb-seg${s.na ? ' na' : ''}${s.light ? ' light' : ''}" style="--v:${w};--c:${s.color}" data-tip="${esc(r.label)}<br>${esc(s.name)}: <b>${pct(v)}</b>">${w >= 6 ? fmt(v, 0) : ''}</div>`;
        }).join('')
      }</div></div>`;
    }).join('')}</div>`;
  }

  function line(el, o){
    ensureTip();
    const W = 640, H = o.height || 300, m = {l: 40, r: 70, t: 16, b: 34};
    const vals = o.series.flatMap(s => s.values).filter(v => v != null);
    const yMax = o.yMax || Math.ceil(Math.max(...vals) / 10) * 10, yMin = o.yMin ?? 0;
    const n = o.x.length;
    const X = i => m.l + (n === 1 ? 0 : i * (W - m.l - m.r) / (n - 1));
    const Y = v => m.t + (1 - (v - yMin) / (yMax - yMin)) * (H - m.t - m.b);
    const ticks = []; const step = o.yStep || (yMax - yMin > 50 ? 20 : 10);
    for (let v = yMin; v <= yMax + 1e-9; v += step) ticks.push(v);
    let svg = `<svg class="line-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.label || '')}">`;
    ticks.forEach(v => svg += `<line class="grid" x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${m.l - 8}" y="${Y(v) + 4}" text-anchor="end" opacity=".65">${fmt(v)}${o.raw ? '' : '%'}</text>`);
    o.x.forEach((x, i) => svg += `<text x="${X(i)}" y="${H - 10}" text-anchor="middle" opacity=".8">${esc(String(x).replace(/\n/g, ' '))}</text>`);
    o.series.forEach(s => {
      const pts = s.values.map((v, i) => v == null ? null : [X(i), Y(v)]).filter(Boolean);
      svg += `<polyline fill="none" stroke="${s.color}" stroke-width="2.5" stroke-linejoin="round" points="${pts.map(p => p.join(',')).join(' ')}"/>`;
      s.values.forEach((v, i) => { if (v == null) return;
        svg += `<circle cx="${X(i)}" cy="${Y(v)}" r="5" fill="${s.color}" stroke="var(--paper-2)" stroke-width="2"/>`;
        svg += `<circle cx="${X(i)}" cy="${Y(v)}" r="14" fill="transparent" data-tip="${esc(s.name)}, ${esc(String(o.x[i]).replace(/\n/g,' '))}: <b>${o.raw ? fmt(v) : pct(v)}</b>"/>`;
      });
      const last = s.values.length - 1;
      if (s.values[last] != null && o.endLabels !== false) svg += `<text x="${X(last) + 10}" y="${Y(s.values[last]) + 4}" font-weight="700">${o.raw ? fmt(s.values[last]) : pct(s.values[last])}</text>`;
    });
    svg += '</svg>';
    el.innerHTML = (o.series.length > 1 ? legend(o.series) : '') + svg;
  }

  function cards(el, items){
    el.innerHTML = `<div class="cards">${items.map(c => `<div class="card"><div class="value">${esc(c.value)}</div><div class="label">${esc(c.label)}</div></div>`).join('')}</div>`;
  }

  function table(el, o){
    el.innerHTML = `<div style="overflow-x:auto"><table class="dtable"><thead><tr>${o.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${
      o.rows.map(r => r.sub ? `<tr class="sub"><td colspan="${o.head.length}">${esc(r.sub)}</td></tr>` : `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')
    }</tbody></table></div>`;
  }

  window.UIC = {esc, fmt, pct, legend, hbars, grouped, stacked, line, cards, table, ensureTip};
})();
