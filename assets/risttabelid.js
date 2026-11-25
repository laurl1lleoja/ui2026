(function(){
  const {esc, fmt} = UIC;
  const QN = window.UI_QUESTIONNAIRE;
  const NA_RE = /^(raske öelda|ei oska|arvamus puudub|ei soovi|vastus puudub|ei kohaldu|ei tea)/i;
  const LOW_N = 30;
  const COMBOS = [
    ['Nõus kokku (pigem + täiesti)', ['Pigem nõus','Täiesti nõus']],
    ['Ei ole nõus kokku', ['Üldse ei ole nõus','Pigem ei ole nõus']],
    ['Usaldab kokku (pigem + täiesti)', ['Pigem usaldan','Usaldan täiesti']],
    ['Oluline kokku (oluline + väga oluline)', ['Oluline','Väga oluline']],
    ['Vähemalt kord aastas', ['Iga nädal','Kord-paar kuus','3-4 korda aastas','1-2 korda aastas']],
    ['Vähemalt harvem', ['Harvem','Kord nädalas','Iga päev']],
    ['Palvetab kokku', ['Jah, regulaarselt','Jah, vahetevahel']],
    ['On kogenud kokku', ['Jah, korduvalt','Jah, mõnel korral']],
    ['Osalenud kokku', ['Jah, enam kui ühel korral','Jah, ühel korral']],
    ['Usub praegu kokku', ['Usun Jumala olemasolu, kuid varem ei uskunud','Usun Jumala olemasolu ning olen seda alati teinud']],
    ['Aktsepteeritav (6–10)', ['6','7','8','9','Kindlasti võiks olla aktsepteeritav']],
    ['Rahul (6–10)', ['6','7','8','9','Väga rahul']],
    ['Usaldab kokku', ['Usaldan täiesti','Usaldan üsna palju']],
    ['Tähtis kokku', ['Eriti tähtis','Tähtis']]];
  const hid = id => id.replace(/ /g, '-');
  const YEARS = ['2026','2020','2015','2005','2000','1995'];
  const YEAR_NOTE = {
    '2026': 'UI2026, n=1550, 18+, veebi- ja postiküsitlus. Kaalutud andmed.',
    '2020': 'EUU2020, n=1000, 18+, veebi- ja postiküsitlus. Kaalutud andmed.',
    '2015': 'EUU2015, n≈1000, 15–74, näost näkku intervjuu. Kaalutud andmed.',
    '2005': 'EUU2005, 15–74, postiküsitlus. Kaalutud andmed (kaalutud n≈713).',
    '2000': 'EUU2000, 16–70, postiküsitlus. Kaalutud andmed (kaalutud n≈1070).',
    '1995': 'EUU1995, 16–70, postiküsitlus. Kaalutud andmed (kaalutud n≈1506).'};
  const BORDER = ['Sugu','Vanus','Rahvus','Kodune keel','Ankeedi keel','Haridus'];
  const TOPICS = ['Identiteet','Uskumused','Kuuluvus','Vaimsus ja praktikad','Kirik ja ühiskond','Väärtused ja hoiakud','Poliitilised hoiakud','Taust'];

  // Andmestiku olek (vahetub aasta valikuga)
  let D, COLS, groups, banners, totalIdx, byCode, entries, isMain;

  function useYear(y){
    isMain = y === '2026';
    if (isMain) D = window.UI_TABLES;
    else {
      const R = window.UI_YEARS[y];
      D = {columns: R.columns, tables: R.tables.map((t, i) => {
        const m = t.title.match(/^([A-ZÕÄÖÜ]?\d+[a-z]?(?:-[A-Z]?\d+)?)\.\s*(.*)$/);
        return {id: 't' + i, code: 'y' + y + ':' + t.title, q: m ? m[1] : '', title: m ? m[2] : t.title, item: t.item, base: t.base,
          a: t.a.map(a => ({l: a.l, v: a.v, s: []}))};
      })};
    }
    COLS = D.columns;
    groups = [];
    COLS.forEach((c, i) => { let g = groups.find(x => x.name === c.group); if (!g) groups.push(g = {name: c.group, idx: []}); g.idx.push(i); });
    banners = groups.filter(g => g.name !== 'Kokku').sort((a, b) => ((BORDER.indexOf(a.name) + 1) || 9) - ((BORDER.indexOf(b.name) + 1) || 9));
    totalIdx = groups.find(g => g.name === 'Kokku').idx[0];
    byCode = new Map();
    D.tables.forEach(t => { if (!byCode.has(t.code)) byCode.set(t.code, []); byCode.get(t.code).push(t); });
    if (isMain) {
      const qmeta = n => QN.find(q => q.n === n) || {};
      entries = [...byCode.entries()].map(([code, ts]) => {
        const extra = QN.find(q => q.codes && q.codes.includes(code) && q.n === '–');
        const meta = extra || qmeta(ts[0].q);
        const label = (meta.short || code) + (ts[0].sub && (meta.codes || []).length > 1 ? ' – ' + ts[0].sub : '');
        return {code, tables: ts, meta, label, n: meta.n || '–', topic: meta.topic || 'Taust',
          search: [label, meta.text, ...(ts.map(t => t.item || '')), ...(meta.items || [])].join(' ').toLowerCase()};
      });
      entries.forEach((e, i) => e.order = i);
      entries.sort((a, b) => (TOPICS.indexOf(a.topic) - TOPICS.indexOf(b.topic)) || (a.order - b.order));
    } else {
      entries = [...byCode.entries()].map(([code, ts]) => ({code, tables: ts, meta: {text: ts[0].title}, label: ts[0].title, n: ts[0].q || '–', topic: 'EUU' + y + ' küsimused',
        search: [ts[0].title, ...ts.map(t => t.item || '')].join(' ').toLowerCase()}));
    }
    if (!banners.some(b => b.name === S.banner)) S.banner = (banners.find(b => b.name === 'Sugu') || banners[0]).name;
  }

  function loadYear(y, cb){
    if (y === '2026' || (window.UI_YEARS && window.UI_YEARS[y])) return cb();
    const sc = document.createElement('script'); sc.src = 'data/aastad/' + y + '.js'; sc.onload = cb;
    sc.onerror = () => { res.innerHTML = '<p>Andmete laadimine ebaõnnestus.</p>'; };
    document.head.append(sc);
  }

  const S = {year: '2026', code: null, item: 0, banner: 'Sugu', excl: true, sig: true, ans: null, summaryAns: null};
  function firstEntry(){ S.code = entries[0].code; S.item = byCode.get(S.code).length > 1 ? -1 : 0; S.ans = null; S.summaryAns = null; }

  // URL-i räsi: #Q5-r10&b=Vanus või #t12&b=Sugu&y=2015
  function parseHash(){
    const h = decodeURIComponent(location.hash.slice(1)); const o = {};
    if (!h) return o;
    const [id, ...rest] = h.split('&'); o.id = id;
    rest.forEach(p => { const [k, v] = p.split('='); o[k] = v; });
    return o;
  }
  function applyHash(o){
    if (o.b) S.banner = o.b;
    if (!o.id) return;
    const t = D.tables.find(t => hid(t.id) === o.id) || D.tables.find(t => t.code === o.id);
    if (t) { S.code = t.code; const ts = byCode.get(t.code); S.item = ts.length > 1 && hid(t.id) !== o.id && t.code === o.id ? -1 : ts.indexOf(t); S.ans = null; }
    if (!banners.some(b => b.name === S.banner)) S.banner = banners[0].name;
  }
  function writeHash(){
    const ts = byCode.get(S.code);
    const id = S.item < 0 ? (isMain ? S.code : hid(ts[0].id)) : hid(ts[S.item].id);
    history.replaceState(null, '', '#' + encodeURIComponent(id) + '&b=' + encodeURIComponent(S.banner) + (isMain ? '' : '&y=' + S.year) + (S.item < 0 && !isMain ? '&k=1' : ''));
  }
  // Vasak paneel
  const qlist = document.getElementById('qlist'), search = document.getElementById('q-search');
  function renderList(){
    const f = search.value.trim().toLowerCase();
    let html = '', topic = null;
    entries.filter(e => !f || e.search.includes(f)).forEach(e => {
      if (e.topic !== topic) { topic = e.topic; html += `<div class="grp">${esc(topic)}</div>`; }
      html += `<button type="button" role="option" data-code="${esc(e.code)}" aria-selected="${e.code === S.code}"><span class="num">${esc(e.n)}</span>${esc(e.label)}</button>`;
    });
    qlist.innerHTML = html || '<p style="padding:12px" class="muted">Ühtegi küsimust ei leitud.</p>';
  }
  qlist.addEventListener('click', e => {
    const b = e.target.closest('button[data-code]'); if (!b) return;
    S.code = b.dataset.code; const ts = byCode.get(S.code); S.item = ts.length > 1 ? -1 : 0; S.ans = null; S.summaryAns = null;
    update();
  });
  search.addEventListener('input', renderList);
  const itemSel = document.getElementById('item'), itemField = document.getElementById('item-field');
  itemSel.addEventListener('change', () => { S.item = +itemSel.value; S.ans = null; update(); });
  const bwrap = document.getElementById('banners');
  const ywrap = document.getElementById('years');
  ywrap.innerHTML = `<div class="year-chips-label">Uusim voor</div><div class="chips"><button type="button" class="chip now" data-y="2026">UI2026</button></div>
    <div class="year-chips-label">Arhiiv 1995–2020</div><div class="chips">${YEARS.slice(1).map(y => `<button type="button" class="chip" data-y="${y}">${y}</button>`).join('')}</div>`;
  ywrap.addEventListener('click', e => { const b = e.target.closest('[data-y]'); if (b && b.dataset.y !== S.year) switchYear(b.dataset.y); });
  function switchYear(y, o){
    loadYear(y, () => { S.year = y; useYear(y); firstEntry(); if (o) { applyHash(o); if (o.k && byCode.get(S.code).length > 1) S.item = -1; } search.value = ''; delete qlist.dataset.scrolled; update(); });
  }
  bwrap.addEventListener('click', e => { const b = e.target.closest('[data-b]'); if (b) { S.banner = b.dataset.b; update(); } });
  document.getElementById('excl').addEventListener('change', e => { S.excl = e.target.checked; update(); });
  document.getElementById('showsig').addEventListener('change', e => { S.sig = e.target.checked; update(); });

  // Andmete ettevalmistus ühe tabeli jaoks
  function prep(t, cols){
    const vp = t.a.find(a => a.l === 'Vastus puudub');
    const rows = t.a.filter(a => !(S.excl && a.l === 'Vastus puudub'));
    const factor = cols.map(i => { const v = vp && S.excl ? (vp.v[i] || 0) : 0; return v > 0 && v < 100 ? 100 / (100 - v) : 1; });
    const rebased = factor.some(f => f !== 1);
    const n = cols.map((i, k) => t.base[i] == null ? null : Math.round(t.base[i] / factor[k]));
    const out = rows.map(a => ({l: a.l, na: NA_RE.test(a.l), v: cols.map((i, k) => a.v[i] == null ? null : a.v[i] * factor[k]), s: cols.map(i => a.s[i] || '')}));
    // Liidetud read (nt „pigem“ + „täiesti“ nõus)
    COMBOS.forEach(([name, parts]) => {
      const rs = parts.map(l => out.find(r => r.l === l));
      if (rs.every(Boolean)) out.push({l: name, derived: true, na: false, v: cols.map((_, k) => rs.reduce((a, r) => a + (r.v[k] || 0), 0)), s: cols.map(() => '')});
    });
    return {rows: out, n, rebased};
  }
  function scaleMean(rows, k){
    if (rows.length < 10 || rows[1].l !== '2') return null;
    let s = 0, w = 0; rows.slice(0, 10).forEach((r, j) => { const v = r.v[k] || 0; s += (j + 1) * v; w += v; });
    return w ? s / w : null;
  }

  const res = document.getElementById('result');
  function update(){
    const entry = entries.find(e => e.code === S.code); const ts = entry.tables;
    // Väidete valik
    if (ts.length > 1) {
      itemField.hidden = false;
      itemSel.innerHTML = `<option value="-1">Kõik väited koos (võrdlus)</option>` + ts.map((t, i) => `<option value="${i}">${esc(t.item || t.sub || t.id)}</option>`).join('');
      itemSel.value = S.item;
    } else { itemField.hidden = true; S.item = 0; }
    bwrap.innerHTML = banners.map(b => `<button type="button" class="chip" data-b="${esc(b.name)}" aria-pressed="${b.name === S.banner}">${esc(b.name.replace(' leibkonnaliikme kohta', ''))}</button>`).join('');
    ywrap.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', c.dataset.y === S.year));
    document.getElementById('showsig').closest('label').hidden = !isMain;
    document.getElementById('year-note').textContent = YEAR_NOTE[S.year];
    renderList();
    const sel = qlist.querySelector('[aria-selected=true]'); if (sel && !qlist.dataset.scrolled) { sel.scrollIntoView({block: 'nearest'}); qlist.dataset.scrolled = 1; }
    writeHash();
    S.item < 0 ? renderSummary(entry) : renderTable(entry, ts[S.item]);
  }

  function header(entry, t){
    const m = entry.meta;
    const title = t && t.item ? t.item : (t && t.sub) || entry.label;
    if (!isMain) return `<p class="archive-note">Arhiiv · EUU${esc(S.year)}. Varasema vooru küsimuse sõnastus, vastusevariandid ja valim erinevad 2026. aasta omadest. <a href="arhiiv.html#v${esc(S.year)}">Vooru küsimustik ja andmed →</a></p><div class="eyebrow">EUU${esc(S.year)} · ${esc(entry.n)}</div><h2>${esc(t && t.item ? t.item : entry.label)}</h2>${t && t.item ? `<p class="qtext">${esc(entry.label)}</p>` : ''}`;
    return `<div class="eyebrow">Küsimus ${esc(entry.n)}${m.topic ? ' · ' + esc(m.topic) : ''}</div>
      <h2>${esc(title)}</h2>
      ${m.text && (!t || t.item || t.sub) ? `<p class="qtext">${esc(m.text)}</p>` : ''}
      ${m.filter ? `<p class="qtext"><em>${esc(m.filter)}</em></p>` : ''}`;
  }

  function sigTip(letters, grp){
    const L = letters.split(',').map(s => s.trim()).filter(Boolean);
    const names = L.map(l => { const c = grp.idx.map(i => COLS[i]).find(c => c.letter === l); return c ? c.label : null; }).filter(Boolean);
    return names;
  }

  function renderTable(entry, t){
    const grp = banners.find(b => b.name === S.banner);
    const cols = [totalIdx, ...grp.idx];
    const P = prep(t, cols);
    const showSig = isMain && S.sig && !P.rebased;
    if (S.ans == null || S.ans >= P.rows.length) S.ans = 0;
    const cell = (r, k) => {
      const v = r.v[k];
      const low = P.n[k] != null && P.n[k] < LOW_N;
      const names = showSig && k > 0 ? sigTip(r.s[k], grp) : [];
      const tip = `${esc(COLS[cols[k]].label)} · ${esc(r.l)}: <b>${fmt(v)}%</b> (n≈${P.n[k] ?? '–'})${names.length ? '<br>Statistiliselt oluliselt suurem kui: ' + names.map(esc).join(', ') : ''}${low ? '<br>Väike rühm – tulemus on suunda näitav.' : ''}`;
      return `<td class="cell${v > 55 ? ' dk' : ''}${low ? ' low' : ''}" style="--v:${v || 0}" data-tip="${tip}">${fmt(v)}${names.length ? `<span class="sig">${esc(names.length === 1 ? COLS[grp.idx.find(i => COLS[i].label === names[0])].letter : r.s[k].replace(/\s/g, ''))}</span>` : ''}</td>`;
    };
    const means = cols.map((_, k) => scaleMean(P.rows, k));
    const hasMean = means.some(m => m != null);
    res.innerHTML = header(entry, t) + `
      <p class="meta">Kaalutud osakaalud (%) veeru kohta · taustatunnus: <b>${esc(S.banner)}</b>${P.rebased ? ' · osakaal vastanutest („vastus puudub“ välja jäetud)' : ''}</p>
      <div class="xt-wrap"><table class="xt">
        <thead><tr class="grp"><th></th><th></th><th colspan="${grp.idx.length}">${esc(S.banner)}</th></tr>
        <tr><th>Vastus</th>${cols.map(i => `<th>${esc(COLS[i].label)}${i !== totalIdx && showSig ? ` <span class="muted" style="font-weight:400;font-size:.75rem">(${esc(COLS[i].letter)})</span>` : ''}</th>`).join('')}</tr></thead>
        <tbody>${P.rows.map((r, j) => `<tr data-j="${j}" class="${j === S.ans ? 'sel' : ''}${r.derived ? ' derived' : ''}"><td>${r.derived ? '<em>' + esc(r.l) + '</em>' : esc(r.l)}</td>${cols.map((_, k) => cell(r, k)).join('')}</tr>`).join('')}
        ${hasMean ? `<tr class="mean"><td>Keskmine (skaala 1–10)</td>${means.map(m => `<td>${m == null ? '–' : fmt(m, 1)}</td>`).join('')}</tr>` : ''}
        <tr class="base"><td>Vastajaid (n${P.rebased ? ', ligikaudne' : ''})</td>${P.n.map(n => `<td>${n ?? '–'}</td>`).join('')}</tr></tbody>
      </table></div>
      <div class="toolbar"><button class="btn" id="csv">Laadi alla CSV</button><button class="btn" id="copy">Kopeeri link</button><button class="btn" id="view">${S.view === 'stack' ? 'Näita valitud vastust' : 'Näita kogu jaotust'}</button></div>
      <div class="chart-box"><h3 id="ch-title"></h3><p class="hint" id="ch-hint"></p><div id="chart"></div></div>
      <p class="explain">${showSig ? 'Ülaindeksis olev täht tähistab veergu, millest antud väärtus on statistiliselt oluliselt suurem (95% usaldusnivoo, sama taustatunnuse piires). ' : (isMain && S.sig && P.rebased ? 'Osakaalud on arvutatud vastanutest, seetõttu olulisuse tähiseid ei kuvata. ' : '')}Kaldkirjas väärtused: rühmas alla ${LOW_N} vastaja, tulemus on suunda näitav. Allikas: ${esc(YEAR_NOTE[S.year])}${isMain ? '' : ' Varasemate aastate küsimuste sõnastus ja vastusevariandid erinevad 2026. aasta omadest.'}</p>`;

    res.querySelectorAll('tbody tr[data-j]').forEach(tr => tr.onclick = () => { S.ans = +tr.dataset.j; S.view = 'one'; renderTable(entry, t); });
    document.getElementById('csv').onclick = () => csv([['Vastus', ...cols.map(i => COLS[i].label)], ...P.rows.map(r => [r.l, ...r.v]), ['n', ...P.n]], t.id);
    document.getElementById('copy').onclick = e => { navigator.clipboard?.writeText(location.href); e.target.textContent = 'Link kopeeritud'; };
    document.getElementById('view').onclick = () => { S.view = S.view === 'stack' ? 'one' : 'stack'; renderTable(entry, t); };
    const el = document.getElementById('chart');
    if (S.view === 'stack') {
      const base = P.rows.filter(r => !r.derived); const subs = base.filter(r => !r.na);
      const ramp = rampColors(subs.length);
      let si = 0;
      const series = base.map(r => r.na ? {name: r.l, color: '#a9a69e', na: true} : {name: r.l, color: ramp[si], light: si++ < subs.length / 2});
      document.getElementById('ch-title').textContent = 'Kogu jaotus rühmade lõikes';
      document.getElementById('ch-hint').textContent = 'Viirutatud osad: „raske öelda“ / „ei oska öelda“ jms.';
      UIC.stacked(el, {series, rows: cols.map((i, k) => ({label: COLS[i].label + (P.n[k] < LOW_N ? ' (n<30)' : ''), values: base.map(r => r.v[k])}))});
    } else {
      const r = P.rows[S.ans];
      document.getElementById('ch-title').textContent = r.l;
      document.getElementById('ch-hint').textContent = 'Vali tabelist rida, et vahetada graafikul näidatavat vastust.';
      const mx = Math.max(...r.v.filter(v => v != null));
      UIC.hbars(el, {max: Math.max(10, Math.ceil(mx / 10) * 10), rows: cols.map((i, k) => ({label: COLS[i].label + (P.n[k] < LOW_N ? ' (n<30)' : ''), value: r.v[k], hl: k === 0, tip: 'n≈' + P.n[k]}))});
    }
  }

  function renderSummary(entry){
    const ts = entry.tables;
    const grp = banners.find(b => b.name === S.banner);
    const cols = [totalIdx, ...grp.idx];
    const preps = ts.map(t => prep(t, cols));
    const answers = preps[0].rows.map(r => r.l);
    if (S.summaryAns == null || S.summaryAns >= answers.length) { const d = preps[0].rows.findIndex(r => r.derived); S.summaryAns = d >= 0 ? d : 0; }
    const al = answers[S.summaryAns];
    const rows = ts.map((t, j) => { const r = preps[j].rows.find(r => r.l === al); return {l: t.item || t.sub || t.id, v: r ? r.v : cols.map(() => null), n: preps[j].n}; });
    res.innerHTML = header(entry, null) + `
      <div class="field" style="max-width:420px;margin-top:14px"><label for="sumAns">Näita vastust</label><select id="sumAns">${answers.map((a, i) => `<option value="${i}"${i === S.summaryAns ? ' selected' : ''}>${esc(a)}</option>`).join('')}</select></div>
      <p class="meta">Vastuse „${esc(al)}“ osakaal (%) väidete ja rühmade kaupa · taustatunnus: <b>${esc(S.banner)}</b></p>
      <div class="xt-wrap"><table class="xt"><thead><tr class="grp"><th></th><th></th><th colspan="${grp.idx.length}">${esc(S.banner)}</th></tr>
      <tr><th>Väide</th>${cols.map(i => `<th>${esc(COLS[i].label)}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r, j) => `<tr data-j="${j}"><td>${esc(r.l)}</td>${r.v.map((v, k) => `<td class="cell${v > 55 ? ' dk' : ''}${r.n[k] < LOW_N ? ' low' : ''}" style="--v:${v || 0}" data-tip="${esc(r.l)} · ${esc(COLS[cols[k]].label)}: <b>${fmt(v)}%</b>">${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <div class="toolbar"><button class="btn" id="csv">Laadi alla CSV</button><button class="btn" id="copy">Kopeeri link</button></div>
      <div class="chart-box"><h3>${esc(al)} – kõik vastajad</h3><p class="hint">Klõpsa tabelis väitel, et näha seda üksikasjalikult.</p><div id="chart"></div></div>`;
    document.getElementById('sumAns').onchange = e => { S.summaryAns = +e.target.value; renderSummary(entry); };
    res.querySelectorAll('tbody tr[data-j]').forEach(tr => tr.onclick = () => { S.item = +tr.dataset.j; S.ans = S.summaryAns; update(); });
    document.getElementById('csv').onclick = () => csv([['Väide', ...cols.map(i => COLS[i].label)], ...rows.map(r => [r.l, ...r.v])], entry.code + '_' + al);
    document.getElementById('copy').onclick = e => { navigator.clipboard?.writeText(location.href); e.target.textContent = 'Link kopeeritud'; };
    const sorted = rows.map(r => ({label: r.l, value: r.v[0]})).sort((a, b) => b.value - a.value);
    const mx = Math.max(...sorted.map(r => r.value || 0));
    UIC.hbars(document.getElementById('chart'), {rows: sorted, max: Math.max(10, Math.ceil(mx / 10) * 10)});
  }

  function rampColors(k){
    const a = [201, 220, 230], b = [31, 74, 102];
    return Array.from({length: k}, (_, i) => { const t = k === 1 ? 1 : i / (k - 1); return `rgb(${a.map((x, j) => Math.round(x + (b[j] - x) * t)).join(',')})`; });
  }

  function csv(rows, name){
    const txt = '﻿' + rows.map(r => r.map(v => typeof v === 'number' ? v.toFixed(1).replace('.', ',') : `"${String(v ?? '').replace(/"/g, '""')}"`).join(';')).join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([txt], {type: 'text/csv;charset=utf-8'}));
    a.download = `${S.year === '2026' ? 'UI' : 'EUU'}${S.year}_${name.replace(/[^\wõäöüšž-]+/gi, '_')}_${S.banner}.csv`; a.click();
  }

  const res0 = parseHash();
  UIC.ensureTip();
  const startYear = YEARS.includes(res0.y) ? res0.y : '2026';
  loadYear(startYear, () => { S.year = startYear; useYear(startYear); firstEntry(); applyHash(res0); if (res0.k && byCode.get(S.code).length > 1) S.item = -1; update(); });
  addEventListener('hashchange', () => { const o = parseHash(); const y = YEARS.includes(o.y) ? o.y : '2026'; if (y !== S.year) switchYear(y, o); else { applyHash(o); update(); } });
})();
