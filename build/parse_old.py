"""Teisendab EUU 1995–2020 risttabelite failid ühtsesse JSON-vormingusse.
Kasutus: python3 parse_old.py <aasta> <fail> <väljund.json>"""
import sys, json, re
year, f, out = sys.argv[1], sys.argv[2], sys.argv[3]

def load():
    if f.endswith('.xls'):
        import xlrd
        wb = xlrd.open_workbook(f)
        return {sh.name: [sh.row_values(r) for r in range(sh.nrows)] for sh in wb.sheets()}
    import openpyxl
    wb = openpyxl.load_workbook(f, read_only=True, data_only=True)
    return {ws.title: [list(r) for r in ws.iter_rows(values_only=True)] for ws in wb.worksheets}

def s(v):
    if v is None: return ''
    if isinstance(v, float): return repr(v)
    return str(v).replace('‎', '').strip()
def num(v):
    try: return float(v)
    except (TypeError, ValueError): return 0.0
def g(r, j): return r[j] if j < len(r) else None

SHEETS = {
 '1995': [('Sugu','Sugu'),('Vanus','Vanus'),('Haridus','Haridus'),('Keel','Ankeedi keel'),('Linn maa','Elukoht'),('Q32','Usklikkus')],
 '2000': [('Sugu','Sugu'),('Vanus','Vanus'),('Haridus','Haridus'),('Keel','Ankeedi keel'),('Linn maa','Elukoht'),('Q32','Usklikkus')],
 # 2005 failis on leht „Linn maa“ 1995. aasta andmetega (n=1506), seetõttu see välja jäetud
 '2005': [('Sugu','Sugu'),('Vanus','Vanus'),('Haridus','Haridus'),('Keel','Ankeedi keel'),('Q32','Usklikkus')],
 '2015': [('SUGU','Sugu'),('VANUS','Vanus'),('HARIDUS','Haridus'),('RAHVUS','Rahvus'),('KODUNE KEEL','Kodune keel'),('LINN-MAA','Elukoht')],
}
FOOT = re.compile(r'^(elust, usust ja usuelust|saar poll)', re.I)

def parse_sheet(rows):
    """Plokid kujul: pealkiri / KÕIK VASTAJAD / sildid / Arv-% / andmed / VASTAJAID KOKKU"""
    blocks = []
    i = 0
    while i < len(rows):
        r = rows[i]
        if s(g(r, 2)).upper().replace('Õ', 'Õ') in ('KÕIK VASTAJAD', 'KõIK VASTAJAD'.upper()) or s(g(r, 2)).lower() == 'kõik vastajad':
            k = i - 1
            while k >= 0 and not s(g(rows[k], 0)): k -= 1
            title = s(g(rows[k], 0))
            labels = rows[i + 1]
            cols = [j for j in range(2, len(labels)) if s(labels[j]) and s(labels[j]) not in ('%',)]
            names = ['Kokku'] + [s(labels[j]) for j in cols[1:]]
            items = []; cur = None
            k = i + 3
            while k < len(rows):
                rr = rows[k]; c0, c1 = s(g(rr, 0)), s(g(rr, 1))
                if c0.upper().startswith('VASTAJAID KOKKU'):
                    if cur: cur['base'] = [num(g(rr, j)) for j in cols]; items.append(cur); cur = None
                    k += 1; continue
                if c1 and c1 != 'None':
                    if c0 and c0 != 'None' and (cur is None or cur['a']):
                        if cur: items.append(cur)
                        cur = {'item': c0, 'a': [], 'base': None}
                    elif cur is None:
                        cur = {'item': None, 'a': [], 'base': None}
                    cur['a'].append({'l': c1, 'v': [num(g(rr, j + 1)) * 100 for j in cols], 'n': [num(g(rr, j)) for j in cols]})
                    k += 1; continue
                if c0 and c0 != 'None' and not FOOT.match(c0) and not c0.upper().startswith('VASTAJAID'):
                    break  # järgmine pealkiri
                if s(g(rr, 2)).lower() == 'kõik vastajad': break
                k += 1
            if cur: items.append(cur)
            last = next((it['base'] for it in reversed(items) if it['base']), None)
            for it in items:
                if not it['base']: it['base'] = last
            if len(items) == 1: items[0]['item'] = None
            blocks.append({'title': title, 'names': names, 'items': items})
            i = k
            continue
        i += 1
    return blocks

def parse_2020(rows):
    groups = rows[0]; labels = rows[1]
    cols = [j for j in range(2, len(labels)) if s(g(labels, j))]
    colmeta = []; grp = 'Kokku'
    for j in cols:
        if s(g(groups, j)): grp = s(groups[j])
        grp = {'Vanusegrupp': 'Vanus', 'Haridustase': 'Haridus'}.get(grp, grp)
        colmeta.append({'group': 'Kokku' if j == 2 else grp, 'label': 'Kokku' if j == 2 else s(labels[j])})
    blocks = []; title = None; cur = None
    for rr in rows[3:]:
        c0, c1 = s(g(rr, 0)), s(g(rr, 1))
        if c0 and not c1 and not any(s(g(rr, j)) for j in cols):
            title = c0; blocks.append({'title': title, 'items': []}); cur = None; continue
        if not blocks: continue
        if c1.lower().startswith('vastajad kokku'):
            if cur: cur['base'] = [num(g(rr, j)) for j in cols]; blocks[-1]['items'].append(cur); cur = None
            continue
        if c1:
            if c0 and (cur is None or cur['a']):
                if cur: blocks[-1]['items'].append(cur)
                cur = {'item': c0, 'a': [], 'base': None}
            elif cur is None: cur = {'item': None, 'a': [], 'base': None}
            cur['a'].append({'l': c1, 'v': [num(g(rr, j + 1)) * 100 for j in cols]})
    return colmeta, blocks

def lab(l):
    l = re.sub(r'\s+', ' ', l).strip()
    return l.capitalize() if l.isupper() and len(l) > 3 else l

def tidy(title):
    return re.sub(r'\s+', ' ', title).strip()

data = load()
tables = []
if year == '2020':
    rows = data['risttabelid (kaalutud andmed)']
    columns, blocks = parse_2020(rows)
    for bi, b in enumerate(blocks):
        for ii, it in enumerate(b['items']):
            tables.append({'title': tidy(b['title']), 'item': it['item'], 'base': [round(x) for x in (it['base'] or [])], 'a': [{'l': lab(a['l']), 'v': [round(x, 1) for x in a['v']]} for a in it['a']]})
else:
    per = []
    for sheet, gname in SHEETS[year]:
        bl = parse_sheet(data[sheet])
        per.append((gname, bl))
    def keyed(bl):
        d = {}; seen = {}
        for b in bl:
            occ = seen.get(b['title'], 0); seen[b['title']] = occ + 1
            for ii, it in enumerate(b['items']): d[(b['title'], occ, ii)] = (b, it)
        return d
    maps = [(gname, keyed(bl), len(bl[0]['names']) - 1) for gname, bl in per]
    for gname, bl in per: print(year, gname, 'plokke', len(bl), file=sys.stderr)
    columns = [{'group': 'Kokku', 'label': 'Kokku'}]
    for gname, bl in per:
        columns += [{'group': gname, 'label': nm} for nm in bl[0]['names'][1:]]
    for key, (b, it) in maps[0][1].items():
        vals = {a['l']: [a['v'][0]] for a in it['a']}
        base = [it['base'][0] if it['base'] else 0]
        miss = []
        for gname, m, ncols in maps:
            if key in m:
                it2 = m[key][1]
                lab2 = {a['l']: a['v'][1:] for a in it2['a']}
                for l in vals: vals[l] += lab2.get(l, [None] * ncols)
                base += (it2['base'] or [0] * (ncols + 1))[1:]
            else:
                miss.append(gname)
                for l in vals: vals[l] += [None] * ncols
                base += [None] * ncols
        if miss: print('WARN', year, key[0][:40], 'puudub:', miss, file=sys.stderr)
        title = tidy(b['title']); item = tidy(it['item']) if it['item'] else None
        if item and (item == title or title.split('. ', 1)[-1][:30] == item[:30]): item = None
        tables.append({'title': title, 'item': item, 'base': [None if x is None else round(x) for x in base],
                       'a': [{'l': lab(l), 'v': [None if x is None else round(x, 1) for x in v]} for l, v in vals.items()]})
json.dump({'year': year, 'columns': columns, 'tables': tables}, open(out, 'w'), ensure_ascii=False)
print(year, len(tables), 'tables', len(columns), 'cols', file=sys.stderr)
