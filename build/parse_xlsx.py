import sys, json, openpyxl
wb=openpyxl.load_workbook(sys.argv[1],data_only=True)
def rows(name): return [list(r) for r in wb[name].iter_rows(values_only=True)]
D=rows('Detailed'); C=rows('Compact')
def s(v): return '' if v is None else str(v).strip()
blocks=[]
for b,r in enumerate(D):
    if s(r[1])!='BASE': continue
    groups=D[b-3]; labels=D[b-2]; letters=D[b-1]
    # columns
    cols=[]; g=''
    for j in range(2,len(labels)):
        if s(groups[j]): g=s(groups[j])
        if s(labels[j]): cols.append(dict(j=j,group=g if j>2 else '',label=s(labels[j]),letter=s(letters[j])))
    head=[]; k=b-4
    while k>=0:
        t=s(D[k][1])
        if t.startswith('Condition') or t.startswith('Question type') or t.startswith('Sign.level'): break
        if t: head.insert(0,t)
        k-=1
    meta={}
    k=b+1; answers=[]
    while k<len(D):
        t=s(D[k][1])
        if t=='TOTAL' or t.startswith('Sign.level'): break
        if t and t not in('BASE',):
            vals=[D[k][c['j']] for c in cols]
            sig=[s(D[k+1][c['j']]) if k+1<len(D) and s(D[k+1][1])=='' else '' for c in cols]
            answers.append(dict(label=t,values=[None if v in(None,'') else round(float(v)*100,1) for v in vals],sig=sig))
        k+=1
    while k<len(D) and k<b+400:
        t=s(D[k][1])
        if t.startswith('Question type'): meta['type']=t.split(':',1)[1].strip()
        if t.startswith('Condition'): meta['condition']=t.split(':',1)[1].strip(); break
        k+=1
    base=[D[b][c['j']] for c in cols]
    blocks.append(dict(head=head,cols=cols,base=base,answers=answers,**meta))
# compact question texts
cq=[]
for b,r in enumerate(C):
    if s(r[1])!='Vastajaid kokku': continue
    head=[]; k=b-3
    while k>=0:
        t=s(C[k][1])
        if t=='TOTAL': break
        if t: head.insert(0,t)
        k-=1
    cq.append(head)
print(len(blocks),len(cq),file=sys.stderr)
colsets=set(json.dumps([(c['group'],c['label']) for c in bl['cols']]) for bl in blocks)
print('colsets',len(colsets),file=sys.stderr)
out=[]
for i,bl in enumerate(blocks):
    h=bl['head']; ch=cq[i] if i<len(cq) else []
    qid=h[0].strip()
    code=qid.split()[0]
    item=None
    if len(h)>=3: item=h[2]
    elif len(h)==2: item=None; 
    title=h[-1] if len(h)>=2 else qid
    question = ch[0] if ch else title
    if len(ch)>=2: item=ch[1]
    elif len(h)>=3: item=h[2]
    out.append(dict(id=qid,code=code,question=question,item=item,type=bl.get('type'),condition=bl.get('condition'),base=bl['base'],answers=bl['answers'],cols_key=json.dumps([(c['group'],c['label']) for c in bl['cols']])))
cols0=[dict(group=c['group'],label=c['label'],letter=c['letter']) for c in blocks[0]['cols']]
json.dump(dict(columns=cols0,tables=out),open(sys.argv[2],'w'),ensure_ascii=False)
