(function(){
  const {esc} = UIC;
  const QN = window.UI_QUESTIONNAIRE.filter(q => q.n !== '–');
  const T = window.UI_TABLES.tables;
  const codeLink = code => {
    const ts = T.filter(t => t.code === code); if (!ts.length) return null;
    return {href: 'risttabelid.html#' + encodeURIComponent(ts.length > 1 ? code : ts[0].id.replace(/ /g, '-')), label: ts[0].sub || null};
  };
  const kindLabel = {single: 'Üks vastus', multi: 'Võib valida mitu', matrix: 'Tabelküsimus', scale: 'Skaala 1–10', open: 'Avatud küsimus'};

  function render(q){
    let body = '';
    if (q.filter) body += `<p class="filter">${esc(q.filter)}</p>`;
    if ((q.kind === 'single' || q.kind === 'multi') && q.options) {
      body += `<ul class="opts">${q.options.map((o, i) => `<li><span>${esc(o)}</span>${q.routing && q.routing[i] ? `<span class="route">${esc(q.routing[i])}</span>` : ''}</li>`).join('')}</ul>`;
    }
    if ((q.kind === 'matrix' || q.kind === 'scale') && q.items) {
      if (q.options && q.options.length) {
        body += `<div class="mx"><table><thead><tr><th></th>${q.options.map((o, i) => `<th>${esc(q.kind === 'scale' && q.scale ? (i === 0 ? '1 · ' + q.scale[0] : i === 9 ? '10 · ' + q.scale[1] : o) : o)}</th>`).join('')}</tr></thead><tbody>${
          q.items.map(it => `<tr><td>${esc(it)}</td>${q.options.map(() => '<td class="o"></td>').join('')}</tr>`).join('')}</tbody></table></div>`;
      } else body += `<ul class="opts">${q.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul>`;
    }
    if (q.sub) body += `<p class="open" style="border:0">${esc(q.sub)}</p>`;
    if (q.kind === 'open') body += `<div class="open">Vaba vastus</div>`;
    else if (q.open) body += `<div class="open">${esc(q.open)}: …</div>`;
    const links = (q.codes || []).map(codeLink).filter(Boolean);
    body += `<div class="links"><span class="tag">${esc(kindLabel[q.kind] || '')}</span>${links.map(l => `<a class="btn" href="${l.href}">${links.length > 1 && l.label ? 'Tulemused: ' + esc(l.label) : 'Vaata tulemusi risttabelis →'}</a>`).join('')}${!links.length && q.kind === 'open' ? '<span class="tag">Avatud vastused – kokkuvõte raportis</span>' : ''}</div>`;
    return `<article class="qn ${q.kind}" id="k${esc(q.n)}" data-s="${esc([q.text, ...(q.items || []), ...(q.options || [])].join(' ').toLowerCase())}">
      <header><span class="n">${esc(q.n)}</span><h3>${esc(q.text)}</h3></header>${body}</article>`;
  }
  document.getElementById('qn-list').innerHTML = QN.map(render).join('') + '<p class="muted" style="text-align:center;margin:40px 0">Suur aitäh osalemise eest!</p>';

  let topic = null, toc = '';
  QN.forEach(q => { if (q.topic !== topic) { topic = q.topic; toc += `<div class="grp">${esc(topic)}</div>`; } toc += `<a href="#k${esc(q.n)}">${esc(q.n)}. ${esc(q.short)}</a>`; });
  document.getElementById('qn-toc').innerHTML = toc;

  document.getElementById('qn-search').addEventListener('input', e => {
    const f = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.qn').forEach(a => a.hidden = f && !a.dataset.s.includes(f));
  });
})();
