(function(){
  const {esc} = UIC;
  const root = document.getElementById('story');
  root.innerHTML = UI_STORY.map((s, i) => {
    const wide = ['table','cards','takeaways'].includes(s.chart.type) || s.chart.rows?.length > 9;
    const text = `<div class="eyebrow">${esc(s.eyebrow)}</div><h2>${esc(s.title)}</h2><p class="lead">${esc(s.lead)}</p>${s.statement ? `<p class="statement">${esc(s.statement)}</p>` : ''}`;
    const foot = `${s.note ? `<p class="note">${esc(s.note)}</p>` : ''}<p class="source">${esc(s.source || '')}</p>${s.xt ? `<a class="xt-link" href="risttabelid.html#${esc(s.xt)}">Vaata risttabelit taustatunnuste lõikes →</a>` : ''}`;
    const charts = `<div class="chart" data-i="${i}"></div>${s.chart2 ? `<div class="chart" data-i="${i}" data-two="1" style="margin-top:28px"></div>` : ''}`;
    return `<section class="section${s.dark ? ' dark' : ''}" id="${esc(s.id)}" data-title="${esc(s.title)}"><div class="wrap">${
      wide ? `${text}<div style="margin-top:30px">${charts}</div>${foot}` : `<div class="grid-2"><div>${text}${foot}</div><div>${charts}</div></div>`
    }</div></section>`;
  }).join('');

  root.querySelectorAll('.chart').forEach(el => {
    const s = UI_STORY[+el.dataset.i]; const c = el.dataset.two ? s.chart2 : s.chart;
    if (c.type === 'takeaways') {
      el.innerHTML = `<div class="takeaways">${c.items.map((t, k) => `<div><b>0${k + 1}</b><h3>${esc(t[0])}</h3><p>${esc(t[1])}</p></div>`).join('')}</div>`;
    } else if (c.type === 'cards') UIC.cards(el, c.items);
    else UIC[c.type](el, c);
  });

  // Sügavlink: sektsioonid luuakse skriptiga, seega keri räsi järgi uuesti
  if (location.hash) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) t.scrollIntoView(); }

  // Navigeerimine
  const sections = [...document.querySelectorAll('.story .section')];
  let current = 0;
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) current = sections.indexOf(e.target); }), {threshold: .5});
  sections.forEach(s => io.observe(s));
  const go = d => { current = Math.max(0, Math.min(sections.length - 1, current + d)); sections[current].scrollIntoView({behavior: 'smooth'}); };
  document.getElementById('nextBtn').onclick = () => go(1);
  document.getElementById('prevBtn').onclick = () => go(-1);
  const toc = document.getElementById('toc');
  document.getElementById('tocList').innerHTML = sections.map(s => `<li><a href="#${s.id}">${esc(s.dataset.title)}</a></li>`).join('');
  toc.addEventListener('click', e => { if (e.target.tagName === 'A') toc.close(); });
  document.getElementById('tocBtn').onclick = () => toc.showModal();
  document.getElementById('tocClose').onclick = () => toc.close();
  addEventListener('keydown', e => {
    if (toc.open || /INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) return;
    if (['ArrowDown','PageDown'].includes(e.key)) { e.preventDefault(); go(1); }
    if (['ArrowUp','PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
  });
  const bar = document.getElementById('progress');
  const upd = () => { const m = document.documentElement.scrollHeight - innerHeight; bar.style.width = (m > 0 ? scrollY / m * 100 : 0) + '%'; };
  addEventListener('scroll', upd, {passive: true}); upd();
})();
