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
      "Uuring koosneb kahest osast – täisealisele elanikkonnale suunatud küsitlusuuringust ning kvalitatiivsest uuringust, mis hõlmab 18 fookusgrupi intervjuud erinevate kogukondade esindajatega, mõistmaks sügavuti usulise identiteedi ja lõimumisprotsesside vahelisi seoseid."
    ],
    whyTitle: "Miks on oluline uuringus osaleda?",
    detailsTitle: "Uuringus osalemine",
    duration:
      "Tegemist on tõenäosusliku elanikkonna uuringuga, kuhu osaleja on välja valitud juhuslikkuse printsiibil. Seega on vastustel oluline kaal, tagamaks kõigi ühiskonnagruppide esindatuse. Vastused aitavad paremini mõista Eesti elanike usulisi ja maailmavaatelisi hoiakuid ning toetavad tulevikus teaduspõhist otsustamist.",
    privacy:
      "Osalemine on vabatahtlik. Võib keelduda, jätta küsimustele vastamata või katkestada osalemise igal ajal.",
    inputLabel: "Uuringus osalemiseks sisesta kontaktkirjaga saadetud kood",
    inputPlaceholder: "Nt ABC12345",
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
      "Vastused ei sisalda otseseid isikut tuvastavaid andmeid ega ole seotud kutse saatmiseks kasutatud kontaktandmetega.",
      "Uuring sisaldab ka küsimusi usulise või maailmavaatelise kuuluvuse kohta, mida töödeldakse ainult osaleja selgesõnalisel nõusolekul.",
      "Kontaktandmed kustutatakse pärast küsitlusperioodi lõppu ning küsitlusandmed anonümiseeritakse.",
      "Anonümiseeritud andmeid säilitatakse teaduslikel eesmärkidel vastavalt heale teadustavale.",
      "Osalejal on õigus saada teavet oma andmete töötlemise kohta, võtta nõusolek igal ajal tagasi ning esitada küsimusi või kaebusi andmete töötlemise kohta."
    ]
  },
  ru: {
    lang: "Русский",
    heroBadge: "Социологическое исследование",
    title: "Религиозная идентичность населения Эстонии",
    subtitle:
      "Научное исследование религиозной и мировоззренческой идентичности, общественного участия, социальной сплочённости и интеграции в Эстонии.",
    introTitle:
      "Исследование необходимо для разработки политики внутренней безопасности и интеграции в Эстонии, оценки общественных изменений, связанных с религией, а также для продолжения предыдущих государственных исследований.",
    aboutTitle: "Цель и содержание исследования",
    about: [
      "Исследование предоставляет научно обоснованный обзор религиозной и мировоззренческой идентичности жителей Эстонии.",
      "Анализируются связи этой идентичности с общественным участием, социальной сплочённостью и интеграцией.",
      "Вопросы касаются религиозного и мировоззренческого самоопределения, ценностей, этических установок, общественного участия и доверия.",
      "Исследование состоит из двух частей — опроса взрослого населения и качественного исследования, включающего 18 фокус-групповых интервью с представителями различных сообществ для более глубокого понимания связей между религиозной идентичностью и процессами интеграции."
    ],
    whyTitle: "Почему важно участвовать в исследовании?",
    detailsTitle: "Участие в исследовании",
    duration:
      "Это вероятностное исследование населения, и участник выбран случайным образом. Поэтому ответы имеют важное значение для обеспечения представительства всех групп общества. Ответы помогают лучше понять религиозные и мировоззренческие установки жителей Эстонии и поддерживают научно обоснованное принятие решений в будущем.",
    privacy:
      "Участие является добровольным. Участник может отказаться, пропустить отдельные вопросы или прекратить участие в любой момент.",
    inputLabel: "Для участия в исследовании введите код, полученный в письме-приглашении",
    inputPlaceholder: "Например ABC12345",
    helper:
      "Ответы не будут связаны с контактными данными, использованными для отправки приглашения. Заполнение анкеты занимает примерно 15–20 минут.",
    raffle: "Среди всех участников опроса будет разыграно 20 подарочных карт номиналом 100€.",
    buttonLabel: "Открыть анкету",
    footer:
      "Для дополнительных вопросов и получения информации просьба обращаться по электронной почте: info@uuringukeskus.ee",
    projectMeta: [
      "Период: 2025–2026",
      "Заказчик исследования: Министерство внутренних дел Эстонии",
      "Исполнитель исследования: EKN и Eesti Uuringukeskus OÜ",
      "Исследование согласовано: этический комитет Института развития здоровья и Инспекция по защите данных"
    ],
    procurementLabel: "Информация о тендере:",
    procurementLinkLabel: "Министерство внутренних дел",
    accessTitle: "Аспекты защиты данных",
    accessPoints: [
      "В ходе исследования собираются ответы анкеты и некоторые фоновые данные (возрастная группа, пол, национальность и уровень образования).",
      "Ответы не содержат прямых идентификаторов личности и не связаны с контактными данными, использованными для отправки приглашения.",
      "Исследование включает вопросы о религиозной или мировоззренческой принадлежности, которые обрабатываются только с явного согласия участника.",
      "Контактные данные удаляются после завершения периода опроса, а данные анкеты анонимизируются.",
      "Анонимизированные данные хранятся в научных целях в соответствии с принципами добросовестной научной практики.",
      "Участник имеет право получать информацию об обработке своих данных, в любое время отозвать согласие и подавать вопросы или жалобы по поводу обработки данных."
    ]
  },
  en: {
    lang: "English",
    heroBadge: "Sociological study",
    title: "Religious Identity of the Estonian Population",
    subtitle:
      "A research study on religious and worldview identity, civic participation, social cohesion and integration in Estonia.",
    introTitle:
      "The study is necessary for shaping Estonia's internal security and integration policies, assessing social changes related to religion, and continuing previous national studies.",
    aboutTitle: "Purpose and content of the study",
    about: [
      "The study provides an evidence-based overview of the religious and worldview identity of people living in Estonia.",
      "It examines the links between this identity, civic participation, social cohesion and integration.",
      "Questions address religious and worldview self-identification, values, ethical attitudes, civic participation and trust.",
      "The study consists of two parts: a survey of the adult population and a qualitative study including 18 focus group interviews with representatives of different communities in order to better understand the links between religious identity and integration processes."
    ],
    whyTitle: "Why is it important to participate in the study?",
    detailsTitle: "Participation in the study",
    duration:
      "This is a probability-based population study and the participant has been selected at random. Therefore, each response carries important weight in ensuring the representation of all groups in society. Responses help better understand the religious and worldview attitudes of people in Estonia and support evidence-based decision-making in the future.",
    privacy:
      "Participation is voluntary. A participant may refuse, skip questions or stop participating at any time.",
    inputLabel: "To participate in the study, enter the code received in the invitation email",
    inputPlaceholder: "For example ABC12345",
    helper:
      "Responses are not linked to the contact details used to send the invitation. Completing the questionnaire takes approximately 15–20 minutes.",
    raffle: "Twenty €100 gift cards will be raffled among all questionnaire participants.",
    buttonLabel: "Open survey",
    footer:
      "For additional questions or further information, please contact: info@uuringukeskus.ee",
    projectMeta: [
      "Period: 2025–2026",
      "Commissioned by: Ministry of the Interior",
      "Implemented by: EKN and Eesti Uuringukeskus OÜ",
      "Study approved by: Ethics Committee of the National Institute for Health Development and the Estonian Data Protection Inspectorate"
    ],
    procurementLabel: "Procurement information:",
    procurementLinkLabel: "Ministry of the Interior",
    accessTitle: "Data protection aspects",
    accessPoints: [
      "The study collects questionnaire responses and certain background data such as age group, sex, nationality and level of education.",
      "Responses do not contain direct personal identifiers and are not linked to the contact details used to send the invitation.",
      "The study includes questions about religious or worldview affiliation, which are processed only with the participant's explicit consent.",
      "Contact details are deleted after the survey period and the survey data are anonymised.",
      "Anonymised data are stored for scientific purposes in accordance with good research practice.",
      "The participant has the right to receive information about the processing of their data, withdraw consent at any time, and submit questions or complaints regarding data processing."
    ]
  }
} as const;

type LanguageKey = keyof typeof content;

type LanguageContent = (typeof content)[LanguageKey];

export default function ResearchSurveyLandingPage() {
  const [lang, setLang] = useState<LanguageKey>("et");
  const [code, setCode] = useState("");
  const t = useMemo<LanguageContent>(() => content[lang], [lang]);

  const submitCode = () => {
    const cleaned = code.trim().replace(/\s+/g, "");
    if (!cleaned) return;
    window.location.href = `${SURVEY_BASE_URL}${encodeURIComponent(cleaned)}`;
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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
                onClick={() => setLang(key)}
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
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={onKeyDown}
                    onBlur={submitCode}
                    placeholder={t.inputPlaceholder}
                    className="h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  />
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
