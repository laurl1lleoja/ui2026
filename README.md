# Elust, usust ja usuelust 1995–2026 – veebiportaal (prototüüp)

Staatiline sait, ei vaja ehitusetappi. Sobib otse Vercelisse (sama mis praegune ui2026.ee).

## Lehed
- `index.html` – avaleht
- `tulemused.html` – tulemuste lugu (sisu: `data/tulemused.js`)
- `risttabelid.html` – risttabelite tööriist (andmed: `data/tabelid.js`)
- `kusimustik.html` – küsimustik (sisu: `data/kusimustik.js`, PDF: `files/kusimustik-2026-ee.pdf`)
- `uuringust.html` – metoodika

## Sisu uuendamine
- Tulemuste loo tekstid ja numbrid: muuda `data/tulemused.js`.
- Risttabelid uuesti sagedustabelite failist:
  ```
  python3 build/parse_xlsx.py Sagedustabelid_v2.xlsx build/tables.json
  python3 build/gen_data.py build/tables.json data
  ```
  (`build/questionnaire.py` sisaldab küsimustiku struktuuri ja seob küsimused andmekoodidega.)

- Varasemate aastate (1995, 2000, 2005, 2015, 2020) risttabelid:
  ```
  python3 build/parse_old.py 2015 "2015 EUU.xlsx" build/old_2015.json
  ```
  ja seejärel teisenda JSON failiks `data/aastad/2015.js` (vt olemasolevaid faile). Tööriist laeb aasta andmed alles siis, kui see valitakse.
  NB: 2005. aasta failis on leht „Linn maa“ 1995. aasta andmetega, seepärast pole 2005 elukoha lõiget.

## Kohalik eelvaade
`python3 -m http.server` selles kaustas ja ava http://localhost:8000

## Publikatsioonid
`publikatsioonid.html` – kogumikud, esmased tulemused ja artiklite nimekiri (allikas: ekn.ee religioonisotsioloogia leht). Nimekiri on HTML-is staatiline; uue artikli lisamiseks kopeeri üks `<li>` rida ja määra `data-y` (aasta) ja `data-l` (`et` või `muu`).
