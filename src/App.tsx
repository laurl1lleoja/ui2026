import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, ShieldCheck, Languages } from "lucide-react";
import { motion } from "framer-motion";

const PROCUREMENT_URL =
  "https://www.siseministeerium.ee/uudised/pakkumuskutse-teadusuuringu-eesti-elanikkonna-usuline-identiteet-labiviimiseks";
const SURVEY_BASE_URL = "https://surveer.com/s/";

const content = {
  et: {
    lang: "Eesti",
    heroBadge: "Sotsioloogiline uuring",
    title: "Eesti elanikkonna usuline identiteet",
    subtitle:
      "Teadusuuring religioosse ja maailmavaatelise identiteedi, ühiskondliku osaluse, sotsiaalse sidususe ja lõimumise seoste kohta Eestis.",
    introTitle:
      "Uuring on vajalik Eesti sisejulgeoleku ja lõimumispoliitika kujundamiseks, religiooniga seotud ühiskondlike muutuste hindamiseks ning varasemate riiklike uuringute jätkamiseks.",
    aboutTitle: "Uuringu eesmärk ja sisu",
    about: [
      "Uuring annab teaduspõhise ülevaate Eesti elanike religioossest ja maailmavaatelisest identiteedist.",
      "Vaadeldakse selle seoseid ühiskondliku osaluse, sotsiaalse sidususe ja lõimumisega.",
      "Küsimused käsitlevad usulist ja maailmavaatelist enesemääratlust, väärtushinnanguid, eetilisi hoiakuid, ühiskondlikku osalust ja usaldust.",
      "Uuring koosneb kahest osast – täisealisele elanikkonnale suunatud küsitlusuuringust ning kvalitatiivsest uuringust, mis hõlmab 18 fookusgrupi intervjuud erinevate kogukondade esindajatega."
    ],
    whyTitle: "Miks on oluline uuringus osaleda?",
    detailsTitle: "Uuringus osalemine",
    duration:
      "Tegemist on tõenäosusliku elanikkonna uuringuga, kuhu osaleja on välja valitud juhuslikkuse printsiibil. Seega on vastustel oluline kaal, tagamaks kõigi ühiskonnagruppide esindatuse.",
    privacy:
      "Osalemine on vabatahtlik. Võib keelduda, jätta küsimustele vastamata või katkestada osalemise igal ajal.",
    inputLabel: "Uuringus osalemiseks sisesta kontaktkirjaga saadetud kood",
    inputPlaceholder: "Nt ABC12345",
    inputError: "Palun sisesta kehtiv 8-märgiline ligipääsukood.",
    helper:
      "Vastuseid ei seostata kutse edastamiseks kasutatud kontaktandmetega. Küsimustiku täitmine võtab ligikaudu 15–20 minutit.",
    raffle: "Kõikide küsimustiku täitjate vahel loositakse välja 20 kinkekaarti väärtusega 100€.",
    buttonLabel: "Ava küsimustik",
    footer:
      "Täiendavate küsimuste ja muu info saamiseks palun kontakteeruge e-posti teel: info@uuringukeskus.ee",
    projectMeta: [
      "Periood: 2025–2026",
      "Uuringu tellija: Siseministeerium",
      "Uuringu elluviija: EKN ja Eesti Uuringukeskus OÜ",
      "Uuringu on kooskõlastanud: Tervise Arengu Instituudi eetikakomitee ja Andmekaitse Inspektsioon"
    ],
    procurementLabel: "Hanke info:",
    procurementLinkLabel: "Siseministeerium",
    accessTitle: "Andmekaitselised aspektid",
    accessPoints: [
      "Uuringu käigus kogutakse küsitluse vastuseid ning mõningaid taustaandmeid (vanuserühm, sugu, rahvus ja haridustase).",
      "Vastused ei sisalda otseseid isikut tuvastavaid andmeid.",
      "Kontaktandmed kustutatakse pärast küsitlusperioodi lõppu ning andmed anonümiseeritakse.",
      "Anonümiseeritud andmeid säilitatakse teaduslikel eesmärkidel vastavalt heale teadustavale."
    ]
  },

  en: {
    lang: "English",
    heroBadge: "Sociological study",
    title: "Religious Identity of the Estonian Population",
    subtitle:
      "Research on religious and worldview identity, civic participation, social cohesion and integration in Estonia.",
    introTitle:
      "The study supports evidence‑based policy making regarding religion, social cohesion and integration in Estonia.",
    aboutTitle: "Purpose of the study",
    about: [
      "The study provides a scientific overview of religious and worldview identity in Estonia.",
      "It explores links between religion, civic participation and social cohesion.",
      "The study includes a nationwide survey and focus group interviews with different communities."
    ],
    whyTitle: "Why participate in the study?",
    detailsTitle: "Participation",
    duration:
      "Participants are selected randomly as part of a probability‑based population survey.",
    privacy: "Participation is voluntary and can be stopped at any time.",
    inputLabel: "Enter the access code from the invitation",
    inputPlaceholder: "Example ABC12345",
    inputError: "Please enter a valid 8-character access code.",
    helper: "Completing the questionnaire takes approximately 15–20 minutes.",
    raffle: "20 gift cards worth €100 will be raffled among participants.",
    buttonLabel: "Open survey",
    footer: "For further information please contact: info@uuringukeskus.ee",
    projectMeta: [
      "Period: 2025–2026",
      "Commissioned by: Ministry of the Interior",
      "Implemented by: Estonian Council of Churches & Eesti Uuringukeskus OÜ"
    ],
    procurementLabel: "Procurement info:",
    procurementLinkLabel: "Ministry of the Interior",
    accessTitle: "Data protection",
    accessPoints: [
      "Survey responses and background data are collected.",
      "Responses do not contain direct personal identifiers.",
      "Data are anonymised and used for research purposes only."
    ]
  },

  ru: {
    lang: "Русский",
    heroBadge: "Социологическое исследование",
    title: "Религиозная идентичность населения Эстонии",
    subtitle:
      "Исследование религиозной и мировоззренческой идентичности, социальной сплоченности и интеграции в Эстонии.",
    introTitle:
      "Исследование помогает лучше понять религиозные и мировоззренческие установки жителей Эстонии.",
    aboutTitle: "Цель исследования",
    about: [
      "Исследование предоставляет научный обзор религиозной идентичности населения Эстонии.",
      "Анализируются связи между религией, общественным участием и социальной сплочённостью.",
      "В исследование входит общенациональный опрос и фокус‑групповые интервью."
    ],
    whyTitle: "Почему важно участвовать?",
    detailsTitle: "Участие в исследовании",
    duration:
      "Участники выбраны случайным образом как часть репрезентативного исследования населения.",
    privacy: "Участие добровольное и может быть прекращено в любое время.",
    inputLabel: "Введите код доступа из приглашения",
    inputPlaceholder: "Например ABC12345",
    inputError: "Пожалуйста, введите действительный 8-значный код доступа.",
    helper: "Заполнение анкеты занимает примерно 15–20 минут.",
    raffle: "Среди участников будет разыграно 20 подарочных карт по 100€.",
    buttonLabel: "Открыть анкету",
    footer: "Дополнительная информация: info@uuringukeskus.ee",
    projectMeta: [
      "Период: 2025–2026",
      "Заказчик: Министерство внутренних дел Эстонии",
      "Исполнитель: EKN и Eesti Uuringukeskus OÜ"
    ],
    procurementLabel: "Информация о тендере:",
    procurementLinkLabel: "Министерство внутренних дел",
    accessTitle: "Защита данных",
    accessPoints: [
      "Собираются ответы анкеты и фоновые данные.",
      "Ответы не содержат личных идентификаторов.",
      "Данные анонимизируются и используются только в научных целях."
    ]
  }
} as const;

type LanguageKey = keyof typeof content;
type LanguageContent = (typeof content)[LanguageKey];

export default function ResearchSurveyLandingPage() {
  const [lang, setLang] = useState<LanguageKey>("et");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const t = useMemo<LanguageContent>(() => content[lang], [lang]);

  const validateCode = (value: string) => /^[A-Z0-9]{8}$/.test(value);

  const submitCode = () => {
    const cleaned = code.trim().replace(/\s+/g, "").toUpperCase();
    if (!cleaned || !validateCode(cleaned)) {
      setError(t.inputError);
      return;
    }
    setError("");
    window.location.href = `${SURVEY_BASE_URL}${encodeURIComponent(cleaned)}`;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitCode();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.25),transparent_30%),radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_28%),linear-gradient(to_bottom,rgba(15,23,42,1),rgba(2,6,23,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm text-slate-300">Eesti elanikkonna usuline identiteet</div>
              <div className="text-xs text-slate-400">Uuringu infolehekülg</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(Object.entries(content) as Array<[LanguageKey, LanguageContent]>).map(([key, value]) => (
              <Button
                key={key}
                variant={lang === key ? "default" : "outline"}
                className={`rounded-full border-white/15 ${
                  lang === key ? "" : "bg-white/5 text-white hover:bg-white/10"
                }`}
                onClick={() => {
                  setLang(key);
                  setError("");
                }}
              >
                <Languages className="mr-2 h-4 w-4" />
                {value.lang}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Card className="overflow-hidden rounded-[28px] border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
              <CardContent className="p-8 md:p-10">
                <Badge className="mb-5 rounded-full bg-emerald-400/15 px-4 py-1 text-emerald-200 hover:bg-emerald-400/15">
                  {t.heroBadge}
                </Badge>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  {t.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200 md:text-xl">
                  {t.subtitle}
                </p>
                <div className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                  <p>{t.introTitle}</p>
                </div>

                <div className="mt-6 text-xs text-slate-400">
                  {t.procurementLabel}{" "}
                  <a
                    className="underline underline-offset-4 hover:text-slate-200"
                    href={PROCUREMENT_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.procurementLinkLabel}
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
                  {t.projectMeta.map((item) => (
                    <div
                      key={item}
                      className="rounded-full border border-white/10 bg-slate-900/50 px-4 py-2"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <Card className="rounded-[28px] border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{t.whyTitle}</CardTitle>
                <CardDescription className="text-slate-300">{t.duration}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
                  <div className="mb-2 flex items-center gap-2 font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    {t.detailsTitle}
                  </div>
                  <ul className="list-disc space-y-2 pl-5 text-emerald-50/90">
                    <li>{t.privacy}</li>
                    <li>{t.helper}</li>
                    <li>{t.raffle}</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-200">{t.inputLabel}</label>
                  <Input
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      if (error) setError("");
                    }}
                    onKeyDown={onKeyDown}
                    placeholder={t.inputPlaceholder}
                    className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  />
                  {error ? <p className="text-sm text-red-300">{error}</p> : null}
                  <Button
                    onClick={submitCode}
                    disabled={!code.trim()}
                    className="mt-3 w-full rounded-2xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.buttonLabel}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[28px] border-white/10 bg-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{t.aboutTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-slate-200">
                {t.about.map((item) => (
                  <li key={item} className="flex gap-3 leading-7">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-white/10 bg-white/10 backdrop-blur-xl">
            <CardContent className="flex h-full flex-col justify-between p-8">
              <div>
                <div className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  {t.accessTitle}
                </div>
                <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-6 text-base leading-7 text-slate-300">
                  {t.accessPoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
                {t.footer}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
