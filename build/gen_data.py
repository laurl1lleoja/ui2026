import sys, json, re
sys.path.insert(0,'/tmp/build')
from questionnaire import Q, EXTRA
d=json.load(open(sys.argv[1])); out=sys.argv[2]
cols=d['columns']
keep_groups={'':'Kokku','sugu- mees/naine':'Sugu','vanusegrupp 2':'Vanus','Rahvus':'Rahvus','Haridustase':'Haridus','sissetulek2':'Sissetulek leibkonnaliikme kohta'}
idx=[i for i,c in enumerate(cols) if c['group'] in keep_groups and not (c['group']=='Haridustase' and c['label']=='Vastus puudub') and not (c['group']=='sugu- mees/naine' and c['label']=='Muu')]
banners=[]
for i in idx:
    c=cols[i]; g=keep_groups[c['group']]
    if not banners or banners[-1]['name']!=g: banners.append(dict(name=g,cols=[]))
    banners[-1]['cols'].append(len([1 for b in banners for _ in b['cols']]))
outcols=[dict(label='Kokku' if cols[i]['label']=='Total' else cols[i]['label'].replace('‎',''),letter=cols[i]['letter'],group=keep_groups[cols[i]['group']]) for i in idx]
# map code -> question
code2q={}
for q in Q+EXTRA:
    for c in q['codes']: code2q[c]=q
tables=[]
for t in d['tables']:
    code=t['id'].split()[0]
    if code in ('Q5_16_2','sugu2','vanuse_gr2','sissetulek2'): continue
    q=code2q.get(code)
    if not q: print('NO Q',t['id'],file=sys.stderr); continue
    m=re.search(r' r(\d+)$',t['id']); r=int(m.group(1)) if m else None
    item=None
    if r:
        item=(t['item'] or t['question'] or '').strip()
        if code=='Q16_3_0': item=f"Varasem kogudus ({r}. vastus)"
        if code=='Q1' and r<=5: item=['Töö','Perekond','Sõbrad ja tuttavad','Poliitika','Kirik'][r-1]
    title={'Q16_1':'Praegune kogudus/usuliikumine (liikmed)','Q16_1_2':'Õigeusu kirik (liikmed)','Q16_2':'Kogudus, mille osana end tuntakse','Q16_2_2':'Õigeusu kirik, mille osana end tuntakse','Q16_3':'Kas on varem kuulunud mõnda teise kogudusse','Q16_3_0':'Varasem kogudus','Q23':'Kas kirik peaks mängima rolli (mõnes valdkonnas)','Q24':'Kuidas kirik rolliga hakkama saab','sugu':'Sugu','rahvus':'Rahvus','keel':'Kodune keel','haridus':'Haridustase'}.get(code)
    ans=[]
    for a in t['answers']:
        ans.append(dict(l=a['label'],v=[a['values'][i] for i in idx],s=[a['sig'][i] for i in idx]))
    tables.append(dict(id=t['id'],code=code,q=q['n'],item=item,sub=title,base=[t['base'][i] for i in idx],a=ans))
# multi flag: answers Jah/Ei
for t in tables:
    labs=[a['l'] for a in t['a'] if a['l']!='Vastus puudub']
    t['multi']= labs in (['Jah','Ei'],['Ei','Jah'])
qmeta=[{k:v for k,v in q.items()} for q in Q]+[dict(e) for e in EXTRA]
with open(out+'/tabelid.js','w') as f:
    f.write('// Genereeritud failist Sagedustabelid_v2.xlsx (UI2026, kaalutud). Ära muuda käsitsi: vt build/gen_data.py\n')
    f.write('window.UI_TABLES='+json.dumps(dict(columns=outcols,tables=tables),ensure_ascii=False,separators=(',',':'))+';\n')
with open(out+'/kusimustik.js','w') as f:
    f.write('// Küsimustik 2026 (EE), struktureeritud. Allikas: Küsimustik 2026 EE.pdf\n')
    f.write('window.UI_QUESTIONNAIRE='+json.dumps(qmeta,ensure_ascii=False,indent=1)+';\n')
print(len(tables),'tables',len(outcols),'cols',file=sys.stderr)
