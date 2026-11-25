/* Tulemuste loo sisu. Allikas: esitlus „Usk muutuvas Eestis“ (UI2026). Iga plokk on üks vaade.
   Sisu uuendamiseks muuda siin numbreid ja tekste – lehte ennast ei pea muutma. */
(function(){
const C = {blue:'#315c78', amber:'#d08a2c', coral:'#c85d4b', sage:'#6d8c75',
  neg:'#b4503c', neg2:'#e0a493', pos2:'#93b9cd', pos:'#2c5d7e', na:'#a9a69e', rest:'#ddd6c8',
  s1:'#a9c7d6', s2:'#6f9bb5', s3:'#2c5d7e', f1:'#1f4a66', f2:'#3f6f8f', f3:'#6f9bb5', f4:'#a9c7d6'};
const NA = n => ({name:n, color:C.na, na:true});
window.UI_STORY = [
 {id:'kontekst', eyebrow:'Taust · Maailm 2070', title:'Usuline maastik muutub kogu maailmas',
  lead:'Pew Research Centeri projektsiooni järgi on 2070. aastal maailma suurimad usurühmad moslemid (36%), kristlased (29%) ja usuliselt mitteseotud (17%). Eestis prognoositakse kristlaste ja usuliselt mitteseotute osakaalu võrdsustumist.',
  statement:'Kasv ei ole ainult usuvahetuse küsimus: määravad ka vanus, sündimus, suremus ja ränne.',
  chart:{type:'stacked', series:[{name:'Kristlased',color:C.blue},{name:'Usuliselt mitteseotud',color:C.amber},{name:'Moslemid',color:C.coral},{name:'Muud usundid',color:C.sage}],
   rows:[{label:'Eesti 2020',values:[52.6,43.6,0.6,3.2]},{label:'Eesti 2070',values:[47.1,47.2,2.3,3.4]}]},
  note:'Pew’ kategooria „kristlased“ põhineb demograafilisel usulisel kuuluvusel, mitte kitsalt koguduse liikmelisusel ega isiklikul usul.',
  source:'Allikas: Pew Research Center, 2026; Estonia country profile'},

 {id:'uuring', eyebrow:'Uuringust', title:'Eesti elanikkonna usuline identiteet 2026', dark:true,
  lead:'Uuring ühendab kvantitatiivse elanikkonnaküsitluse ja kvalitatiivsed fookusgrupid. See jätkab 1995. aastal alanud uuringusarja ning võimaldab jälgida muutusi kolme aastakümne vältel.',
  chart:{type:'cards', items:[{value:'1 550',label:'vastajat, 18+ Eesti elanikud'},{value:'15,5%',label:'vastamismäär 10 000-liikmelisest küsitluspaneelist'},{value:'13',label:'fookusgruppi, kokku 80 osalejat'},{value:'märts–mai',label:'andmete kogumise periood 2026'},{value:'CAWI + post',label:'andmekogumise viis'},{value:'kaalutud',label:'sugu, vanus, rahvus, haridus'}]},
  source:'Allikas: UI2026'},

 {id:'eluvaldkonnad', eyebrow:'01 · Väärtused', title:'Perekond on oluline peaaegu kõigile, usk kolmandikule',
  lead:'Perekond ja vaba aeg on olulised peaaegu kõigile vastajatele. Usku peab oluliseks või väga oluliseks kolmandik, kirikut neljandik.',
  chart:{type:'stacked', series:[{name:'Väga oluline',color:C.pos},{name:'Oluline',color:C.pos2,light:true},NA('Raske öelda'),{name:'Pole oluline',color:C.rest,light:true}],
   rows:[['Perekond',80.5,14.2,1.1],['Vaba aeg',53.6,39.2,1.7],['Töö',44.3,40.5,3.1],['Sõbrad ja tuttavad',36.5,48.3,1.6],['Poliitika',8.5,44.9,3.5],['Usk',12.3,21.1,4.1],['Kirik',7.6,17.0,3.7]].map(r=>({label:r[0],values:[r[1],r[2],r[3],+(100-r[1]-r[2]-r[3]).toFixed(1)]}))},
  source:'Allikas: UI2026; kaalutud, n=1550', xt:'Q1-r7'},

 {id:'identiteet-keel', eyebrow:'02 · Identiteet ja keel', title:'37% määratleb end kristlasena – keelerühmade vahel on suur lõhe',
  lead:'Venekeelsetest vastajatest peab end kristlaseks 63%, eestikeelsetest 27%. Eestikeelsete seas domineerib religiooni mittejärgimine.',
  chart:{type:'stacked', series:[{name:'Kristlane',color:C.blue},{name:'Muu usk/religioon',color:C.coral},{name:'Ei järgi religiooni',color:C.amber},NA('Ei soovinud vastata')],
   rows:[{label:'Eestikeelsed',values:[27,3,66,5]},{label:'Venekeelsed',values:[63,4,27,6]}]},
  source:'Allikas: UI2026', xt:'Q9'},

 {id:'kristlase-profiil', eyebrow:'03 · Kes on kristlased', title:'Keskmine „kristlane“ on sagedamini vanem naine, kes kogudusse ei kuulu', dark:true,
  lead:'58% kristlastest ei kuulu kogudusse ega tunne end selle osana. Usklikuks inimeseks peab end vaid iga kolmas.',
  chart:{type:'table', head:['','Kristlased','Teised'], rows:[{sub:'Kes nad on'},['Naised','56%','49%'],['61-aastased ja vanemad','44%','25%'],['Venekeelsed','48%','17%'],['Kiriklikult laulatatud','14%','1%'],{sub:'Usk ja praktika'},['Kuulub kogudusse või tunneb end selle osana','43%','5%'],['Usub Jumalasse','64%','8%'],['Palvetab vähemalt mõnikord','68%','15%'],['Jumalateenistusel vähemalt kord aastas','53%','12%'],['Loeb Piiblit vähemalt aeg-ajalt','33%','5%'],['Peab end usklikuks inimeseks','35%','4%'],['Vaimne, kuid mitte religioosne','30%','20%']]},
  source:'Allikas: UI2026; kaalutud. Kristlased n=513, teised n=1037. Kõik erinevused statistiliselt olulised (p < 0,05).'},

 {id:'maailmavaated', eyebrow:'04 · Maailmavaated', title:'Enesemääratlused ei mahu lihtsasse usklik–mitteusklik jaotusse',
  lead:'„Vaimne, kuid mitte religioosne“ on suurim enesemääratlus. Venekeelsed peavad end kolm korda sagedamini usklikuks: 29% vs 9%.',
  chart:{type:'grouped', series:[{name:'Eestikeelsed (n=1215)',color:C.blue},{name:'Venekeelsed (n=290)',color:C.amber}],
   rows:[['Vaimne, kuid mitte religioosne',23.8,23.7],['Mittereligioosne *',20.8,14.4],['Agnostik',15.5,19.0],['Usklik inimene *',9.4,28.8],['Ateist ehk Jumala eitaja *',12.1,6.3],['Ükskõikne',8.9,6.0],['Otsija',6.9,5.0],['Religioonist eemaldunud *',1.7,8.5],['Mitte keegi neist *',16.9,7.9]].map(r=>({label:r[0],values:[r[1],r[2]]})), max:40},
  note:'Vastaja võis valida mitu; % kõigist vastajatest. Keel = küsitluse täitmise keel. * erinevus eesti- ja venekeelsete vahel statistiliselt oluline (p < 0,05).',
  source:'Allikas: UI2026; kaalutud', xt:'Q7-r1'},

 {id:'jumal', eyebrow:'05 · Usk Jumalasse', title:'29% usub Jumala olemasolusse – vähem kui 2020. aastal',
  lead:'Võrreldes 2020. aastaga on Jumalasse uskujate osakaal vähenenud, samas kui „ei oska öelda“ osakaal on jätkuvalt kõrge. 21% on alati uskunud, 8% on jõudnud usuni hiljem, 7% on usu kaotanud ja 37% pole kunagi uskunud.',
  chart:{type:'stacked', series:[{name:'Usub Jumala olemasolu',color:C.blue},NA('Ei oska öelda'),{name:'Ei usu',color:C.coral}],
   rows:[{label:'2015',values:[38,10,52]},{label:'2020',values:[37,27,36]},{label:'2026',values:[29,27,44]}]},
  source:'Allikas: UI2015, EUU2020 ja UI2026', xt:'Q11'},

 {id:'mitteusk-keel', eyebrow:'06 · Mitteusk ja keel', title:'Jumalasse mitteuskumine kasvab mõlemas keelerühmas', dark:true,
  lead:'Eestikeelsete seas kasvas Jumalasse mitteuskujate osakaal 31 aastaga 27%-lt 51%-le. Venekeelsete seas toimus suurim hüpe pärast 2020. aastat.',
  chart:{type:'line', x:['1995','2010','2015','2020','2026'], yMax:60, series:[{name:'Eestikeelsed',color:'#efbd73',values:[27,39,40,46,51]},{name:'Venekeelsed',color:'#9cc6d8',values:[10,13,14,15,26]}]},
  source:'Allikas: UI uuringute aegrida'},

 {id:'kuuluvus', eyebrow:'07 · Kuuluvus', title:'Ametliku liikmelisuse kõrvale lisandus „osana tundmine“',
  lead:'Ametlikult kuulub kogudusse või usuliikumisse 11%. Veel 8% ei ole ametlik liige, ent tunneb end usukogukonna osana – see vastusevariant lisandus küsimustikku 2026. aastal.',
  chart:{type:'stacked', series:[{name:'Praegune liige',color:C.blue},{name:'Tunneb end osana',color:C.pos2,light:true},NA('Ei oska öelda / ei soovi vastata'),{name:'Ei kuulu',color:C.rest,light:true}],
   rows:[{label:'2015',values:[21,0,0,79]},{label:'2020',values:[22,0,4,74]},{label:'2026',values:[11,8,10,71]}]},
  source:'Allikas: UI2015, EUU2020 ja UI2026', xt:'Q15'},

 {id:'kuuluvus-usk', eyebrow:'08 · Kogukond ja usk', title:'Kogudusega seotud venekeelsetest usub Jumalasse üheksa kümnest',
  lead:'Liikmed või ennast usukogukonna osana tundvad venekeelsed vastajad: 2026. aastal usub Jumalasse 89%, 2020. aastal oli see näitaja praeguste koguduseliikmete seas 98%.',
  chart:{type:'stacked', series:[{name:'Usub Jumalasse',color:C.blue},{name:'Ei usu Jumalasse',color:C.coral},NA('Ei oska öelda')],
   rows:[{label:'2020',values:[97.5,0,2.5]},{label:'2026',values:[89.0,6.0,5.0]}]},
  note:'2020: praegused koguduseliikmed. 2026: ametlikud liikmed ja usukogukonda kuuluvust tundvad vastajad.',
  source:'Allikas: EUU2020 ja UI2026, kaalutud andmed'},

 {id:'konfessioon', eyebrow:'09 · Konfessioonid', title:'Venekeelsete õigeusklike seas on „osana tundmine“ sagedasem kui liikmelisus', dark:true,
  lead:'Eestikeelsete seas on keskne luteri taust. Venekeelsete seas domineerib õigeusk ning just mitteametlik kogukonnatunne.',
  chart:{type:'grouped', series:[{name:'Kuulub',color:'#efbd73'},{name:'Tunneb end osana',color:'#9cc6d8'}], max:12,
   rows:[['Eestikeelsed · luteri',6.6,2.2],['Eestikeelsed · õigeusu',1.2,1.3],['Eestikeelsed · muu kristlik',3.2,1.2],['Venekeelsed · õigeusu',3.7,10.7],['Venekeelsed · luteri',0,0],['Venekeelsed · muu kristlik',3.9,0.7]].map(r=>({label:r[0],values:[r[1],r[2]]}))},
  note:'% vastava keelerühma kõigist vastajatest.', source:'Allikas: UI2026', xt:'Q16_1'},

 {id:'ristimine', eyebrow:'10 · Ristimine ja leer', title:'Ristitute ja leeris käinute osakaal on püsinud stabiilne',
  lead:'Ristitud on 56% ja leeris käinud 16% täiskasvanutest – sisuliselt sama palju kui 2015. ja 2020. aastal.',
  chart:{type:'grouped', series:[{name:'2015',color:C.s1},{name:'2020',color:C.s2},{name:'2026',color:C.s3}], max:70,
   rows:[{label:'Ristitud',values:[57,57,55.6]},{label:'Leeris käinud',values:[14,18,16.1]}]},
  note:'Ei oska öelda: ristimine 2,7%, leer 7,6%. Leer hõlmab 2026 ka ristimiskooli/katehheesi. 2026: kõik vastajad 18+, vanuse ülempiirita.',
  source:'Allikas: UI2015, EUU2020 ja UI2026; 2026 kaalutud', xt:'Q17-r1'},

 {id:'uskumused', eyebrow:'11 · Uskumused', title:'Kaitseinglid, sõna jõud ja isiklik Jumalasuhe kõnetavad enim',
  lead:'Üldised vaimsed ja rahvausundilised uskumused on levinumad kui klassikalised kristlikud õpetusväited.',
  chart:{type:'stacked', series:[{name:'Nõustub',color:C.blue},NA('Raske öelda'),{name:'Ei nõustu',color:C.coral}],
   rows:[['Kaitseinglid',49,11,40],['Mõtte või sõna energia',48,11,41],['Isiklik suhe Jumalaga',47,22,31],['Saatus või ettemääratus',45,9,46],['Hinge elu pärast surma',42,21,37],['Ebaisikuline kõrgem vägi',41,14,45],['Elu kui juhuste jada',40,6,54],['Esivanemate hinged',39,16,45],['Reinkarnatsioon',33,19,48],['Jumala juhatus elus',31,14,55],['Eestpalvete jõud',31,17,52],['Isikuline Jumal',28,15,57],['Kaitsev talisman või ese',25,11,64],['Astroloogiline mõju',25,9,66],['Palvega tervenemine',22,10,68],['Jeesuse ristisurma lunastus',20,21,59]].map(r=>({label:r[0],values:[r[1],r[2],r[3]]}))},
  source:'Allikas: UI2026; kaalutud', xt:'Q5-r10'},

 {id:'taevas-porgu', eyebrow:'12 · Elu pärast surma', title:'Taevasse usutakse kõigis rühmades sagedamini kui põrgusse', dark:true,
  lead:'Küsiti neilt, kes nõustusid, et inimhinge eksistents jätkub pärast surma (n=669, 43% vastajatest).',
  chart:{type:'table', head:['Konfessioon','Paradiis: nõus','Raske öelda','Põrgu: nõus','Raske öelda'],
   rows:[['Katoliku (n=14) †','92%','8%','51%','8%'],['Muu kristlik (n=40)','87%','9%','72%','10%'],['Õigeusu (n=42)','65%','24%','58%','24%'],['Muu religioon (n=13) †','62%','11%','47%','20%'],['Luteri (n=69)','53%','33%','39%','32%'],['Ei kuulu kogudusse (n=491)','30%','30%','20%','31%'],['Kõik (n=669)','41%','27%','30%','28%']]},
  note:'Nõus = täiesti või pigem nõus. † n < 30, tulemused on suunda näitavad. Konfessioon = liikmesus või kogudus, mille osana end tuntakse.',
  source:'Allikas: UI2026; kaalutud', xt:'Q5_16_0-r1'},

 {id:'uleloomulik', eyebrow:'13 · Üleloomulikud kogemused', title:'Kolmandik on kogenud midagi mõistusega raskesti seletatavat',
  lead:'34% on vähemalt korra kogenud midagi üleloomulikku – sama palju kui 2020. aastal. Keelerühmade vahel olulist erinevust ei ole.',
  chart:{type:'stacked', series:[{name:'Jah, korduvalt',color:C.pos},{name:'Jah, mõnel korral',color:C.pos2,light:true},{name:'Ei',color:C.rest,light:true},NA('Ei oska öelda')],
   rows:[{label:'2020 (n=980)',values:[7,26,47,21]},{label:'2026 (n=1550)',values:[7,27,44,22]},{label:'2026 eestikeelsed',values:[6,28,45,21]},{label:'2026 muukeelsed',values:[10,26,41,24]}]},
  source:'Allikas: EUU2020 ja UI2026; kaalutud', xt:'Q6'},

 {id:'praktika', eyebrow:'14 · Religioosne praktika', title:'Praktika on identiteedist kitsam', dark:true,
  lead:'Regulaarselt palvetab 11% ja vähemalt kord kuus käib jumalateenistusel 7%. Väljaspool usutalitusi palvetab kokku umbes kolmandik elanikest.',
  chart:{type:'cards', items:[{value:'11%',label:'palvetab regulaarselt'},{value:'7%',label:'osaleb jumalateenistusel vähemalt kord kuus'},{value:'18%',label:'on kogenud vastust palvetele'}]},
  chart2:{type:'stacked', series:[{name:'Regulaarselt',color:'#efbd73',light:true},{name:'Vahetevahel',color:'#9cc6d8',light:true},{name:'Üldse mitte',color:'#55666b'},NA('Ei oska öelda')],
   rows:[{label:'2020*',values:[11.8,24.5,57.9,5.9]},{label:'2026',values:[11,24,66,0]}]},
  note:'*2020 suunaline võrdlus: 7-palline sagedusskaala; 2026 küsimuses „ei oska öelda“ varianti ei olnud. Palvetab üldse: 36,3% (2020) ja 34,2% (2026).',
  source:'Allikas: EUU2020 ja UI2026, kaalutud', xt:'Q19'},

 {id:'jumalateenistus', eyebrow:'15 · Jumalateenistus', title:'Muukeelsed käivad jumalateenistusel sagedamini',
  lead:'Viimase aasta jooksul osales jumalateenistusel vähemalt korra 34% muukeelsetest ja 24% eestikeelsetest vastajatest.',
  chart:{type:'stacked', series:[{name:'Iga nädal',color:C.f1},{name:'Kord-paar kuus',color:C.f2},{name:'3–4 korda aastas',color:C.f3},{name:'1–2 korda aastas',color:C.f4,light:true},{name:'Üldse mitte',color:C.rest,light:true},NA('Ei oska öelda')],
   rows:[{label:'Kõik (n=1523)',values:[4.1,3.3,3.7,16.0,68.7,4.1]},{label:'Eestikeelsed (n=1197)',values:[3.3,2.3,2.9,15.7,72.2,3.7]},{label:'Muukeelsed (n=326)',values:[6.0,5.7,5.5,16.7,61.3,4.9]}]},
  note:'Keel = küsitluse täitmise keel; muukeelsed = vene- (283) ja ingliskeelsed (43). Erinevus statistiliselt oluline (p = 0,003).',
  source:'Allikas: UI2026; kaalutud', xt:'Q21'},

 {id:'puhad', eyebrow:'16 · Millal kirikus käiakse', title:'Eestikeelsed käivad jõulude ajal, muukeelsed tavalistel teenistustel', dark:true,
  lead:'Küsiti neilt, kes käivad jumalateenistusel 1–4 korda aastas (n=317). Võimalik seletus: õigeusu kalendris on peamine püha lihavõtted, jõulud on 7. jaanuaril.',
  chart:{type:'grouped', series:[{name:'Eestikeelsed (n=242)',color:'#9cc6d8'},{name:'Muukeelsed (n=75)',color:'#efbd73'}], max:80,
   rows:[['Jõulude ajal',71.7,22.4],['Tavalistel jumalateenistustel',27.5,49.7],['Muudel kirikupühadel',19.8,25.8],['Ülestõusmispühade ajal',14.7,28.4],['Ei oska öelda',5.2,18.0]].map(r=>({label:r[0],values:[r[1],r[2]]}))},
  note:'Võis valida mitu vastust. Muukeelsete rühm on väike: tulemused on suunda näitavad.', source:'Allikas: UI2026; kaalutud', xt:'Q22-r1'},

 {id:'vaimsed-praktikad', eyebrow:'17 · Vaimsed praktikad', title:'Viiendik on osalenud vaimsetes praktikates',
  lead:'Jooga, meditatsioon, hingamistehnikad, šamaanirituaalid jms: viie aasta jooksul on osalenud 21%. Kõige enam osalevad otsijad ja „vaimsed, kuid mitte religioossed“; eesti- ja venekeelsete vahel olulist erinevust ei ole.',
  chart:{type:'hbars', rows:[['Otsija *',36.7],['Vaimne, mitte religioosne *',33.7],['Agnostik *',28.4],['Ateist',21.7],['Kõik vastajad',21.3],['Religioonist eemaldunud',18.0],['Usklik',16.6],['Mittereligioosne *',15.5],['Mitte keegi neist *',12.1],['Ükskõikne *',11.2]].map(r=>({label:r[0],value:r[1],hl:r[0]==='Kõik vastajad'})), max:50},
  note:'Osalenud kokku (ühel või enamal korral) maailmavaatelise enesemääratluse järgi. * erinevus ülejäänud vastajatest statistiliselt oluline (p < 0,05, disainiefektiga korrigeeritud hii-ruut).',
  source:'Allikas: UI2026; kaalutud', xt:'Q13'},

 {id:'meedia', eyebrow:'18 · Kirjandus ja meedia', title:'Vaimse eneseabi lugejaid on kaks korda rohkem kui kristliku meedia kasutajaid', dark:true,
  lead:'Muukeelsed loevad sagedamini Piiblit (21% vs 13%) ja kristlikku kirjandust (13% vs 7%) ning jälgivad kristlikku veebisisu (22% vs 9%).',
  chart:{type:'stacked', series:[{name:'Iga päev',color:'#efbd73',light:true},{name:'Kord nädalas',color:'#9cc6d8',light:true},{name:'Harvem',color:'#5d89a6'},{name:'Üldse mitte',color:'#3c4d52'},NA('Ei oska öelda')],
   rows:[['Vaimne eneseareng, astroloogia vms',1.1,3.6,24.0,62.3,9.1],['Piibli lugemine',2.8,2.6,10.0,79.1,5.5],['Kristlik sotsiaalmeedia, YouTube, podcast',2.0,3.5,7.7,82.1,4.7],['Kristlik kirjandus',1.5,1.9,5.8,83.9,6.9],['Kristlik raadio või TV',0.9,2.0,5.6,87.4,4.1]].map(r=>({label:r[0],values:r.slice(1)}))},
  note:'Vabavastustes domineerivad horoskoobid ja eneseabi – sageli meelelahutuse või juhusliku kokkupuute kaudu.',
  source:'Allikas: UI2026; kaalutud. Küsimus: kui sageli Te eelmisel aastal …', xt:'Q18-r5'},

 {id:'kirik', eyebrow:'19 · Kirik ühiskonnas', title:'Kiriku tugevus on kultuur ja abivajajate toetamine',
  lead:'Kõige tugevamalt nähakse kiriku rolli kultuuri säilitamises ja haavatavate inimeste abistamises. 26% elanikest leiab, et kirikul ei peaks mingit ühiskondlikku rolli olema.',
  chart:{type:'hbars', rows:[['Kristliku kultuuri säilitamine',50],['Vaesusesse sattunute abistamine',48],['Probleemidesse sattunute abistamine',41],['Usu- ja religioonialane haridus',40],['Traditsiooniliste väärtuste eest seismine',36],['Kunst, muusika ja kultuur',31],['Migrantide lõimimine',13],['Sõja ja rahu küsimused',9],['Keskkonnakaitse',8],['Sisepoliitika',6]].map(r=>({label:r[0],value:r[1]})), max:60},
  note:'Nende vastajate osakaal, kes leiavad, et kirik saab antud rolliga hästi hakkama.', source:'Allikas: UI2026, n=980', xt:'Q24-r10'},

 {id:'usundiopetus', eyebrow:'20 · Usundiõpetus', title:'Pooled toetavad kohustuslikku usundiõpetust', dark:true,
  lead:'51% nõustub, et maailma usundeid ja usulist pärandit tutvustav õppeaine võiks olla koolides kohustuslik (35% pigem, 16% täiesti). Toetus on 2020. aastaga võrreldes püsinud sisuliselt muutumatuna.',
  chart:{type:'stacked', series:[{name:'Üldse ei nõustu',color:C.neg},{name:'Pigem ei nõustu',color:C.neg2,light:true},{name:'Pigem nõustub',color:'#9cc6d8',light:true},{name:'Täiesti nõustub',color:'#5d89a6'},NA('Raske öelda')],
   rows:[{label:'2020',values:[14,18,37,18,13]},{label:'2026',values:[16,19,35,16,14]}]},
  source:'Allikas: EUU2020 ja UI2026', xt:'Q25'},

 {id:'diskrimineerimine', eyebrow:'21 · Ebavõrdne kohtlemine', title:'15,8% on kogenud veendumustest tingitud ebavõrdset kohtlemist',
  lead:'Kõige sagedamini on põhjuseks poliitiline veendumus. Usulist põhjust nimetas 13 vastajat – 5,7% kõigist diskrimineerimist kogenutest.',
  chart:{type:'hbars', rows:[['Ei ole kogenud',69.5],['Poliitiline veendumus',6.4,true],['Muu veendumus',3.9,true],['Usuline veendumus',0.8,true],['Ei oska öelda',14.7],['Ei soovinud vastata',4.7]].map(r=>({label:r[0],value:r[1],hl:r[2]})), max:80},
  source:'Allikas: UI2026', xt:'Q30'},

 {id:'usaldus', eyebrow:'22 · Institutsionaalne usaldus', title:'Kirik on ainus institutsioon, mida venekeelsed usaldavad rohkem', dark:true,
  lead:'Eestikeelsed vastajad usaldavad enamikku institutsioone sagedamini. Suurim lõhe on kaitseväe puhul (86% vs 47%); kirikut usaldab 59% venekeelsetest ja 42% eestikeelsetest.',
  chart:{type:'grouped', series:[{name:'Eestikeelsed',color:'#9cc6d8'},{name:'Venekeelsed',color:'#efbd73'}],
   rows:[['Politsei',88.9,81.9],['Kaitsevägi',86.3,47.0],['Tervishoid',83.2,72.6],['President',77.7,61.4],['Kohtud',76.2,66.1],['Valitsus',48.6,24.6],['Parlament',47.7,26.2],['Kirik',42.4,58.8],['Meedia',37.6,26.7]].map(r=>({label:r[0],values:[r[1],r[2]]}))},
  note:'Osakaal, kes usaldab institutsiooni täielikult või pigem.', source:'Allikas: UI2026, kaalutud osakaal', xt:'Q3-r6'},

 {id:'usaldus-kirik', eyebrow:'23 · Usaldus kiriku vastu', title:'Kiriku usaldus on veerand sajandit püsinud poole lähedal',
  lead:'Elanike osakaal, kes usaldab või pigem usaldab kirikut, on aastatel 1998–2026 kõikunud 44% ja 55% vahel. 2026. aastal on see 47%.',
  chart:{type:'line', x:['1998','2004','2005','2006','2007','2010','2018','2022','2026'], yMax:70, yMin:0, series:[{name:'Usaldab või pigem usaldab',color:C.blue,values:[48.9,52.4,52.5,44.0,55.4,48.4,44.0,46.0,47.1]}]},
  source:'Allikas: usaldusuuringute aegrida (allikad täpsustamisel)', xt:'Q3-r6'},

 {id:'poliitika', eyebrow:'24 · Poliitilised hoiakud', title:'Suurim keeleline lõhe puudutab Ukraina sõda ja Moskva patriarhaati', dark:true,
  lead:'Keskmine nõustumine skaalal 1 (üldse ei nõustu) kuni 4 (täiesti nõus). Palestiinlaste õiguses oma riigile on keelerühmad ühel meelel.',
  chart:{type:'grouped', raw:true, max:4, series:[{name:'Eestikeelsed',color:'#9cc6d8'},{name:'Venekeelsed',color:'#efbd73'}],
   rows:[['Venemaa ainuvastutus Ukraina sõja eest',3.4,2.2],['EKÕK sidemete katkestamine Moskvaga',3.3,1.9],['Palestiinlastel õigus oma riigile',3.2,3.2],['Brexit oli viga',2.9,2.2],['Iisraeli valitsusel õigus kaitsta',2.6,2.5],['Trumpi poliitika põhjendatud',1.8,1.7]].map(r=>({label:r[0],values:[r[1],r[2]]}))},
  source:'Allikas: UI2026; 1 = üldse ei nõustu, 4 = täiesti nõus', xt:'Q27-r3'},

 {id:'moraal', eyebrow:'25 · Eetilised hoiakud', title:'Kooselu ja abort on enim aktsepteeritud, elulõpu küsimustes on ühiskond jagunenud',
  lead:'Vaba kooselu peab aktsepteeritavaks 82% ja aborti 68%. Truudusetust paarisuhtes ei pea aktsepteeritavaks 85%.',
  chart:{type:'stacked', series:[{name:'Aktsepteeritav',color:C.blue},NA('Arvamus puudub'),{name:'Mitte aktsepteeritav',color:C.coral}],
   rows:[['Vaba kooselu',82,3,15],['Abort',68,4,27],['Eutanaasia',60,5,35],['Surrogaatemadus',58,8,34],['Samasooliste abielu',41,6,53],['Abistatud enesetapp',36,6,58],['Soovahetus',30,8,62],['Kanepi tarvitamine',27,6,67],['Polüamooria',24,8,69],['Enesetapp',19,8,73],['Truudusetus paarisuhtes',9,6,85]].map(r=>({label:r[0],values:[r[1],r[2],r[3]]}))},
  note:'Hinnang skaalal 1–10 on koondatud kaheks rühmaks.', source:'Allikas: UI2026', xt:'Q2-r4'},

 {id:'jareldused', eyebrow:'Kokkuvõte', title:'Mida räägivad andmed Eesti usulisest maastikust?', dark:true,
  lead:'Viis järeldust Eesti elanikkonna usulise identiteedi uuringust 2026.',
  chart:{type:'takeaways', items:[
   ['Usk Jumalasse väheneb, ebakindlus püsib','Jumalasse uskujaid on 29% (2020: 37%), „ei oska öelda“ vastajaid on endiselt 27%.'],
   ['Identiteet, kuuluvus ja praktika ei kattu','37% peab end kristlaseks, kuid regulaarselt palvetab 11% ja vähemalt kord kuus käib jumalateenistusel 7%.'],
   ['Keelerühmade erinevused on sügavad','Venekeelsed peavad end kolm korda sagedamini usklikuks (29% vs 9%) ja käivad sagedamini kirikus.'],
   ['Vaimsus ulatub kiriklikust ruumist kaugemale','„Vaimne, kuid mitte religioosne“ on suurim enesemääratlus (20%).'],
   ['Kiriku tugevus on kultuur ja abivajajad','Kultuuri säilitamine 50%, abivajajate aitamine 48%; 26% ei näe kirikul ühiskondlikku rolli.']]},
  source:'Allikas: EUU2020 ja UI2026'}
];
})();
